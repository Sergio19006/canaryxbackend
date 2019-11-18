import { Router, Request, Response } from 'express';
import * as tripController from "../controllers/TripController";
import * as tripRepository from "../repositories/TripRepository";
import { Trip } from 'trip';
import asyncHandler from 'express-async-handler';

const router = Router();

router.get("/", (res: Response) => {
  res.status(200).send("Bienvenido a Canary Experience");
});

router.post("/addTrip", asyncHandler(async (req: Request, res: Response) => {
  const trip: Trip = req.body;
  await tripController.addTrip(trip, tripRepository);
  res.status(200).send("success");
}));

router.post("/tripByType", asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.body;
  const trips = await tripController.tripsByType(type, tripRepository);
  return res.status(200).send(trips);
}));

router.post("/tripByPlace", asyncHandler(async (req: Request, res: Response) => {
  const { place } = req.body;
  const trips = await tripController.tripsByPlace(place, tripRepository);
  return res.status(200).send(trips);
}));

router.post("/activateTrip", asyncHandler(async (req: Request, res: Response) => {
  const { _id } = req.body;
  const trips = await tripController.activateTrip(_id, tripRepository);
  return res.status(200).send(trips);
}));

export default router;