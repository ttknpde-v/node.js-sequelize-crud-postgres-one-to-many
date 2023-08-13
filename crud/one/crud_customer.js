// call static method by . operator
const log = require('../../log/logging').log
const customer = require('../../entities/one/customer').customer
const orders = require('../../entities/many/order').order
/* call the hasMany() method from the model that can have many rows of the other model. */
customer.hasMany(orders, {foreignKey: 'cm_id'})

class CrudCustomer {
    static reads = async () => {
        log.info("reads() method async of CrudCustomer used")
        try {
            /*
            Executing (default):
            SELECT "cm_id", "firstname", "lastname" FROM "customers" AS "customers";
            Like :
            SELECT customers.cm_id,customers.firstname,customers.lastname FROM customers AS customers
            */
            return await customer.findAll().catch((error) => {
                log.debug('findAll() method await had problem : ' + error.message)
                throw error
            })

        } catch (error) {
            log.debug('reads() method async had problem : ' + error.message)
            throw error
        }
    }  // ended reads()

    static readsIncludeOrders = async () => {
        log.info("readsIncludeOrders() method async of CrudCustomer used")
        try {
            /*
            Executing (default):
            SELECT "customers"."cm_id", "customers"."firstname", "customers"."lastname", "orders"."od_id" AS "orders.od_id", "orders"."order_date" AS "orders.order_date", "orders"."cost" AS "orders.cost" FROM "customers" AS "customers" LEFT OUTER JOIN "orders" AS "orders" ON "customers"."cm_id" = "orders"."cm_id";
            Like :
            SELECT customers.cm_id,customers.firstname,customers.lastname,
            orders.od_id AS orders.od_id ,orders.order_date AS orders.order_date, orders.order_cost AS orders.order_cost
            FROM customers AS customers
            LEFT OUT JOIN orders As orders (เอา parent table เป็นหลัก)
            ON customers.cm_id = orders.cm_id
            */
            return await customer.findAll({
                include: [
                    {
                        /* way to include (second table) and exclude(ignore fields) */
                        model: orders,
                        attributes: {exclude: ['od_id', 'cm_id']}
                    }],
                // attributes : {exclude : ['od_id' , 'cm_id']} // focus ! attributes (property's this line its scope of entity customer)
            }).catch((error) => {
                log.debug('findAll({include :[{model,attributes}]}) method await had problem : ' + error.message)
                throw error
            })

        } catch (error) {
            log.debug('readsIncludeOrders() method async had problem : ' + error.message)
            throw error
        }
    }  // ended reads()

    static read = async (cm_id) => {
        log.info("read(pk) method async of CrudCustomer used")
        try {
            return await customer.findByPk(cm_id).catch((error) => {
                log.debug('findByPk(cm_id) method await had problem : ' + error.message)
                throw error
            })
        } catch (error) {
            log.debug('read(pk) method async had problem : ' + error.message)
            throw error
        }
    } // ended read(pk)

    static create = async (firstname, lastname) => {
        try {
            /*
            Executing (default):
            INSERT INTO "customers" ("cm_id","firstname","lastname") VALUES (DEFAULT,$1,$2) RETURNING "cm_id","firstname","lastname";
            */
            return await customer.create({firstname, lastname}).catch((error) => {
                log.debug('create([firstname,lastname]) method await had problem : ' + error.message)
                throw error
            })
        } catch (error) {
            log.debug('create(firstname , lastname) method async had problem : ' + error.message)
            throw error
        }
    }

    static update = async (firstname, lastname, cm_id) => {
        try {
            /* Executing (default): UPDATE "customers" SET "firstname"=$1,"lastname"=$2 WHERE "cm_id" = $3 */
            return await customer.findAll({where: {cm_id: cm_id}}).then(async (data) => {
                // use findAll() because i need to tell message when primary key doesn't exist
                if (data.length !== 0) {
                    await customer.update({firstname, lastname}, {where: {cm_id: cm_id}})
                    return `updated customer id ${cm_id}`
                } else {
                    return `not found customer id ${cm_id}`
                }
            }).catch((error) => {
                log.debug('findAll(where:pk) method async had problem : ' + error.message)
                throw error
            })
        } catch (error) {
            log.debug('update(firstname , lastname , cm_id) method async had problem : ' + error.message)
            throw error
        }
    }

    static delete = async (cm_id) => {
        try {
            /* Executing (default): SELECT "od_id", "order_date", "cost", "cm_id" FROM "orders" AS "orders" WHERE "orders"."cm_id" = '2'; */
            return await orders.findAll({where: {cm_id: cm_id}}).then(async (data) => {
                /* 2023-08-12 15:44:15 info [testing.js] : found orders 2 */
                log.info(`found orders ${cm_id}`)
                if (data.length !== 0) {
                    /* Executing (default): DELETE FROM "orders" WHERE "cm_id" = '2' */
                    return await orders.destroy({where: {cm_id: cm_id}}).then(async () => {
                        /* 023-08-12 15:44:15 info [testing.js] : destroy all in orders (customer id 2) */
                        log.info(`destroy all in orders (customer id ${cm_id})`)
                        /* Executing (default): DELETE FROM "customers" WHERE "cm_id" = '2' */
                        await customer.destroy({where: {cm_id: cm_id}})
                        return `deleted customer id ${cm_id}`
                    })
                } else {
                    await customer.destroy({where: {cm_id: cm_id}}) // destroy() have to set option where
                    return `deleted customer id ${cm_id}`
                }
            }).catch((error) => {
                log.debug('findAll(where:fk) method async had problem : ' + error.message)
                throw error
            })
        } catch (error) {
            log.debug('delete(cm_id) method async had problem : ' + error.message)
            throw error
        }
    }

}

module.exports = CrudCustomer