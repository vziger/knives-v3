const express = require('express');
const Emails = require('../models/emails');
const mail = require('../controller/email');
const router = express.Router();


router.get('/', (req, res,next) => {
    try {
      res.render('results', { title: 'Результаты второго этапа' });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  });

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

module.exports = router;