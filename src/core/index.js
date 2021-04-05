import 'dotenv/config';
import express from 'express';
import { AppBundle } from './config';

const app = express();

(async () => {
    await AppBundle.builder()
        .applyAppContext(app)
        .init()
        .run();
})();

export default app;
