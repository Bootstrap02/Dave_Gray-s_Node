const {format} =  require('date-fns');
const {v4:uuid} = require ('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path =require('path');

const logEvents = async(msg, newFile) =>{
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logData = `${dateTime}, ${uuid()}, ${msg}\n`;
    console.log(logData)
    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
        await fsPromises.mkdir(path.join(__dirname, '..',  'logs'))}
        await fsPromises.appendFile(path.join(__dirname, '..',  'logs', newFile), logData);
    }catch  (err) {
        console.error(err)
    }
}

const logger = (req, res, next)=> {
    logEvents((`${req.method}\t ${req.headers.origin}\t ${req.url}`), 'newLogFile.txt')
    console.log(`${req.method}\t ${req.path}`)
    next()
}


module.exports = {logger, logEvents};