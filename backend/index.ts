// create express app

import express from 'express';
import {connectToDatabase} from "./config";
import router from "./src/routes/api";
import cors from "cors";

const app = express();

app.use(express.json());
app.use("/", enableCors, router);

function enableCors(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
}

// start the Express server
const port = 3000;

connectToDatabase()
    .then(() => {
      console.log("Connected to the database");
      app.listen(port, () => {
        console.log(`[server]: running at http://localhost:${port}`);
      });
    })
    // .then(async () => {
    //     console.log("fetching all suppliers");
    //     await populateSuppliers();
    // })
    .catch((err) => {
      console.log(err);
    });

