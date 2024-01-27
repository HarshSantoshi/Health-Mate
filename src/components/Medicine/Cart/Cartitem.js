import React from 'react';
import "./Cartitem.css";
import { Link } from 'react-router-dom';

const Cartitem = (props) => {
    const { fullname, price, imageurl, discount, id} = props;
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
                            <div>
                                <i className="fa-solid fa-trash-can remove"></i>
                            </div>
                        </div>
                        <p className="tag">Mfr: Galderma India Pvt Ltd</p>

                        <div className='d-flex justify-content-between mt'>
                            <div>
                                <span className='price mt-2'>₹{price}</span>
                                <span style={{ display: "block", marginTop: "-7px" }}><span><strike className="actual-price">₹ 965.00</strike></span><span className='discount'>Save {discount}</span></span>
                            </div>
                            <div className="dropdown size">
                                <button className="dropdown-toggle pro-qty" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    QTY : 1
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/">1</a></li>
                                    <li><a className="dropdown-item" href="/">2</a></li>
                                    <li><a className="dropdown-item" href="/">3</a></li>
                                </ul>
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
