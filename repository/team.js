module.exports = app => {

    const team = app.models.teams;

    this.saveTeam = function(obj){
        team.create(obj)
        .then(()=>{ console.log("team "+obj.name+" inserted with success"); })
        .catch((err)=> {console.log(err);});
    };

    this.findTeams = function(res){
        team.findAll()
        .then((data) => {
            res.json({mensagem: "Teams found", status: true, data: data});
        })
        .catch((err) => {
            console.log(err);
            res.json({mensagem: "Any error occurred for to search teams. "+err, status: false, data: []});
        });
    };

    this.saveIfNotExistsTeam = function(obj){
        team.findAll({where:{name: obj.fullName}})
        .then((data) => {
            if (data.length > 0){
                // team does not exists
                console.log("team "+obj.fullName+" already exists");
            }else{
                // team exists
                if (obj.isNBAFranchise) this.saveTeam({name: obj.fullName, teamId: obj.teamId, nickname: obj.nickname, conference: obj.confName, division: obj.divName});
            }
        })
        .catch((err)=>{console.log(err);});
    }

    return this;

};