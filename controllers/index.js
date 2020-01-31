module.exports = app =>{

    const requestModel = app.models.request;

    this.index = function(req, res){
        requestModel.requestYearNBA(req, res);
    };

    return this;

}