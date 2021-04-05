// @ts-check
import * as express from 'express';
import methodOverride from 'method-override';
import cors from 'cors';
import { logger } from '../modules/logger/winston';
import { DatabaseInstance } from './database';

export class AppBundle {
    static logger = logger;

    static builder() {
        AppBundle.logger.info('🌶🌶🌶 App is starting bundling 🌶🌶🌶');
        return new AppBundle();
    }

    /**
     * @param {import("express-serve-static-core").Express} app
     */
    applyAppContext(app) {
        this.app = app;
        return this;
    }

    /**
     * @param {import('../../packages/handler/HandlerResolver')} resolver
     */
    applyResolver(resolver) {
        this.app.use(resolver);
        return this;
    }

    /**
     * Default config
     */
    init() {
        /**
         * Setup basic express
         */
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        /**
         * Setup method override method to use PUT, PATCH,...
         */
        this.app.use(methodOverride('X-HTTP-Method-Override'));
        this.app.use(
            methodOverride(req => {
                if (req.body && typeof req.body === 'object' && '_method' in req.body) {
                    const method = req.body._method;
                    delete req.body._method;

                    return method;
                }

                return undefined;
            }),
        );
        AppBundle.logger.info('🌶🌶🌶 Building initial config 🌶🌶🌶');

        return this;
    }

    /*
    Setup asynchronous config here
     */
    async run() {
        AppBundle.logger.info('🌶🌶🌶 Building asynchronous config 🌶🌶🌶');
        await DatabaseInstance.connect();
    }
}
