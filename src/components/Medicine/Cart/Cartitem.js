import React, { useEffect, useState, useContext } from 'react';
import "./Cartitem.css";
import { Link } from 'react-router-dom';
import { Add as AddIcon } from '@mui/icons-material';
import { Remove as RemoveIcon } from '@mui/icons-material';
import cartcontext from '../../../context/cart/cartcontext.js';

const Cartitem = (props) => {
    const { fullname, price, imageurl, discount, id, quantity } = props;
    const context = useContext(cartcontext);
    const { deleteitem, updateitem } = context;
    const handleDec = (e) => {
        e.preventDefault();
        if ((quantity - 1) < 1) {
            deleteitem(id);
        }
        else {
            updateitem(id, quantity - 1);
        }
    }
    const handleInc = (e) => {
        e.preventDefault();
        updateitem(id, quantity + 1);
    }
    return (
        <div className="card w-100 border-0">
            <div className="row g-0">
                <div className="col-md-3 img-con">
                    <img src={imageurl} className="rounded-start image" alt="..." />
                </div>
                <div className="col-md-9">
                    <div className="card-body text-start">
                        <div className='d-flex justify-content-between'>
                            <Link to={`/product/${id}`} className='name-med'>{fullname}</Link>
                            <div onClick={() => deleteitem(id)}>
                                <i className="fa-solid fa-trash-can remove"></i>
                            </div>
                        </div>
                        <p className="tag">Mfr: Galderma India Pvt Ltd</p>

                        <div className='d-flex justify-content-between mt'>
                            <div>
                                <span className='price mt-2'>₹{price}</span>
                                <span style={{ display: "block", marginTop: "-7px" }}><span><strike className="actual-price">₹ 965.00</strike></span><span className='discount'>Save {discount}</span></span>
                            </div>
                            <div className='inc-dec'>
                                <RemoveIcon onClick={handleDec} />
                                <div className='mx-3'>{quantity}</div>
                                <AddIcon onClick={handleInc} />
                            </div>
                        </div>
                        <p className='delivery my'>Delivery between JANUARY 24-JANUARY 25</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cartitem;
