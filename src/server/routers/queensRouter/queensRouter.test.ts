import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectToDatabase from "../../../database/connectToDatabase.js";
import Queen from "../../../schemas/queen/queenSchema.js";
import { queensMock } from "../../../mocks/queensMock.js";
import statuscode from "../../response/statuscodes.js";
import { app } from "../../index.js";
import paths from "../../paths/paths.js";
import { mockTokenReal } from "../../../mocks/mocks.js";
import { queensMockToDelete } from "../../../mocks/queensMock.js";

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

describe("Given a DELETE method with the path '/queens/id'", () => {
  beforeAll(async () => {
    await Queen.create(queensMockToDelete);
  });
  describe("When it receives a request with an authorization header and a queen id to delete", () => {
    test("Then it should delete the queen of the list and call the response's status method with the statuscode 200", async () => {
      const expectedStatus = statuscode.OK;
      const idQueen = queensMockToDelete[0]._id;
      const response = await request(app)
        .delete(`${paths.queens}/${idQueen}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(expectedStatus);

      expect(response.statusCode).toStrictEqual(expectedStatus);
    });
  });
});

describe("Given a POST method with the path '/queens/add'", () => {
  describe("When it receives a request with and authorization header and a new queen", () => {
    test("Then it should add the new queen to the list and call the response's status method with the statuscode 201", async () => {
      const expectedStatus = statuscode.created;
      const newQueen = {
        name: "Nilse",
        age: 30,
        rank: "5th",
        season: 14,
        hometown: "vic, catalunya",
        image:
          "https://cdn.discordapp.com/attachments/1114903849455587408/1116669811976572979/download.jpeg",
        user: "647b6699d481019ce94a021d",
        id: "6482fa4a47f795cd8cc1ffe7",
      };

      const response = await request(app)
        .post(`${paths.queens}${paths.add}`)
        .set("Authorization", `Bearer ${token}`)
        .send(newQueen)
        .expect(expectedStatus);

      expect(response.statusCode).toStrictEqual(expectedStatus);
    });
  });
});
