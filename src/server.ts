import express, { urlencoded } from 'express'
import cors from 'cors'
import fs from 'fs'
import 'dotenv/config'
import https from 'https'
import http from 'http'
import router from './routes/routes'

//CONFIGS
const serverPort:number = process.env.PORT ? parseInt(process.env.PORT) : 9000

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//ROUTES
app.use('/', router)

////////////////
const runServer = (port:number, server: http.Server) => {
    server.listen(port, ()=>{
        console.log(`Server rodando na ${port}`)
    })
}

const regularServer = http.createServer(app)

if(process.env.NODE_ENV == 'production'){
    const options = {
        key: fs.readFileSync(process.env.SSL_KEY as string),
        cert: fs.readFileSync(process.env.SSL_CERT as string)
    }

    const secServer = https.createServer(options, app)
    runServer(80, regularServer)
    runServer(443, secServer)
}
else {
    runServer(serverPort, regularServer)
}