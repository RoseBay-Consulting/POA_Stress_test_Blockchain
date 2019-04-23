const fs = require('fs')
const csvWriter = require('csv-write-stream')
const config = require('../config/config')



module.exports = {
    saveInput: (fileName, result) => {
        const file = `${__dirname}/../data/${fileName}.csv`

        kyz = Object.keys(result);


        if (!fs.existsSync(file) && result)
            writer1 = csvWriter({
                headers: kyz
            });
        else
            writer1 = csvWriter({
                sendHeaders: false
            });

        writer1.pipe(fs.createWriteStream(file, {
            flags: 'a'
        }))
        writer1.write(result)
        writer1.end()

    },
    saveLogs: (result, tps) => {
        const file = `${__dirname}/../data/${tps}tps_web3output.csv`
        if (!fs.existsSync(file) && result)
            writer = csvWriter({
                headers: ["lognumber", "logtimestamp1", "logtimestamp2"]
            });
        else
            writer = csvWriter({
                sendHeaders: false
            });
        const writeData = {
            lognumber: result.lognumber,
            logtimestamp1: result.logtimestamp1,
            logtimestamp2: result.logtimestamp2
        }
        writer.pipe(fs.createWriteStream(file, {
            flags: 'a'
        }))
        writer.write(writeData)
        writer.end()
    },

    saveBlockInfo: (result) => {
        const file = `${__dirname}/../data/blockinfo.csv`
        if (!fs.existsSync(file) && result)
            writer2 = csvWriter({
                headers: ["blockNumber", "transactionLength", "gasUsed", "timestamp", "blockSize"]
            });
        else
            writer2 = csvWriter({
                sendHeaders: false
            });
        const writeData = {
            blockNumber: result.number || "na",
            transactionLength: result.transactions.length || 0,
            gasUsed: result.gasUsed || 0,
            timestamp: result.timestamp || "na",
            blockSize: result.size || "na"
        }
        writer2.pipe(fs.createWriteStream(file, {
            flags: 'a'
        }))
        writer2.write(writeData)
        writer2.end()


    },




    /**
     * Represents a book.
     * @param {integer} length - The length of the random string to generate.
     */

    genRandomStr: () => {

            return '0x' + Math.floor(Math.random() * 10 + Math.random() * 10 + Math.random() * 1000);


        }

        ,

    /**
     * Returns the current date and date 
     */



    getCurentDateTime: () => {

        return new Date().getTime();

    },
    increment: (i) => {
        return i + 1;
    },


    /**
     * Saves the dynamically generated random data along with the timestamp in csv file
     * @param {String} textToSave - The concatinated tex to save.
     */

    saveInputToCsv: (textToSave, file) => {

        fs.appendFile(`${__dirname}/../outputs/${file}`, textToSave + '\n', err => {

            if (!err) {

                //  console.log('Wrote to file')

            } else {

                console.log(err)

            }


        })



    }



}