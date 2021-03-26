import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

//server.mjs simply sets up a locally hosted web page where users can view  
//the tank volume. This is loading the default index.html page in the public folder.
//Which is being constantly updated by the micro:bit.
//The index.html file includes some javascript which refreshes the file every 6 seconds.
//This means you can see the updated scanned value.

const currentFolder = path.dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(express.json())

app.use('/', express.static(path.join(currentFolder, 'public')))

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000')
})