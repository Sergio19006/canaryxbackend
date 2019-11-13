
import { connectDatabase } from "../util/ConectionDatabase";
import { tripData } from "../models/TripModel";
import { Trip } from "../types/trip";

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
    cordenates: trip.conditions
  });
  await data.save();
}

export const TripsByType = async (type: String) => {
  connectDatabase();
  const trips = await tripData.find({ type: type });
  return trips;



}