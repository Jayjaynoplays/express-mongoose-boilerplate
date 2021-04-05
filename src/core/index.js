import 'dotenv/config';
import express from 'express';
import { AppBundle } from './config';
import { ModuleResolver } from './api';

const app = express();

(async () => {
    await AppBundle.builder()
        .applyAppContext(app)
        .init()
        .applyResolver(ModuleResolver)
        .run();
})();

export default app;
