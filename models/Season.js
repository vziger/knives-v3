var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SeasonSchema = new Schema(
    {
      year: {type: Number, required: true},// max: 4},
      stages: [{type: Schema.ObjectId, ref: 'TournamentStage'}]
    }
  );


  // Виртуальное свойство для получения даты этап
  SeasonSchema
.virtual('season')
.get(function () {
  return this.year;
});

// Virtual for book's URL
/*BookSchema
.virtual('url')
.get(function () {
  return '/catalog/book/' + this._id;
});
*/

//Export model
module.exports = mongoose.model('Season', SeasonSchema);