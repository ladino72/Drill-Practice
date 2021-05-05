const mongoose = require('mongoose');
const config = require("config")
const db = config.get("mongoURI")


//https://dev.to/aritik/connecting-to-mongodb-using-mongoose-3akh
mongoose.connect(db, 
{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true, useFindAndModify: false,})
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database is connected');
});