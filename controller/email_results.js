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

  let str_axe = digitsToHTML(Player.axe_4M);
  let str_kn3 = digitsToHTML(Player.knife_3M);
  let str_kn4 = digitsToHTML(Player.knife_4M);
  let str_kn5 = digitsToHTML(Player.knife_5M);

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


  let letter_body_2='<div style="font-family: Arial, Verdana, sans-serif;font-size:13px;padding:10px 0 0 10px;">\
    <p style="margin-bottm:5px;">Здравствуйте!</p>\
    <p style="margin-bottm:5px;">Вы отправили следующие результаты для участия в онлайн-чемпионате\
      <br/> метателей топоров и&nbsp;ножей «Метательные практики»:</p>\
	  <div style = "display: flex; justify-content: flex-start;">\
		  <div style="margin-top:2px;	width:120px;">Имя</div>\
		  <div>' + capitalizeFirstLetter(Player.first_name) + '</div>\
    </div>\
    <div style = "display: flex; justify-content: flex-start;">\
      <div style="margin-top:2px;	width:120px;">Фамилия</div>\
      <div>' + capitalizeFirstLetter(Player.last_name) + '</div>\
    </div>\
    <div style = "display: flex; justify-content: flex-start;">\
      <div style="margin-top:2px;	width:120px;">Пол</div>\
      <div>' + Player.gender + '</div>\
    </div>\
    <div style = "display: flex; justify-content: flex-start;">\
      <div style="margin-top:2px;	width:120px;">Клуб</div>\
      <div>' + capitalizeFirstLetter(Player.club_name) + '</div>\
    </div>\
    <div style = "display: flex; justify-content: flex-start;">\
      <div style="margin-top:2px;	width:120px;">Страна</div>\
      <div>' + capitalizeFirstLetter(Player.country) + '</div>\
    </div>\
    <div style = "display: flex; justify-content: flex-start;">\
      <div style="margin-top:2px;	width:120px;">Эл. почта:</div>\
      <div><a href="/compose?To=' + Player.email + '" rel="noopener">' + Player.email + '</a></div>\
    </div>\
    <div style="padding: 2px; 	margin:5px 0 7px 0;">\
  		<div style = "display: flex; justify-content: flex-start;">\
  			<div style="margin-top:2px;	width:120px;">Топоры, 4м </div>\
	  		<div style = "display: flex; justify-content: flex-start;">' + str_axe + '</div>\
      </div>\
      <div style = "display: flex; justify-content: flex-start;">\
        <div style="margin-top:2px;	width:120px;">Ссылка на видео</div>\
        <div><a href="' + Player.videoLink_1 + 'target="_blank" rel="noopener noreferrer">' + 
                          Player.videoLink_1 + '</a></div>\
      </div>\
    </div>\
    <div style="padding: 2px; 	margin:5px 0 7px 0;">\
  		<div style = "display: flex; justify-content: flex-start;">\
  			<div style="margin-top:2px;	width:120px;">Ножи, 3м </div>\
	  		<div style = "display: flex; justify-content: flex-start;">' + str_kn3 + '</div>\
      </div>\
      <div style = "display: flex; justify-content: flex-start;">\
        <div style="margin-top:2px;	width:120px;">Ссылка на видео</div>\
        <div><a href="' + Player.videoLink_2 + 'target="_blank" rel="noopener noreferrer">' + 
                          Player.videoLink_2 + '</a></div>\
      </div>\
    </div>\
    <div style="padding: 2px; 	margin:5px 0 7px 0;">\
  		<div style = "display: flex; justify-content: flex-start;">\
  			<div style="margin-top:2px;	width:120px;">Ножи, 4м </div>\
	  		<div style = "display: flex; justify-content: flex-start;">' + str_kn4 + '</div>\
      </div>\
      <div style = "display: flex; justify-content: flex-start;">\
        <div style="margin-top:2px;	width:120px;">Ссылка на видео</div>\
        <div><a href="' + Player.videoLink_3 + 'target="_blank" rel="noopener noreferrer">' + 
                          Player.videoLink_3 + '</a></div>\
      </div>\
    </div>\
    <div style="padding: 2px; 	margin:5px 0 7px 0;">\
  		<div style = "display: flex; justify-content: flex-start;">\
  			<div style="margin-top:2px;	width:120px;">Ножи, 5м </div>\
	  		<div style = "display: flex; justify-content: flex-start;">' + str_kn5 + '</div>\
      </div>\
      <div style = "display: flex; justify-content: flex-start;">\
        <div style="margin-top:2px;	width:120px;">Ссылка на видео</div>\
        <div><a href="' + Player.videoLink_4 + 'target="_blank" rel="noopener noreferrer">' + 
                          Player.videoLink_4 + '</a></div>\
      </div>\
    </div>\
    <p style="margin-bottm:5px;">&nbsp;</p>\
  	<p style="margin-bottm:5px;">Мы сообщим вам о победителях этапа и пришлём ссылку на турнирную таблицу.</p>\
	  <p style="margin-bottm:5px;">Метательные практики<br/>\
    <a href="http://knifethrowing.online" target="_blank" rel="noopener noreferrer">\
              knifethrowing.online</a></p>\
  </div>';


  // // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'Метательные практики <noreply.knifethrowing@gmail.com>', // sender address
    to: recepient, // list of receivers
    subject: 'Результаты приняты', // Subject line
    text: `Здравствуйте!\n\n\
    Вы отправили следующие результаты для участия в онлайн-чемпионате метателей топоров и \
    ножей «Метательные практики»: \n\n Имя ${Player.first_name} \n\n\ 
    Фамилия ${Player.last_name} \n\n\ Пол ${Player.gender} \n\n Клуб ${Player.club_name} \n\n\
    Страна ${Player.country} \n\n\ Эл. почта ${Player.email} \n\n\
    Мы сообщим вам о победителях этапа и пришлём ссылку на турнирную таблицу. \n\n\
    Метательные практики\n\n\
    http://knifethrowing.online`, // plain text body
    html: letter_body_2,
  // html: '<div style="font-family: Arial, Verdana, sans-serif; font-size:13px; padding:10px 0 0 10px; margin:0;">\
  // <p style="margin-bottm:5px;">Здравствуйте!</p>\
  // <p style="margin-bottm:5px;">Вы отправили следующие результаты \
  // на&nbsp;онлайн-чемпионат<br/> метателей топоров и&nbsp;ножей «Метательные практики»:</p>\
  // <p style="margin-bottm:5px;">Имя '   + Player.first_name + ' \
  // <p style="margin-bottm:5px;">Фамилия ' + Player.last_name + '\
  // <p style="margin-bottm:5px;">Пол ' + Player.gender + '\
  // <p style="margin-bottm:5px;">Клуб ' + Player.club_name + '\
  // <p style="margin-bottm:5px;">Страна ' + Player.country + '\
  // <p style="margin-bottm:5px;">Эл. почта ' + Player.email + '<a href="/compose?To=' + Player.email + '" rel="noopener noreferrer">' + Player.email + '</a>\
  // <p>Мы пришлём вам ссылку на&nbsp;опубликованные результаты</p>\
  // <p>Метательные практики<br/>\
  //   <a href="http://knifethrowing.online">knifethrowing.online</a></p></div>// // html body
   });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

function digitsToHTML(myArray){
  let str = '';
  let sum = 0;
  if(myArray[0]!==''){
    for(let i=0;i<10;i++){
      str = str + '<div style="width:20px; margin-top:2px; margin-right: 5px; \
      border-bottom: 1px solid rgb(200, 200, 200, 0.5);">' + myArray[i] + '</div>';
      sum = sum + parseInt(myArray[i]);
    }
    str = str + '<div style="padding: 2px 8px 2px 8px;	\
    background-color:rgb(200, 200, 200, 0.5);"><strong>' + sum + '</strong></div>';
  }
  else {
    str = '—';
  }
  return str;
}


function capitalizeFirstLetter(str)
{
    const uppercaseFirstLetter = str.charAt(0).toUpperCase();
    const stringWithoutFirstLetter = str.slice(1);
    return uppercaseFirstLetter+stringWithoutFirstLetter;
}


module.exports = mail_results;
