const express = require('express');
const app = express();

// ================================================
// OUTPUT PORT
// ================================================

process.env.PORT = process.env.PORT || 3002;

// ================================================
// GMAIL ACCESS
// ================================================
process.env.GMAIL_USER = 'ecommercermobo@gmail.com';
process.env.GMAIL_PASSWORD = '';


// ================================================
// SLACK ACCESS
// ================================================
process.env.SLACK_TOKEN = '';
process.env.SLACK_TOKEN_WEB = '';
process.env.SERVER_ERROR_CHANEL = '';
process.env.SERVER_NOTIFICATION_CHANEL = '';
process.env.SERVER_CANCELATIONS_CHANEL = '';
process.env.SERVER_VTEX_ORDERS_LIMPIEZA_STOCK = "";
process.env.SERVER_VTEX_ORDERS_LIMPIEZA_MOTO = "";

module.exports = app;
