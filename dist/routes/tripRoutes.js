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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tripController = __importStar(require("../controllers/TripController"));
const tripRepository = __importStar(require("../repositories/TripRepository"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = express_1.Router();
router.get("/", (res) => {
    res.status(200).send("Bienvenido a Canary Experience");
});
router.post("/addTrip", express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = req.body;
    yield tripController.addTrip(trip, tripRepository);
    res.status(200).send("success");
})));
router.post("/tripsByType", express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.body;
    const trips = yield tripController.tripsByType(type, tripRepository);
    return res.status(200).send(trips);
})));
router.post("/tripsByPlace", express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { place } = req.body;
    const trips = yield tripController.tripsByPlace(place, tripRepository);
    return res.status(200).send(trips);
})));
router.post("/tripsByDate", express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.body;
    const trips = yield tripController.tripsByDate(date, tripRepository);
    return res.status(200).send(trips);
})));
router.post("/activateTrip", express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    const trips = yield tripController.activateTrip(_id, tripRepository);
    return res.status(200).send(trips);
})));
router.post("/updateTrip", express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = req.body;
    const trips = yield tripController.updateTrip(trip, tripRepository);
    return res.status(200).send(trips);
})));
router.post("/similarTrips", express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, _id } = req.body;
    const trips = yield tripController.similarTrips(type, _id, tripRepository);
    return res.status(200).send(trips);
})));
exports.default = router;
//# sourceMappingURL=tripRoutes.js.map