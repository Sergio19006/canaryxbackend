"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController = __importStar(require("../controllers/UserController"));
const userRepository = __importStar(require("../repositories/UserRepository"));
const express_validator_1 = require("express-validator");
const router = express_1.Router();
router.get("/", (req, res) => {
    res.status(200).send("Bienvenido a Canary Experience");
});
router.post("/login", [
    express_validator_1.check("email", "Email is not valid").isEmail(),
    express_validator_1.check("password", "Password must be at least 4 characters long").isLength({ min: 4 })
], (req, res) => {
    userController.login(req, res, userRepository);
});
router.post("/signup", [
    express_validator_1.check("email", "Email is not valid").isEmail(),
    express_validator_1.check("password", "Password must be at least 4 characters long").isLength({ min: 4 })
], (req, res) => {
    const error = express_validator_1.validationResult(req);
    if (!error.isEmpty()) {
        return res.status(411).send(error);
    }
    const user = req.body;
    userController.signup(user, userRepository);
    res.status(200).send("Succesfully");
});
exports.default = router;
//# sourceMappingURL=userRoutes.js.map