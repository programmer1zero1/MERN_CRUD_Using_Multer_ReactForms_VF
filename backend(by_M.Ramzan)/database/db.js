let mongoose = require("mongoose")

let connection = async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/MERN_CRUD")
    console.log("Db Connected")
}

module.exports = connection

