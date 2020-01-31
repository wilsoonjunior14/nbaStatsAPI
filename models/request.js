module.exports = app => {

    const request = require('request');

    this.getYearNBA = function(req, res){
        request(url, (error, response, body) => {
            res.json(body);
        });
    }

    return this;

}