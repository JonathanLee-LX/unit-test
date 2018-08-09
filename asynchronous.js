const fs = require('fs');

module.exports = (fileName, cb) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if(err) throw new Error(err)
        data = JSON.parse(JSON.stringify(data))
        cb(data)
    })
}

// fs.readFile('./package.json', 'utf8', (err, data) => {
//     console.log(JSON.parse(data).name)
// })