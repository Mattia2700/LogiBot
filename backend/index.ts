// create express app

import express from 'express';

const app = express();

// define a route handler for the default home page
app.get('/', (req: any, res: any) => {
  res.send('Hello world!!!!');
});

// start the Express server
const port = 3000;

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});