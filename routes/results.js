const express = require('express');
const router = express.Router();


router.get('/', (req, res,next) => {
    try {
      res.render('results', { title: 'Результаты' });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  });

module.exports = router;