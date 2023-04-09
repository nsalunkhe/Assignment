const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://niranjan:mongo@cluster0.dexachz.mongodb.net/mern_database?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`MongoDB connection successfull.`);
  })
  .catch((error) => console.log(error, `MongoDB connection Failed.`));
