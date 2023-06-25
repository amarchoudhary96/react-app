import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import { Link } from "react-router-dom";
import emptybag from "./assets/emptybag.jpg"
import { MdDelete } from "react-icons/md";
import { removecart } from "./features/cartSlice";

const Cart = () => {
  const dispatch=useDispatch()
  const { cart } = useSelector((store) => store.cart);
  const { user } = useSelector((store) => store.user);

  let subtotal = 0;
  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
  });
  const deleteCart = (id) => {
    dispatch(removecart(id));
  };
  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <img src={emptybag} alt="" />
        <h2>Hey,It Feels too Light</h2>
        <p >there is nothing in your bag ,fill it</p>
      <Link to="/home">  <button>ADD ITEM FROM WISHLIST</button></Link>
      </div>
    )
    
  }

  return (
    <div className="cart-container">
      <div className="cart-header justify-evenly w-full mt-8 hidden sm:flex">
        <h5 className="w-1/4">Item</h5>
        <h5 className="w-1/4">Price</h5>
        <h5 className="w-1/4">Quantity</h5>
        <h5 className="w-1/4">Subtotal</h5>
        <span></span>
      </div>
      <hr className="hidden sm:block" />
      {cart.map((item) => {
        const { image, id, price, quantity, title } = item;
        const total = price * quantity;

        return (
          <div key={id} className="cart-item flex justify-evenly items-center pb-2">
            <div className="title w-1/4 md-flex flex-row gap-2 mb-2 pt-6">
              <img src={image} alt={title} className="w-12" />
              <h5 className="productTitle">{title.slice(0, 20)}</h5>
            </div>
            <h5 className="price-small w-1/4 ml-4">{price}</h5>
            <h5 className="w-1/4 ml-14">{quantity}</h5>
            <h5 className="w-1/4 hidden sm:block" >{total}</h5>
            <MdDelete className="delete-icon" onClick={()=>deleteCart(id)}/>
          </div>
        );
      })}
      <div className="subtotal-main">
      <div className="subtotal">
        <article>
          <h5>
            Subtotal: <span >{subtotal}</span>
          </h5>
          <p>
            Shipping Fee: <span>150</span>
          </p>
          <hr />
          <h4>
            Order Total: <span>{subtotal + 150}</span>
          </h4>
        </article>
        {user ? (
          <Link to="/checkout" className="btn">
            <button className="subtotal-btn">Proceed to Checkout</button>
            
          </Link>
        ) : (
          <Link to="/login" >
           <button className="subtotal-btn">Login</button> 
          </Link>
        )}
      </div>
      </div>
    </div>
  );
};

export default Cart;
