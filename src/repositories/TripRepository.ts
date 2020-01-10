import { connectDatabase } from "../util/ConectionDatabase";
import { tripData } from "../models/TripModel";
import { Trip, mongoTrip, Review, ResponseReview, Query } from "../types/trip";
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
    coordenates: trip.coordenates,
    owner: trip.owner,
    title: trip.title,
    description: trip.description,
  });
  await data.save();
}


export const tripById = async (_id: String) => {
  connectDatabase();
  const trip: mongoTrip = await tripData.findOne({ _id });
  return trip;
}

export const tripsByType = async (type: String) => {
  connectDatabase();
  const trips: Array<mongoTrip> = await tripData.find({ type});
  return trips;
}

export const tripsByPlace = async (place: String) => {
  connectDatabase();
  const trips: Array<mongoTrip> = await tripData.find({ place });
  return trips;
}

export const tripsByDate = async (date: String) => {
  connectDatabase();
  const trips: Array<mongoTrip> = await tripData.find({ date });
  return trips;
}

export const tripsByOwner = async (owner: String) => {
  connectDatabase(); 
  const trips: Array<mongoTrip> = await tripData.find({ owner });
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
  let tripUpdated: mongoTrip = await tripData.findOne({ _id: trip._id });
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

export const addReview = async (review: Review, _id: String) => {
  connectDatabase();
  let trip: mongoTrip = await tripData.findOne({ _id });
  if (trip != null) {
    trip.reviews.push(review);
    await trip.save();
  }
  return trip;
}

export const responseReview = async (responseReview: ResponseReview, _id: String, id: String) => {
  connectDatabase();
  let trip: mongoTrip = await tripData.findOne({ _id });
  if (trip != null) {
    for (let review of trip.reviews) {

    }

    let reviewAdded;
    trip.reviews.forEach((review, index) => {
      review = JSON.parse(review.toString());
      if (review.id == id) {
        trip.reviews.splice(index, 1);
        const response: ResponseReview = {
          email: responseReview.email,
          rev: responseReview.rev,
        }
        review.response = response;
        reviewAdded = review;
      }
    });

    trip.reviews.push(reviewAdded);
    await trip.save();
    return trip;
  }
}

export const findTrips = async (query: Query) => {
  connectDatabase();
  //Esto no esta terminado
  if(query.place == null && query.date != undefined){
    let trips: mongoTrip[] = await tripData.find({date: query.date});
    return trips;
  }
  if(query.place != null && query.date != undefined){
    let trips: mongoTrip[] = await tripData.find({ place: query.place, date: query.date});
    return trips;
  }
  let trips: mongoTrip[] = await tripData.find({});
  return trips;
}


