module.exports = app =>{

    const team    = app.models.team;
    const request = require('request');
    const teamRepository = app.repository.team;

    this.index = function(req, res){
        request("http://data.nba.net/prod/v1/2016/teams.json", (error, response, body) => {
                let array = JSON.parse(body).league.standard;
                array.forEach((item)=>{
                    teamRepository.saveIfexistsTeam(item);
                });

                teamRepository.findTeams(res);
        });
    };

    return this;

}