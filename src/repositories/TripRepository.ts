
import { connectDatabase } from "../util/ConectionDatabase";
import { Trip } from "../models/TripModel"

export const addTrip = async () => {
  connectDatabase();
  const data = new Trip({
    transport: true,
    place: "El teide",
    type: "Walk",
    totalPersons: 3,
    guide: "Sergio",
    lunch: true,
    hour: "10:00",
    date: "2019-10-20",
    reviews: ["nothing here"],
    island: "Tenerife",
    participants: 2,
    avgScore: 0,
    organizator: "TUI",
    conditions: ["Conditions"],
    images: ["http://"],
    active: true,
    price: 3,
  });
  await data.save();
}