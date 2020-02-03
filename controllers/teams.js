module.exports = app => {
    const request = require("request");

    this.searchInformationsTeam = function(req, res){

        const yearsRepository = app.repository.years;

        request("http://data.nba.net/prod/v1/2019/teams/1610612747/schedule.json", (error, response, body) => {
            yearsRepository.saveYearIfNotExists(req, res);

            yearsRepository.saveGames(req, res, body);
        });

    };

    return this;

}