import { registerDoctor, loginDoctor, updateDoctorProfile, uploadDoctorCV } from '../services/doctorServices.js';
import catchAsync from '../../utils/CatchAsync.js';

const register = catchAsync(async (req, res, next) => {
  const token = await registerDoctor(req.body);  
  return res.status(201).json({
    msg: "Doctor registered successfully",
    token
  });
});

const login = catchAsync(async (req, res, next) => {
  const token = await loginDoctor(req.body.email, req.body.password, res); 
  return res.status(200).json({ success: true, msg: "Login successful", token });
});

const updateProfile = catchAsync(async (req, res, next) => {

  const updatedDoctor = await updateDoctorProfile(req.user.id, req.body);  
  return res.status(200).json(updatedDoctor);
});

const uploadCV = catchAsync(async (req, res, next) => {
  const cvPath = req.file.path;
  const updatedDoctor = await uploadDoctorCV(req.user.id, cvPath); 
  return res.status(200).json(updatedDoctor);
});

export {
  register,
  login,
  updateProfile,
  uploadCV
};
