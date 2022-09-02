
import  app from './server'
import env from "./env";

const port = process.env.PORT ?? 8080;


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
