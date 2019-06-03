const express = require('express');

const router = express.Router();


router.get('/', (req, res,next) => {
    try {
      res.render('index', { title: 'Правила участия', 
      img_dates_src:'/images/dates_wait_result.svg',
      text_send_results:'Второй этап окончен. \
      Откроем приём результатов в\u00A0даты проведения следующего этапа. \
      За\u00A0каждый\u00A0бросок начисляется столько баллов, сколько указано на\u00A0мишени, \
      куда попал топор или\u00A0нож.',
      layout: 'layout_counting_results' });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  });

module.exports = router;