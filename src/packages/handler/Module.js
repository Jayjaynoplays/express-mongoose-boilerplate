import express from 'express';
import { OK } from 'http-status';
import { logger } from '../../core/modules/logger/winston';
import { ArgumentRequired } from './exceptions/ArgumentRequired';

export class Module {
    static logger = logger;

    #prefix;

    #router = express.Router();

    static builder() {
        return new Module();
    }

    #createHandler = controller => async (request, response, next) => {
            try {
                const data = await controller(request);
                return response.status(OK).json({
                    status: OK,
                    data,
                });
            } catch (err) {
                return next(err);
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
