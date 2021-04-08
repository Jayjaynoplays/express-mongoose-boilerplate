import Joi from 'joi';
import { joiFilter } from '../../../utils';

class Validator {
    createValidation() {
        const schema = Joi.object({
            name: Joi.string().required()
        });
        return joiFilter(schema);
    }
}

export const RoleValidator = new Validator();
