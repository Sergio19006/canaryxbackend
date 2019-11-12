import { Router, Request, Response } from 'express';
import * as tripController from "../controllers/TripController";
import * as tripRepository from "../repositories/TripRepository";
import { Trip } from 'trip';

const router = Router();

router.get("/", (res: Response) => {
  res.status(200).send("Bienvenido a Canary Experience");
});

router.post("/addTrip", async (req: Request, res: Response) => {
  const trip: Trip = req.body;
  await tripController.addTrip(trip, tripRepository);
  res.status(200).send("Ingresado con éxito");
});

router.post("/trip", async (req: Request, res: Response) => {
  const type: String = req.body.type;
  const trips = await tripController.TripsByType(type, tripRepository);
  if (trips == "error")
    return res.status(411).send("error con el type");
  return res.status(200).send(trips);
});


export default router;