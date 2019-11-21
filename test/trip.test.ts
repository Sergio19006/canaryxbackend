import request from "supertest";
import app from "../src/app";
import { typesOfTrips } from "../src/util/typesOfTrips";
import { expect } from "chai";

describe("Get trip", () => {

  it("Integration. Should return 411 status when the type is incorrect", async () => {
    return await request(app).post("/api/v1/trips/tripsByType").send({ "type": "noType" })
      .expect(411);
  });

  it("Unit. should return false if type in incorrect", async () => {
    expect(typesOfTrips("Wjdbfj")).equal(false);
  });

  it("Unit. should return true if type in correct", async () => {
    expect(typesOfTrips("Walk")).equal(true);
  });

  it("Integration. Should return 401 status when the data format is incorrect", async () => {
    return await request(app).post("/api/v1/trips/tripsByDate").send({ "date": "07/11/2019" })
      .expect(401);
  });

});


