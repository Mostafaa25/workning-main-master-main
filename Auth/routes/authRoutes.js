import express from 'express';
import {loginController,RegisterController } from '../controllers/authControllers.js';


const router = express.Router();

router.route('/Register')
    .post(RegisterController);

router.route('/login')
    .post(loginController);

export default router;
