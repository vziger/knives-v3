const express = require('express');
const Emails = require('../models/emails');
const mail = require('../controller/email');
const router = express.Router();

// Выводим результаты второго этапа!!!
// router.get('/', (req, res,next) => {
//     try {
//       res.render('results', { title: 'Результаты второго этапа',
//       display_img: 'img_dates img_dates_display_none' });
//     } catch (error) {
//       console.log(error.message);
//       next(error);
//     }
//   });

router.get('/', (req, res,next) => {
  try {
    res.render('results_parallax', { title: 'Результаты второго этапа',
    layout: 'layout_results_parallax',
    og_title:'<meta property="og:title" content="Результаты второго этапа">',
    display_img: 'img_dates img_dates_display_none' });
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