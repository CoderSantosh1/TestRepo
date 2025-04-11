import mongoose from 'mongoose';

const AdmitCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a AdmitCard title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a AdmitCard description'],
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
    required: [true, 'Please provide a AdmitCard category'],
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

const AdmitCard = mongoose.models.AdmitCard || mongoose.model('AdmitCard', AdmitCardSchema);

export default AdmitCard;