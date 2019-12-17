"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const ConectionDatabase_1 = require("../util/ConectionDatabase");
const UserModel_1 = require("../models/UserModel");
const http_errors_1 = __importDefault(require("http-errors"));
const saltRounds = 10;
exports.createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    ConectionDatabase_1.connectDatabase();
    const encriptPass = bcrypt_1.hashSync(user.password, saltRounds);
    console.log(user);
    const data = new UserModel_1.userData({
        email: user.email,
        nickname: user.nickname || "",
        password: encriptPass,
        business: Boolean(user.business) || false,
        logo: user.logo || "",
        description: user.description || ""
    });
    console.log(data);
    try {
        yield data.save();
        return "success";
    }
    catch (err) {
        throw http_errors_1.default(411, "CreateUser was wrong");
    }
});
exports.checkPassw = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    ConectionDatabase_1.connectDatabase();
    const user = yield UserModel_1.userData.findOne({ email });
    if (user == undefined)
        return false;
    return yield bcrypt_1.compare(password, user.password);
});
//# sourceMappingURL=UserRepository.js.map