import React, { useState, useEffect } from "react";
import "./style.css";
import Camera from "../../assets/icons/Camera.svg";
import axios from "axios";
import spinner from "../../assets/icons/spinner.gif";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ScreenSize from "../../component/screenSize/screenSize";

const AddProductScreen = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuality, setProductQuality] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [productOrigin, setProductOrigin] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productType, setProductType] = useState("");
  const [productDeliveryTime, setProductDeliveryTime] = useState("");
  const [productSpecification, setProductSpecification] = useState("");
  const [productFrontImg, setProductFrontImg] = useState("");
  const [productBackImg, setProductBackImg] = useState("");
  const [productUpwardImg, setProductUpwardImg] = useState("");
  const [productDownWardImg, setProductDownWardImg] = useState("");
  const [userID, setUserID] = useState();
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [showSpinner, setShowSpinner] = useState(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const size = ScreenSize();

  const style = {
    position: "absolute",
    top: "50%",
    right: size.width < 600 ? "1%" : "40%",
    transform: "translateX(50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "0.5em",

    // boxShadow: 24,
    p: 4,
  };

  function handleProductCate(e) {
    setProductCategory(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setOpen(true);
    // setShowSpinner(true);

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productQuality", productQuality);
    formData.append("productDetail", productDetail);
    formData.append("productOrigin", productOrigin);
    formData.append("productCategory", productCategory);
    formData.append("productDeliveryTime", productDeliveryTime);
    formData.append("productSpecification", productSpecification);
    formData.append("proFrontIMAGE", productFrontImg);
    formData.append("proBackIMAGE", productBackImg);
    formData.append("proUpwardIMAGE", productUpwardImg);
    formData.append("proDownWardIMAGE", productDownWardImg);
    try {
      const { data } = await axios.post(
        `/api/auth/add-product?userID=${userID}`,
        formData
      );
      setSuccess("Product Successfull Created");
      console.log({ formData: formData });

      setShowSpinner(false);

      console.log("Product Successfull Created");
      setTimeout(() => {
        setSuccess("");
        setOpen(false);
        window.location.reload();
      }, 1700);
    } catch (error) {
      console.log("erro saving data" + error.response.data);
      setError(error.response.data);
      setTimeout(() => {
        setError("");
        window.location.reload();
      }, 1500);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("userID")) {
      setUserID(JSON.parse(localStorage.getItem("userID")));
      //   console.log({ userID: userID });
    }
  }, []);

  return (
    <div className="add-product-screen">
      <div className="add-product-screen-top">
        <span>
          Home <i className="fa-solid fa-caret-right faRightP"> </i>Add product
          to collection
        </span>
      </div>
      <h3 style={{ color: "green" }}>{success && success}</h3>
      <form className="add-product-screen-bottom" onSubmit={handleSubmit}>
        <div className="add-product-img-con">
          <label htmlFor="front-view" className="add-img-box">
            <input
              filename="proFrontIMAGE"
              onChange={(e) => setProductFrontImg(e.target.files[0])}
              type="file"
              id="front-view"
              style={{ display: "none" }}
            />
            <img src={Camera} alt="" />
            <h6>Front view</h6>
            <span>Upload product image</span>
          </label>
          <label htmlFor="back-view" className="add-img-box">
            <input
              filename="proBackIMAGE"
              onChange={(e) => setProductBackImg(e.target.files[0])}
              type="file"
              id="back-view"
              style={{ display: "none" }}
            />
            <img src={Camera} alt="" />
            <h6>Back view</h6>
            <span>Upload product image</span>
          </label>
          <label htmlFor="upward-view" className="add-img-box">
            <input
              filename="proUpwardIMAGE"
              onChange={(e) => setProductUpwardImg(e.target.files[0])}
              type="file"
              id="upward-view"
              style={{ display: "none" }}
            />
            <img src={Camera} alt="" />
            <h6>Upward view</h6>
            <span>Upload product image</span>
          </label>
          <label htmlFor="downward-view" className="add-img-box">
            <input
              filename="proDownWardIMAGE"
              onChange={(e) => setProductDownWardImg(e.target.files[0])}
              type="file"
              id="downward-view"
              style={{ display: "none" }}
            />
            <img src={Camera} alt="" />
            <h6>Downward view</h6>
            <span>Upload product image</span>
          </label>
        </div>

        <div className="add-product-bottom-input-con">
          <div className="add-product-bottom-input-con-left">
            <div className="add-product-box-container">
              <div className="add-pro-input-box">
                <span>Product Name:</span>
                <input
                  value={productName}
                  required
                  onChange={(e) => setProductName(e.target.value)}
                  type="text"
                  placeholder="E.g sauna bucket"
                />
              </div>
              <div className="add-pro-input-box">
                <span>Product Price:</span>
                <input
                  value={productPrice}
                  required
                  onChange={(e) => setProductPrice(e.target.value)}
                  type="text"
                  placeholder="E.g sauna bucket"
                />
              </div>
            </div>
            <div className="add-product-box-container">
              <div className="add-pro-input-box">
                <span>Product Quality:</span>
                <input
                  value={productQuality}
                  required
                  onChange={(e) => setProductQuality(e.target.value)}
                  type="text"
                  placeholder="E.g 200pcs"
                />
              </div>
            </div>
            <div className="add-product-box-container">
              <div className="add-pro-input-box">
                <span>Product Details:</span>
                <textarea
                  value={productDetail}
                  required
                  onChange={(e) => setProductDetail(e.target.value)}
                  type="text"
                  placeholder="Type the product details"
                  className="product-text-area"
                />
              </div>
            </div>
            <div className="add-product-box-container">
              <div className="add-pro-input-box">
                <span>Origin Story of the Product:</span>
                <textarea
                  value={productOrigin}
                  required
                  onChange={(e) => setProductOrigin(e.target.value)}
                  type="text"
                  placeholder="Express your passion for creating the product"
                  className="product-text-area"
                />
              </div>
            </div>
          </div>
          <div className="add-product-bottom-input-con-right">
            <div className="add-product-box-container">
              <div className="add-pro-input-box">
                <span>Category:</span>
                <select
                  value={productCategory}
                  onChange={handleProductCate}
                  className="add-pro-input-long"
                >
                  <option value="clothings">Clothings & Accessories</option>
                  <option value="health">Health & Beauty</option>
                  <option value="pottery">Pottery</option>
                  <option value="art">Art & Craft</option>
                  <option value="others">Other Categories</option>
                </select>
              </div>
            </div>
            <div className="add-product-box-container">
              <div className="add-pro-input-box">
                <span>Product Type:</span>
                <input
                  value={productType}
                  required
                  onChange={(e) => setProductType(e.target.value)}
                  type="text"
                  className="add-pro-input-long"
                  placeholder="E.g cream, lotion, face wipes"
                />
              </div>
            </div>
            <div className="add-product-box-container">
              <div className="add-pro-input-box">
                <span>Delivery Time:</span>
                <input
                  value={productDeliveryTime}
                  required
                  onChange={(e) => setProductDeliveryTime(e.target.value)}
                  type="date"
                  className="add-pro-input-long"
                  placeholder="E.g sauna bucket"
                />
              </div>
            </div>
            <div className="add-product-box-container">
              <div className="add-pro-input-box">
                <span>Product Specifications:</span>
                <input
                  value={productSpecification}
                  required
                  onChange={(e) => setProductSpecification(e.target.value)}
                  type="text"
                  className="add-pro-input-long"
                  placeholder="E.g raw material"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="add-product-container">
          <button className="add-product-btn-con">
            <span>Add Product</span>
          </button>
        </div>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="work-book-modal">
            <img src={spinner} alt="" />
            <h4 style={{ color: "green" }}>{success && success}</h4>
            {/* <span>Your response has been submitted</span> */}
            {/* <Link to="/plenary-values" className="go-to-plenary-btn">
                <span>Go To Plenary Value</span>
              </Link> */}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddProductScreen;
