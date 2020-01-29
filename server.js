const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

const app = express();

consign()
.include('config')
.include('models')
.include('controllers')
.include('routes')
.into(app);

app.listen("3000", () => {
    console.log("nbaStatsAPI online");
});