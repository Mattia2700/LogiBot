// create express app

import express from 'express';
import {connectToDatabase} from "./config";
import router from "./src/routes/api";
const app = express();

app.use(express.json());
app.use("/", router);

// start the Express server
const port = 3000;

connectToDatabase()
    .then(() => {
      console.log("Connected to the database");
      app.listen(port, () => {
        console.log(`[server]: running at http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });

