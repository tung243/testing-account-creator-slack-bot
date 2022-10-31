const bodyParser = require('body-parser');
const menu1 = require('./elements/menu1.json')
const globals = require('./globals')
const keys = require('./keys')
const cors = require('cors')

module.exports.listenForCommands = async function (app) {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cors())

  app.post('/slack/commands', (req, res) => {
    const { token, user_id, channel_id } = req.body
    console.log(`Received a slash command from user ${user_id} in channel ${channel_id}`)

    if (token !== process.env.SLACK_VERIF_TOKEN) {
      console.log('Invalid token')
      return
    }

    if (globals.lock_status == keys.LOCKED && globals.last_access_user == user_id) {
      respond_text = 'You have submitted the request. Please wait...'
      res.status(200).send({ text: respond_text })
    } else if (globals.lock_status == keys.LOCKED) {
      respond_text = 'Someone is in use. Please try few minutes later.'
      res.status(200).send({ text: respond_text })
    } else {
      res.status(200).send(menu1)
    }
  })
}