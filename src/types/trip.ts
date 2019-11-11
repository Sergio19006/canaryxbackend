import mongoose, { Schema, Document } from 'mongoose';

export interface Trip {
  transport: Boolean,
  place: String,
  type: String,
  totalPersons: Number,
  guide: String,
  lunch: Boolean,
  hour: String,
  date: String,
  reviews: Array<String>,
  island: String,
  participants: Number,
  avgScore: Number,
  organizator: String,
  conditions: Array<String>,
  images: Array<String>,
  active: Boolean,
  price: Number,
  coordenates: String
};

export interface mongoTrip extends Document {
  transport: Boolean,
  place: String,
  type: String,
  totalPersons: Number,
  guide: String,
  lunch: Boolean,
  hour: String,
  date: String,
  reviews: Array<String>,
  island: String,
  participants: Number,
  avgScore: Number,
  organizator: String,
  conditions: Array<String>,
  images: Array<String>,
  active: Boolean,
  price: Number,
  coordenates: String
}