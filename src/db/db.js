const mongoose = require("mongoose")

atlas = "mongodb+srv://appu:appu@cluster0.vokno7s.mongodb.net/?retryWrites=true&w=majority"

mongoose.Promise = global.Promise;

mongoose.connect(atlas,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("mongodb connected")
})
.catch((e)=>console.log(e.mssage))