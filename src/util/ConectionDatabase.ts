import mongoose from "mongoose";

export const connectDatabase = () => {

  let uri = "mongodb+srv://sergio:@clustercanaryxperience-mbdzt.mongodb.net/test?retryWrites=true&w=majority";
  mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    console.log(err)
  });
  mongoose.set('useCreateIndex', true);
  mongoose.set("useFindAndModify", false);
}