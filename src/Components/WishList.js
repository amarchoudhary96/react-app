import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FcDisapprove } from "react-icons/fc";
import { removeitem } from "./features/wishListSlice";
import "./Wishlist.css";
import { RxCrossCircled } from "react-icons/rx";
import { updateid } from "./features/slideSlice";

const WishList = () => {
  const { wishlist } = useSelector((store) => store.wishlist);
  const dispatch = useDispatch();
  console.log(wishlist);

  const deleteItem = (id) => {
    dispatch(removeitem(id));
  };
  if (wishlist.length === 0) {
    return (
      <div className="empty-wishlist mt-32">
        <h2>Your Wishlist Is Empty</h2>
        <p>
          Add items that you like to your wishlist. Review them anytime and
          easily move them to the bag.
        </p>
        <Link to="/home">
          {" "}
          <button>CONTINUE SHOPPING</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-items mx-auto">
      {wishlist.map((item) => {
        return (
          <div className="wishlist-container" key={item.id}>
            <img src={item.image} alt="Product" />
            <div className="product-details">
              <RxCrossCircled
                className="cross-icon"
                onClick={() => deleteItem(item.id)}
              />
              <Link to={`/product/${item.id}`}>
                <button className="producttitle">
                  {item.title.slice(0, 20)}
                </button>
              </Link>
              <div className="price-container">
                <p className="salePrice">price: ₹{item.price}</p>
              </div>
            </div>
            <div className="move-bag">
              <Link to={`/product/${item.id}`}>
                <button
                  className="p"
                  onClick={() => dispatch(updateid(item.category))}
                >
                  Move To Bag
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
    
  );
};

export default WishList;
