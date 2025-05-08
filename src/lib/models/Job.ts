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
});

const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);

export default Job;