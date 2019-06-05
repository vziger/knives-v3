const express = require('express');
const Emails = require('../models/emails');

const router = express.Router();


router.get('/', async(req, res,next) => {
    try {
        const u_email = req.query.email;
      const tmp = await Emails.find({email:u_email});
      if (tmp.length!==0)
      {
          Emails.deleteOne({email:u_email}, function(err, result){
            // mongoose.disconnect();
             
            if(err) return console.log(err);
             
            console.log(result);});
          console.log('имейл удалён');
      }

      res.render('unsubscribe', { title: 'Правила участия',
            u_email:u_email});
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  });

module.exports = router;