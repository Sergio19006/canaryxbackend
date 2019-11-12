import request from "supertest";
import app from "../src/app";
import { expect } from "chai";

describe("Add new user", () => {

  it("Should return 411 status when the type is incorrect is incorrect", async () => {
    return await request(app).post("/api/v1/trips/trip").send({ "type": "noType" })
      .expect(411);
  });
});