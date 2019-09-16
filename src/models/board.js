module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define("board", {
        title: {
            type: DataTypes.STRING,
            allowNull:false
        },
        content: {
            type: DataTypes.STRING,
            allowNull:false
        },
        viewcount: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    });
    return Board;
}