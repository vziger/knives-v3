const express = require('express');
const Emails = require('../models/emails');
const mail = require('../controller/email');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Торог' });
});

module.exports = router;
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
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

router.post('/subscribe', async (req, res, next) => {
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
  } else if (password !== 'Qwerty123') {
    res.redirect('/login');
  } else {
    req.session.user = 'admin';
    res.redirect('/admins');
  }
});

router.get('/admins', async (req, res) => {
  if (req.session.user === 'admin') {
    const allEmails = await Emails.find();
    res.render('admins', { allEmails });
  } else {
    res.redirect('/login');
  }
});
