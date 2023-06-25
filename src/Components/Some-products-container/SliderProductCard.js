import React from "react";
import "./sliderProductcard.css"
import { Link } from "react-router-dom";

const SliderProductCard = ({ product }) => {
  let overalltax = 10 / 100;
  let overcommition = 10 / 100;
  let extraforfun = 10 / 100;

  let mrp = parseInt(product.price);
  mrp = mrp + overalltax * mrp + overcommition * mrp + extraforfun * mrp;
  const saleprice = mrp - extraforfun * mrp;

  return (
    <div className="mini-product-container ">
      <div className="mini-img-container">
        <img src={product.productImage} />
      </div>
      <div className="mini-product-details">
        <p className="mini-project-title">{product.productTitle.slice(0,20)}</p>
        <div className="mini-price-container">
          <p className="mrp">
            MRP: <p className="rate">₹{mrp}</p>
          </p>
          <p className="saleprice">
            Discount price : <p className="rate">₹{saleprice}</p>
          </p>
          <p className="yousave">You Save: ₹{mrp - saleprice}</p>
        </div>
        <Link to={`/product/${product.id}`}>
        <button className="showmore-btn">show more &gt;</button>
        </Link>
      </div>
    </div>
  );
};

export default SliderProductCard;
