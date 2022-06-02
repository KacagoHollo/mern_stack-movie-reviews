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

  describe("/api/revies DEL request", () => {

    it("should return 401 without authorization tokan", async () => {
      // given
      client.set('authorization', null);
    
      // when
      const response = await client.delete(`/api/review/98234ö9`);

      // then
      expect(response.statusCode).toBe(401);
    });

    it("should not delete a review if id doesn't match.", async () => {
      // given
      const user1 = new User({
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
      await user1.save();
      const user2 = new User({
        username: "testUser2",
        providers: {
            google: "888889",
        },
        reviews: [
          {
            "username": "archie@tombacz",
            "userId": "6297d79f013c12cf39268c84",
            "movieId": "12345",
            "movieTitle": "Shining",
            "title": "Scary movie",
            "content": "Loremc3",
            "rating": 5,
          },
          {
            "username": "archie@tombacz",
            "userId": "6297d79f013c12cf39268c84",
            "movieId": "23456",
            "movieTitle": "Shining",
            "title": "Scary movie",
            "content": "Loremc3",
            "rating": 5,
          },
          {
            "username": "archie@tombacz",
            "userId": "6297d79f013c12cf39268c84",
            "movieId": "34567",
            "movieTitle": "Shining",
            "title": "Scary movie",
            "content": "Loremc3",
            "rating": 5,
          }
        ]     
      });
      await user2.save();

      const token = jwt.sign({userId: user2._id, username: user2.username}, process.env.TOKEN_SECRET, {expiresIn:'1h'})
      client.set('authorization', token);
    
      // when
      const response = await client.delete(`/api/review/${user2._id}`);

      // then
      expect(response.statusCode).toBe(200);

      const user = await User.findById(user2._id);
      expect(user.reviews.length).toBe(3)
      expect(user.reviews[1].movieId).toBe("23456")

    });

    it("should delete a review if id does match.", async () => {
      // given
      const user1 = new User({
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
      await user1.save();
      const user2 = new User({
        username: "testUser2",
        providers: {
            google: "888889",
        },
        reviews: [
          {
            "username": "archie@tombacz",
            "userId": "6297d79f013c12cf39268c84",
            "movieId": "12345",
            "movieTitle": "Shining",
            "title": "Scary movie",
            "content": "Loremc3",
            "rating": 5,
          },
          {
            "username": "archie@tombacz",
            "userId": "6297d79f013c12cf39268c84",
            "movieId": "23456",
            "movieTitle": "Shining",
            "title": "Scary movie",
            "content": "Loremc3",
            "rating": 5,
          },
          {
            "username": "archie@tombacz",
            "userId": "6297d79f013c12cf39268c84",
            "movieId": "34567",
            "movieTitle": "Shining",
            "title": "Scary movie",
            "content": "Loremc3",
            "rating": 5,
          }
        ]     
      });
      await user2.save();

      const token = jwt.sign({userId: user2._id, username: user2.username}, process.env.TOKEN_SECRET, {expiresIn:'1h'})
      client.set('authorization', token);
    
      // when
      const response = await client.delete(`/api/review/${user2.reviews[1]._id}`);

      // then
      expect(response.statusCode).toBe(200);

      const user = await User.findById(user2._id);
      expect(user.reviews.length).toBe(2)
      expect(user.reviews[1].movieId).not.toBe("23456")
    });

  });
});
