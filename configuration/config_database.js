// const log = require('../log/logging').log
/* in below , i will get my prop in .env file  */
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path: path.resolve('../env/.env')})

class ConfigDatabase {
    static get sequelize() {
        // log.info("sequelize method is used")
        return require("sequelize")
    }

    static get connect() {
        // const configDatabase = new ConfigDatabase()
        /* have many ways to connect db with sequel and this is once */
        return new this.sequelize
        (
            process.env.PG_DATABASE,
            process.env.PG_USERNAME,
            process.env.PG_PASSWORD,
            {
                // set port & host in this block
                dialect: "postgres",
                host: process.env.PG_HOST,
                port: process.env.PG_PORT
            }
        ) // ended return
    }

}

/*
ConfigDatabase.connect.authenticate().then(() => {
    log.info(' successfully ! connected pgsql')
}).catch((error) => {
    log.info('failed ! connect pgsql ')
    throw error
})
*/

module.exports = ConfigDatabase