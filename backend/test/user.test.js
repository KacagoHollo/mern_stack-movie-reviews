const app = require('../app')
const mockserver = require('supertest');
const User = require('../model/user');
const {startVirtualDb, stopVirtualDb, clearUsers} = require('./util/inMemoryDb')

describe('/api GET test', () => {
    let connection;
    let mongodb;
    let client;

    beforeAll(async () => {
        const result = await startVirtualDb();
        connection = result.connectionVirtualMongoDb;
        mongodb = result.virtualMongoDb;
    
        client = mockserver.agent(app);
    });

    afterAll(async () => await stopVirtualDb(connection, mongodb));

    afterEach(async () => await clearUsers(User));

    it('should work', async () => {
        //given
        const newUser = new User({
            username: "testUser", googleId: "testGoogle"
        });
        await newUser.save();
        
        client.set('authorization', newUser._id);
        
        //when
        const response = await client.post('/api/user/authenticate')
        
        //then
        expect(response.status).toBe(200);
    });

});
