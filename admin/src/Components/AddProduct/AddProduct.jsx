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

  return (
    <div className='add-product'>

      {/* Name */}
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" name='name' placeholder='Type here' />
      </div>

      {/* Prices */}
      <div className="addproduct-price">        
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="text" name='old_price' placeholder='Type here' />
        </div>

        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="text" name='new_price' placeholder='Type here' />
        </div>
      </div>

      {/* Category */}
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select name="category" className='addproduct-selector'>
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
      <button className='addproduct-btn'>Add Product</button>

    </div>
  )
}

export default AddProduct
