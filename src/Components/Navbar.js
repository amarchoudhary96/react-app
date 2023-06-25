import React, { useEffect, useState } from "react";
import { Link, Navigate, Router, useLocation, useNavigate } from "react-router-dom";
import applogo from "../Components/assets/applogo.png";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { auth, db } from "../FirebaseConfigs/FirebaseConfig";
import { QuerySnapshot, collection, getDocs } from "firebase/firestore";
import { BsBag } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { updatesearch } from "./features/filterSlice";
import { SlHeart } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { RxCrossCircled } from "react-icons/rx";
const Navbar = () => {
  const location = useLocation();
  const shouldRenderNavbar = location.pathname !== "/login" && location.pathname !== "/signup";
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.cart);

  const Navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      Navigate("/login");
    });
  };

  const handleChange = (e) => {
    setText(e.target.value);
    dispatch(updatesearch(e.target.value.toLowerCase()));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
    {shouldRenderNavbar &&
      <nav className="navbar ">
        
          < div  className={`${isOpen ? 'sidebar show-sidebar' : 'sidebar'}`} >
            <button
              className="sidebarclose-btn"
              onClick={() => setIsOpen(false)}
            >
              <RxCrossCircled />
            </button>

            <div className="leftContainer">
              <img src={applogo} onClick={() => setIsOpen(false)} />
            </div>
            <div className="product-type">
              <h1>Category</h1>
              <Link to="/category/Mobile" onClick={() => setIsOpen(false)} >
                <button>Mobiles</button>
              </Link>
              <Link to="/category/Laptop" onClick={() => setIsOpen(false)} >
                <button>Laptops</button>
              </Link>
              <Link to="/category/Camera" onClick={() => setIsOpen(false)} >
                <button>Cameras</button>
              </Link>
              <Link to="/category/Shoes" onClick={() => setIsOpen(false)} >
                <button>Shoes</button>
              </Link>
            </div>
            <div className="sidebar-links ">
              <Link to="/" onClick={() => setIsOpen(false)} >
                <button>Home</button>
              </Link>
              <Link to="/addproducts" onClick={() => setIsOpen(false)} >
                  <button>Sell</button>
                </Link>
                <Link to="/userprofile" onClick={() => setIsOpen(false)} >
                  <CgProfile className="profile-icon text-black bg-white " />
                </Link>
              {!user ? (
                <Link to="/login" onClick={() => setIsOpen(false)} >
                  <button>Login</button>
                </Link>
              ) : (
                <button className="logout-btn" onClick={handleLogout }  >
                  Logout
                </button>
              )}
              </div>
            
          </div>
        

        <div className="navbar-center">
          <button className="nav-toggle" onClick={() => setIsOpen(true)}>
            <FaBars />
          </button>
          <div className="leftContainer">
            <img src={applogo} />
          </div>
          <div className="product-types hidden sm:block">
            <Link to="/category/Mobile">
              <button>Mobiles</button>
            </Link>
            <Link to="/category/Laptop">
              <button>Laptops</button>
            </Link>
            <Link to="/category/Camera">
              <button>Cameras</button>
            </Link>
            <Link to="/category/Shoes">
              <button>Shoes</button>
            </Link>
          </div>
          <div className="rightContainer">
            {!user && (
              <nav>
                <div className="flex items-center justify-center bg-white px-4 py-2 ">
                  <div
                    className={`flex items-center ${
                      isClicked ? "bg-white" : "bg-gray-50"
                    } rounded-lg`}
                  >
                    <div className="bg-transparent text-black rounded-l-lg  items-center px-1 py-2  hidden sm:flex">
                      <BiSearch className="text-black" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search for products, brands and more"
                      className=" input  bg-transparent text-black rounded-r-lg px-4 py-2 focus:outline-none  "
                      onClick={handleClick}
                      value={text}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <Link to="/" className="hidden sm:block">
                  <button>Home</button>
                </Link>

                <div className="flex items-center  justify-center mr-1 ">
                  <div
                    className=" flex justify-center items-center h-16 "
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <CgProfile className="text-2xl text-black cursor-pointer hidden sm:block " />
                    {isHovered && (
                      <div className=" absolute top-16  w-24 h-20 bg-white p-2 rounded-lg shadow-md flex flex-col justify-center item-center z-50 cursor-pointer">
                        <Link to="/userprofile">
                          <button className="profile-icon-login">
                            profile
                          </button>
                        </Link>
                        <Link to="/login" className="login-button">
                  <button >Login</button>
                </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="cart-btn hidden sm:block">
                  <Link to="/cartdata">
                    <BsBag className="text-black" />
                  </Link>
                  <button className="cart-icon-css">{cart.length}</button>
                </div>
                <div className="wishlist text-white">
                  <Link to="/wishlist">
                    <button>
                      <SlHeart />
                    </button>
                  </Link>
                </div>
                
              </nav>
            )}
            {user && (
              <nav>
                <div className="flex items-center justify-center bg-white px-4 py-2 ">
                  <div
                    className={`flex items-center ${
                      isClicked ? "bg-white" : "bg-gray-50"
                    } rounded-lg`}
                  >
                    <div className="bg-transparent text-black rounded-l-lg flex items-center px-4 py-2">
                      <BiSearch className="text-black" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search for products, brands and more"
                      className="input  bg-transparent text-black rounded-r-lg px-4 py-2 focus:outline-none  "
                      onClick={handleClick}
                      value={text}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <Link to="/" className="hidden sm:block">
                  <button>Home</button>
                </Link>
                <Link to="/addproducts" className="hidden sm:block">
                  <button>Sell</button>
                </Link>

                <div className="flex items-center  justify-center mr-1 ">
                  <div
                    className=" flex justify-center items-center h-16 "
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <CgProfile className="text-2xl text-black cursor-pointer hidden sm:block " />
                    {isHovered && (
                      <div className=" absolute top-16  w-24 h-20 bg-white p-2 rounded-lg shadow-md flex flex-col justify-center item-center z-50 cursor-pointer">
                        <Link to="/userprofile">
                          <button className="profile-icon-login">
                            profile
                          </button>
                        </Link>
                        <button className="logout-btn" onClick={handleLogout}>
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="wishlist text-white">
                  <Link to="/wishlist">
                    <button>
                      <SlHeart />
                    </button>
                  </Link>
                </div>
                <div className="cart-btn  hidden sm:block">
                  <Link to="/cartdata">
                    <BsBag className="text-black" />
                  </Link>
                  <button className="cart-icon-css">{cart.length}</button>
                </div>
              </nav>
            )}
          </div>
        </div>
      </nav>
}
    </>
                    
  );
};

export default Navbar;
