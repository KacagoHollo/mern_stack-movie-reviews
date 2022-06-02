require('dotenv').config();
const app = require("../app");
const mockserver = require("supertest");
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
    
      // when
      const response = await client.patch("/api/review/randomId");

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
      const response = await client.patch("/api/review/randomId").send({});

      // then
      expect(response.statusCode).toBe(400);
    });

    it("should return 404 when review not found", async () => {
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
      const response = await client.patch("/api/review/21654648").send({
        content: "Very good movie."
      });

      // then
      expect(response.statusCode).toBe(404);
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
      const response = await client.patch(`/api/review/${user.reviews[1]._id}`).send({
        username: "Archie",
        movieId: "666",
        movieTitle: "The Shining Knight",
        title: "Knoght movie",
        content: "Loremc9",
        rating: "9"
      });

      // then
      expect(response.statusCode).toBe(200);
      
      const dbUser = await User.findById(user._id);
      expect(dbUser.reviews[1].movieTitle).toBe("The Shining Knight");
      expect(response.body.movieId).toBe(dbUser.reviews[1].movieId);
    });

  });
});
