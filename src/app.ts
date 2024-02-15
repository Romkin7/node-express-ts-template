// npm packages
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import cors from 'cors';
import MongoStore from 'connect-mongo';
// Local files
import CORS_OPTIONS from './config/corsOptions';
import COOKIE from './config/cookie';
import errorHandler from './errorHandler';
// routes
import authRoutes from './routes/auth.routes';
import rolesRoutes from './routes/roles.routes';

const app = express();

const SESSION_SECRET = process.env.SESSION_SECRET;
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(CORS_OPTIONS));
app.set('trust proxy', 1); // trust first proxy
/* Set session and cookie to res.cookie() */
const cookie = new COOKIE({
    secure: process.env.ENV === 'production' ? true : false,
}).getCookie();
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: process?.env?.DB_URI
            ? MongoStore.create({ mongoUrl: process.env.DB_URI })
            : undefined,
        cookie,
    }),
);

// use routes
app.use(rolesRoutes);
app.use(authRoutes);

app.get('*', (_req, res) => {
    return res.status(200).send('hello world');
});

app.use(errorHandler);

export default app;
