import jwt from 'jsonwebtoken';
import config from 'config';

const accessTokenPrivateKey = config.get<string>("accessTokenPrivateKey");
const accessTokenPublicKey = config.get<string>("accessTokenPublicKey");

const refreshTokenPrivateKey = config.get<string>("refreshTokenPrivateKey");
const refreshTokenPublicKey = config.get<string>("refreshTokenPublicKey");

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, accessTokenPrivateKey, { ...(options && options), algorithm: "RS256" });
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, accessTokenPublicKey);
        return {
            valid: false,
            expired: false,
            decoded
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
};