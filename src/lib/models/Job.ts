import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a job description'],
  },
  applyJob: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: [true, 'Please provide an organization name'],
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
  },
  salary: {
    type: String,
    required: false,
  },
  requirements: {
    type: [String],
    default: [],
  },
  applicationDeadline: {
    type: Date,
    required: [true, 'Please provide an application deadline'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a job category'],
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
  applicationBeginDate: {
    type: String,
    required: false,
  },
  lastDateApplyOnline: {
    type: String,
    required: false,
  },
  formCompleteLastDate: {
    type: String,
    required: false,
  },
  correctionDate: {
    type: String,
    required: false,
  },
  examDate: {
    type: String,
    required: false,
  },
  admitCardDate: {
    type: String,
    required: false,
  },
  maximumAge: {
    type: String,
    required: false,
    select: true,
    validate: {
      validator: function(value: string) {
        if (!value) return true; // Allow empty value since it's optional
        const num = Number(value);
        return !isNaN(num) && num >= 0 && num <= 100;
      },
      message: 'Maximum age must be a valid number between 0 and 100'
    }
  },
  minimumAge: {
    type: String,
    required: false,
    select: true,
    validate: {
      validator: function(value: string) {
        if (!value) return true; // Allow empty value since it's optional
        const num = Number(value);
        return !isNaN(num) && num >= 0 && num <= 100;
      },
      message: 'Minimum age must be a valid number between 0 and 100'
    }
  },
  gender: {
    type: String,
    required: false,
  },
  qualification: {
    type: String,
    required: false,
  },
  
  totalVacancy: {
    type: String,
    required: false,
    validate: {
      validator: function(value: string) {
        return !isNaN(Number(value)) && Number(value) > 0;
      },
      message: 'Total vacancy must be a positive number'
    },
    select: true
  },
  applicationFeeGeneral: {
    type: String,
    required: false,
  },
  applicationFeeSCST: {
    type: String,
    required: false,
  },
  paymentMethod: {
    type: String,
    required: false,
  },
});

// Add pre-save middleware for age validation
jobSchema.pre('save', function(next) {
  if (this.minimumAge && this.maximumAge) {
    const minAge = Number(this.minimumAge);
    const maxAge = Number(this.maximumAge);
    
    if (minAge >= maxAge) {
      next(new Error('Minimum age must be less than maximum age'));
      return;
    }
  }
  next();
});

const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);

export default Job;