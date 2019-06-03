const express = require('express');

const router = express.Router();


router.get('/', (req, res,next) => {
    try {
      res.render('index', { title: 'Правила участия', 
      img_dates_src:'/images/dates_wait_result.svg',
      text_send_results:'Откроем прием результатов в\u00A0следующем этапе.',
      layout: 'layout_counting_results' });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  });

module.exports = router;