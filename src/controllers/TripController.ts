import async from "async";
import crypto from "crypto";
import passport from "passport";
import { User } from "../models/User";
import { Request, Response } from "express";
import { IVerifyOptions } from "passport-local";
import { WriteError } from "mongodb";
import { check, sanitize, validationResult } from "express-validator";
import * as tripRepository from "../repositories/TripRepository";

export const addTrip = async () => {
  await tripRepository.addTrip();

}