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
      type: Number,
      required: [true, 'Correct answer is required'],
      min: [0, 'Correct answer must be a valid option index'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Question || mongoose.model('Question', questionSchema); 