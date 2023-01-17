const cron = require('node-cron');
const express = require('express');
const app = express();


const checkPrices = require("./checkPrices");



//Mobo Limpieza Stock Incompletas
cron.schedule("00 */10 * * * *",()=>{checkPrices.checkPrices(5,5),{
    schedule: true,
    timezone: "America/Mexico_City"
}});


console.log("Cron Jobs Running");
module.exports = app;
