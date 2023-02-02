const express =require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


//middleware
app.use(express.json())
app.use(cors())

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:[true, "Please set a unique name"],
        minLength:[3, "Please set a minimum length 3 characters"],
        maxLength:[100, "Could not support more than 100 characters"]
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        min:[0, "couldn't set less than 0"]
    },
    unit:{
        type: String,
        required:true,
        enum: {
            value:"['kg' , 'liter', 'pcs']",
            message:"unit value can't be {value}, must be kg/liter/pcs"
        }
    },
    quantity:{
        type:Number,
        required:true,
        min:[0, "quantity can't be negative"],
        validate:{
            validator: (value)=>{
                const isInteger = Number.isInteger(value)
                if (isInteger){
                    return true
                }
                else{
                    return false
                }
            }
        },
        message:"quantity must be a integer value"
    },
    status:{
        type:String,
        required:true,
        enum:{
            value:'["In-stock", "Out-of-stock", "discontinued"]',
            message:"status can't be {value}"
        }
    },
    

},{
    timesstamps:true,
})


app.get("/", (req, res) => {
    res.send("Route is working! YAY!")
})

module.exports = app