import React, { useState } from 'react'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
  const [image, setImage] = useState(false)
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "men",
    old_price: "",
    new_price: ""
  })

  const imageHandler = (e) => {
    const newImage = e.target.files[0]
    if (newImage) setImage(newImage)
  }

  const changeHandler = (e) => {
    setProductDetails(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const Add_Product = async () => {
    // console.log(productDetails)
    let responseData
    let product = productDetails

    let formData = new FormData()
    formData.append("product", image)

    await fetch('http://localhost:4000/upload', { //Sending picture to backend to be uploaded and saved via Multer
      method: 'POST',
      headers: {
        Accept:'application/json',
      },
      body: formData
    })
    .then((res) => res.json())
    .then((data) => responseData = data) // Getting a url for the newly uploaded image

    console.log(responseData)
    if (responseData.success) {
      product.image = responseData.image_url // If successful, save image_url to the new product
      console.log(product)

      await fetch('http://localhost:4000/addproduct', { // Send the completed product to the backend to be uploaded to MongoDB
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      })
      .then((res) => {res.json()})
      .then((data) => {
        alert(data.success? "Product Added" : "Product upload failed") 
      })
    }
    else alert("Image upload failed")
  }

  return (
    <div className='add-product'>

      {/* Name */}
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" value={productDetails.name} onChange={changeHandler} name='name' placeholder='Type here' />
      </div>

      {/* Prices */}
      <div className="addproduct-price">        
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="text" value={productDetails.old_price} onChange={changeHandler} name='old_price' placeholder='Type here' />
        </div>

        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="text" value={productDetails.new_price} onChange={changeHandler} name='new_price' placeholder='Type here' />
        </div>
      </div>

      {/* Category */}
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select name="category" value={productDetails.category} onChange={changeHandler} className='addproduct-selector'>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      {/* Image */}
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
      </div>

      {/* Add Product */}
      <button className='addproduct-btn' onClick={Add_Product}>Add Product</button>

    </div>
  )
}

export default AddProduct
