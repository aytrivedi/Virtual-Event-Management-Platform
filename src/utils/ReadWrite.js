const fs = require('fs')

class ReadWrite{
    static read(path){
        let data = fs.readFileSync(path, "utf8")
        return JSON.parse(data)
    }
    static write(path, data){
        fs.writeFileSync(path, JSON.stringify(data), "utf8")
    }
}
module.exports = ReadWrite;