"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.postLogin = (req, res) => {
    express_validator_1.check("email", "Email is not valid").isEmail();
    express_validator_1.check("password", "Password cannot be blank").isLength({ min: 1 });
};
exports.postSignup = (req, res) => {
    express_validator_1.check("email", "Email is not valid").isEmail();
    express_validator_1.check("password", "Password must be at least 4 characters long").isLength({ min: 4 });
    express_validator_1.check("confirmPassword", "Passwords do not match").equals(req.body.password);
};
exports.postUpdateProfile = (req, res) => {
    express_validator_1.check("email", "Please enter a valid email address.").isEmail();
};
exports.postUpdatePassword = (req, res) => {
    express_validator_1.check("password", "Password must be at least 4 characters long").isLength({ min: 4 });
    express_validator_1.check("confirmPassword", "Passwords do not match").equals(req.body.password);
};
//# sourceMappingURL=user.js.map