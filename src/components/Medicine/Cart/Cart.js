
import React, { useEffect, useContext } from 'react'
import Cartitem from './Cartitem.js'
import "./Cart.css"
import Right from './Right.js'
import cartcontext from '../../../context/cart/cartcontext.js'

function Cart() {
    const context = useContext(cartcontext);
    const { items, getitems } = context;
    useEffect(() => {
        getitems();
    }, []);
    let totalPrice = 0;
    return (
        <div className='bg'>
            <div className='cart-container'>
                <h1>Order Summary</h1>

                <div className="row">
                    <div className='left mb-3 col-md-8 pr-lg-2'>
                        <div className='cart-product'>

                            {items.map((element, i) => {
                                totalPrice += element.quantity * element.price;
                                return <div key={i}>
                                    <Cartitem key={i} fullname={element.fullname} price={element.price} imageurl={element.urltoimage} discount={element.discount} id={element._id} quantity={element.quantity} />
                                    <hr />
                                </div>

                            })}

                            <div className="addmoreitems">
                                <a href='/allmedicinepage'>
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
                        <Right totalPrice={totalPrice} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart