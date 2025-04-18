import express from 'express'

const router=express.Router();  

import {createProduct, getProducts, updateProduct,deleteProduct} from '../controllers/product.controller.js';

//get products
router.get("/",getProducts);

//create product
router.post("/",createProduct);

//update product
//put to update the entire product
//patch to update only some fields
router.put("/:id",updateProduct);

//delete product
router.delete("/:id",deleteProduct); 



export default router;

