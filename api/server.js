import express from 'express'
import cors from 'cors'
 import {setupLogging}from "./logging";
 import routes from './routes';
 import authRoutes from './authRoutes';

const app = express()

 setupLogging(app);

 app.use(cors())
app.use(express.json({ limit: "1024mb" }));
app.use('/api', routes);
app.use('/auth', authRoutes);
app.get('/hello', (req, resp) => {
    return resp.send('HELLO WORLD FROM API!');
})
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Something broke!')
})
export default app

