process.env.GOOGLE_APPLICATION_CREDENTIALS = 'Support-2000b8f5e292.json'
const readline = require('readline')
const projectId = 'support-1cf6b'
const sessionId = 'support-1cf6b-session-id'
const dialogflow = require('dialogflow')
const sessionClient = new dialogflow.SessionsClient()
const sessionPath = sessionClient.sessionPath(projectId, sessionId)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'User> '
  })

  rl.prompt()
  
  rl.on('line', line => {
  
    var userSay = line.trim()
  
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: userSay,
          languageCode: 'ja'
        }
      }
    }
  
    // Send request and log result
    sessionClient
      .detectIntent(request)
      .then(responses => {
        const result = responses[0].queryResult
        console.log(`Bot > ${result.fulfillmentText}`)
        rl.prompt()
      })
      .catch(err => {
        console.error(err)
      })
  })
  .on('close', () => {
    console.log('Havereat day!')
    process.exit(0)
  });
  