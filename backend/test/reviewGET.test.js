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

  describe("/api/revies GET request", () => {

    it("should return all the reviews without authorization", async () => {
      // given
      const user1 = new User({
        username: "testUser",
        providers: {
            google: "888888",
        },
        reviews: [
          {
            movieId: "1234",
            content: "nice movie but too long",
            rating: 6.5,
          },
          {
            movieId: "4321",
            content: "bit short",
            rating: 8.5,
          },
          {
            movieId: "9876",
            content: "just about right",
            rating: 9.5,
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
            movieId: "5555",
            content: "nice movie but too long",
            rating: 6.5,
          },
          {
            movieId: "7777",
            content: "bit short",
            rating: 8.5,
          },
          {
            movieId: "6666",
            content: "just about right",
            rating: 9.5,
          }
        ]     
      });
      await user2.save();
    
      // when
      const response = await client.get("/api/review");

      // then
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(6)
    });

    it("should return user's reviews with authorization", async () => {
      // given
      const user1 = new User({
        username: "testUser",
        providers: {
            google: "888888",
        },
        reviews: [
          {
            movieId: "1234",
            content: "nice movie but too long",
            rating: 6.5,
          },
          {
            movieId: "4321",
            content: "bit short",
            rating: 8.5,
          },
          {
            movieId: "9876",
            content: "just about right",
            rating: 9.5,
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
            movieId: "5555",
            content: "nice movie but too long",
            rating: 6.5,
          },
          {
            movieId: "7777",
            content: "bit short",
            rating: 8.5,
          },
          {
            movieId: "6666",
            content: "just about right",
            rating: 9.5,
          }
        ]     
      });
      await user2.save();

      const token = jwt.sign({userId: user1._id, username: user1.username}, process.env.TOKEN_SECRET, {expiresIn:'1h'})
      client.set('authorization', token);
    
      // when
      const response = await client.get("/api/review");

      // then
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(3)
      expect(response.body[0].movieId).toBe("1234")
    });

    it("should return only reviewer's reviews when querried", async () => {
      // given
      const user1 = new User({
        username: "testUser",
        providers: {
            google: "888888",
        },
        reviews: [
          {
            movieId: "1234",
            content: "nice movie but too long",
            rating: 6.5,
          },
          {
            movieId: "4321",
            content: "bit short",
            rating: 8.5,
          },
          {
            movieId: "9876",
            content: "just about right",
            rating: 9.5,
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
            movieId: "5555",
            content: "nice movie but too long",
            rating: 6.5,
          },
          {
            movieId: "7777",
            content: "bit short",
            rating: 8.5,
          },
          {
            movieId: "6666",
            content: "just about right",
            rating: 9.5,
          }
        ]     
      });
      await user2.save();

      client.set('authorization', null);
    
      // when
      const response = await client.get(`/api/review?reviewerId=${user2.id}`);

      // then
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(3)
      expect(response.body[0].movieId).toBe("5555")
    });

    it("should return empty Array when no movie with matching movieId when querried", async () => {
      // given
      const user1 = new User({
        username: "testUser",
        providers: {
            google: "888888",
        },
        reviews: [
          {
            movieId: "1234",
            content: "nice movie but too long",
            rating: 6.5,
          },
          {
            movieId: "4321",
            content: "bit short",
            rating: 8.5,
          },
          {
            movieId: "9876",
            content: "just about right",
            rating: 9.5,
          }
        ]     
      });
      await user1.save();

      client.set('authorization', null);
    
      // when
      const response = await client.get(`/api/review?movieId=invalidId`);

      // then
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(0)
      expect(response.body).toStrictEqual([])
    });

    it("should return only one movie with matching movieId when querried", async () => {
      // given
      const user1 = new User({
        username: "testUser",
        providers: {
            google: "888888",
        },
        reviews: [
          {
            movieId: "1234",
            content: "nice movie but too long",
            rating: 6.5,
          },
          {
            movieId: "4321",
            content: "bit short",
            rating: 8.5,
          },
          {
            movieId: "9876",
            content: "just about right",
            rating: 9.5,
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
            movieId: "5555",
            content: "nice movie but too long",
            rating: 6.5,
          },
          {
            movieId: "7777",
            content: "bit short",
            rating: 8.5,
          },
          {
            movieId: "6666",
            content: "just about right",
            rating: 9.5,
          }
        ]     
      });
      await user2.save();

      client.set('authorization', null);
    
      // when
      const response = await client.get(`/api/review?movieId=${user2.reviews[1].movieId}`);

      // then
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1)
      expect(response.body[0].movieId).toBe("7777")
    });

  });
});
