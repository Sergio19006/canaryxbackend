import { hashSync, compare } from "bcrypt";
import { connectDatabase } from "../util/ConectionDatabase";
import { userData } from "../models/UserModel";
import { User, mongoUser } from "../types/user";
const saltRounds = 10;


export const createUser = async (user: User) => {
  connectDatabase();
  const encriptPass = hashSync(user.password, saltRounds);
  const data = new userData({
    email: user.email,
    nickname: user.nickname || "",
    password: encriptPass,
    businnes: user.businnes || false,
    logo: user.logo || "",
    description: user.description || ""
  });

  try {
    await data.save();
    return "success";
  } catch (err) {
    console.log("createUser", err);
  }
}

export const checkPassw = async (email: String, password: String) => {
  connectDatabase();
  const user: mongoUser = await userData.findOne({ email });
  if (user == undefined)
    return false;
  return await compare(password, user.password);
}