import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
  specialization: { type: String },
  availability: { type: String },
  consultationFees: { type: Number },
  cv: { type: String }, 
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;