import { Request, Response } from "express";
import * as tripRepository from "../repositories/TripRepository";

export const addTrip = async (req: Request, res: Response) => {
  await tripRepository.addTrip(req.body);
}