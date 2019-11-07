import { connectDatabase } from "../util/ConectionDatabase";
import { User } from "../models/UserModel";


export const createUser = async (data: any) => {
  connectDatabase();
  const user = new User({
    email: data.email,
    nickname: data.nickname,
    password: data.password,
    businnes: data.businnes,
    logo: data.logo,
    description: data.description
  })
  await user.save();

}