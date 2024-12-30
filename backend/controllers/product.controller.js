import Product from '../models/product.model.js';
import { mongoose } from 'mongoose';

//get all prodcuts
export const getProducts = async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success:true,data:products});
    }catch(error){
        console.log("Error in fetching products",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}
//create a product
export const createProduct = async(req,res)=>{
    const product=req.body;// user will send the data
    if(!product.name||!product.price||!product.image){
        return res.status(400).json({success:false,message:"All fields are required"});
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success:true,data:newProduct});
    }catch(error){
        console.log("Error in creating product",error.message); 
        res.status(500).json({success:false,message:"Internal Server Error"});  
    }
}
//update a product
export const updateProduct=async(req,res)=>{
    const {id}=req.params;
    const product=req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid product id"});  
    }

    try{
        const updatedProduct=await Product.findByIdAndUpdate(id,product,{new:true}); 
        //new feild if true is used to return the updated product and if false returns old document before update
        res.status(200).json({success:true,data:updatedProduct,message:"Product updated successfully"});    
    }catch(error){
        console.log("Error in updating product",error.message);
        res.status(500).json({success:false,message:"Server Error"});  
    }
}
//delete a product
export const deleteProduct=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid product id"});  
    }
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product deleted successfully"});
    }catch(error){
        console.log("Error in deleting product",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
}