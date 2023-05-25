import request from "supertest";
import { type CustomResponse } from "./testUtils.js";
import { app } from "./index.js";

describe("Given a Get method with the path '/'", () => {
  describe("When it receives a request", () => {
    test("Then it should call the response's status method with the statuscode 200 and a json method with the message '🏓 Pong'", async () => {
      const expectedStatuscode = 200;
      const expectedMessage = "🏓 Pong";
      const response: CustomResponse = await request(app)
        .get("/")
        .expect(expectedStatuscode);

      expect(response.body.message).toStrictEqual(expectedMessage);
    });
  });
});
