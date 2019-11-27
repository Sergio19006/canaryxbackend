import { connectDatabase } from "../util/ConectionDatabase";
import { tripData } from "../models/TripModel";
import { Trip, mongoTrip } from "../types/trip";
import { updateObjectsTrips, removeTrip } from '../util/utilTrips';


export const addTrip = async (trip: Trip) => {
  connectDatabase();
  const data = new tripData({
    transport: trip.transport,
    place: trip.place,
    type: trip.type || "",
    totalPersons: trip.totalPersons,
    guide: trip.guide,
    lunch: trip.lunch,
    hour: trip.hour,
    date: trip.date,
    reviews: trip.reviews,
    island: trip.island,
    participants: trip.participants,
    avgScore: trip.avgScore,
    organizator: trip.organizator,
    conditions: trip.conditions,
    images: trip.images,
    active: trip.active,
    price: trip.price,
    cordenates: trip.conditions,
    owner: trip.owner,
    title: trip.title
  });
  await data.save();
}


export const tripsByType = async (type: String) => {
  connectDatabase();
  const trips: Array<mongoTrip> = await tripData.find({ type: type });
  return trips;
}

export const tripsByPlace = async (place: String) => {
  connectDatabase();
  const trips: Array<mongoTrip> = await tripData.find({ place, active: true });
  return trips;
}

export const tripsByDate = async (date: String) => {
  connectDatabase();
  const trips: Array<mongoTrip> = await tripData.find({ date, active: true });
  return trips;
}

export const activateTrip = async (_id: String) => {
  connectDatabase();
  const trip: mongoTrip = await tripData.findOne({ _id });
  if (trip != null) {
    trip.active = true;
    await trip.save();
  }
  return trip;
}

export const updateTrip = async (trip: Trip) => {
  connectDatabase();
  let tripUpdated: mongoTrip = await tripData.findOne({ title: trip.title });
  if (tripUpdated != null) {
    tripUpdated = updateObjectsTrips(tripUpdated, trip);
    await tripUpdated.save();
  }
  return tripUpdated;
}

export const similarTrips = async (type: String, _id: String) => {
  connectDatabase();
  let trips: mongoTrip[] = await tripData.find({ type: type, });
  let tripsToEliminate: mongoTrip = await tripData.findOne({ _id });
  trips = removeTrip(trips, tripsToEliminate._id);
  return trips;
}

export const addReview = async (email: String, review: String, _id: String) => {
  connectDatabase();
  let trip: mongoTrip = await tripData.findOne({ _id });
  if (trip != null) {
    const rev = JSON.stringify({ email, review });
    trip.reviews.push(rev);
    await trip.save();
  }
  return trip;
}

export const tripById = async (_id: String) => {
  connectDatabase();
  const trip: mongoTrip = await tripData.findOne({ _id });
  return trip;
}



