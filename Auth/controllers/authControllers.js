import { Register, login } from '../services/authServices.js'; 
import catchAsync from '../../utils/CatchAsync.js';

const RegisterController = catchAsync(async (req, res, next) => {
    const token = await Register(req.body);  
    return res.status(201).json({
        msg: "done",
        token,
    });
});

const loginController = catchAsync(async (req, res, next) => {
    const token = await login(req.body.email, req.body.password, res);  
    return res.status(200).json({
        success: true,
        msg: "login successfully",
        token,
    });
});

export {
    loginController,
    RegisterController,
};
