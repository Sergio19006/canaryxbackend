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
        cordenates: trip.conditions,
        owner: trip.owner,
        title: trip.title
    });
    yield data.save();
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
//# sourceMappingURL=TripRepository.js.map