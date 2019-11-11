import request from "supertest";
import app from "../src/app";
import { expect } from "chai";
import { signup } from "../src/controllers/UserController";
import * as Repository from "./testRepository/testRepository";
import { User } from "../src/types/user";

describe("Add new user", () => {

  it("Should return 411 status when the email is incorrect", async () => {
    return await request(app).post("/api/v1/users/signup").send({ "email": "Sermail.com", "password": "23swh" })
      .expect(411);
  });

  it("Should insert the user when the email is correct", async () => {
    const user: User = {
      "email": "Ser@gmail.com", "password": "23swh",
      "nickname": "", "businnes": false, "logo": "", "description": ""
    }

    const response = await signup(user, Repository);
    expect(response).equal("success");
  });

})

