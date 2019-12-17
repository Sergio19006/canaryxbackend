import mongoose from "mongoose";
import { mongoUser } from "../types/user";

const userSchema = new mongoose.Schema<mongoUser>({
    email: { type: String, unique: true },
    nickname: String,
    password: String,
    business: Boolean,
    logo: String,
    description: String
}, { collection: "Users" });

export const userData = mongoose.model<mongoUser>("User", userSchema);
