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

  let str_axe = digitsToHTML('Топоры, 4 метра', Player.axe_4M, Player.videoLink_1);
  const str_kn3 = digitsToHTML('Ножи, 3 метра', Player.knife_3M, Player.videoLink_2);
  const str_kn4 = digitsToHTML('Ножи, 4 метра', Player.knife_4M, Player.videoLink_3);
  const str_kn5 = digitsToHTML('Ножи, 5 метров', Player.knife_5M, Player.videoLink_4);

  let str_knives = str_kn3 + str_kn4 + str_kn5;

  if (str_axe !== ''){
    str_axe = '<div style="margin-top: 24px;">' + str_axe + '</div>';
  }
  if (str_knives !== '')
  {
    str_knives = '<div style="margin-top: 24px;">' + str_knives + '</div>';
  }

  let allSum  = 0;
  let number  = 0;
  let allSumStr = '';
  let sum_kn3 = mySumArray(Player.knife_3M);
  let sum_kn4 = mySumArray(Player.knife_4M);
  let sum_kn5 = mySumArray(Player.knife_5M);

  if(sum_kn3 !== '' && !isNaN(sum_kn3)) {
    number = number + 1;
    allSum = allSum + sum_kn3;
  }
  if(sum_kn4 !== '' && !isNaN(sum_kn4)) {
    number = number + 1;
    allSum = allSum + sum_kn4;
  }
  if(sum_kn5 !== ''&& !isNaN(sum_kn5)) {
    number = number + 1;
    allSum = allSum + sum_kn5;
  }
  if (number > 1){
    allSumStr ='<div style="padding: 2px; 	margin:0 0 7px 0;">\
        <div style="display: flex; justify-content: flex-start;">\
          <div style="margin-top:2px;	width:120px;">Сумма по ножам </div>\
          <div style = "display: flex; justify-content: flex-start;">\
            <div style="min-width: 250px"></div>\
            <div style="margin-left: 5px; padding: 2px 8px 2px 8px;	\
            background-color:rgb(200, 200, 200, 0.5);"><strong>' + allSum + '</strong></div>\
          </div>\
        </div>\
      </div>';
  }

  let letter_body_2='<div style="font-family: Arial, Verdana, sans-serif;font-size:13px;padding:0 0 0 10px;">\
    <p style="margin-bottom:5px;">Здравствуйте!</p>\
    <p style="margin-bottom:5px;">Вы отправили следующие результаты для участия в онлайн-чемпионате\
      <br/> метателей топоров и&nbsp;ножей «Метательные практики»</p>\
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
    </div>' + str_axe + str_knives + allSumStr +'\
    <p style="margin-bottom:5px;">&nbsp;</p>\
  	<p style="margin-bottom:5px;">10 июня мы сообщим о победителях второго этапа и пришлём ссылку на турнирную таблицу.</p>\
	  <p style="margin-bottom:5px;">Метательные практики<br/>\
    <a href="http://knifethrowing.online" target="_blank" rel="noopener noreferrer">\
              knifethrowing.online</a></p>\
  </div>\
  <div style="font-family: Arial, Verdana, sans-serif; font-size:13px; padding:130px 0 0 10px;">\
    <p>Чтобы отписаться, напишите нам об этом в ответном письме.</p></div>';


  // // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'Метательные практики <noreply.knifethrowing@gmail.com>', // sender address
    to: recepient, // list of receivers
    subject: 'Результаты приняты', // Subject line
    // text: `Здравствуйте!\n\n\
    // Вы отправили следующие результаты для участия в онлайн-чемпионате метателей топоров и \
    // ножей «Метательные практики»: \n\n Имя ${Player.first_name} \n\n\ 
    // Фамилия ${Player.last_name} \n\n\ Пол ${Player.gender} \n\n Клуб ${Player.club_name} \n\n\
    // Страна ${Player.country} \n\n\ Эл. почта ${Player.email} \n\n\
    // Мы сообщим вам о победителях этапа и пришлём ссылку на турнирную таблицу. \n\n\
    // Метательные практики\n\n\
    // http://knifethrowing.online`, // plain text body
    html: letter_body_2,
  // html: '<div style="font-family: Arial, Verdana, sans-serif; font-size:13px; padding:10px 0 0 10px; margin:0;">\
  // <p style="margin-bottom:5px;">Здравствуйте!</p>\
  // <p style="margin-bottom:5px;">Вы отправили следующие результаты \
  // на&nbsp;онлайн-чемпионат<br/> метателей топоров и&nbsp;ножей «Метательные практики»:</p>\
  // <p style="margin-bottom:5px;">Имя '   + Player.first_name + ' \
  // <p style="margin-bottom:5px;">Фамилия ' + Player.last_name + '\
  // <p style="margin-bottom:5px;">Пол ' + Player.gender + '\
  // <p style="margin-bottom:5px;">Клуб ' + Player.club_name + '\
  // <p style="margin-bottom:5px;">Страна ' + Player.country + '\
  // <p style="margin-bottom:5px;">Эл. почта ' + Player.email + '<a href="/compose?To=' + Player.email + '" rel="noopener noreferrer">' + Player.email + '</a>\
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

function digitsToHTML(pattern, myArray, videoLink){
  let str = '';
  let sum = 0;

  if(myArray[0] !== ''){
  //   if(pattern=='Топоры, 4м') {
  //     str = str + '<div style="margin-top: 24px;"> <div style="padding: 2px; 	margin:5px 0 7px 0;">';
  //   }
      
  //   else 
    str = str + '<div style="padding: 2px; 	margin:5px 0 7px 0;">';
    
    str = str + '<div style = "display: flex; justify-content: flex-start;">\
      <div style="margin-top:2px;	width:120px;">' + pattern + '</div>\
      <div style = "display: flex; justify-content: flex-start;">';

    for(let i=0; i<10; i++){
      str = str + '<div style="width:20px; margin-top:2px; margin-right: 5px; \
      border-bottom: 1px solid rgb(200, 200, 200, 0.5);">' + myArray[i] + '</div>';
      sum = sum + parseInt(myArray[i]);
    }
    str = str + '<div style="margin-left: 5px; padding: 2px 8px 2px 8px;	\
    background-color:rgb(200, 200, 200, 0.5);"><strong>' + sum + '</strong></div>\
    </div>\
      </div>\
      <div style = "display: flex; justify-content: flex-start;">\
        <div style="margin-top:2px;	width:120px;">Ссылка на видео</div>\
        <div><a href="' + videoLink + 'target="_blank" rel="noopener noreferrer">' + 
                          videoLink + '</a></div>\
      </div>\
    </div>';
    
  }
  else {
    str = '';
  }
  return str;
}


function capitalizeFirstLetter(str)
{
    const uppercaseFirstLetter = str.charAt(0).toUpperCase();
    const stringWithoutFirstLetter = str.slice(1);
    return uppercaseFirstLetter+stringWithoutFirstLetter;
}

function mySumArray(arr){
  if (arr.length>0){
    let sum = 0;
    for(let i=0; i<10; i++){
      sum = sum + parseInt(arr[i]);;
    }
    return sum;
  }
  return '';
}

module.exports = mail_results;
