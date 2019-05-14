var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TournamentStageSchema = new Schema(
    {
      number: {type: Number, required: true},
      date_of_start: {type: Date, required: true},
      players: [{type: Schema.ObjectId, ref: 'Player'}]
    }
  );


  // Виртуальное свойство для получения даты этап
TournamentStageSchema
.virtual('date')
.get(function () {
  return this.date_of_start;
});

// Virtual for book's URL
/*BookSchema
.virtual('url')
.get(function () {
  return '/catalog/book/' + this._id;
});
*/

//Export model
module.exports = mongoose.model('TournamentStage', TournamentStageSchema);