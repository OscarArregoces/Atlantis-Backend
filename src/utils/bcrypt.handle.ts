
import { hash, compare } from "bcryptjs";

const encrypt = async (passwrod: string) => {
    const passwordHash = await hash(passwrod, 8);
    return passwordHash;
}

const verified = async (password: string, passwordHash: string) => {
    const isCorrect = await compare(password, passwordHash);
    return isCorrect;
}


export { encrypt, verified };