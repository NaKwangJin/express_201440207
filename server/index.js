const express = require("express");
const app = express();
const user_router = require("./route/users");
const board_route = require("./route/board");
const models = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/users", user_router);
app.use("/board", board_route);


// app.listen(3000);

app.get("/", (req, res) => {
    res.send("hello world");
});

models.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", {raw: true}).then(() => {
    models.sequelize.sync({force:true}).then(()=>{
        app.listen(5000);
    });
});

