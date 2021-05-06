const express = require('express');
const cors = require('cors');
const path=require("path")

const app = express();

// settings
app.set('port', process.env.PORT || 4000);
app.use(express.urlencoded({ extended: true }));

//Init middlewares 
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/tests', require('./src/routes/tests')); // http://localhost:4000/api/tests/5f4439c5ee7acc2827a139ec
app.use('/api/users', require('./src/routes/users'));
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/ranking', require('./src/routes/ranking'));
app.use('/api/statistics', require('./src/routes/statistics'));

// Serve static assets in production
if(process.env.NODE_ENV==="production"){
    //Set static folder
    app.use(express.static("frontend/build"));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
    })


}



//static files
app.use(express.static(path.join(__dirname,"public")));

module.exports = app;