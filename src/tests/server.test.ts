import request from 'supertest';
import { Server, IncomingMessage, ServerResponse } from 'http';
import app from '../app';
import {config} from 'dotenv';

config();

describe('Server Port Test', () => {
    let server:
        | undefined
        | Server<typeof IncomingMessage, typeof ServerResponse>;

    beforeAll(() => {
        server = app.listen(process.env.PORT);
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should respond with a 200 status code', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});
