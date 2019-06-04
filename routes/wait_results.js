const express = require('express');

const router = express.Router();


router.get('/', (req, res,next) => {
    try {
      res.render('index', { title: 'Правила участия', 
      img_dates_src:'/images/dates_wait_result.svg',
      text_send_results:'Второй этап закончился. Следующий\u00A0начнётся в\u00A0сентябре.\
      Чтобы\u00A0подготовиться, прочитайте правила\u00A0участия, выберите топор и\u00A0три ножа, \
      распечатайте десять мишеней и\u00A0зарядите камеру. Участвуйте во\u00A0всех этапах \
      турнира и\u00A0отслеживайте свой прогресс в\u00A0конце года.',
      layout: 'layout_counting_results' });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  });

module.exports = router;

// \u00A0