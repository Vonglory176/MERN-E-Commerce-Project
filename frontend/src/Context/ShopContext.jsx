import React, {createContext, useEffect, useState} from "react"
// import all_product from '../Components/Assets/all_product.js'


// Creating a new Context object for the shop. This will be used to pass data deeply throughout the component tree without having to explicitly pass props down at every level.
export const ShopContext = createContext(null);

const getDefaultCart = () => { //On initialization, create a list of all products with quantity 0
    let cart = {}
    // for (let i = 0; i < all_product.length+1; i++) {
    for (let i = 0; i < 300+1; i++) {
        cart[i] = 0
    }
    return cart
}

// This component will wrap part of our app where we want the shop's data to be accessible.
const ShopContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([])
    const [cartItems, setCartItems] = useState(getDefaultCart())

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
        .then((response) => response.json())
        .then((data) => setAll_Product(data.products))
    }, [])

    const addToCart = (itemId) => {
        setCartItems(prev => ({...prev, [itemId]: prev[itemId] + 1})) // Adding to the selected item        
    }
    
    const removeCart = (itemId) => {
        setCartItems(prev => ({...prev, [itemId]: prev[itemId] - 1})) // Negating from the selected item        
    }

    // useEffect(() => {
    //     console.log(cartItems)
    // }, [cartItems])

    const getTotalCartAmount = () => {
        let totalAmount = 0

        for (const item in cartItems) { // The use of const is correct for defining item in the loop because item will be a new binding in each iteration of the loop.
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        return totalAmount // Shouldn't this be outside the loop?
    }

    const getTotalCartItems = () => {
        let totalItems = 0

        for (const item in cartItems) {
            if (cartItems[item] > 0) totalItems += cartItems[item]
        }
        return totalItems
    }

    const contextValue = { all_product, cartItems, addToCart, removeCart, getTotalCartAmount, getTotalCartItems }

    // Returning the Provider component from ShopContext. This component accepts a `value` prop to be passed to consuming components that are descendants of this Provider.
    return (
        <ShopContext.Provider value={contextValue}>
            
            {props.children} {/* Renders whatever components are passed within <ShopContextProvider></ShopContextProvider> */}
        </ShopContext.Provider>    
    );
}

// Exporting ShopContextProvider so it can be used around the app to wrap parts of the app where we need access to the shop context.
export default ShopContextProvider;