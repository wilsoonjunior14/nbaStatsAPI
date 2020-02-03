module.exports = app => {

    const teams       = app.models.teams;
    const teams_games = app.models.teams_games;
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

    this.saveGames = async function(req, res, obj){
        let yearModel = await years.findOne({where: {year: req.params.id}}).toPromise();

        res.json(yearModel);
    };

    return this;
}