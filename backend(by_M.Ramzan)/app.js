let express = require("express")
let app = express()
let connection = require("./database/db")
require("./models/schema")
let cors = require("cors")
app.use(cors());
app.use("/uploads",express.static('./uploads'))




let port = 3400

connection()



let route = require("./routes/index")

app.use("/multer",route)

app.listen(3400,()=>{
     console.log("The Server is Running At "+port)
})
