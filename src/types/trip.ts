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
  reviews: Array<Review>,
  island: String,
  participants: Number,
  avgScore: Number,
  organizator: String,
  conditions: Array<String>,
  images: Array<String>,
  active: Boolean,
  price: Number,
  coordenates: String,
  owner: String,
  title: String
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
  reviews: Array<Review>,
  island: String,
  participants: Number,
  avgScore: Number,
  organizator: String,
  conditions: Array<String>,
  images: Array<String>,
  active: Boolean,
  price: Number,
  coordenates: String,
  owner: String,
  title: String
}

export interface Review {
  email: String,
  id: String,
  rev: String,
  response?: ResponseReview
}

export interface ResponseReview {
  email: String,
  rev: String,
}

export interface File {
  name: String,
    data: Buffer,
    size: Number,
    encoding: String,
    tempFilePath: String,
    truncated: Boolean,
    mimetype: String,
    md5: String,
    mv: Function
  }