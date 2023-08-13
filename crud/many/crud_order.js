// call static method by . operator
const moment = require("moment");
const customer = require('../../entities/one/customer').customer
const order = require('../../entities/many/order').order
const log = require('../../log/logging').log

// order.hasMany(customer, {foreignKey: 'cm_id'})

class CrudOrder {
    static dateString = moment(new Date()).format('YYYY-MM-DD');
    static create = async (cost, cm_id) => {
        log.info("create(order_date,cost,cm_id) method async of CrudOrder used")
        const order_date = this.dateString
        try {
            return await customer.findAll({where: {cm_id: cm_id}}).then(async (data) => {
                if (data.length !== 0) {
                    return await order.create({order_date, cost, cm_id}).catch((error) => {
                        log.debug('create(order_date,cost,cm_id) method await had problem : ' + error.message)
                        throw error
                    })
                } else {
                    log.info(`customer id ${cm_id} don't exist`)
                    return `customer id ${cm_id} don't exist`
                }
            })
        } catch (error) {
            log.debug('create(order_date,cost,cm_id) method async had problem : ' + error.message)
            throw error
        }
    }

    static reads = async () => {
        log.info("reads() method async of CrudOrder used")
        try {
            return await order.findAll().catch((error) => {
                log.debug('findAll() method await had problem : ' + error.message)
                throw error
            })

        } catch (error) {
            log.debug('reads() method async had problem : ' + error.message)
            throw error
        }
    }  // ended reads()

    static read = async (od_id) => {
        log.info("read(od_id) method async of CrudCustomer used")
        try {
            return await order.findByPk(od_id).catch((error) => {
                log.debug('findByPk(od_id) method await had problem : ' + error.message)
                throw error
            })

        } catch (error) {
            log.debug('read(od_id) method async had problem : ' + error.message)
            throw error
        }
    }  // ended reads()

    static update = async (od_id, cm_id, cost, order_date) => {
        log.info("update(od_id,cm_id,cost,order_date) method async of CrudCustomer used")
        try {
            return await customer.findAll({where: {cm_id: cm_id}}).then(async (data_c) => {
                if (data_c.length !== 0) {
                    return await order.findAll({where: {od_id: od_id}}).then(async (data_o) => {
                        if (data_o.length !== 0) {
                            await order.update({order_date, cost, cm_id}, {where: {od_id: od_id}})
                            return `updated order id ${od_id}`
                        } else {
                            log.info(`order id ${od_id} don't exist`)
                            return `order id ${od_id} don't exist`
                        }
                    }).catch((error) => {
                        log.debug('findAll({where: {od_id: od_id}}) had problem : ' + error.message)
                        throw error
                    })
                } else {
                    log.info(`customer id ${cm_id} don't exist`)
                    return `customer id ${cm_id} don't exist`
                }
            }).catch((error) => {
                log.debug('findAll({where: {cm_id: cm_id}}) had problem : ' + error.message)
                throw error
            })

        } catch (error) {
            log.debug('update(od_id,cm_id,cost,order_date) method async had problem : ' + error.message)
            throw error
        }
    }  // ended reads()

    static delete = async (od_id) => {
        log.info("delete(od_id) method async of CrudOrder used")
        try {
            return await order.findAll({where: {od_id: od_id}}).then(async (data) => {
                if (data.length !== 0) {
                    await order.destroy({where: {od_id: od_id}}).catch((error) => {
                        log.debug('delete(od_id) method await had problem : ' + error.message)
                        throw error
                    })
                    return `deleted order id ${od_id}`
                } else {
                    log.info(`order id ${od_id} don't exist`)
                    return `order id ${od_id} don't exist`
                }
            })
        } catch (error) {
            log.debug('delete(od_id) method async had problem : ' + error.message)
            throw error
        }
    }

}

module.exports = CrudOrder