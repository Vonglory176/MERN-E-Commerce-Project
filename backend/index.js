// INITIALIZATION ------------ (All backend code goes here)
const port = 4000
const express = require('express') 
const app = express() //Creating app instance
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path') // Provides access to backend directory in express app
const cors = require('cors')

app.use(express.json()) // Whatever request is gotten from response is parsed into json format
app.use(cors()) // Project will connect to express app on port 4000

// Database connection w/MongoDB
const applicationData = "e-commerce" // "This is a path that will add the data of the application" (The name of the project on site??)
const password = "password12345" // Would normally be in an ENV file
mongoose.connect(`mongodb+srv://Vonglory176:${password}@cluster0.okgld4b.mongodb.net/${applicationData}`)

// API Creation (RUN WITH --> "node .\index.js" from "backend" folder)
app.get("/",(req,res) => {
    res.send("Express App is Running") // Prints to screen // Can create multiple endpoint w/same api
})

// IMAGE STORAGE ENGINE ------------
const storage = multer.diskStorage({
    destination: './upload/images', // Path for storage folder

    filename: (req, file, cb) => { // Generating unique file name
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage: storage})

// Creating upload point for images (Video --> "https://youtu.be/y99YgaQjgx4?t=19210")
app.use('/images', express.static('upload/images')) // Used to generate image_url
app.post("/upload", upload.single('product'), (req,res) => { // "As our image is uploaded with the endpoint, at the same time, 'multer' is asigning a unique name and destination in disk storage"
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}` //Latter req gotten from "storage"
    })
})

// PRODUCT USE (MongoDB) ------------
// Product Schema
const Product = mongoose.model("Product", { // (Note the capitalization)
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,        
    },
    image: {
        type: String,
        required: true,        
    },
    category: {
        type: String,
        required: true,        
    },
    new_price: {
        type: Number,
        required: true,        
    },
    old_price: {
        type: Number,
        required: true,        
    },
    date: {
        type: Number,
        default: Date.now,        
    },
    available: {
        type: Boolean,
        default: true,
    },
})

// Product Upload API
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({}) //Collects all products in a single array
    let id = 1 // Default value
    
    // ID Generation
    if (products.length > 0) {
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0]
        id = last_product.id + 1 
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    })
    console.log(product)

    await product.save() //Saved in MongoDB Database
    console.log("Product saved in database")
    res.json({
        success: true,
        name: req.body.name
    })
})

// Product Deletion API (Using ID + Name)
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({id:req.body.id})
    res.json({
        success: true,
        name: req.body.name
    })
    console.log("Product removed from database")
})

// Get All Products API
app.get('/allproducts', async (req,res) => {
    let products = await Product.find({}) //Collects all products in a single array
    res.json({
        // success: true, // Not needed for GET request
        products: products
    })
    console.log("All products fetched from database")
})

// For server information use via terminal
app.listen(port, (error) => {
    if (!error) console.log("Server is running on port " + port)
    else console.log("Error: " + error)
})

