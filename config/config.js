const bodyParser = require('body-parser');
const express    = require('express');
const path       = require('path');
module.exports = app =>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());

}