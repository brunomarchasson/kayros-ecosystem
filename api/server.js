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

export default app

