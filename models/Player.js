var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PlayerSchema = new Schema(
    {
      first_name: String, //{type: String},
      last_name: String, //{type: String},
      gender: String, //{type: String},
      
      club_name: String, //{type: String},
      country:String,//{type: String},
      email:String, //{type: String},

      axe_4M: [String],
      knife_3M:  [String],
      knife_4M:  [String],
      knife_5M:  [String],

      // axe_4M: {type : Array , "default" : [] },
      // knife_3M:  {type : Array , "default" : [] },
      // knife_4M:  {type : Array , "default" : [] },
      // knife_5M:  {type : Array , "default" : [] },

      // axe_4M: [{result: {type: Number}}],
      // knife_3M: [{result: {type: Number}}],
      // knife_4M: [{result: {type: Number}}],
      // knife_5M: [{result: {type: Number}}],
      
      videoLink_1: String, //{type: String},
      videoLink_2: String, //{type: String},
      videoLink_3: String, //{type: String},
      videoLink_4: String, //{type: String},

      createdAt:Date,//{type: Date}
    }
  );


  // Виртуальное свойство для получения имени игрока
PlayerSchema
.virtual('name')
.get(function () {
  return this.first_name; //+ ', ' + this.first_name;
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