import { Router, Request, Response } from 'express';
import * as tripController from "../controllers/TripController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Bienvenido a Canary Experience");
});

router.post("/addTrip", async (req: Request, res: Response) => {
  await tripController.addTrip(req, res);
  res.status(200).send("Ingresao con éxito");
});

export default router;