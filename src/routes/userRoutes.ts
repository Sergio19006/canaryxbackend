import { Router, Request, Response } from 'express';
import * as userController from "../controllers/UserController";
import * as userRepository from "../repositories/UserRepository";
import { check, sanitize, validationResult } from "express-validator";
import { User } from 'user';
import createError from 'http-errors';
import asyncHandler from 'express-async-handler';


const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Bienvenido a Canary Experience");
});

router.post("/login", [
  check("email", "Email is not valid").isEmail(),
  check("password", "Password must be at least 4 characters long").isLength({ min: 4 })],
  asyncHandler(async (req: Request, res: Response) => {
    const token = await userController.login(req, res, userRepository);
    res.status(200).send(token);
  }));

router.post("/signup", [
  check("email", "Email is not valid").isEmail(),
  check("password", "Password must be at least 4 characters long").isLength({ min: 4 })],
  asyncHandler(async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      throw createError(411, "Signup was wrong");
    }
    const user: User = req.body;
    userController.signup(user, userRepository);
    res.status(200).send("success");
  }));

export default router;