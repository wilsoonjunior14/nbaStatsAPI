module.exports = app => {

    var teamsController = app.controllers.teams;

    app.get("/teams/:id/:teamId/:year", teamsController.searchInformationsTeam);

};