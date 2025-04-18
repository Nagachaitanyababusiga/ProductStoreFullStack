import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{
    timestamps:true //createdAt,updatedAt
});

const product = mongoose.model('Product',productSchema); //Product is the name of the collection in the database
// and also Product should be singular and first letter should be capital.

export default product;
