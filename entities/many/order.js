const log = require('../../log/logging').log
const sequelize = require('../../configuration/config_database').sequelize
const connect = require('../../configuration/config_database').connect
class Order {
    static get order () {
        log.info('order method used')
        return connect.define
        ("orders",
            {
                od_id: {
                    type: sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                order_date: {
                    type: sequelize.DATE,
                    allowNull: false
                },
                cost: {
                    type: sequelize.DECIMAL,
                    allowNull: false
                },
                cm_id : {
                    type: sequelize.STRING,
                    references : { // set details foreign key field
                        model : 'customers' , // model use to map table
                        key : 'cm_id' // key use to map field
                    }
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

module.exports = Order