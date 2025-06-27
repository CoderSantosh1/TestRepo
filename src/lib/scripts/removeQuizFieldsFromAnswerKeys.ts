import connectDB from '../db';
import mongoose from 'mongoose';

async function main() {
  await connectDB();
  const result = await mongoose.connection.collection('answerkeys').updateMany({}, { $unset: { quizDate: '', quizId: '' } });
  console.log('Documents updated:', result.modifiedCount);
  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
}); 