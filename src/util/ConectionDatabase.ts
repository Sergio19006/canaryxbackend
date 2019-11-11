import mongoose from "mongoose";


export const connectDatabase = () => {
  let uri = "mongodb://localhost:27017/CanaryX";
  mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
  mongoose.set('useCreateIndex', true);
  mongoose.set("useFindAndModify", false);
}