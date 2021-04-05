import { sign, decode } from 'jsonwebtoken';
import { JWT_SECRET, EXPIRE_DAYS } from '../../env';
import { logger } from '../logger/winston';

class Jwt {
    constructor(secret, expiresIn) {
        this.secret = secret;
        this.expiresIn = expiresIn;
        logger.info('initiate Jwt module');
    }

    sign(payload) {
        return sign(payload, this.secret, {
            expiresIn: this.expiresIn
        });
    }

    decode(token) {
        return decode(token);
    }
}

export const JwtService = new Jwt(JWT_SECRET, EXPIRE_DAYS);
