const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    uid: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Users" 
    },
    numberNames:[
        {
            phone:{type:String},
            name:{type:String}

        }
    ]
})

module.exports = mongoose.model("NumberSchema",schema)