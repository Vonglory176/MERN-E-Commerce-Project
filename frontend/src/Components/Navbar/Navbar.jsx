import React, { useContext, useState } from 'react' //Typing "rafc" will create a 'r.eact a.rrow f.unctional c.omponent'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
    const [menu, setMenu] = useState("shop")
    const {getTotalCartItems} = useContext(ShopContext)

    const categories = ["shop", "men", "women", "kids"]

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>

        <ul className="nav-menu">
            {categories.map((category, i) => (
                <li 
                key={i}
                onClick={() => setMenu(category)}>
                    <Link                     
                    to={category === "shop"? "/" : `/${category}`} 
                    title={category === "shop" ? "Browse all products" : `Browse products for ${category}`}
                    style={{textDecoration: "none"}}>
                        {category.toUpperCase()}{menu === category && <hr/>}
                    </Link>
                </li>
            ))}

            {/* <li onClick={() => setMenu("shop")}><Link to="/">Shop{menu === "shop" && <hr/>}</Link></li>
            <li onClick={() => setMenu("men")}><Link to="/men">Men{menu === "men" && <hr/>}</Link></li>
            <li onClick={() => setMenu("women")}><Link to="/women">Women{menu === "women" && <hr/>}</Link></li>
            <li onClick={() => setMenu("kids")}><Link to="/kids">Kids{menu === "kids" && <hr/>}</Link></li> */}
        </ul>

        <div className="nav-login-cart">
            <Link to="/login"><button>Login</button></Link>
            <Link to="/cart"><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar
