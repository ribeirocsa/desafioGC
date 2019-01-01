const { createLogger, format, transports } = require('winston');
const { combine, timestamp, simple, printf } = format;

const fs = require('fs');
const logFolder = './logs';

if (!fs.existsSync(logFolder)){
    fs.mkdirSync(logFolder);
}

module.exports = createLogger({
    level: 'info',
    format: combine(
        simple(),
        timestamp(),
        printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.File(
            {
                filename: `${__dirname}/../logs/error.log`,
                level: 'error',
                maxFiles: 2,
                maxsize: 5120000
            }),
        new transports.File(
            {
                level: 'debug',
                filename: `${__dirname}/../logs/combined.log`,
                maxFiles: 2,
                maxsize: 5120000
            }),
        new transports.Console(
            {
                level: 'debug',
            })
    ]
});
