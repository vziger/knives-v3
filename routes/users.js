const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});


router.post('/subscribe', async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(email);


    res.status(200).send();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

module.exports = router;
