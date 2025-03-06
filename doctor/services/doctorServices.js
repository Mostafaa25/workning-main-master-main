import Doctor from '../model/doctorModel.js';
import bcrypt from 'bcrypt';
import AppError from '../../utils/AppError.js';
import generateToken from '../../utils/GenerateToken.js';

const registerDoctor = async (userData) => {
  const { userName, email, password, Cpassword, specialization, availability, consultationFees } = userData;

  if (password !== Cpassword) {
    throw new AppError('Passwords do not match!', 400);
  }

  const oldDoctor = await Doctor.findOne({ email });
  if (oldDoctor) {
    throw new AppError('Account already exists!', 400);
  }

  const hashPass = await bcrypt.hash(password, 12);
  const newDoctor = new Doctor({
    userName,
    email,
    password: hashPass,
    specialization,
    availability,
    consultationFees
  });

  const token = generateToken({ email: newDoctor.email, id: newDoctor._id });
  newDoctor.token = token;

  await newDoctor.save();
  return token;
};

const loginDoctor = async (email, password, res) => {
  const doctor = await Doctor.findOne({ email });
  if (!doctor) {
    throw new AppError("Doctor not found!", 404);
  }

  const isMatch = await bcrypt.compare(password, doctor.password);
  if (!isMatch) {
    throw new AppError("Password or email is incorrect!", 401);
  }

  const token = generateToken({ email: doctor.email, id: doctor._id }, res);
  doctor.token = token;
  await doctor.save();
  return token;
};

const updateDoctorProfile = async (id, updateData) => {
  const doctor = await Doctor.findByIdAndUpdate(id, updateData, { new: true });
  return doctor;
};

const uploadDoctorCV = async (id, cvPath) => {
  const doctor = await Doctor.findByIdAndUpdate(id, { cv: cvPath }, { new: true });
  return doctor;
};

export {
  registerDoctor,  
  loginDoctor,    
  updateDoctorProfile,
  uploadDoctorCV  
};
