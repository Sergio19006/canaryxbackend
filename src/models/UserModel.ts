import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    nickname: String,
    password: String,
    businnes: Boolean,
    logo: String,
    description: String
}, { collection: "Users" });

export const User = mongoose.model("User", userSchema);
