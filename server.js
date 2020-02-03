const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const Sequelize  = require('sequelize');
const app = express();
const database = require('./config/database');
const path = require("path");

const sequelize = new Sequelize(database.database, database.username, database.password, {
    host: database.host,
    dialect: database.dialect
});

app.set("connection", sequelize);
app.use('/img',express.static(path.join(__dirname, 'public/imgs')));

consign()
.include('config')
.include('models')
.include('repository')
.include('controllers')
.include('routes')
.into(app);

app.get("connection").sync().then(() => {
    app.listen("3000", () => {
        console.log("nbaStatsAPI online");
    });
});
