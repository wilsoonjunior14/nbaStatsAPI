module.exports = app => {

    var teamsController = app.controllers.teams;

    app.get("/teams/:id/:year", teamsController.searchInformationsTeam);

};