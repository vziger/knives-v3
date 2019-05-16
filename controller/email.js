
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
    from: 'Онлайн-чемпионат <noreply-knifethrowing@yandex.ru>', // sender address
    to: recepient, // list of receivers
    subject: 'Подписка на Метательные практики', // Subject line
    text: 'Здравствуйте!\n\n\
    Вы подписались на рассылку онлайн-чемпионата метателей топоров и ножей &laquo;Метательные практики&raquo;.\n\
    Мы сообщим вам о&nbsp;старте нового этапа, пришлём ссылку для регистрации и&nbsp;расскажем о&nbsp;победителях.\n\n\
    Второй этап пройдёт с&nbsp;20&nbsp;мая по 2&nbsp;июня.\n\n\
    Метательные практики\n\
    http://knifethrowing.online', // plain text body
    html: '<div style="font-family: Arial, Verdana, sans-serif; font-size:13px; padding:10px 0 0 10px;">\
    <p>Здравствуйте!</p>\
    <p>Вы подписались на&nbsp;рассылку онлайн-чемпионата метателей топоров и&nbsp;ножей &laquo;Метательные практики&raquo;. <br/>Мы сообщим вам о&nbsp;старте нового этапа, пришлём ссылку для регистрации и&nbsp;расскажем о&nbsp;победителях. </p>\
    <p>Второй этап пройдёт с&nbsp;20&nbsp;мая по 2&nbsp;июня. </p>\
    <p>Метательные практики<br/>\
    <a href="http://knifethrowing.online">knifethrowing.online</a></p></div>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


module.exports = mail;
