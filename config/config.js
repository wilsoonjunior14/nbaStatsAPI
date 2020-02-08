const bodyParser = require('body-parser');
const express    = require('express');
const path       = require('path');
const cors       = require('cors');
module.exports = app =>{

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());

}