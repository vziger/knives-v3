const express = require('express');

const router = express.Router();


router.get('/', (req, res,next) => {
    try {
      res.render('index', { title: 'Правила участия', 
      img_dates_src:'/images/dates_wait_result.svg',
      text_send_results:'Второй этап закончился. Следующий начнётся в сентябре.\
      Чтобы подготовиться, прочитайте правила участия, выберите топор и три ножа, \
      распечатайте десять мишеней и зарядите камеру. Участвуйте во всех этапах \
      турнира и отслеживайте свой прогресс в конце года.',
      layout: 'layout_counting_results' });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  });

module.exports = router;