require('dotenv').config();
const app = require('../app')
const mockserver = require('supertest');
const User = require('../model/user');
const {startVirtualDb, stopVirtualDb, clearUsers} = require('./util/inMemoryDb')
const jwt = require('jsonwebtoken');

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

/*  NEM JÓ, így nem lehet logint tesztelni, mert nincs google code.   
    it('should work', async () => {
        //given
        const newUser = new User({
            username: "testUser",
            providers: {
                google: "888888",
                },        
        });
        await newUser.save();
        console.log(newUser)
        
        const token = jwt.sign({_id: newUser._id, username: newUser.username}, process.env.TOKEN_SECRET, {expiresIn:'1h'})
        client.set('authorization', token);
        
        //when
        const response = await client.post('/api/user/login')
        
        //then
        expect(response.status).toBe(200);
    });
 */
});
