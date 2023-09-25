const sendgrid = require("@sendgrid/mail")
//Your API Key from Sendgrid
sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
const message = {
  //Your authorized email from SendGrid
  from: process.env.SENDGRID_AUTHORIZED_EMAIL,
  to: process.env.SENDGRID_TO_EMAIL,
  cc: process.env.SENDGRID_CC_EMAIL,
}

exports.handler =  async (event, context, callback) => {
  console.log("entering")
    const data = JSON.parse(event.body)
    
    const test = data["test"].trim().toLowerCase()
    console.log(`data`,data)
    const msgToSend = `Message fom Contact Form:
    from: ${data["name"]}
    email: ${data["email"]}
    message: ${data["message"]}
`   

    if (test == "lion") {
        message.subject="Message from Blog"
        message.text = msgToSend

        try{
            await sgMail.send(mail_to_send)
        
            return {
              statusCode: 200,
              body: "OK"
            }
          } catch(e){
            return {
              statusCode: e.code,
              body: e.message
            }
          }
    }
    else {
        return {
            statusCode: 200,
            body: "invalid"
          }
    }
  }

