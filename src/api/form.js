//const sendgrid = require("@sendgrid/mail")
//Your API Key from Sendgrid

const contactFormHandler = (req, res) => {
    res.status(200).json({ mytest: "testing"})
}


// const contactFormHandler = (req, res) => {
//     try {
//         sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
//         const message = {
//         //Your authorized email from SendGrid
//         from: process.env.SENDGRID_AUTHORIZED_EMAIL,
//         to: process.env.SENDGRID_TO_EMAIL,
//         cc: process.env.SENDGRID_CC_EMAIL,
//         }
//         const test = req.body["test"].trim().toLowerCase()
//         const msgToSend = `Message fom Contact Form:
// from: ${req.body["name"]}
// email: ${req.body["email"]}
// message:
// ${req.body["message"]}
// `   

//         if (test == "lion") {
//             message.subject="Message from Blog"
//             message.text = msgToSend
//             return sendgrid.send(message).then( 
//                 () => {
//                 res.status(200).json(`ok`)
//                 },
//                 error => {
//                 console.error(error)
//                 if (error.response) {
//                     return res.status(500).json({
//                         error:error.response,
//                     })
//                 }
//             })
//         }
//         else {
//             res.status(200).json(`invalid`)
//         }
//     } catch (e) {
//         const obj = {err:e};
//         res.status(200).json(obj)
//     }
// }

  module.exports = contactFormHandler