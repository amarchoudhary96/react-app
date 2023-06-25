import React, { useState } from "react";
import "./productcontainer.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatewishlist, wishbutton } from "../features/wishListSlice";
import { FcLike } from "react-icons/fc";
import { SlHeart } from "react-icons/sl";

const ProductContainer = ({ product }) => {
  console.log(product);
  const dispatch = useDispatch();
  const { wishlist } = useSelector((store) => store.wishlist);
  let overalltax = 10 / 100;
  let overcommition = 10 / 100;
  let extraforfun = 10 / 100;

  let mrp = parseInt(product.price);
  mrp = mrp + overalltax * mrp + overcommition * mrp + extraforfun * mrp;
  const saleprice = mrp - extraforfun * mrp;
  const addtowishlist = () => {
    dispatch(updatewishlist(product));
  };
  const isWishTrue = wishlist.some((item) => item.id === product.id);

  return (
    <div className="products ">
      <div className="product-container">
        <img src={product.image} />
        <div className="product-details">
          <Link to={`/product/${product.id}`}>
            <button className="producttitle">
              {product.title.slice(0, 20)}
            </button>
          </Link>

          <p className="salePrice">Price : ₹{saleprice}</p>

          <button
            className={
              isWishTrue
                ? "flex items-center text-xs text-white whitespace-nowrap bg-black border-2 border-gray-400 px-3 py-1 rounded-md "
                : "flex items-center text-xs whitespace-nowrap bg-white border-2 border-gray-400 px-4 py-1 rounded-md "
            }
            onClick={addtowishlist}
          >
            {isWishTrue ? "wishlisted" : "wishlist"}
            {isWishTrue ? (
              <FcLike className="ml-2 " />
            ) : (
              <SlHeart className="ml-3" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;
