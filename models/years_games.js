module.exports = app => {

    const Sequelize  = require("sequelize");
    const connection = app.get("connection");

    const teams = app.models.teams;
    const years = app.models.years;

    const years_games = connection.define("years_games", {
        id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        seasonStageId: {type: Sequelize.INTEGER},
        seasonId: {type: Sequelize.STRING},
        gameId: {type: Sequelize.STRING},
        gameUrlCode: {type: Sequelize.STRING},
        isHomeTeam: {type: Sequelize.BOOLEAN},
        startTimeUTC: {type: Sequelize.DATE, allowNull: false},
        nugget: {type: Sequelize.STRING},
        visitantScore: {type: Sequelize.STRING},
        homeScore: {type: Sequelize.STRING}
    });

    years_games.belongsTo(teams, {as:'visitantTeam', foreignKey: 'id_visitantTeam'});
    years_games.belongsTo(teams, {as: 'homeTeam', foreignKey: 'id_homeTeam'});
    years_games.belongsTo(teams, {as: 'team', foreignKey: 'id_team'});
    years_games.belongsTo(years, {as: 'year', foreignKey: 'id_year'});

    return years_games;

}