const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
  }
  await mongoose.connect(process.env.MONGODB_URI);
  try {
    const result = await mongoose.connection.collection('answerkeys').dropIndex('quizDate_1');
    console.log('Index dropped:', result);
  } catch (err) {
    if (err.codeName === 'IndexNotFound') {
      console.log('Index quizDate_1 does not exist.');
    } else {
      throw err;
    }
  }
  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
}); 