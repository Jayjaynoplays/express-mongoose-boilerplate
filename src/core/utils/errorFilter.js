import { BAD_REQUEST } from 'http-status';
import { ERROR_CODE } from '../common/enum';

const joiMappingErrorMessages = e => e.details.map(detail => detail.message);

export const joiFilter = schema => async (req, res, next) => {
    const validationResult = await schema.validate(req.body);

    return validationResult.error
        ? res.status(BAD_REQUEST).json({
            status: BAD_REQUEST,
            code: ERROR_CODE.BAD_REQUEST,
            message: joiMappingErrorMessages(validationResult.error)
        })
        : next();
    };
