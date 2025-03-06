import { FindByEmail, saveuser } from '../repo/authRepo.js'; 
import bcrypt from 'bcrypt';
import AppError from '../../utils/AppError.js';
import generateToken from '../../utils/GenerateToken.js';

const Register = async (userData) => {
    console.log(userData);
    const { userName, email, password, Cpassword } = userData;
    if (password !== Cpassword) {
        throw new AppError('Passwords do not match!', 400);
    }
    
    const olduser = await FindByEmail(email);
    if (olduser) {
        throw new AppError('Account already exists!', 400);
    }

    const hash_pass = await bcrypt.hash(password, 12);
    const newuser = {
        userName,
        email,
        password: hash_pass,
    };

    const token = generateToken({ email: newuser.email, id: newuser._id });
    newuser.token = token;

    await saveuser(newuser);

    return token;
};

const login = async (email, password, res) => {
    const user = await FindByEmail(email);
    if (!user) {
        throw new AppError("User not found!", 404);
    }

    const pass = await bcrypt.compare(password, user.password);
    if (pass) {
        const token = generateToken({ email: user.email, id: user._id }, res);

        user.token = token;
        await saveuser(user);
        return token;
    }
    
    throw new AppError("Password or email is incorrect!", 500);
};

export {
    login,
    Register,
};
