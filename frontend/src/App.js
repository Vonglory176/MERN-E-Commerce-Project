import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import './App.css';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_men.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>

        <Routes>
          {/* Home & Categories */}
          <Route path='/' element={<Shop/>}/>
          <Route path='/men' element={<ShopCategory category="men" banner={men_banner}/>}/>
          <Route path='/women' element={<ShopCategory category="women" banner={women_banner}/>}/>
          <Route path='/kids' element={<ShopCategory category="kids" banner={kid_banner}/>}/>

          {/* Product */}
          <Route path='/product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>

          {/* Cart & Login/Signup */}
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
        </Routes>

        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
