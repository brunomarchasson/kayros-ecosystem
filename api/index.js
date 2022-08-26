import express from 'express'
import {setupLogging}from "./logging";
import { db, handleError } from "./core";
import routes from './routes';

import env from "./env";

const app = express()
const port = process.env.PORT ?? 8080;

setupLogging(app);

// Enable body parsing middleware
// http://expressjs.com/en/api.html#express.json
app.use(express.json({ limit: "1024mb" }));

// OAuth 2.0 authentication endpoints and user sessions
// app.use(auth);

app.use('/api', routes);
app.get('/hello', (req, resp) => {
    return resp.send('HELLO WORLD FROM API!');
})

// app.get("*", function () {
//   throw new NotFound();
// });

// app.use(handleError);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
