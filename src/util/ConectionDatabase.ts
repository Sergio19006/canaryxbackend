import mongoose from "mongoose";

export const connectDatabase = () => {

  let uri = "mongodb+srv://sergio:vkz41ITyig2g1D8v@clustercanaryxperience-mbdzt.mongodb.net/test?retryWrites=true&w=majority";
  mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err)
      console.log(err)
  });
  mongoose.set('useCreateIndex', true);
  mongoose.set("useFindAndModify", false);
}