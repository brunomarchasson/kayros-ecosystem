import express from 'express'
 import {setupLogging}from "./logging";
 import routes from './routes';
 import authRoutes from './authRoutes';

const app = express()

 setupLogging(app);

app.use(express.json({ limit: "1024mb" }));
app.use('/api', routes);
app.use('/auth', authRoutes);
app.get('/hello', (req, resp) => {
    return resp.send('HELLO WORLD FROM API!');
})
app.use((err, req, res, next) => {
  console.error("ERROR FROM MM")
  console.error("ERROR FROM MM")
  console.error("ERROR FROM MM")
  console.error("ERROR FROM MM")
  console.error("ERROR FROM MM")
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
export default app

