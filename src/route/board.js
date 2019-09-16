const express = require("express");
const router = express.Router();
const _ = require("lodash");
const models = require("../models");

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

// const Board = sequelize.define("Board",{
//     title : {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     content : {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     viewcount : {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     }
// });

// Board.sync({force:true}).then(()=>{
//     return Board.create({
//         title: "dealim",
//         content: "cccc",
//         viewcount: 111
//     });
// }).then(()=>{
//     return Board.create({
//         title : "school",
//         content : "tttt",
//         viewcount : 222
        
//     });
// });

router.get("/", async(req,res) => {
    console.log("test");
    let result = await Board.findAll({
    });
    res.send(result);
});

router.get("/:id", async(req,res)=> {
    let result = await Board.findOne({
        where: {
            id : req.params.id
        }
    });
    res.send(result);
});

router.post("/", async(req,res) => {
    let result = false;
    try{
        await Board.create({
            title: req.body.title, content: req.body.content, viewcount: req.body.viewcount});
        result = true;
    }catch(err){
        console.error(err);
    }
    res.send(result);
});

router.put("/:id", async(req,res) => {
    let result = false;
    try{
        await Board.update(
            {
                title : req.body.title,
                content : req.body.content,
            },{
                where:{
                    id: req.params.id
                }
            });
            result =true;
    }catch(err){
        console.error(err);
    }
    res.send({result});
});

router.delete("/:id", async(req,res) => {
    let result = false;
    try{
        await Board.destroy({
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

// router.get("/", (req, res) => {
//     res.send("get all");
// });

// router.get("/:id", (req, res) => {
//     res.send("get id");
// });

// router.post("/", (req, res) => {
//     res.send("post");
// });

// router.put("/:id", (req, res) => {
//     res.send("put");
// });

// router.delete("/:id", (req, res) => {
//     res.send("delete");
// });

module.exports = router;