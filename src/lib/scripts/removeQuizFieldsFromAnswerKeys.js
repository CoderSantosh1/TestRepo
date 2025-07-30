const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
  }
  await mongoose.connect(process.env.MONGODB_URI);
  const result = await mongoose.connection.collection('answerkeys').updateMany({}, { $unset: { quizDate: '', quizId: '' } });
  console.log('Documents updated:', result.modifiedCount);
  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
}); 