/* This is file class for getting my log */
class Logging {
    get #winston() { // static private method
        const {createLogger, format, transports} = require('winston')
        return {createLogger, format, transports}
    }

    get #path() {
        return require('path')
    }

    static get log() {
        const logging = new Logging() // i set #winston , #path to be private method So i must create object to call them by . operator
        /* this is order logger { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 } */
        return logging.#winston.createLogger({
            level: 'silly',
            format: logging.#winston.format
                .combine(
                    /* set options for logging */
                    logging.#winston.format.label({label: logging.#path.basename(process.mainModule.filename)}),
                    logging.#winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                    logging.#winston.format.printf(info => `${info.timestamp} ${info.level} [${info.label}] : ${info.message}`)
                ),
            transports: [
                new logging.#winston.transports.Console
            ]
        }) // return
    }

}

module.exports = Logging
// Logging.log.info('test')