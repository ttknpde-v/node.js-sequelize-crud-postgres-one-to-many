const log = require('../../log/logging').log
const sequelize = require('../../configuration/config_database').sequelize
const connect = require('../../configuration/config_database').connect

class Customer {
    static get customer() {
        log.info('customer method used')
        return connect.define
        ("customers",
                {
                    cm_id: {
                        type: sequelize.INTEGER,
                        primaryKey: true,
                        allowNull: false,
                        autoIncrement: true
                    },
                    firstname: {
                        type: sequelize.STRING,
                        allowNull: false
                    },
                    lastname: {
                        type: sequelize.STRING,
                        allowNull: false
                    }
                },
                {
                    // freeze name table not using *s on name
                    freezeTableName: true,
                    // don't use createdAt/update
                    timestamps: false
                }
        ) // ended define
    }
}
module.exports = Customer