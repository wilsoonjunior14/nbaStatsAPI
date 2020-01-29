module.exports = app =>{
    
    app.get("/", (req, res)=>{
        res.json({description: "Hello World"});
    });

}