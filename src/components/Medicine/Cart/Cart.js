import React, { useEffect, useState } from 'react'
import "./Cart.css"
import Cartitem from './Cartitem.js'
import Right from './Right.js'
function Cart() {
    const [items, setitems] = useState([]);
    const fetchData = async () => {
        const response = await fetch(`http://localhost:8000/api/v1/cart/fetchitems`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            }
        });
        const Data = await response.json();
        setitems(Data.items);
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className='bg'>
            <div className='cart-container'>
                <h1>Order Summary</h1>
                <div className="row">
                    <div className='left mb-3 col-md-8 pr-lg-2'>
                        <div className='cart-product'>
                            {items.map((element, i) => {
                                return <div key={i}>
                                    <Cartitem key={i} fullname={element.fullname} price={element.price} imageurl={element.urltoimage} discount={element.discount} id={element._id}/>
                                    <hr />
                                </div>
                            })}

                            <div className="addmoreitems">
                                <a href='/'>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <span>Add more items</span>
                                        </div>
                                        <div>
                                            <i className="fa-solid fa-plus"></i>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="right col-md-4">
                        <Right />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
