import { Session as SessionExpress } from 'express-session';

interface Session extends SessionExpress {
    csrfSecret?: string;
}

export default Session;
