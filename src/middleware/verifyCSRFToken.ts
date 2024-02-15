import { NextFunction, Response } from 'express';
import Request from '../@types/request';
import CSRF from 'secure-csrf';

function verifyCSRFToken(req: Request, res: Response, next: NextFunction) {
    const secret = req.session.csrfSecret;
    const token = req.body.csrfToken;
    const csrf = new CSRF();
    const isValid = csrf.verify(secret, token);
    if (!isValid) {
        return next({ status: 403, message: 'Invalid or expired token.' });
    } else {
        return next();
    }
}

export default verifyCSRFToken;
