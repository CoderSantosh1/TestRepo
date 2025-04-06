import mongoose from 'mongoose';

const admitCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an admit card title'],
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
  examDate: {
    type: Date,
    required: [true, 'Please provide an exam date'],
    validate: {
      validator: function(this: any, value: Date): boolean {
        return value >= new Date();
      },
      message: 'Exam date must be in the future'
    }
  },
  downloadStartDate: {
    type: Date,
    required: [true, 'Please provide download start date'],
    validate: {
      validator: function(this: { examDate: Date }, value: Date) {
        return value <= this.examDate;
      },
      message: 'Download start date must be before or equal to exam date'
    }
  },
  downloadEndDate: {
    type: Date,
    required: false,
    validate: {
      validator: function(this: { downloadStartDate: Date }, value: Date): boolean {
        return !value || value >= this.downloadStartDate;
      },
      message: 'Download end date must be after download start date'
    }
  },
  category: {
    type: String,
    required: [true, 'Please provide an admit card category'],
    trim: true,
    enum: {
      values: ['government', 'private', 'education', 'other'],
      message: '{VALUE} is not a valid category'
    }
  },
  downloadLink: {
    type: String,
    required: false,
    validate: {
      validator: function(value: string) {
        if (!value) return true;
        try {
          new URL(value);
          return true;
        } catch (error) {
          return false;
        }
      },
      message: 'Please provide a valid URL for the download link'
    }
  },
  instructions: {
    type: String,
    required: false,
    maxlength: [2000, 'Instructions cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: {
      values: ['draft', 'published', 'expired'],
      message: '{VALUE} is not a valid status'
    },
    default: 'draft'
  },
  examVenue: {
    type: String,
    required: false,
    trim: true,
    maxlength: [500, 'Exam venue cannot exceed 500 characters']
  },
  contactInfo: {
    type: String,
    required: false,
    trim: true,
    maxlength: [200, 'Contact information cannot exceed 200 characters']
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
admitCardSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const AdmitCard = mongoose.models.AdmitCard || mongoose.model('AdmitCard', admitCardSchema);

export default AdmitCard;