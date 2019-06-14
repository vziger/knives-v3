const express = require('express');
// const bodyParser = require('body-parser');
const Emails = require('../models/emails');
const mail = require('../controller/email');
const mail_results = require('../controller/email_results');
const Player = require('../models/Player');
const GoogleOperations = require('../controller/ggl_spreadshet');

const router = express.Router();

// const urlencodedParser = bodyParser.urlencoded({ extended: false });


router.post('/results_send', async (req, res, next) => {
  try {
    console.log('FETCh mufucka');
    console.log(req.body);


    const FirstName = req.body.nameFirstName;
    const LastName = req.body.nameLastName;
    const Gender = req.body.gender;
    const Club = req.body.nameClub;

    const Country = req.body.nameCountry;
    const EmailRes = req.body.nameEmailResults;
    const link_1 = req.body.nameLink_1;
    const link_2 = req.body.nameLink_2;
    const link_3 = req.body.nameLink_3;
    const link_4 = req.body.nameLink_4;

    const axes = [];
    const kn3 = [];
    const kn4 = [];
    const kn5 = [];
    axes.push(req.body.name_axe_4m_1);
    axes.push(req.body.name_axe_4m_2);
    axes.push(req.body.name_axe_4m_3);
    axes.push(req.body.name_axe_4m_4);
    axes.push(req.body.name_axe_4m_5);
    axes.push(req.body.name_axe_4m_6);
    axes.push(req.body.name_axe_4m_7);
    axes.push(req.body.name_axe_4m_8);
    axes.push(req.body.name_axe_4m_9);
    axes.push(req.body.name_axe_4m_10);

    kn3.push(req.body.name_knife_3m_1);
    kn3.push(req.body.name_knife_3m_2);
    kn3.push(req.body.name_knife_3m_3);
    kn3.push(req.body.name_knife_3m_4);
    kn3.push(req.body.name_knife_3m_5);
    kn3.push(req.body.name_knife_3m_6);
    kn3.push(req.body.name_knife_3m_7);
    kn3.push(req.body.name_knife_3m_8);
    kn3.push(req.body.name_knife_3m_9);
    kn3.push(req.body.name_knife_3m_10);

    kn4.push(req.body.name_knife_4m_1);
    kn4.push(req.body.name_knife_4m_2);
    kn4.push(req.body.name_knife_4m_3);
    kn4.push(req.body.name_knife_4m_4);
    kn4.push(req.body.name_knife_4m_5);
    kn4.push(req.body.name_knife_4m_6);
    kn4.push(req.body.name_knife_4m_7);
    kn4.push(req.body.name_knife_4m_8);
    kn4.push(req.body.name_knife_4m_9);
    kn4.push(req.body.name_knife_4m_10);

    kn5.push(req.body.name_knife_5m_1);
    kn5.push(req.body.name_knife_5m_2);
    kn5.push(req.body.name_knife_5m_3);
    kn5.push(req.body.name_knife_5m_4);
    kn5.push(req.body.name_knife_5m_5);
    kn5.push(req.body.name_knife_5m_6);
    kn5.push(req.body.name_knife_5m_7);
    kn5.push(req.body.name_knife_5m_8);
    kn5.push(req.body.name_knife_5m_9);
    kn5.push(req.body.name_knife_5m_10);

    const newPlayer = new Player({
      first_name: FirstName,
      last_name: LastName,
      gender: Gender,
      club_name: Club,
      country: Country,
      email: EmailRes,
      videoLink_1: link_1,
      videoLink_2: link_2,
      videoLink_3: link_3,
      videoLink_4: link_4,

      axe_4M: axes,
      knife_3M: kn3,
      knife_4M: kn4,
      knife_5M: kn5,
      approved: 0,
      createdAt: Date.now(),
    });
    await newPlayer.save();

    mail_results(EmailRes, newPlayer).catch(console.error);

    GoogleOperations.save2Google(newPlayer).catch(console.error);

    console.log('-----^^-----');
    res.status(200).send();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});


// router.post('/', urlencodedParser, async (req, res, next) => {


router.post('/subscribe', async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(email);

    const newEmail = new Emails({
      email,
      createdAt: Date.now(),
    });
    const tmp = await Emails.find({email:email});

    if (tmp.length==0)
      await newEmail.save();
    else
    {
      await Emails.updateOne({email:email}, {createdAt: Date.now()});
    }
      mail(email).catch(console.error);

    res.status(200).send();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});


router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});


router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { password, username } = req.body;


  if (username !== 'admin') {
    res.redirect('/login');
  } else if (password !== process.env.admpass) {
    res.redirect('/login');
  } else {
    req.session.user = 'admin';
    res.redirect('/all_results');
  }
});

router.get('/subscribe_report', async (req, res) => {
  if (req.session.user === 'admin') {
    const allEmails = await Emails.find();
    res.render('subscribe_report', { allEmails });
  } else {
    res.redirect('/login');
  }
});

router.get('/all_results', async (req, res) => {
  if (req.session.user === 'admin') {
    const allPlayers = await Player.find();
    res.render('admins', { allPlayers });
  } else {
    res.redirect('/login');
  }
});


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('form', { title: 'Метательные практики',
  img_dates_src:'/images/dates_helv.svg',
  display_img: 'img_dates img_dates_display',
  text_send_results:'За\u00A0каждый бросок начисляется столько баллов, сколько указано \
  на\u00A0мишени, куда\u00A0попал\u00A0топор или\u00A0нож. Результаты принимаем \
  с\u00A000:00 20\u00A0мая \
      до\u00A023:59 2\u00A0июня\u00A0по\u00A0Москве.' });
});


router.post('/', async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(email);
    mail(email).catch(console.error);

    const newEmail = new Emails({
      email,
      createdAt: Date.now(),
    });
    await newEmail.save();

    res.status(200).send();


    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

module.exports = router;
