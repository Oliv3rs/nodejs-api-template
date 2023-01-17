require("./config/config");
const express = require ('express');
const bodyParser = require('body-parser');
const cron_jobs = require("./cron/index")

const app = express();

var port = process.env.PORT || 3001  ;
app.set('port',port);

//Middlewares
app.use(bodyParser.json({limit: '10mb', extended: true}));

//Routes
app.use(require('./routes/index'));

//Starting Server
app.listen(port, function() {
    console.log('Our API is running on http://localhost:' + port);
  });

app.use(express.static(__dirname + '/public'));

//Cron Jobs
app.use(cron_jobs);

app.get('/', (req, res)=> {
    res.send("Invalid Endpoint :(");
});


  module.exports = app;