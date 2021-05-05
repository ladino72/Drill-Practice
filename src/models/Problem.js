const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    questions:[mongoose.Schema.Types.Mixed],
    
    
})
//The model name is Problem but  Mongoose create a collection named "problems" in the database  
const Problem = mongoose.model('Problem', problemSchema);


module.exports = Problem;