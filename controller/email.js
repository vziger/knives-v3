
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function mail(recepient) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Yandex',
    // host: 'smtp.yandex.ru',
    // port: 465,
    // secure: true, // true for 465, false for other ports
    auth: {
      user: 'noreply-knifethrowing', // generated ethereal user
      pass: process.env.pass,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Метательные практики" <noreply-knifethrowing@yandex.ru>', // sender address
    to: recepient, // list of receivers
    subject: 'Метательные практики', // Subject line
    text: 'Спасибо, что подписались на наши новости!', // plain text body
    html: '<h3> Спасибо, что подписались на наши новости!<h3>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


module.exports = mail;
