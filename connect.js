const mongoose= require("mongoose");
mongoose.set("strictQuery", true);
// const url="mongodb+srv://data:dinesh@atlascluster.jwuyykx.mongodb.net/urlshortner";
 function connecttomongodb(url) {
  console.log(url)
    return mongoose.connect(url);
  }
  
  module.exports = {
    connecttomongodb,
  };