import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import {usersRouter} from "./src/api/users/users.route";
import {elevatorsRouter} from "./src/api/elevators/elevators.route";

// instantiate the express app:
const app = express();

// add helpful middlewares:
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// connect to DB and expose the API:
mongoose
  .connect(MONGODB_URI!)
  .then(() => {
    // successful connection to DB
    console.log("successfully conntected to DB!");

    app.use("/auth", usersRouter);
    app.use("/elevators", elevatorsRouter);

    app.listen(PORT, () => {
      console.log(`server running at PORT ${PORT}`);
    });
  })
  .catch((err) => console.log(" ** ERROR ** ", err));
