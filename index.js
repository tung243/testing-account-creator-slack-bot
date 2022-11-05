if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const express = require('express')
const port = process.env.PORT
const app = express()
const interactions = require('./interactions')
const slashCommand = require('./slashCommand')
const pipeline_hook = require('./pipeline_hook')

app.use(express.static('public'));
interactions.listenForInteractions(app)
slashCommand.listenForCommands(app)
pipeline_hook.listenForBuilds(app)
app.listen(port, function () {
    console.log(`Now Listening on ${port}`)
})