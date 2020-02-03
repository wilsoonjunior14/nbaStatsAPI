module.exports = app => {

    const Sequelize  = require("sequelize");
    const connection = app.get("connection");

    const team = connection.define("team", {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        teamId: {type: Sequelize.INTEGER, unique: true},
        name: {type: Sequelize.STRING, allowNull: false, unique: true},
        nickname: {type: Sequelize.STRING},
        conference: {type: Sequelize.STRING},
        division: {type: Sequelize.STRING},
        logo: {type: Sequelize.STRING}
    });

    return team;

};