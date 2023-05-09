import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import Product from './Models/Product.js'
const app =express()
const port =4000
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());

mongoose 
.connect(
    "mongodb+srv://Asim:ksolkmNxyurqXAjG@crud.pcj84ky.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
app.get("/",(req,res)=>{
    res.send("Backend")
})
app.post("/product",async(req,res)=>{
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: "Product created successfully" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Products created failed" });
      }
})
app.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get products' });
    }
  })
  app.delete('/products/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      res.status(200).send(deletedProduct);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  app.put("/products/:id", async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const categories = req.body.categories;
    const price = req.body.price;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, { name, categories, price }, { new: true });
      res.status(200).send(updatedProduct);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // app.put('/products/:id', async (req, res) => {
  //   const id = req.params.id;
  //   try {
  //     const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
  //     res.status(200).send(updatedProduct);
  //   } catch (err) {
  //     res.status(500).send(err);
  //   }
  // });
  
app.listen(4000,console.log(`App listen ${port}`))