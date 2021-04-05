import { UNAUTHORIZED } from 'http-status';
import { ERROR_CODE } from '../enum';

export class UnAuthorizedException extends Error {
    constructor(msg = 'You need to sign in') {
        super(msg);
        this.code = ERROR_CODE.TOKEN_INVALID;
        this.status = UNAUTHORIZED;
    }
}
