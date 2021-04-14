import 'dotenv/config';
import express from 'express';
import { AppBundle } from './config';
import { ModuleResolver } from './api';
import { SecurityFilter } from '../packages/authModel/core/security/SecurityFilter';

const app = express();

(async () => {
    await AppBundle.builder()
        .applyAppContext(app)
        .init()
        .applyGlobalFilters([new SecurityFilter()])
        .applyResolver(ModuleResolver)
        .run();
})();

export default app;
