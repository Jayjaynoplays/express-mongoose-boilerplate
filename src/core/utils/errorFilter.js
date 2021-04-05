import { ERROR_CODE } from '../common/enum';

export const responseError = schema => async (req, res, next) => {
        const value = await schema.validate(req.body);
        return value.error
            ? res.status(400).json({
                status: 400,
                error: ERROR_CODE.BAD_REQUEST,
                message: value.error
            })
            : next();
    };
