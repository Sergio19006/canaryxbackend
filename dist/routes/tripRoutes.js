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
router.get("/", (req, res) => {
    //500ms
    for (let i = 0; i < 1000000000; i++) {
        let a = Math.sqrt(i);
        let b = Math.sqrt(i / 2);
        Math.sqrt(Math.pow(a * b, a) / 2);
    }
    res.status(200).send("Bienvenido a Canary Experience");
});
router.post("/", (req, res) => {
    //500ms
    for (let i = 0; i < 1000000000; i++) {
        let a = Math.sqrt(i);
        let b = Math.sqrt(i / 2);
        Math.sqrt(Math.pow(a * b, a) / 2);
    }
    res.status(200).send("Bienvenido a Canary Experience POST");
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
router.post("/tripById", express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const trip = yield tripController.tripById(id, tripRepository);
    return res.status(200).send(trip);
})));
router.post("/removeTrip", express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const trip = yield tripController.removeTrip(id, tripRepository);
    return res.status(200).send(trip);
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
    const files = req.files.img;
    const trips = yield tripController.updateTrip(trip, files, tripRepository);
    return res.status(200).send(trips);
})));
router.post("/similarTrips", express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, _id } = req.body;
    const trips = yield tripController.similarTrips(type, _id, tripRepository);
    return res.status(200).send(trips);
})));
router.post("/addReview", express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.body._id;
    const review = {
        email: req.body.email,
        rev: req.body.rev,
        id: req.body.id,
    };
    const trips = yield tripController.addReview(review, _id, tripRepository);
    return res.status(200).send(trips);
})));
router.post("/responseReview", express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.body._id;
    const id = req.body.id;
    const responseReview = {
        email: req.body.email,
        rev: req.body.rev
    };
    const trips = yield tripController.responseReview(responseReview, _id, id, tripRepository);
    return res.status(200).send(trips);
})));
router.post("/tripsByOwner", express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { owner } = req.body;
    const trips = yield tripController.tripsByOwner(owner, tripRepository);
    return res.status(200).send(trips);
})));
router.post("/findtrips", express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.body;
    const trips = yield tripController.findTrips(query, tripRepository);
    return res.status(200).send(trips);
})));
exports.default = router;
//# sourceMappingURL=tripRoutes.js.map