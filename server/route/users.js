const express = require("express");
const router = express.Router();
const _ = require("lodash");
const models = require("../models");

const User = models.user;
const Board = models.board;

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("node_example", "root", "0822", { host: "localhost", dialect: "mysql" });

// const check_sequlize_auth = async () => {
//     try{
//         await sequelize.authenticate();
//         console.log("연결 성공");
//     }catch(err){
//         console.log("연결 실패: ", err);
//     }
// };
// check_sequlize_auth();

// const User = sequelize.define("user",{
//     name : {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     password : {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     address : {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });

// User.sync({force:true}).then(()=>{
//     return User.create({
//         name: "홍길동",
//         password: 111,
//         address:"seoul"
//     });
// }).then(()=>{
//     return User.create({
//         name : "김철수",
//         password: 222,
//         address:"seoul"
        
//     });
// });

// let users = [];

router.get("/", async(req, res) => {
    let result = await User.findAll({
        Attributes: ["name"],
        include:[Board]
    });
    res.send(result);
});

router.get("/:id", async(req, res) => {
    let result = await User.findOne({
        where: {
            id: req.params.id
        }
    });
   res.send(result);
});

router.post("/", async(req, res) => {
    let result = false;
    try{
        let result_user = await User.create({name: req.body.name, address: req.body.address});
        await result_user.createBoard({title: "Test", viewcount: 333, content: "tes"});
        // await User.setBoard({name: "tttt"});
        result = true;
    }catch(err){
        console.error(err);
    }
    res.send(result);
});

router.put("/:id", async(req, res) => {
    let result = false;
    try{
        await User.update(
            {
            name : req.body.name,
            address: req.body.address
        },{
        where: {
            id: req.params.id
        }
    })
        result = true;
    }catch(err){
        console.error(err);
    }
    res.send({result});
});

router.delete("/:id", async(req, res) => {
    let result = false;
    try{
        await User.destroy({
            where:{
                id:req.params.id
            }
        });
        result = true;
    }catch(err){
        console.log(err);
    }
    res.send(result);
});

module.exports = router;