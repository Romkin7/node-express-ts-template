import { NextFunction, Response } from 'express';
import Request from './@types/request';

interface IError {
    status: number;
    message: string;
}
function errorHandler(
    err: IError,
    _req: Request,
    res: Response,
    next: NextFunction,
) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status || 500).json({ message: err.message });
}

export default errorHandler;
