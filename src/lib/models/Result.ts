import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an title'],
    trim: true,
    
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true,
    
  },

  organization: {
    type: String,
    required: [true, 'Please provide an organization name'],
    trim: true,
   
  },
  resultDate: {
    type: Date,
    required: [true, 'Please provide a result date'],
    validate: {
      validator: function(value: Date) {
        const now = new Date();
        return value instanceof Date && 
               !isNaN(value.getTime()) && 
               value <= now;
      },
      message: 'Result date must be a valid date not in the future'
    }
  },
  category: {
    type: String,
    required: [true, 'Please provide a result category'],
    enum: {
      values: ['government', 'private', 'education', 'other'],
      message: 'Category must be one of: government, private, education, other'
    }
  },
  downloadLink: {
    type: String,
    required: [true, 'Please provide a download link'],
    validate: {
      validator: function(value: string) {
        return /^(http|https):\/\/[^ "]+$/.test(value);
      },
      message: 'Please provide a valid URL for the download link'
    }
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'closed'],
    default: 'draft',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Result = mongoose.models.Result || mongoose.model('Result', ResultSchema);

export default Result;