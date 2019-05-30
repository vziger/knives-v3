
const nodemailer = require('nodemailer');
const Player = require('../models/Player');


// async..await is not allowed in global scope, must use a wrapper
async function mail_results(recepient, Player) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    // host: 'smtp.yandex.ru',
    // port: 465,
    // secure: true, // true for 465, false for other ports
    auth: {
      user: 'noreply.knifethrowing', // generated ethereal user
      pass: process.env.pass,
    },
  });
  console.log('---- send results ----');
  console.log(Player);

  let str_axe = '';
  let sum = 0;
  if(Player.axe_4M.length>0){
    for(let i=0;i<11;i++){
      str_axe = str_axe + '<div class="digits">' + Player.axe_4M[i] + '</div>';
      sum = sum + parseInt(Player.axe_4M[i]);
    }
    str_axe = str_axe + '<div class="sum"><strong>' + sum + '</strong></div>';
  }
  else {
    str_axe = '—';
  }

  let str_kn3 = '';
  sum = 0;
  if(Player.knife_3M.length>0){
    for(let i=0;i<11;i++){
      str_kn3 = str_kn3 + '<div class="digits">' + Player.knife_3M[i] + '</div>';
      sum = sum + parseInt(Player.knife_3M[i]);
    }
    str_kn3 = str_kn3 + '<div class="sum"><strong>' + sum + '</strong></div>';
  }
  else {
    str_kn3 = '—';
  }

  let str_kn4 = '';
  sum = 0;
  if(Player.knife_4M.length>0){
    for(let i=0;i<11;i++){
      str_kn4 = str_kn4 + '<div class="digits">' + Player.knife_4M[i] + '</div>';
      sum = sum + parseInt(Player.knife_4M[i]);
    }
    str_kn4 = str_kn4 + '<div class="sum"><strong>' + sum + '</strong></div>';
  }
  else {
    str_kn4 = '—';
  }

  let str_kn5 = '';
  sum = 0;
  if(Player.knife_5M.length>0){
    for(let i=0;i<11;i++){
      str_kn5 = str_kn5 + '<div class="digits">' + Player.knife_5M[i] + '</div>';
      sum = sum + parseInt(Player.knife_5M[i]);
    }
    str_kn5 = str_kn5 + '<div class="sum"><strong>' + sum + '</strong></div>';
  }
  else {
    str_kn5 = '—';
  }

  let letter_body='<head>\
	<style type="text/css">\
    p{ margin-bottm:5px;}\
    .container_flex{ display: flex; justify-content: flex-start;	}\
    .digits{ width:20px; margin-top:2px; margin-right: 5px; \
            border-bottom: 1px solid rgb(200, 200, 200, 0.5);	}\
   	.label{ margin-top:2px;	width:120px; }\
  	.discipline{ padding: 2px; 	margin:5px 0 7px 0;	}\
   	.sum{ padding: 2px 8px 2px 8px;	background-color:rgb(200, 200, 200, 0.5);	}\
  </style>\
  </head>\
  <body>\
    <div style="font-family: Arial, Verdana, sans-serif;font-size:13px;padding:10px 0 0 10px;">\
    <p>Здравствуйте!</p>\
    <p>Вы отправили следующие результаты на&nbsp;онлайн-чемпионат<br/> метателей топоров и&nbsp;ножей «Метательные практики»:</p>\
	  <div class="container_flex">\
		  <div class="label">Имя</div>\
		  <div>' + Player.first_name + '</div>\
    </div> \
    <div class="container_flex">\
      <div class="label">Фамилия</div>\
      <div>' + Player.last_name + '</div>\
    </div> \
    <div class="container_flex">\
      <div class="label">Пол</div>\
      <div>' + Player.gender + '</div>\
    </div>\
    <div class="container_flex">\
      <div class="label">Клуб</div>\
      <div>' + Player.club_name + '</div>\
    </div>\
    <div class="container_flex">\
      <div class="label">Страна</div>\
      <div>' + Player.country + '</div>\
    </div>\
    <div class="container_flex">\
      <div class="label">Эл. почта:</div>\
      <div><a href="/compose?To=' + Player.email + '" rel="noopener">' + Player.email + '</a></div>\
    </div>\
    <div class="discipline">\
  		<div class="container_flex">\
  			<div class="label">Топоры, 4м </div>\
	  		<div class="container_flex">' + str_axe + '</div>\
      </div>\
      <div class="container_flex">\
        <div class="label">Ссылка на видео</div>\
        <div><a href="' + Player.videoLink_1 + 'target="_blank" rel="noopener noreferrer">' + 
                          Player.videoLink_1 + '</a></div>\
      </div>\
    </div>\
    <div class="discipline">\
  		<div class="container_flex">\
  			<div class="label">Ножи, 3м </div>\
	  		<div class="container_flex">' + str_kn3 + '</div>\
      </div>\
      <div class="container_flex">\
        <div class="label">Ссылка на видео</div>\
        <div><a href="' + Player.videoLink_2 + 'target="_blank" rel="noopener noreferrer">' + 
                          Player.videoLink_2 + '</a></div>\
      </div>\
    </div>\
    <div class="discipline">\
  		<div class="container_flex">\
  			<div class="label">Ножи, 4м </div>\
	  		<div class="container_flex">' + str_kn4 + '</div>\
      </div>\
      <div class="container_flex">\
        <div class="label">Ссылка на видео</div>\
        <div><a href="' + Player.videoLink_3 + 'target="_blank" rel="noopener noreferrer">' + 
                          Player.videoLink_3 + '</a></div>\
      </div>\
    </div>\
    <div class="discipline">\
  		<div class="container_flex">\
  			<div class="label">Ножи, 5м </div>\
	  		<div class="container_flex">' + str_kn5 + '</div>\
      </div>\
      <div class="container_flex">\
        <div class="label">Ссылка на видео</div>\
        <div><a href="' + Player.videoLink_4 + 'target="_blank" rel="noopener noreferrer">' + 
                          Player.videoLink_4 + '</a></div>\
      </div>\
    </div>\
    <p>&nbsp;</p>\
  	<p>Мы пришлём вам ссылку на&nbsp;опубликованные результаты.</p>\
	  <p>Метательные практики<br/>\
    <a href="http://knifethrowing.online" target="_blank" rel="noopener noreferrer">\
              knifethrowing.online</a></p>\
  </div>\  </body>';
      
  // // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'Онлайн-чемпионат <noreply.knifethrowing@gmail.com>', // sender address
    to: recepient, // list of receivers
    subject: 'Принятые результаты', // Subject line
    text: 'Здравствуйте!\n\n\
    Вы отправили следующие результаты на онлайн-чемпионат метателей топоров и \
    ножей «Метательные практики»: ' + Player.first_name + ' ' + Player.last_name + 
    '\n\n\ Мы пришлём вам ссылку на опубликованные результаты\n\n\
    Метательные практики\n\n\
    http://knifethrowing.online', // plain text body
  html: '<div style="font-family: Arial, Verdana, sans-serif; font-size:13px; padding:10px 0 0 10px;">\
  <p>Здравствуйте!</p>\
  <p>Вы отправили следующие результаты \
  на&nbsp;онлайн-чемпионат<br/> метателей топоров и&nbsp;ножей «Метательные практики»:</p>'
   + Player.first_name + ' ' + Player.last_name +
  '<p>Мы пришлём вам ссылку на&nbsp;опубликованные результаты</p>\
  <p>Метательные практики<br/>\
    <a href="http://knifethrowing.online">knifethrowing.online</a></p></div>'// // html body
   });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


module.exports = mail_results;
