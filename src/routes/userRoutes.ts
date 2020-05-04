import { Router, Request, Response } from 'express';
import * as userController from "../controllers/UserController";
import * as userRepository from "../repositories/UserRepository";
import * as tripRepository from "../repositories/TripRepository";
import { check, validationResult } from "express-validator";
import { User, mongoUser } from 'user';
import { File } from '../types/trip';
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
    const { email, password } = req.body;
    const token = await userController.login(email, password, userRepository);
    res.status(200).send(token);
  }));

router.post("/signup", [
  check("email", "Email is not valid").isEmail(),
  check("password", "Password must be at least 4 characters long").isLength({ min: 4 })],
  asyncHandler(async (req: any, res: Response) => {
    const error = validationResult(req);

    if (!error.isEmpty())
      throw createError(411, "Signup was wrong");

    const user: User = req.body;
    const img: File = req.files;
    userController.signup(user, img, userRepository);
    res.status(200).send("success");
  }));

router.post("/buyTrip", [
  check("email", "Email is not valid").isEmail()],
  asyncHandler(async (req: Request, res: Response) => {
    const { email, _id, numberOfPersons } = req.body;
    const trip = await userController.buyTrip(email, _id, numberOfPersons, userRepository, tripRepository);
    return res.status(200).send(trip);
  }));

router.post("/findUser", [
  check("email", "Email is not valid").isEmail()],
  asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    const user: mongoUser = await userController.findUser(email, userRepository);
    return res.status(200).send(user);
  }));

export default router;