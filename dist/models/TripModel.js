"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tripSchema = new mongoose_1.default.Schema({
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
    title: String,
    description: String
}, { collection: "Trips" });
exports.tripData = mongoose_1.default.model("Trip", tripSchema);
//# sourceMappingURL=TripModel.js.map