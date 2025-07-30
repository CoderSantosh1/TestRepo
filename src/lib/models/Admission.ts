import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published',
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    default: [],
  },
  applicationLink: {
    type: String,
    required: true,
  },
});

const Admission = mongoose.models.Admission || mongoose.model('Admission', admissionSchema);

export default Admission;