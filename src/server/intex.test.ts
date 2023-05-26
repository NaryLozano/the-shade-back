import request from "supertest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { type CustomResponse } from "./testUtils.js";
import { app } from "./index.js";
import statuscode from "../server/response/statuscodes.js";
import messages from "./response/messages.js";
import paths from "./paths/paths.js";
import connectToDataBase from "../database/connectToDatabase.js";
import User from "../database/users/users.js";
import { type UserDb } from "../types/types.js";
import { userCredentials, userHashpassword } from "../mocks/mocks.js";

describe("Given a Get method with the path '/'", () => {
  describe("When it receives a request", () => {
    test("Then it should call the response's status method with the statuscode 200 and a json method with the message '🏓 Pong'", async () => {
      const expectedStatuscode = statuscode.OK;
      const expectedMessage = messages.pong;
      const response: CustomResponse = await request(app)
        .get(paths.root)
        .expect(expectedStatuscode);

      expect(response.body.message).toStrictEqual(expectedMessage);
    });
  });
});

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDataBase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a Post method with the path 'user/login'", () => {
  describe("When it receives a request with valid credentials", () => {
    let newUser: UserDb;

    beforeAll(async () => {
      newUser = await User.create(userHashpassword);
    });
    test("Then it should call the response's status method with the status code 200 and a json method with a token", async () => {
      const expectedStatuscode = statuscode.OK;
      const response: { body: { token: string } } = await request(app)
        .post(`${paths.user}${paths.login}`)
        .send(userCredentials)
        .expect(expectedStatuscode);

      const payload = jwt.verify(response.body.token, process.env.JWT_SECRET!);

      const userId = payload.sub as string;

      expect(userId).toBe(newUser._id.toString());
    });
  });
});
