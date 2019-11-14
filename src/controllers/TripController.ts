import { Trip } from "trip";
import { typesOfTrips } from "../util/typesOfTrips";
import createError from 'http-errors';


export const addTrip = async (trip: Trip, tripRepository: any) => {
  return await tripRepository.addTrip(trip);
}

export const TripsByType = async (type: String, tripRepository: any) => {

  if (typesOfTrips(type)) {
    const trips = await tripRepository.TripsByType(type);
    if (trips != undefined)
      return trips
    else
      return "";
  }
  throw createError(411, "Type was wrong");
}