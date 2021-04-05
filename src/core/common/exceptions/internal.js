import { INTERNAL_SERVER_ERROR } from 'http-status';
import { ERROR_CODE } from '../enum';

export class InternalServerException extends Error {
    constructor(msg = 'Internal server error') {
        super(msg);
        this.code = ERROR_CODE.INTERNAL;
        this.status = INTERNAL_SERVER_ERROR;
    }
}
