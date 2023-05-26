import "../loadEnvironments.js";
import request from "supertest";
import { type CustomResponse } from "../types/testUtils.js";
import { app } from "./index.js";
import statuscode from "./response/statuscodes.js";
import messages from "./response/messages.js";
import paths from "./paths/paths.js";

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
