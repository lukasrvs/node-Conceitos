const express = require('express')
const cors = require('cors')
const {uuid} = require('uuidv4')

const routes = express()

routes.use(express.json())
routes.use(cors())

const beers = []

routes.get('/beers/list', (request, response) =>{
    return response.json(beers)
})

routes.post('/beers/create',(request, response) =>{
    const { name, category, alcohol } = request.body

    const beer = {id: uuid(), name, category, alcohol};

    beers.push(beer)

    return response.json(beer)
})

module.exports = routes