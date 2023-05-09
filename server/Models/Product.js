
import mongoose from 'mongoose'

const { Schema, model } = mongoose;

const ProductsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    categories: { type: String, required: true },
    price: { type: String, required: true }
});

const Product = model("Product", ProductsSchema);

export default Product;
