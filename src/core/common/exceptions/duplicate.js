import { CONFLICT } from 'http-status';
import { ERROR_CODE } from '../enum';

export class DuplicateException extends Error {
    constructor(msg = 'Duplicate record') {
        super(msg);
        this.code = ERROR_CODE.DUPLICATE;
        this.status = CONFLICT;
    }
}
