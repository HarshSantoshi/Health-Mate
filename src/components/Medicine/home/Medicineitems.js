import React from 'react';
import "./Medicineitem.css";
import { Link } from 'react-router-dom';

function Medicineitems(props) {
    const { name, price, imageurl, discount, id } = props;
    return (
        <div className="card">
            <Link to={`/product/${id}`}>
                <img src={imageurl} className="card-img-top img" alt="..." />
                <div className="card-body">
                    <h5 className="card-title name">{name}</h5>
                    <p className='price'>₹{price}</p>
                    <p className='dis-item'>GET {discount} off</p>
                </div>
            </Link>
            <a href="/cart" className="btn addtocart">Add to Cart</a>
        </div>
    );
}

export default Medicineitems;
