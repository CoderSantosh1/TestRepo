import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the job'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a job description'],
  },
  company: {
    type: String,
    required: [true, 'Please provide company name'],
  },
  location: {
    type: String,
    required: [true, 'Please provide job location'],
  },
  salary: {
    type: String,
    required: [true, 'Please provide salary range'],
  },
  type: {
    type: String,
    required: [true, 'Please specify job type'],
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
  },
  experience: {
    type: String,
    required: [true, 'Please specify required experience'],
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);

export default Job;