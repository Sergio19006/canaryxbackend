import { Router, Request, Response } from 'express';
import * as userController from "../controllers/UserController";
import * as userRepository from "../repositories/UserRepository";
import { check, sanitize, validationResult } from "express-validator";
import { User } from 'user';


const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Bienvenido a Canary Experience");
});

router.post("/login", [
  check("email", "Email is not valid").isEmail(),
  check("password", "Password must be at least 4 characters long").isLength({ min: 4 })],
  (req: Request, res: Response) => {
    userController.login(req, res, userRepository);
  });

router.post("/signup", [
  check("email", "Email is not valid").isEmail(),
  check("password", "Password must be at least 4 characters long").isLength({ min: 4 })],
  (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(411).send(error);
    }
    const user: User = req.body;
    userController.signup(user, userRepository);
    res.status(200).send("Succesfully");

  });

export default router;