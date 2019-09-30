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
    // // board에 userID 키값 테이블 추가
    // Board.associate = function(models) {
    //     models.board.belongsTo(models.user);
    // };

    // user에 boardId키값 테이블 전송
    Board.associate = function(models) {
        models.board.hasOne(models.user);
    };

    return Board;
}