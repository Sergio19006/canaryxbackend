import mongoose from "mongoose";

export const connectDatabase = () => {
  let uri = "mongodb://localhost:27017/CanaryX";
  mongoose.connect(uri, { useNewUrlParser: true });
  mongoose.set("useFindAndModify", false);
}