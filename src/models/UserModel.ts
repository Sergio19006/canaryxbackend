import mongoose from "mongoose";
import { User, mongoUser } from "../types/user";

const userSchema = new mongoose.Schema<mongoUser>({
    email: { type: String, unique: true },
    nickname: String,
    password: String,
    businnes: Boolean,
    logo: String,
    description: String
}, { collection: "Users" });

export const userData = mongoose.model<mongoUser>("User", userSchema);
