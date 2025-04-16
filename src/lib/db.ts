import mongoose from 'mongoose';

interface MongoDBError extends Error {
  code?: number;
  message: string;
}

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

interface GlobalWithMongoose extends Global {
  mongoose: CachedConnection;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env')
}

const MONGODB_URI = process.env.MONGODB_URI.trim();

if (!MONGODB_URI.startsWith('mongodb://') && !MONGODB_URI.startsWith('mongodb+srv://')) {
  throw new Error('Invalid MongoDB connection string. Must start with "mongodb://" or "mongodb+srv://"')
}

let cached: CachedConnection = ((global as unknown) as GlobalWithMongoose).mongoose;

if (!cached) {
  cached = ((global as unknown) as GlobalWithMongoose).mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      serverSelectionTimeoutMS: 60000,
      socketTimeoutMS: 75000,
      maxPoolSize: 50,
      minPoolSize: 10,
      connectTimeoutMS: 30000,
      heartbeatFrequencyMS: 10000,
      autoIndex: true
    };

    let retries = 3;
    const connect = async () => {
      try {
        const mongooseInstance = await mongoose.connect(MONGODB_URI, opts);
        console.log('MongoDB connected successfully');
        return mongooseInstance;
      } catch (error) {
        const dbError = error as MongoDBError;
        if (dbError.code === 8000 || dbError.message.includes('bad auth')) {
          console.error('MongoDB Authentication Error: Please check your credentials in .env file');
          console.error('Make sure your MongoDB Atlas connection string is in the format: mongodb+srv://<username>:<password>@<cluster-url>/<database>');
          throw dbError;
        } else if (retries > 0 && !dbError.message.includes('bad auth')) {
          console.warn(`Connection failed, retrying... (${retries} attempts remaining)`);
          retries--;
          await new Promise(resolve => setTimeout(resolve, 5000));
          return connect();
        } else {
          console.error('MongoDB Connection Error:', dbError.message);
          throw dbError;
        }
      }
    };
    cached.promise = connect();
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export { connectDB as connectToDatabase };