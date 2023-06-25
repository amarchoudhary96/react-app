import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../FirebaseConfigs/FirebaseConfig";
import ProductContainer from "./ProductContainer";
import "./allproductpages.css";
import { useParams } from "react-router-dom";
import { updateid } from "../features/slideSlice";
import { useDispatch, useSelector } from "react-redux";
import { updatefilter, updateselect } from "../features/filterSlice";

const AllProductsPages = () => {
  const dispatch = useDispatch();
  const { filterproduct } = useSelector((store) => store.filter);

  const [products, setProducts] = useState([]);
  const [select, setSelect] = useState("price-lowest");

  const { id } = useParams();
  useEffect(() => {
    const getProducts = () => {
      dispatch(updateid(id));
      const productsArray = [];
      const path = `products-${id.toUpperCase()}`;
      getDocs(collection(db, path)).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProducts(productsArray);
        console.log(productsArray);
        dispatch(updatefilter([...productsArray]));
        dispatch(updateselect(select))


      });
    };
    getProducts();
  }, [id]);
  useEffect(()=>{
   dispatch(updateselect(select))
  },[select])
  return (
    <div className="allproductpages">
      <div className="heading">
        <div className="product-detail">
        <p className="m-0 px-5">{products.length} products found</p>
        <form className="px-5">
          <label htmlFor="sort">sort by</label>
          <select
            name="sort"
            id="sort"
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            className="sort-input"
          >
            <option value="price-lowest" className="option">price (lowest)</option>
            <option value="price-highest">price (highest)</option>
            <option value="name-a">name (a - z)</option>
            <option value="name-z">name (z - a)</option>
          </select>
        </form>
        </div>
      </div>

      <div className="  grid  grid-cols-2 md:grid-cols-4 xl:grid-cols-6  bg-white">
        {filterproduct.map((product) => {
          return <ProductContainer product={product} key={product.id} />;
        })}
      </div>
    </div>
  );
};

export default AllProductsPages;
