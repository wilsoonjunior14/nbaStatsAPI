module.exports = app => {

    const Sequelize   = require("sequelize");
    const teams       = app.models.teams;
    const years_games = app.models.years_games;
    const years       = app.models.years;

    this.saveYear = function(obj){
        years.create(obj)
        .then(()=> {console.log("Year was saved successfully")})
        .catch((err) => {console.log("error to save year "+err)});
    };

    this.saveYearIfNotExists = function(req, res){
        years.findAll({where: {year: req.params.year}})
        .then((data) => {
            if (data.length > 0){
                console.log("year already exists");
            }else{
                this.saveYear({year: req.params.year});
            }
        })
        .catch((err) => {
            console.log("Error to search for year "+err);
            res.json({message: "Error to search for year "+err, status: false, data: []});
        });
    };

    this.searchGames = function(req, res, obj){
        years_games.findAll({include: [
            'visitantTeam'
        ]})
        .then((data) => {
            if (data.length > 0) return res.json({mensagem: "Games found", status: true, data: data});

            years.findOne({where: {year: obj.year}})
            .then((objYear) => {
                obj.forEach((item) => {
                    item.id_team = parseInt(obj.idTeam);
                    item.year    = objYear.id;
                    this.saveGames(item);
                });
            })
            .catch((err) => {
                console.log("Cannot search for year. "+obj.year+" "+err);
            });

            return res.json({mensagem: "Games not found! Please try again", status: false, data: data});
        })
        .catch((err) => {
            res.json({mensagem: "None games found. Please try to reconnect again. "+err, status: false, data: []});
        });
    };

    this.saveGames = function(obj){
        
        let where = {};

        if (obj.isHomeTeam){
            obj.id_homeTeam = obj.id_team;
            where = {teamId: obj.vTeam.teamId};
        }else{
            obj.id_visitantTeam = obj.id_team;
            where = {teamId: obj.hTeam.teamId};
        }

        teams.findOne({where: where})
        .then((data) => {
            if (obj.isHomeTeam){
                obj.id_visitantTeam = data.id;
            }else{
                obj.id_homeTeam     = data.id;
            }

            years_games.create({
                seasonStageId: obj.seasonStageId,
                seasonId: obj.seasonId,
                gameId: obj.gameId,
                gameUrlCode: obj.gameUrlCode,
                isHomeTeam: obj.isHomeTeam,
                startTimeUTC: obj.startTimeUTC.substring(0, 10),
                nugget: obj.nugget.text,
                visitantScore: obj.vTeam.score,
                homeScore: obj.hTeam.score,
                id_visitantTeam: obj.id_visitantTeam,
                id_homeTeam: obj.id_homeTeam,
                id_team: obj.id_team,
                id_year: obj.year
            })
            .then((data) => {
                console.log("game "+obj.gameId+" was saved");
            })
            .catch((err)=> {
                console.log("game "+obj.gameId+" wasn't saved. "+err);
            });

        })
        .catch((err) => {console.log("Error to search for visitant or home team")});

    };

    return this;
}