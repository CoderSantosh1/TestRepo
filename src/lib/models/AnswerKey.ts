import mongoose from 'mongoose';

const answerKeySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published',
  },
  downloadLink: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const AnswerKey = mongoose.models.AnswerKey || mongoose.model('AnswerKey', answerKeySchema);

export default AnswerKey;