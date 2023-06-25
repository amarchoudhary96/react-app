import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./addproducts.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../FirebaseConfigs/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const Addproducts = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productImage, setProductImage] = useState("");

  const [imageError, setImageError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

  const { user } = useSelector((store) => store.user);
console.log(user);
  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleProductImage = (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setProductImage(selectedFile);
        setImageError("");
      } else {
        setProductImage(null);
        setImageError("Please select a valid image file type(png or jpg)");
      }
    } else {
      setImageError("Please select your file ");
    }
  };
  const handleAddProducts = (e) => {
    e.preventDefault();
    const storageref = ref(
      storage,
      `product-image${category.toUpperCase()}/${Date.now()}`
    );

    uploadBytes(storageref,productImage).then(()=>{
        getDownloadURL(storageref).then(url=>{
                addDoc(collection(db,`products-${category.toUpperCase()}`),{
                        title,
                        category,
                        description,
                       price,
                       image:url , 
                })
      
        })
    })
  };
  return (
    <div className="addprod-container">
      {user && user.email == "amar@gmail.com" ? (
        <div>
          <form className="addprod-form" onSubmit={handleAddProducts}>
            <p>Add Data</p>
            {successMsg && <div className="success-msg">{successMsg}</div>}
            {uploadError && <div className="error-msg">{uploadError}</div>}

            <label>Product Title</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Products Title"
            />
            <label>Product category</label>
            <input
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Products Type"
            />
    
            <label>Image</label>
            <input
              type="file"
              onChange={handleProductImage}
              placeholder="Products Title"
            />
            {imageError && <div className="error-img">{imageError}</div>}

           
            <label>Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product Description"
            />

            <label>Price Without Tax</label>
            <input
              type="text"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Product Price Without Tax"
            />
            
            <button type="submit">Add</button>
          </form>
        </div>
        
      ) : (
        <div>You Don't have access to add products</div>
      )}
    </div>
  );
};

export default Addproducts;
