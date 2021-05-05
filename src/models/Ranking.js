const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');



const scoreSchema = new Schema({
  userid:String,
  name:String,
  score:Number,
  userAnswersTable:{type : Array , "default" : []}
})

const winnerSchema = new Schema({
  winnerrid:String,
  winnername:String,
  winnerscore:Number
})
// https://stackoverflow.com/questions/19695058/how-to-define-object-in-array-in-mongoose-schema-correctly-with-2d-geo-index#

const rankingSchema = new Schema({
  
      problems: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "problems"
      },
      testID: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      topic: {
        type: String,
        required: true
      },
      subject: {
        type: String,
        required: true
      },
      area: {
        type: String,
        required: true
      },
      value: {
        type: Number,
        required: true
      },
      winner:[winnerSchema],

      topScores: [scoreSchema],
      
      answersTable : { type : Array , "default" : [] },

      date: {
        type: Date,
        default: Date.now
      }
    })

module.exports = model('Ranking', rankingSchema);