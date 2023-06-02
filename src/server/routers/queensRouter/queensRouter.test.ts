import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectToDatabase from "../../../database/connectToDatabase.js";
import Queen from "../../../schemas/queen/queenSchema.js";
import queensMock from "../../../mocks/queensMock.js";
import statuscode from "../../response/statuscodes.js";
import { app } from "../../index.js";
import paths from "../../paths/paths.js";
import { mockTokenReal } from "../../../mocks/mocks.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

const token = mockTokenReal;

describe("Given a GET method  with the path '/queens'", () => {
  beforeAll(async () => {
    await Queen.create(queensMock);
  });
  describe("When it receives a request with an authorization header and a valid Bearer token", () => {
    test("Then it should call the response's status method with the status code 200 and a list with 2 queens", async () => {
      const expectedStatuscode = statuscode.OK;
      const response = await request(app)
        .get(`${paths.queens}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(expectedStatuscode);

      expect(response.body.queens).toHaveLength(2);
    });
  });
});
