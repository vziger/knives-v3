const express = require('express');

const router = express.Router();


router.get('/', (req, res,next) => {
    try {
      res.render('new_rules', { title: 'Правила участия', layout: 'layout_newrules' });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  });

module.exports = router;