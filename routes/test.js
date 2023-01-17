var express = require('express');
const cors = require("cors");
const {
    json
} = require("body-parser");
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    let hola = "Soy get";
    res.json(hola);
});


module.exports = app;