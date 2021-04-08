import Joi from 'joi';
import { joiFilter } from '../../../utils';

class Validator {
    createValidation() {
        const schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            roles: Joi.array().optional(),
        });
        return joiFilter(schema);
    }
}

export const UserValidator = new Validator();
