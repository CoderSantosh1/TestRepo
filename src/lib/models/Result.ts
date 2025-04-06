import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a result title'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  organization: {
    type: String,
    required: [true, 'Please provide an organization name'],
    trim: true,
    minlength: [2, 'Organization name must be at least 2 characters long'],
    maxlength: [100, 'Organization name cannot exceed 100 characters']
  },
  resultDate: {
    type: Date,
    required: [true, 'Please provide a result date'],
    validate: {
      validator: function(value: Date) {
        return value <= new Date();
      },
      message: 'Result date cannot be in the future'
    }
  },
  category: {
    type: String,
    required: [true, 'Please provide a result category'],
    enum: {
      values: ['government', 'private', 'education', 'other'],
      message: '{VALUE} is not a valid category'
    }
  },
  resultLink: {
    type: String,
    required: false,
    validate: {
      validator: function(value: string) {
        return !value || /^https?:\/\/.+/.test(value);
      },
      message: 'Result link must be a valid URL'
    }
  },
  description: {
    type: String,
    required: false,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: {
      values: ['draft', 'published', 'archived'],
      message: '{VALUE} is not a valid status'
    },
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
resultSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Result = mongoose.models.Result || mongoose.model('Result', resultSchema);

export default Result;