import { Request as RequestExpress } from 'express';
import Session from './session';

type Request = RequestExpress & { session: Session };

export default Request;
