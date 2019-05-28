const express = require('express');

const router = express.Router();


router.get('/', (req, res,next) => {
    try {
      res.render('rules', { title: 'Правила участия', layout: 'layoutrules' });
      // res.render('rules');
      // , { title: 'Правила участия', layout: 'layoutrules' });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  });

module.exports = router;