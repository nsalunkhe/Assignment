const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 6060;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ success: "Api is Running" });
});

// MongoDb connection
require("./database/db");

// routes
const apiRoutes = require("./routes/apiRoute");
app.use("/", apiRoutes);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`PORT Yes I am connected`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
