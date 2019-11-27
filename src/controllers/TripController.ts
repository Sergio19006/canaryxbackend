import { Trip, mongoTrip } from "trip";
import { typesOfTrips } from "../util/typesOfTrips";
import moment from 'moment';
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

export const tripsByDate = async (date: string, tripRepository: any) => {

  if (moment(date, 'MM-DD-YYYY', true).isValid()) {
    const trips = await tripRepository.tripsByDate(date);
    if (trips.length > 0)
      return trips;
    else
      throw createError(401, "No trips actives in this Date");
  }
  else
    throw createError(401, "Error in format Date");
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

export const updateTrip = async (trip: Trip, tripRepository: any) => {
  const tripUpdated: mongoTrip = await tripRepository.updateTrip(trip);
  if (tripUpdated != null)
    return tripUpdated;
  else
    throw createError(401, "No trip id is wrong");
}


export const similarTrips = async (type: String, _id: String, tripRepository: any) => {
  const trips: mongoTrip = await tripRepository.similarTrips(type, _id);
  if (trips != null)
    return trips;
  else
    throw createError(401, "No trips similars found");
}

export const addReview = async (email: String, review: String, _id: String, tripRepository: any) => {
  const trip: mongoTrip = await tripRepository.addReview(email, review, _id);
  if (trip != null)
    return trip;
  else
    throw createError(401, "No trips similars found");
}

