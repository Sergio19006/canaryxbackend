import mongoose from "mongoose";
import { mongoTrip } from "../types/trip";

const tripSchema = new mongoose.Schema<mongoTrip>({
  transport: Boolean,
  place: String,
  type: String,
  totalPersons: Number,
  guide: String,
  lunch: Boolean,
  hour: String,
  date: String,
  reviews: Array,
  island: String,
  participants: Number,
  avgScore: Number,
  organizator: String,
  conditions: Array,
  images: Array,
  active: Boolean,
  price: Number,
  coordenates: String,
  owner: String,
  title: String
}, { collection: "Trips" });

export const tripData = mongoose.model<mongoTrip>("Trip", tripSchema);