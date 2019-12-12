import { Router, Request, Response } from 'express';
import * as tripController from "../controllers/TripController";
import * as tripRepository from "../repositories/TripRepository";
import { Trip, Review, ResponseReview, File } from "trip";

import asyncHandler from 'express-async-handler';

const router = Router();

router.get("/", (req:Request, res: Response) => {
  res.status(200).send("Bienvenido a Canary Experience");
});

router.post("/addTrip", asyncHandler(async (req: any, res: Response) => {
  const trip: Trip = req.body;
  const files: File[] = req.files.img;
  await tripController.addTrip(trip, tripRepository, files);
  res.status(200).send("success");
}));

router.post("/tripsByType", asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.body;
  const trips = await tripController.tripsByType(type, tripRepository);
  return res.status(200).send(trips);
}));

router.post("/tripsByPlace", asyncHandler(async (req: Request, res: Response) => {
  const { place } = req.body;
  const trips = await tripController.tripsByPlace(place, tripRepository);
  return res.status(200).send(trips);
}));

router.post("/tripsByDate", asyncHandler(async (req: Request, res: Response) => {
  const { date } = req.body;
  const trips = await tripController.tripsByDate(date, tripRepository);
  return res.status(200).send(trips);
}));

router.post("/activateTrip", asyncHandler(async (req: Request, res: Response) => {
  const { _id } = req.body;
  const trips = await tripController.activateTrip(_id, tripRepository);
  return res.status(200).send(trips);
}));

router.post("/updateTrip", asyncHandler(async (req: Request, res: Response) => {
  const trip: Trip = req.body;
  const trips = await tripController.updateTrip(trip, tripRepository);
  return res.status(200).send(trips);
}));

router.post("/similarTrips", asyncHandler(async (req: Request, res: Response) => {
  const { type, _id } = req.body;
  const trips = await tripController.similarTrips(type, _id, tripRepository);
  return res.status(200).send(trips);
}));

router.post("/addReview", asyncHandler(async (req: Request, res: Response) => {

  const _id = req.body._id;
  const review: Review = {
    email: req.body.email,
    rev: req.body.rev,
    id: req.body.id,
  };
  const trips = await tripController.addReview(review, _id, tripRepository);
  return res.status(200).send(trips);
}));

router.post("/responseReview", asyncHandler(async (req: Request, res: Response) => {

  const _id = req.body._id;
  const id = req.body.id;
  const responseReview: ResponseReview = {
    email: req.body.email,
    rev: req.body.rev
  };
  const trips = await tripController.responseReview(responseReview, _id, id, tripRepository);
  return res.status(200).send(trips);
}));

export default router;