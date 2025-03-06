import express from 'express';
import * as doctorController from '../controller/doctorController.js';
import upload from '../../utils/uploadMiddleware.js';
import authenticate from '../../utils/authMiddleware.js'

const router = express.Router();

router.route('/register_doctor')
  .post(doctorController.register);

router.route('/login_doctor')
  .post(doctorController.login);

  router.route('/update_doctor_profile')
  .put(authenticate, doctorController.updateProfile);

router.route('/upload-cv')
  .post(authenticate ,upload.single('cv'), doctorController.uploadCV);

export default router;