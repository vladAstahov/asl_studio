import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import compression from 'express-compression'
import bodyParser from "express";

import { sendOrder } from './bot/index.js'

const app = express()
const port = 3000
const urlencodedParser = express.urlencoded({extended: false});

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(compression())
app.use(express.static(path.join(__dirname, 'dist')))
app.use(bodyParser.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.post('/', async (req, res) => {
    if (!req.body) return res.sendStatus(400)
    console.log(req.body)
    await sendOrder(req.body)
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
