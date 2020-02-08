module.exports = app => {
    const request = require("request");

    this.searchInformationsTeam = function(req, res){

        const id     = req.params.id;
        const teamId = req.params.teamId;
        const year   = req.params.year;
        const yearsRepository = app.repository.years;

        request("http://data.nba.net/prod/v1/"+year+"/teams/"+teamId+"/schedule.json", (error, response, body) => {
            yearsRepository.saveYearIfNotExists(req, res);

            let obj = JSON.parse(body).league.standard;
            obj.idTeam = id;
            obj.year   = year;
            obj.teamId = teamId;
            yearsRepository.deleteAndSaveAndSearchGames(req, res, obj);
        });

    };

    return this;

}