require('dotenv').config();
const app = require("../app");
const mockserver = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../model/user");
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

  describe("/api/revies POST request", () => {

    it("should return 401 without authorization", async () => {
      // given
      const user = new User({
        username: "testUser",
        providers: {
            google: "888888",
        },        
      });
      await user.save();
    
      // when
      const response = await client.post("/api/review").send({
        movieId: "1234",
        content: "nice movie but too long",
        rating: 6.5,
      });

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
      });
      await user.save();
      
      const token = jwt.sign({_id: user._id, username: user.username}, process.env.TOKEN_SECRET, {expiresIn:'1h'})
      client.set('authorization', token);
    
      // when
      const response = await client.post("/api/review").send({
        movieId: "1234",
        rating: 6.5,
      });

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
      });
      await user.save();
      
      const token = jwt.sign({_id: user._id, username: user.username}, process.env.TOKEN_SECRET, {expiresIn:'1h'})
      client.set('authorization', token);
    
      // when
      const response = await client.post("/api/review").send({
        movieId: "1234",
        content: "nice movie but too long",
        rating: 6.5,
      });

      // then
      expect(response.statusCode).toBe(200);

      const dbUser = await User.findById(user._id);
      expect(dbUser.reviews[0].movieId).toBe("1234");
      expect(response.body.movieId).toBe(dbUser.reviews[0].movieId);
    });

  });
});
