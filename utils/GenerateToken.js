import jwt from 'jsonwebtoken';

const generateToken = (Payload) => {
    const token = jwt.sign(Payload, process.env.JWTSECRETKEY, { expiresIn: "1d" });
    return token;
};

export default generateToken;
