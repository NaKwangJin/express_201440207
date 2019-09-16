// fs = 파일시스템
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const Sequelize = require("sequelize");

const db = {};

const sequelize = new Sequelize("node_example", "root", "0822", { host: "localhost", dialect: "mysql" });
sequelize.authenticate().then(() => {
    console.log("연결 성공");
}).catch(err => {
    console.log("연결 실패: ",err);
});

// __dirname = > 디렉토리 값을 반환 (index 파일 제외 하고 나머지 읽기 위한 코드) 
fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf(".") !==0) && (file !== basename) && (file.slice(-3) === ".js");
}).forEach(file => {
    let model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
    console.log(db);
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;