import { CorsOptions } from 'cors';

const CORS_OPTIONS: CorsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ['Content-Type'],
};

export default CORS_OPTIONS;
