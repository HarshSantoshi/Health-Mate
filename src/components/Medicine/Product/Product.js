import React, { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import "./Product.css";
import cartcontext from '../../../context/cart/cartcontext.js';

function Product() {
  const context = useContext(cartcontext);
  const {additem} = context;
  const [idvData, setidvData] = useState("");
  const { fullname, price, discount, urltoimage } = idvData;
  let ActualAmount = Math.round(price * 100) / 100 + 0.13*Math.round(price*100)/100;
  ActualAmount = ActualAmount.toFixed(2);
  const { id } = useParams("");
  useEffect(() => {
    const getIndividualData = async () => {
      const response = await fetch(`http://localhost:8000/api/v1/medicine/medicinedetail/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const Data = await response.json();
      setidvData(Data);
    };

    getIndividualData();
  }, []);
  return (
    <div>
      <div className='product'>
        <div className='left'>
          <img src={urltoimage} className="img-fluid h-75 w-75" alt="..."></img>
        </div>
        <div className='right'>
          <div className='product-detail'>
            <h5 className="title">{fullname}</h5>
            <div className='my-3 d-flex justify-content-start'>
              <span className="badge ellipsis me-2">Medication</span>
              <span className="badge ellipsis">Rx required</span>
            </div>
            <hr />
            <div className='price'>
              <span className="final-price">₹{price}</span>
              <span className='price-dis' >MRP <strike>₹{ActualAmount}</strike><span className='disc-price'>Save {discount}</span></span>
              <span className='txtContent'>Inclusive of all taxes</span>
              <span className='return_prods'>*This product cannot be returned for a refund or exchange.</span>
              <span className='return_prods'>* Mkt: Galderma India Pvt Ltd.</span>
              <span className='return_prods'>* Country of Origin: NA</span>
              <span className='return_prods'>* Delivery charges if applicable will be applied at checkout.</span>
              <div className='box-tocart'>
                <a href="/cart" className="btn toCart" onClick={()=>additem(id)}>Add To Cart</a>
              </div>
            </div>
            <hr />
            <div className='d-flex justify-content-between flex-wrap'>
              <span className='Availaibility'>Availability & Expiry</span>
              <span className='Delivery'>Delivering To 110086</span>
            </div>
            <div className="card mb-3 mt-4" style={{ maxWidth: "600px", textAlign: "left" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src="https://www.netmeds.com/images/cms/aw_rbslider/slides/1676292401_3_delivery.png" className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Unlimited Free Delivery</h5>
                    <p className="card-text">Free Delivery on order above ₹99</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
