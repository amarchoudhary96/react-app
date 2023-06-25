import logo from "./logo.svg";
import "./App.css";
import { Home, Login, Navbar, PgFoF, Signup } from "./Components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./Components/Cart";
import UserProfile from "./Components/UserProfile";
import Addproducts from "./Components/Addproducts";
import AllProductsPages from "./Components/Some-products-container/AllProductsPages";
import SpecificProduct from "./Components/Some-products-container/SpecificProduct";
import WishList from "./Components/WishList";
import Footer from "./Components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="mt-[80px]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cartdata" element={<Cart />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/addproducts" element={<Addproducts />} />
        <Route path="/category/:id" element={<AllProductsPages/>} />
        <Route path="/product/:id" element={<SpecificProduct/>} />
        <Route path="/wishlist" element={<WishList/>} />
        
        <Route path="/*" element={<PgFoF />} />
      </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
