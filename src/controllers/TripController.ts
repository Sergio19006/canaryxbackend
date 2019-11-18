import { Trip } from "trip";
import { typesOfTrips } from "../util/typesOfTrips";
import createError from 'http-errors';


export const addTrip = async (trip: Trip, tripRepository: any) => {
  return await tripRepository.addTrip(trip);
}

export const tripsByType = async (type: String, tripRepository: any) => {
  if (typesOfTrips(type)) {
    const trips = await tripRepository.tripsByType(type);
    if (trips != undefined)
      return trips
    else
      return "";
  }
  throw createError(411, "Type was wrong");
}

export const tripsByPlace = async (place: String, tripRepository: any) => {
  const trips = await tripRepository.tripsByPlace(place);
  if (trips.length > 0)
    return trips;
  else
    throw createError(401, "No trips actives in this place");
}

export const activateTrip = async (_id: String, tripRepository: any) => {
  if (_id.length == 24) {
    const trip = await tripRepository.activateTrip(_id);
    if (trip != null)
      return trip;
    else
      throw createError(401, "No trip id is wrong");
  }
  else
    throw createError(401, "No trip id is wrong");
}
