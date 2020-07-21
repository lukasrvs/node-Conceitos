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

routes.put('/beers/update/:id', (request, response) => {
    const { id } = request.params
    const {name , category, alcohol} = request.body

    const beerIndex = beers.findIndex( b => b.id == id)

    if(beerIndex < 0) {
        return response.status(400).json({ error: 'Beer not found'})
    }

    const beer = {
        id,
        name,
        category,
        alcohol
    }

    beers[beerIndex] = beer

    return response.json(beer)
})

routes.delete('/beers/delete/:id', (request,response) =>{
    const { id } = request.params

    const beerIndex = beers.findIndex( b => b.id == id)

    if(beerIndex < 0) {
        return response.status(400).json({ error: 'Beer not found'})
    }

    beers.splice(beerIndex, 1)

    return response.status(204).send()
})
module.exports = routes