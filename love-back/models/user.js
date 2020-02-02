module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cp_id: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        vertify: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        salt: {
          type: DataTypes.STRING(100),
          allowNull: false
        }       
    }, {
        timestamps: false,
    });
};