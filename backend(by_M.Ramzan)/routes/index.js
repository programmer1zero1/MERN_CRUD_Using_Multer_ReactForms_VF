let express = require("express")
let route = express()
let bodyParser = require("body-parser")
route.use(bodyParser.json())
route.use(bodyParser.urlencoded({extended:true}))
let path = require("path")
let scheme = require("../models/schema")
let fs = require("fs")

let multer = require("multer")
// const { Router } = require("express")


let storage = multer.diskStorage({
    destination:function(req,file,cb){
        // let imagepath = path.join(__dirname,"./uploads")
        // cb(null,imagepath)

        cb(null ,"./uploads")
    },
    filename: function(req,file,cb){
        const newfilename = Date.now()+'-'+file.originalname;                                    
        cb(null,newfilename)
    }

})

let typefilter = (req,file,cb) => {
    if(file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg" ){
        cb(null,true)
    }else{
        cb(new Error("Image Accepted just with the extesion png,jpg and jpeg"))
    }

}

let maxSize = 1*1024*1024


let upload = multer({
    storage:storage,
    fileFilter:typefilter,
    limits:{fileSize:maxSize}
})


// route.use("/",(req,res)=>{
//     res.send("The App is showing throught routing")
// })

route.post("/createdata",upload.single("image"),async(req,res)=>{
   try{
    let dataindb = new scheme({
        pname : req.body.pname,
        description : req.body.description,
        price:req.body.price,
        image:req.file.filename,   //whenever there is a image we will write it as it is
        languages:req.body.language.split(','),
        gender:req.body.gender,
        degree:req.body.degree,
        address:req.body.address  


    })
    let result = await dataindb.save()
    res.json(result)
   }
   catch(e){
    console.log(e)
   }
})


route.get("/show",async(req,res)=>{
    let result = await scheme.find().sort("-_id")
    res.send(result)
})


route.get("/findone/:id",async(req,res)=>{
    let result = await scheme.findOne({_id:req.params.id})
    res.send(result)
})


route.delete("/deleteone/:id",async(req,res)=>{
    let result = await scheme.deleteOne({_id:req.params.id})
    res.send(result)
})


route.delete("/deletemultiple",async(req,res)=>{
    let allId = req.body        //req.body / req.param / req.query always take or give objects they dont identify arrays
    // let allIds = req.body.ids        //req.body / req.param / req.query always take or give objects they dont identify arrays
    console.log(allId)
    let allIds = allId.ids
    console.log(allIds)

    let result = await scheme.deleteMany({ _id: { $in: allIds } });
    res.send(result)
   
})


// {// route.delete("/deletemultiple/:check",async(req,res)=>{    // // also works but not so much accurate
//     let id = req.params.check
//     let data = id.split(",")
//     console.log(id)
//     console.log(data)
//     for(i=0;i<data.length;i++){
//         let result = await scheme.deleteOne({_id:data})
//         console.log("Delted Item",result)
//         if(i===data.length){
//             res.send(result)
//         }
//     }
// })}


route.delete("/deleteall",async(req,res)=>{
    let result = await scheme.deleteMany({});
    res.send(result)
   
})



route.put("/updateone/:id",upload.single("image"),async(req,res)=>{
    try{
        let result = await scheme.updateOne({_id:req.params.id},{
            $set:{
        pname : req.body.pname,
        description : req.body.description,
        price:req.body.price,
        image:req.file.filename,        // while updating always choose a file otherwise it always give an error 
        language:req.body.language.split(','),
        gender:req.body.gender,
        degree:req.body.degree,
        address:req.body.address    
        }
        })     //whenever there is a image we will write it as it is
     
    //  let response = await result.save();    //ther is o need to save it cause set is doing the same thing
    //  res.json(response);
     res.json(result);
    }
    catch(e){
     console.log(e)
    }
 })








module.exports = route