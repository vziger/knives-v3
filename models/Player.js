var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PlayerSchema = new Schema(
    {
      first_name: {type: String, required: true, max: 100},
      last_name: {type: String, required: true, max: 100},
      gender: {type: String, required: true},
      age: {type: Number, required: true},
      country:{type: String, max:100},
      club_name: {type: String, max:100},
      videoLink: {type: String, required: true},
      knife_3M: [{result: {type: Number, max:60}}],
      knife_4M: [{result: {type: Number, max:60}}],
      knife_5M: [{result: {type: Number, max:60}}],
      axe_4M: [{result: {type: Number, max:20}}],

      createdAt:{type: Date, required: true}
      /*ещё нужен массив с результатами*/ 
    }
  );


  // Виртуальное свойство для получения имени игрока
PlayerSchema
.virtual('name')
.get(function () {
  return this.family_name; //+ ', ' + this.first_name;
});

/* Виртуальное свойство - URL автора
PlayerSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});
*/

//Export model
module.exports = mongoose.model('Player', PlayerSchema);