module.exports = app => {

    const Sequelize  = require("sequelize");
    const connection = app.get("connection");

    const years = connection.define("years", {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        year: {type: Sequelize.INTEGER, allowFalse: null}
    });

    return years;

}