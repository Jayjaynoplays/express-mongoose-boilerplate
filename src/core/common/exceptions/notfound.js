import { NOT_FOUND } from 'http-status';
import { ERROR_CODE } from '../enum';

export class NotFoundException extends Error {
    constructor(msg = 'Not found') {
        super(msg);
        this.code = ERROR_CODE.NOT_FOUND;
        this.status = NOT_FOUND;
    }
}
