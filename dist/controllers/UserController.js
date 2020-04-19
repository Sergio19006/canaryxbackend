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
const jsonwebtoken_1 = require("jsonwebtoken");
const http_errors_1 = __importDefault(require("http-errors"));
const buyTry_1 = require("../util/buyTry");
exports.login = (email, password, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = yield userRepository.checkPassw(email, password);
    if (isValid) {
        let token = jsonwebtoken_1.sign({ id: email }, "supersecret", {
            expiresIn: "12h"
        });
        return token;
    }
    else
        throw http_errors_1.default(411, "Login was wrong");
});
exports.signup = (user, imgObject, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (imgObject != undefined) {
        const img = imgObject['img'];
        user.logo = `/users/${img.name}`;
    }
    ;
    return yield userRepository.createUser(user);
});
exports.buyTrip = (email, _id, numberOfPersons, userRepository, tripRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield tripRepository.tripById(_id);
    if (trip != null) {
        if (buyTry_1.handleParticipants(numberOfPersons, trip)) {
            buyTry_1.sendMail(email);
        }
    }
    return "Check your email for the pdf with your entri trip.";
});
//# sourceMappingURL=UserController.js.map