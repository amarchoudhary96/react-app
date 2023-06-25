import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfigs/FirebaseConfig";
import SliderProductCard from "./SliderProductCard";
import { useSelector } from "react-redux";


const ProductSlider = ({category}) => {
  // const { category } = useSelector((store) => store.category);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      const productsArray = [];
      const path = `products-${category.toUpperCase()}`;
      getDocs(collection(db, path)).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
          setProducts(productsArray);
          console.log(category);

        });
      });
    };
    getProducts();
  }, []);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div>
      <Carousel responsive={responsive}>
        {products.map((product)=>{
          return <SliderProductCard key={product.id} product={product} />
        })}
      </Carousel>
      ;
    </div>
  );
};

export default ProductSlider;
