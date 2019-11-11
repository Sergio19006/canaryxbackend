import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
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
  coordenates: String
}, { collection: "Trips" });

export const tripData = mongoose.model("Trip", tripSchema);