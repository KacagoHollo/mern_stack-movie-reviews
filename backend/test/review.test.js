const app = require("../app");
const mockserver = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../model/user");
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

  describe("POST request with sufficient body", () => {
    /*  === */
    /* auth({ block: false }) !!! */
    /*  === */
    it("should return 404", async () => {
      // given
      client.set("authorization", "johnDoe");
      // when
      const response = await client.post("/api/review").send({
        movieId: "1234",
        content: "nice movie but too long",
        rating: 6.5,
      });
      // then
      console.log(response.body);
      expect(response.statusCode).toBe(404);
    });
  });
});
