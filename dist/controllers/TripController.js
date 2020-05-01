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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typesOfTrips_1 = require("../util/typesOfTrips");
const moment_1 = __importDefault(require("moment"));
const http_errors_1 = __importDefault(require("http-errors"));
exports.addTrip = (trip, tripRepository) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tripRepository.addTrip(trip);
});
exports.tripsByType = (type, tripRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (typesOfTrips_1.typesOfTrips(type)) {
        const trips = yield tripRepository.tripsByType(type);
        if (trips != undefined)
            return trips;
        else
            return "";
    }
    throw http_errors_1.default(411, "Type was wrong");
});
exports.tripById = (id, tripRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const trips = yield tripRepository.tripById(id);
    if (trips != undefined)
        return trips;
    throw http_errors_1.default(411, "Id was wrong");
});
exports.tripsByPlace = (place, tripRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const trips = yield tripRepository.tripsByPlace(place);
    if (trips.length > 0)
        return trips;
    else
        throw http_errors_1.default(401, "No trips actives in this place");
});
exports.tripsByDate = (date, tripRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (moment_1.default(date, "YYYY-MM-DD", true).isValid()) {
        const trips = yield tripRepository.tripsByDate(date);
        if (trips.length > 0)
            return trips;
        else
            throw http_errors_1.default(401, "No trips actives in this Date");
    }
    else
        throw http_errors_1.default(401, "Error in format Date");
});
exports.tripsByOwner = (owner, tripRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const trips = yield tripRepository.tripsByOwner(owner);
    if (trips.length > 0)
        return trips;
    else
        throw http_errors_1.default(401, "No trips actives for this owner");
});
exports.activateTrip = (_id, tripRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (_id.length == 24) {
        const trip = yield tripRepository.activateTrip(_id);
        if (trip != null)
            return trip;
        else
            throw http_errors_1.default(401, "No trip id is wrong");
    }
    else
        throw http_errors_1.default(401, "No trip id is wrong");
});
exports.updateTrip = (trip, imageFiles, tripRepository) => __awaiter(void 0, void 0, void 0, function* () {
    trip.images = [];
    for (const img of imageFiles) {
        trip.images.push(`${process.env.PHOTO_SERVICE}/trips/${img.name}`);
    }
    const tripUpdated = yield tripRepository.updateTrip(trip);
    if (tripUpdated != null)
        return tripUpdated;
    else
        throw http_errors_1.default(401, "No trip id is wrong");
});
exports.similarTrips = (type, _id, tripRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const trips = yield tripRepository.similarTrips(type, _id);
    if (trips != null)
        return trips;
    else
        throw http_errors_1.default(401, "No trips similars found");
});
exports.addReview = (review, _id, tripRepository) => __awaiter(void 0, void 0, void 0, function* () {
    review.id =
        "_" +
            Math.random()
                .toString(36)
                .substr(2, 9)
                .toString();
    const trip = yield tripRepository.addReview(review, _id);
    if (trip != null)
        return trip;
    else
        throw http_errors_1.default(401, "No trips similars found");
});
exports.responseReview = (responseReview, _id, id, tripRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield tripRepository.responseReview(responseReview, _id, id);
    if (trip != null)
        return trip;
    else
        throw http_errors_1.default(401, "No trip found");
});
exports.findTrips = (query, tripRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const trips = yield tripRepository.findTrips(query);
    if (trips != null)
        return trips;
    else
        throw http_errors_1.default(401, "No trip found");
});
//# sourceMappingURL=TripController.js.map