module.exports = (sequelize, DataTypes) => {
    return sequelize.define('board', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: false
        },
        contents: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            unique: false
        },
        img: {
            type: DataTypes.STRING(30),
            allowNull: true,
            unique: false
        }   
    }, {
        timestamps: false,
    });
};