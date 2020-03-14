module.exports = (sequelize, DataTypes) => {
    return sequelize.define('invite', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        inviter_id: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        invitee_id: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        }     
    }, {
        timestamps: false,
    });
};