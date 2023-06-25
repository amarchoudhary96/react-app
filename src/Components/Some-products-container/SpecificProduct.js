import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../FirebaseConfigs/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import "./specificproduct.css";
import ProductSlider from "./ProductSlider";
import { updateCart } from "../features/cartSlice";
import { FaMinus, FaPlus } from "react-icons/fa";

const SpecificProduct = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { category } = useSelector((store) => store.category);
  console.log(category);
  const [product, setProduct] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity((oldAmount) => {
      let tempAmount = oldAmount + 1;
      return tempAmount;
    });
  };
  const decrease = () => {
    setQuantity((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };
  let overalltax = 10 / 100;
  let overcommition = 10 / 100;
  let extraforfun = 10 / 100;

  let mrp = parseInt(product.price);
  mrp = mrp + overalltax * mrp + overcommition * mrp + extraforfun * mrp;
  const saleprice = mrp - extraforfun * mrp;

  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, `products-${category.toUpperCase()}`, id);
      const docSnap = await getDoc(docRef);
      setProduct({ ...docSnap.data(), id: docSnap.id });
      console.log(docSnap.data());
    };
    getProduct();
  }, [id,category]);

  const addtocart = () => {
    dispatch(updateCart({ ...product, quantity: quantity }));
  };
  return (
    <div>
      {product ? (
        <div className="myprod-container">
          <div className="prod-img-cont">
            <img src={product.image} alt="" />
          </div>
          <div className="spec-col">
            <div className="prod-data">
              <p className="prod-head">{product.title}</p>
            </div>
            <div className="specific-price-container">
              <p className="mrp">
                MRP:<p className="rate">₹{Math.floor(mrp)}</p>
              </p>
              <p className="saleprice">
                Discount price: <p className="rate">₹{Math.floor(saleprice)}</p>
              </p>
              <p className="yousave">
                You Save: ₹{Math.floor(mrp - saleprice)}
              </p>
            </div>
            <p className="product-details-head">Details</p>
            <p className="prod-description">{product.description}</p>

            <div className="amount-btns">
              <button type="button" className="amount-btn" onClick={decrease}>
                <FaMinus />
              </button>
              <h2 className="amount">{quantity}</h2>
              <button type="button" className="amount-btn" onClick={increase}>
                <FaPlus />
              </button>
            </div>

            <div className="buy-cart-item">
              <button className="btn-1">Buy Now</button>
              <Link to="/cartdata">
                <button className="btn-2" onClick={addtocart}>
                  Add to Cart
                </button>
              </Link>
            </div>
          </div>
          {successMsg && <div className="success-msg">{successMsg}</div>}
          {errorMsg && <div className="error-msg">{errorMsg}</div>}
        </div>
      ) : (
        <div>..loading</div>
      )}
     
    </div>
  );
};

export default SpecificProduct;
