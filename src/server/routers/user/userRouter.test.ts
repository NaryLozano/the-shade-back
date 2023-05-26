import "../../../loadEnvironments.js";
import request from "supertest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDataBase from "../../../database/connectToDatabase.js";
import User from "../../../database/users/users.js";
import { type UserDb } from "../../../types/types.js";
import { userCredentials, userHashpassword } from "../../../mocks/mocks.js";
import statuscode from "../../response/statuscodes.js";
import { app } from "../..";
import paths from "../../paths/paths.js";

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
