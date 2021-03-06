module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        address: {
            type: DataTypes.STRING,
            allowNull:false
        }
    });

    // // board에 userID 키값 테이블 전송
    // User.associate = function(models) {
    //     models.user.hasOne(models.board);
    // };

    // user에 boardID 키값 테이블 생성
    User.associate = function(models) {
        models.user.belongsTo(models.board);
    };

    return User;
}