
import  app from './server'
import env from "./env";

const port = process.env.API_PORT ?? 8850;


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
