const { createMessageAdapter } = require('@slack/interactive-messages')
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET
const slackInteractions = createMessageAdapter(slackSigningSecret)
const respondToRadioButtons = require('./respondToRadioButtons')

module.exports.listenForInteractions = function (app) {
  app.use('/slack/interactions', slackInteractions.requestListener())
}

slackInteractions.action({ type: 'radio_buttons' }, (payload, respond) => {
  console.log("already select radion button.....")
  respondToRadioButtons.respond(payload, respond)
})