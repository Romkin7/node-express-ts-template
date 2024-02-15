import { NextFunction, Response } from 'express';
import CSRF from 'secure-csrf';
import Request from '../@types/request';

async function generateCSRFSecret(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const csrf = new CSRF();
        const secret = await csrf.secret();
        req.session.csrfSecret = secret;
        next();
    } catch (error) {
        return next(error);
    }
}

export default generateCSRFSecret;
