import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: [true, 'Quiz ID is required'],
    },
    text: {
      type: String,
      required: [true, 'Question text is required'],
      trim: true,
    },
    options: [{
      type: String,
      required: [true, 'Options are required'],
      trim: true,
    }],
    correctAnswer: {
      type: String,
      required: [true, 'Correct answer is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Question || mongoose.model('Question', questionSchema); 