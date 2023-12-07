import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'CLAVE1231.1232O32';

const generateToken = (id: string, expireTime = "2h") => {
    const jwt = sign({ id }, JWT_SECRET, {
        expiresIn: expireTime
    });
    return jwt;
}

const verifyToken = (jwt: string) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;
}


export { generateToken, verifyToken };