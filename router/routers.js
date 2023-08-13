const log = require('../log/logging').log
const bodyParser = require('../service/service_protocol').bodyParser

const routerCustomer = require('../service/service_protocol').express.Router()
const routerOrder = require('../service/service_protocol').express.Router()


const crudCustomer = require('../crud/one/crud_customer')
const crudOrder = require('../crud/many/crud_order')


/* set meddler ware*/
routerCustomer.use(bodyParser.json())
routerCustomer.use(bodyParser.urlencoded({extended: true}))
routerOrder.use(bodyParser.json())
routerOrder.use(bodyParser.urlencoded({extended: true}))

/* customer */
routerCustomer.post('/create', async (req, res) => {
    try {
        const {firstname, lastname} = req.body // [] means inside is arrays
        await crudCustomer.create(firstname, lastname).then((result) => {
            return res.status(201).json(
                {
                    status: "created",
                    data: result
                })
        }).catch((errors) => {
            log.debug(`response from get method on url /create had problem : ${errors.message}`)
            throw errors
        })
    } catch (errors) {
        log.debug(`post method on url /create had problem  : ${errors.message}`)
        throw errors
    }
})

routerCustomer.get('/reads', async (req, res) => {
    try {
        await crudCustomer.reads().then((result) => {
            return res.status(202).json(
                {
                    status: "accepted",
                    data: result
                })
        }).catch((errors) => {
            log.debug(`response from get method on url /reads had problem : ${errors.message}`)
            throw errors
        })
    } catch (errors) {
        log.debug(`get method on url /reads had problem  : ${errors.message}`)
        throw errors
    }
})

routerCustomer.get('/reads-include-order', async (req, res) => {
    try {
        await crudCustomer.readsIncludeOrders().then((result) => {
            return res.status(202).json(
                {
                    status: "accepted",
                    data: result
                })
        }).catch((errors) => {
            log.debug(`response from get method on url /reads-include-order had problem : ${errors.message}`)
            throw errors
        })
    } catch (errors) {
        log.debug(`get method on url /reads-include-order had problem  : ${errors.message}`)
        throw errors
    }
})

routerCustomer.get('/read/(:pk)', async (req, res) => {
    try {
        await crudCustomer.read(req.params['pk']).then((result) => {
            return res.status(202).json(
                {
                    status: "accepted",
                    data: result
                })
        }).catch((errors) => {
            log.debug(`response from get method on url /read/(:pk) had problem : ${errors.message}`)
            throw errors
        })
    } catch (errors) {
        log.debug(`get method on url /read/(:pk) had problem  : ${errors.message}`)
        throw errors
    }
})

routerCustomer.put('/update/(:pk)', async (req, res) => {
    try {
        const {firstname, lastname} = req.body // [] means inside is arrays
        await crudCustomer.update(firstname, lastname, req.params['pk']).then((result) => {
            return res.status(202).json(
                {
                    status: "accepted",
                    data: result
                })
        }).catch((errors) => {
            log.debug(`response from get method on url /update/(:pk) had problem : ${errors.message}`)
            throw errors
        })
    } catch (errors) {
        log.debug(`put method on url /update/(:pk) had problem  : ${errors.message}`)
        throw errors
    }
})

routerCustomer.delete('/delete/(:pk)', async (req, res) => {
    try {
        await crudCustomer.delete(req.params['pk']).then((result) => {
            return res.status(200).json(
                {
                    status: "ok",
                    data: result
                })
        }).catch((errors) => {
            log.debug(`response from get method on url /delete/(:pk) had problem : ${errors.message}`)
            throw errors
        })
    } catch (errors) {
        log.debug(`delete method on url /delete/(:pk) had problem  : ${errors.message}`)
        throw errors
    }
})

/* order */
routerOrder.post('/create', async (req, res) => {
    try {
        const {cost, cm_id} = req.body // [] means inside is arrays
        await crudOrder.create(cost, cm_id).then((result) => {
            return res.status(201).json(
                {
                    status: "created",
                    data: result
                })
        }).catch((errors) => {
            log.debug(`response from get method on url /create had problem : ${errors.message}`)
            throw errors
        })
    } catch (errors) {
        log.debug(`post method on url /create had problem  : ${errors.message}`)
        throw errors
    }
})

routerOrder.get('/reads', async (req, res) => {
    try {
        await crudOrder.reads().then((result) => {
            return res.status(202).json(
                {
                    status: "accepted",
                    data: result
                })
        }).catch((errors) => {
            log.debug(`response from get method on url /reads had problem : ${errors.message}`)
            throw errors
        })
    } catch (errors) {
        log.debug(`get method on url /reads had problem  : ${errors.message}`)
        throw errors
    }
})

routerOrder.get('/read/(:od_id)', async (req, res) => {
    try {
        await crudOrder.read(req.params['od_id']).then((result) => {
            return res.status(202).json(
                {
                    status: "accepted",
                    data: result
                })
        }).catch((errors) => {
            log.debug(`response from get method on url /read-include-customer/(:pk) had problem : ${errors.message}`)
            throw errors
        })
    } catch (errors) {
        log.debug(`get method on url /read-include-customer/(:pk) had problem  : ${errors.message}`)
        throw errors
    }
})

routerOrder.put('/update/(:od_id)', async (req, res) => {
    try {
        const {order_date, cost, cm_id} = req.body
        await crudOrder.update(req.params['od_id'], cm_id, cost, order_date).then((result) => {
            return res.status(202).json(
                {
                    status: "accepted",
                    data: result
                })
        }).catch((errors) => {
            log.debug(`response from get method on url /update/(:od_id) had problem : ${errors.message}`)
            throw errors
        })
    } catch (errors) {
        log.debug(`get method on url /update/(:od_id) had problem  : ${errors.message}`)
        throw errors
    }
})

routerOrder.delete('/delete/(:pk)', async (req, res) => {
    try {
        await crudOrder.delete(req.params['pk']).then((result) => {
            return res.status(200).json(
                {
                    status: "ok",
                    data: result
                })
        }).catch((errors) => {
            log.debug(`response from delete method on url /delete/(:pk) had problem : ${errors.message}`)
            throw errors
        })
    } catch (errors) {
        log.debug(`delete method on url /delete/(:pk) had problem  : ${errors.message}`)
        throw errors
    }
})
module.exports = {
    routerOrder,
    routerCustomer
}