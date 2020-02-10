module.exports = app =>{

    const team    = app.models.team;
    const request = require('request');
    const teamRepository = app.repository.team;

    this.index = function(req, res){
        request("http://data.nba.net/prod/v1/2016/teams.json", (error, response, body) => {
                let array = JSON.parse(body).league.standard;
                array.forEach((item)=>{
                    teamRepository.saveIfNotExistsTeam(item);
                });

                request("http://data.nba.net/prod/v1/current/standings_all_no_sort_keys.json", (error, response, body) => {
                    array = JSON.parse(body).league.standard.teams;
                    teamRepository.updateWinAndLossTeam(array);

                    setTimeout(()=>{
                        teamRepository.findTeams(res);
                    }, 3000);
                    
                });

                
        });
    };

    return this;

}