"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true },
    nickname: String,
    password: String,
    business: Boolean,
    logo: String,
    description: String
}, { collection: "Users" });
exports.userData = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=UserModel.js.map