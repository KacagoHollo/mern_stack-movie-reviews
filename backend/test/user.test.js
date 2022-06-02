require('dotenv').config();
const app = require('../app')
const mockserver = require('supertest');
const User = require('../model/user');
const { startVirtualDb, stopVirtualDb, clearUsers } = require("./util/inMemoryDb");
const jwt = require('jsonwebtoken');

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

    describe("/api/user PATCH request", () => {

        it("should return 401 without authorization", async () => {
          // given
        
          // when
          const response = await client.patch("/api/user");
    
          // then
          expect(response.statusCode).toBe(401);
        });
    
        it("should return 400 with insufficient body", async () => {
          // given      
          const user = new User({
            username: "testUser",
            providers: {
                google: "888888",
            },
            reviews: [
              {
                "username": "archie@tombacz",
                "userId": `"987654321"`,
                "movieId": "11111",
                "movieTitle": "Shining",
                "title": "Scary movie",
                "content": "Loremc3",
                "rating": 5,
              },
              {
                "username": "archie@tombacz",
                "userId": "987654321",
                "movieId": "22222",
                "movieTitle": "Shining",
                "title": "Scary movie",
                "content": "Loremc3",
                "rating": 5,
              },
              {
                "username": "archie@tombacz",
                "userId": "987654321",
                "movieId": "33333",
                "movieTitle": "Shining",
                "title": "Scary movie",
                "content": "Loremc3",
                "rating": 5,
              }
            ]     
          });
          await user.save();
    
          const token = jwt.sign({userId: user._id, username: user.username}, process.env.TOKEN_SECRET, {expiresIn:'1h'})
          client.set('authorization', token);
        
          // when
          const response = await client.patch("/api/user").send({});
    
          // then
          expect(response.statusCode).toBe(400);
        });
    
        it("should return 200 with sufficient body", async () => {
          // given
          const user = new User({
            username: "testUser",
            providers: {
                google: "888888",
            },
            reviews: [
              {
                "username": "archie@tombacz",
                "userId": `"987654321"`,
                "movieId": "11111",
                "movieTitle": "Shining",
                "title": "Scary movie",
                "content": "Loremc3",
                "rating": 5,
              },
              {
                "username": "archie@tombacz",
                "userId": "987654321",
                "movieId": "22222",
                "movieTitle": "Shining",
                "title": "Scary movie",
                "content": "Loremc3",
                "rating": 5,
              },
              {
                "username": "archie@tombacz",
                "userId": "987654321",
                "movieId": "33333",
                "movieTitle": "Shining",
                "title": "Scary movie",
                "content": "Loremc3",
                "rating": 5,
              }
            ]     
          });
          await user.save();
    
          const token = jwt.sign({userId: user._id, username: user.username}, process.env.TOKEN_SECRET, {expiresIn:'1h'})
          client.set('authorization', token);
    
          // when
          const response = await client.patch(`/api/user`).send({
            username: "mausp7"
          });
    
          // then
          expect(response.statusCode).toBe(200);
          
          const dbUser = await User.findById(user._id);
          expect(dbUser.username).toBe("mausp7");
        });
    
    });
    
});