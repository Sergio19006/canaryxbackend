"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConectionDatabase_1 = require("../util/ConectionDatabase");
const TripModel_1 = require("../models/TripModel");
const utilTrips_1 = require("../util/utilTrips");
exports.addTrip = (trip) => __awaiter(void 0, void 0, void 0, function* () {
    ConectionDatabase_1.connectDatabase();
    const data = new TripModel_1.tripData({
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
        coordenates: trip.coordenates || "holi",
        owner: trip.owner,
        title: trip.title,
        description: trip.description
    });
    yield data.save();
});
exports.tripById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    ConectionDatabase_1.connectDatabase();
    const trip = yield TripModel_1.tripData.findOne({ _id });
    return trip;
});
exports.tripsByType = (type) => __awaiter(void 0, void 0, void 0, function* () {
    ConectionDatabase_1.connectDatabase();
    const trips = yield TripModel_1.tripData.find({ type: type });
    return trips;
});
exports.tripsByPlace = (place) => __awaiter(void 0, void 0, void 0, function* () {
    ConectionDatabase_1.connectDatabase();
    const trips = yield TripModel_1.tripData.find({ place, active: true });
    return trips;
});
exports.tripsByDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    ConectionDatabase_1.connectDatabase();
    const trips = yield TripModel_1.tripData.find({ date, active: true });
    return trips;
});
exports.activateTrip = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    ConectionDatabase_1.connectDatabase();
    const trip = yield TripModel_1.tripData.findOne({ _id });
    if (trip != null) {
        trip.active = true;
        yield trip.save();
    }
    return trip;
});
exports.updateTrip = (trip) => __awaiter(void 0, void 0, void 0, function* () {
    ConectionDatabase_1.connectDatabase();
    let tripUpdated = yield TripModel_1.tripData.findOne({ title: trip.title });
    if (tripUpdated != null) {
        tripUpdated = utilTrips_1.updateObjectsTrips(tripUpdated, trip);
        yield tripUpdated.save();
    }
    return tripUpdated;
});
exports.similarTrips = (type, _id) => __awaiter(void 0, void 0, void 0, function* () {
    ConectionDatabase_1.connectDatabase();
    let trips = yield TripModel_1.tripData.find({ type: type, });
    let tripsToEliminate = yield TripModel_1.tripData.findOne({ _id });
    trips = utilTrips_1.removeTrip(trips, tripsToEliminate._id);
    return trips;
});
exports.addReview = (review, _id) => __awaiter(void 0, void 0, void 0, function* () {
    ConectionDatabase_1.connectDatabase();
    let trip = yield TripModel_1.tripData.findOne({ _id });
    if (trip != null) {
        trip.reviews.push(review);
        yield trip.save();
    }
    return trip;
});
exports.responseReview = (responseReview, _id, id) => __awaiter(void 0, void 0, void 0, function* () {
    ConectionDatabase_1.connectDatabase();
    let trip = yield TripModel_1.tripData.findOne({ _id });
    if (trip != null) {
        for (let review of trip.reviews) {
        }
        let reviewAdded;
        trip.reviews.forEach((review, index) => {
            review = JSON.parse(review.toString());
            if (review.id == id) {
                trip.reviews.splice(index, 1);
                const response = {
                    email: responseReview.email,
                    rev: responseReview.rev,
                };
                review.response = response;
                reviewAdded = review;
            }
        });
        trip.reviews.push(reviewAdded);
        yield trip.save();
        return trip;
    }
});
//# sourceMappingURL=TripRepository.js.map