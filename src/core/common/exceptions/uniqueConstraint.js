import { CONFLICT } from 'http-status';
import { ERROR_CODE } from '../enum';

export class UniqueConstraintException extends Error {
    constructor(msg = 'Conflict references id') {
        super(msg);
        this.code = ERROR_CODE.UNIQUE_CONSTAINT;
        this.status = CONFLICT;
    }
}
