import express from 'express';
import { OK, INTERNAL_SERVER_ERROR } from 'http-status';
import { logger } from '../../core/modules/logger/winston';
import { ArgumentRequired } from './exceptions/ArgumentRequired';
import { ERROR_CODE } from '../../core/common/enum';

export class Module {
    static logger = logger;

    #prefix;

    #router = express.Router();

    static builder() {
        return new Module();
    }

    #createHandler = controller => async (request, response) => {
            try {
                const data = await controller(request);
                return response.status(OK).json({
                    status: OK,
                    data,
                });
            } catch (err) {
                Module.logger.error(err.message);
                return response.status(INTERNAL_SERVER_ERROR).json({
                    status: INTERNAL_SERVER_ERROR,
                    error: err.message,
                    code: ERROR_CODE.INTERNAL
                });
            }
        }

    addPrefix({ prefixPath = '/', tag, module }) {
        if (!module) {
            throw new ArgumentRequired('module', 'addPrefix function');
        }
        this.#prefix = {
            prefixPath,
            tag,
            module
        };
        return this;
    }

    /**
     *
     * @param {[{route, controller, method, middlewares}]} apis
     * @returns {Module}
     */
    register(apis) {
        Module.logger.info(`🌶🌶🌶 [${this.#prefix.module}] is bundling 🌶🌶🌶`);

        apis.forEach(api => {
            const {
                route, controller, method, middlewares = []
            } = api;
            this.#router[method](route, ...middlewares, this.#createHandler(controller));
            Module.logger.info(`🌶🌶🌶 [${this.#prefix.module}] ${method} ${this.#prefix.prefixPath}${route} mapped ${controller.name}`);
        });
        return this;
    }

    build(globalRoute) {
        globalRoute.use(this.#prefix.prefixPath, this.#router);
    }
}
