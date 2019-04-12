const express = require('express')
const app = express()
const port = 4000
const bodyParser = require("body-parser")
const monk = require('monk')

// Connection URL
const url = 'mongodb://hanshherd:hans2herd@firstcluster-shard-00-00-3kte1.mongodb.net:27017,firstcluster-shard-00-01-3kte1.mongodb.net:27017,firstcluster-shard-00-02-3kte1.mongodb.net:27017/UserForm?ssl=true&replicaSet=FirstCluster-shard-0&authSource=admin&retryWrites=true';

const db = monk(url);

db.then(() => {
  console.log('Connected correctly to server')
})

const collection = db.get("UserForm")

app.use(bodyParser.json())

app.get('/', async (req, res) => {
    const result = await collection.find({})
    return res.status(200).send(result)
})

app.get('/:id', async (req, res) => {
    const result = await collection.find(req.params.id)
    return res.status(200).send(result)
})

app.post('/', async (req, res) => {
    const result = await collection.insert(req.body)
    return res.status(200).send(result)
})

app.delete('/', async (req, res) => {
    await collection.findOneAndDelete(req.body)
    return res.status(200).send(await collection.find())
})

app.put('/:id', async (req, res) => {
    const result = await collection.findOneAndUpdate(req.params.id, req.body)
    return res.status(200).send(result)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))