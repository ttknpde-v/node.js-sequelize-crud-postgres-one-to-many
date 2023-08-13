const log = require('../log/logging').log
const application = require('../service/service_protocol').express()
const routers = require('../router/routers')
class Testing {
    constructor() {
        application.use('/api/customer',routers.routerCustomer)
        application.use('/api/order',routers.routerOrder)
        application.listen(3000 , (error) => {
            if (error) throw error
            else log.info(`you're on port 3000`)
        })
    }
}
new Testing()