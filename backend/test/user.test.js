require('dotenv').config();
const app = require('../app')
const mockserver = require('supertest');
const User = require('../model/user');
const { startVirtualDb, stopVirtualDb, clearUsers } = require("./util/inMemoryDb");

describe("requests to /api/review", () => {
    let connection;
    let server;
    let client;

    beforeAll(async () => {
        const result = await startVirtualDb();
        connection = result[0];
        server = result[1];
        client = mockserver.agent(app);
    });

    afterEach(async () => {
        await clearUsers(User);
    });

    afterAll(async () => {
        await stopVirtualDb(connection, server);
    });

    describe("/api/users/login request", () => {

        it('should respond 400 if no request body present.', async () => {
            //given
    /*         const newUser = new User({
                username: "testUser",
                providers: {
                    google: "888888",
                    },        
            });
            await newUser.save();
    */
            //when
            const response = await client.post('/api/user/login');
            
            //then
            expect(response.status).toBe(400);
        });

        it('should respond 400 if no code and provider in request body present.', async () => {
            //given

            //when
            const response = await client.post('/api/user/login').send({});
            
            //then
            expect(response.status).toBe(400);
        });

        it('should respond 401 if malformed code in request body present.', async () => {
            //given

            //when
            const response = await client.post('/api/user/login').send({code: 'asdgfg', provider: 'google'});
            
            //then
            expect(response.status).toBe(401);
        });

        it('should respond 401 if expired code in request body present.', async () => {
            //given

            //when
            const response = await client.post('/api/user/login').send({code: '4/0AX4XfWhcl9fALg0dhF8NOQlWVTTaNFrEW2ByVcR4MHt0oqIfKF3QijXww_i8GND_HzbD4g', provider: 'google'});
            
            //then
            expect(response.status).toBe(401);
        });

    });
});