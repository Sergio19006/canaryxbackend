import { Trip, mongoTrip } from '../types/trip'


export const updateObjectsTrips = (oldTrip: mongoTrip, newTrip: Trip) => {

  oldTrip.transport = newTrip.transport;
  oldTrip.images = newTrip.images;
  oldTrip.active = newTrip.active;
  oldTrip.place = newTrip.place;
  oldTrip.type = newTrip.type;
  oldTrip.totalPersons = newTrip.totalPersons;
  oldTrip.guide = newTrip.guide;
  oldTrip.lunch = newTrip.lunch;
  oldTrip.hour = newTrip.hour;
  oldTrip.date = newTrip.date;
  oldTrip.reviews = newTrip.reviews;
  oldTrip.island = newTrip.island;
  oldTrip.participants = newTrip.participants || 0;
  oldTrip.avgScore = newTrip.avgScore;
  oldTrip.conditions = newTrip.conditions.toString().split(',');
  oldTrip.price = newTrip.price;
  oldTrip.coordenates = newTrip.coordenates;
  oldTrip.description = newTrip.description;
  oldTrip.title = newTrip.title;
  return oldTrip;
}

export const removeTrip = (trips: Array<mongoTrip>, _id: String) => {
  trips.forEach((trip, index) => {
    if (trip._id.toString() == _id.toString())
      trips.splice(index, 1);
  });
  return trips;
}