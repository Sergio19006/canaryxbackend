import async from "async";
import crypto from "crypto";
import passport from "passport";
import { User } from "../models/User";
import { Request, Response } from "express";
import { IVerifyOptions } from "passport-local";
import { WriteError } from "mongodb";
import { check, sanitize, validationResult } from "express-validator";


export const postLogin = (req: Request, res: Response) => {
    check("email", "Email is not valid").isEmail();
    check("password", "Password cannot be blank").isLength({ min: 1 });
};

export const postSignup = (req: Request, res: Response) => {
    check("email", "Email is not valid").isEmail();
    check("password", "Password must be at least 4 characters long").isLength({ min: 4 });
    check("confirmPassword", "Passwords do not match").equals(req.body.password);
};

export const postUpdateProfile = (req: Request, res: Response) => {
    check("email", "Please enter a valid email address.").isEmail();
};

export const postUpdatePassword = (req: Request, res: Response) => {
    check("password", "Password must be at least 4 characters long").isLength({ min: 4 });
    check("confirmPassword", "Passwords do not match").equals(req.body.password);
};