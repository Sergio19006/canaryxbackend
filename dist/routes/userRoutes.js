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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController = __importStar(require("../controllers/UserController"));
const userRepository = __importStar(require("../repositories/UserRepository"));
const tripRepository = __importStar(require("../repositories/TripRepository"));
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = express_1.Router();
router.get("/", (req, res) => {
    res.status(200).send("Bienvenido a Canary Experience");
});
router.post("/login", [
    express_validator_1.check("email", "Email is not valid").isEmail(),
    express_validator_1.check("password", "Password must be at least 4 characters long").isLength({ min: 4 })
], express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const token = yield userController.login(email, password, userRepository);
    res.status(200).send(token);
})));
router.post("/signup", [
    express_validator_1.check("email", "Email is not valid").isEmail(),
    express_validator_1.check("password", "Password must be at least 4 characters long").isLength({ min: 4 })
], express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = express_validator_1.validationResult(req);
    if (!error.isEmpty())
        throw http_errors_1.default(411, "Signup was wrong");
    const user = req.body;
    const img = req.files;
    userController.signup(user, img, userRepository);
    res.status(200).send("success");
})));
router.post("/buyTrip", [
    express_validator_1.check("email", "Email is not valid").isEmail()
], express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, _id, numbersOfPersons } = req.body;
    const trip = yield userController.buyTrip(email, _id, numbersOfPersons, userRepository, tripRepository);
    return res.status(200).send(trip);
})));
exports.default = router;
//# sourceMappingURL=userRoutes.js.map