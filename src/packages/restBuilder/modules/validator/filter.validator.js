import { LengthValidator } from './length.validator';
import { FilterSignValidator } from './sign.validator';

export class FilterValidator {
    listValidator = [];

    constructor() {
        this.listValidator.push(
            new LengthValidator(3, 'Filter format is not valid')
        );
        this.listValidator.push(new FilterSignValidator());
    }

    validate(obj: string[]): void {
        this.listValidator.forEach(item => {
            item.validate(obj);
        });
    }
}
