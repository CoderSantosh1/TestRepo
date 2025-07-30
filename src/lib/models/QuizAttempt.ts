import mongoose from 'mongoose';

const quizAttemptSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: [true, 'Quiz ID is required'],
    },
    userId: {
      type: String,
      required: [true, 'User ID is required'],
    },
    answers: [{
      type: Number,
      required: [true, 'Answers are required'],
    }],
    score: {
      type: Number,
      required: [true, 'Score is required'],
      min: [0, 'Score cannot be negative'],
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.QuizAttempt || mongoose.model('QuizAttempt', quizAttemptSchema); 