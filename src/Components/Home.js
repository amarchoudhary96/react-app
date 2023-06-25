import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import { auth, db } from "../FirebaseConfigs/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./features/userSlice";

import "./home.css";
import { updatewishlist } from "./features/wishListSlice";
import { Link } from "react-router-dom";
import { SlHeart } from "react-icons/sl";
import { FcLike } from "react-icons/fc";
import { updateid } from "./features/slideSlice";
const Home = () => {
  const { wishlist } = useSelector((store) => store.wishlist);

  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();

  const addtowishlist = (item) => {
    dispatch(updatewishlist(item));
    dispatch(updateid("all"))
    console.log(item);
  };
  const isWishTrue = (itemId) => {
    return wishlist.some((item) => item.id === itemId);
  };

  const all = () => {
    dispatch(updateid("all"));
  };
  useEffect(() => {
    const getProducts = () => {
      const productsArray = [];
      const path = "products-ALL";
      getDocs(collection(db, path)).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray);
        console.log(productsArray);
      });
    };
    getProducts();
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((userlogged) => {
      if (userlogged) {
        const getUser = async () => {
          const q = query(
            collection(db, "users"),
            where("uid", "==", userlogged.uid)
          );
          const data = await getDocs(q);
          dispatch(
            updateUser(
              data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
            )
          );
        };
        getUser();
      } else dispatch(updateUser(null));
    });
  }, []);

  return (
    <>
      <div>
        <Banner className="banner" />
      </div>
      <div className="home-products grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
        {product.map((item) => {
          return (
            <div className="product-containers " key={item.id}>
              <img src={item.image} />
              <div className="product-details">
                <Link to={`/product/${item.id}`}>
                  <button className="producttitles" onClick={all}>
                    {item.title.slice(0, 18)}
                  </button>
                </Link>

                <p className="salePrice">Price : ₹{item.price}</p>

                <button
                  className={
                    isWishTrue(item.id)
                      ? "flex items-center text-xs text-white whitespace-nowrap bg-black border-2 border-gray-400 px-3 py-1 rounded-md "
                      : "flex items-center text-xs whitespace-nowrap bg-white border-2 border-gray-400 px-4 py-1 rounded-md "
                  }
                  onClick={() => addtowishlist(item)}
                >
                  {isWishTrue(item.id) ? "wishlisted" : "wishlist"}
                  {isWishTrue(item.id) ? (
                    <FcLike className="ml-2 " />
                  ) : (
                    <SlHeart className="ml-3" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Home;
