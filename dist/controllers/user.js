"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const User_1 = require("../models/User");
const express_validator_1 = require("express-validator");
/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = (req, res, next) => {
    express_validator_1.check("email", "Email is not valid").isEmail();
    express_validator_1.check("password", "Password cannot be blank").isLength({ min: 1 });
    // eslint-disable-next-line @typescript-eslint/camelcase
    express_validator_1.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/login");
    }
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash("errors", { msg: info.message });
            return res.redirect("/login");
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", { msg: "Success! You are logged in." });
            res.redirect(req.session.returnTo || "/");
        });
    })(req, res, next);
};
exports.postSignup = (req, res, next) => {
    express_validator_1.check("email", "Email is not valid").isEmail();
    express_validator_1.check("password", "Password must be at least 4 characters long").isLength({ min: 4 });
    express_validator_1.check("confirmPassword", "Passwords do not match").equals(req.body.password);
    // eslint-disable-next-line @typescript-eslint/camelcase
    express_validator_1.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/signup");
    }
    const user = new User_1.User({
        email: req.body.email,
        password: req.body.password
    });
    User_1.User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            req.flash("errors", { msg: "Account with that email address already exists." });
            return res.redirect("/signup");
        }
        user.save((err) => {
            if (err) {
                return next(err);
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.redirect("/");
            });
        });
    });
};
/**
 * POST /account/profile
 * Update profile information.
 */
exports.postUpdateProfile = (req, res, next) => {
    express_validator_1.check("email", "Please enter a valid email address.").isEmail();
    // eslint-disable-next-line @typescript-eslint/camelcase
    express_validator_1.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/account");
    }
    const user = req.user;
    User_1.User.findById(user.id, (err, user) => {
        if (err) {
            return next(err);
        }
        user.email = req.body.email || "";
        user.profile.name = req.body.name || "";
        user.profile.gender = req.body.gender || "";
        user.profile.location = req.body.location || "";
        user.profile.website = req.body.website || "";
        user.save((err) => {
            if (err) {
                if (err.code === 11000) {
                    req.flash("errors", { msg: "The email address you have entered is already associated with an account." });
                    return res.redirect("/account");
                }
                return next(err);
            }
            req.flash("success", { msg: "Profile information has been updated." });
            res.redirect("/account");
        });
    });
};
/**
 * POST /account/password
 * Update current password.
 */
exports.postUpdatePassword = (req, res, next) => {
    express_validator_1.check("password", "Password must be at least 4 characters long").isLength({ min: 4 });
    express_validator_1.check("confirmPassword", "Passwords do not match").equals(req.body.password);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/account");
    }
    const user = req.user;
    User_1.User.findById(user.id, (err, user) => {
        if (err) {
            return next(err);
        }
        user.password = req.body.password;
        user.save((err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", { msg: "Password has been changed." });
            res.redirect("/account");
        });
    });
};
//# sourceMappingURL=user.js.map