module.exports = app =>{
    
    var indexController = app.controllers.index;

    app.get("/", indexController.index);

};