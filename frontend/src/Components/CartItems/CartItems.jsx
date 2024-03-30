import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const {all_product, cartItems, addToCart, removeCart} = useContext(ShopContext)
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />

        {all_product.map((item) => {
            if (cartItems[item.id] > 0) {
                return (
                    <div className="cartitems-format">
                        <img src={item.image} alt="" className="carticon-product-icon" />
                        <p>{item.name}</p>
                        <p>${item.new_price}</p>
                        <button className='cartitems-quantity'>{cartItems[item.id]}</button>
                        <p>${item.new_price * cartItems[item.id]}</p>
                        <img className='cartitems-remove-icon' src={remove_icon} onClick={() => removeCart(item.id)} alt="" /> {/* cartItems.id */}
                    </div>
                )
            }
            return null
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${0}</p> {/* Needs context value */}
                    </div>
                    <hr />

                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />

                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${0}</h3> {/* Needs context value */}
                    </div>

                    <button>PROCEED TO CHECKOUT</button>
                </div>
            </div>

            <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='promo code' />
                    <button>Submit</button>
                </div>
            </div>          
        </div>
    </div>
  )
}

export default CartItems
