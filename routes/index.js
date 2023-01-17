const express = require('express');
const app = express();
const test = require("./test");
const StockPrecio = require("./stockPrecio");



app.use("/test", test);
app.use("/stockPrecio", StockPrecio);

module.exports = app;
