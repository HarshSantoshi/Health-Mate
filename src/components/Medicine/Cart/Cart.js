import React from 'react'
import "./Cart.css"
import Cartitem from './Cartitem.js'
import Right from './Right.js'
function Cart() {
    return (
        <div className='bg'>
            <div className='cart-container'>
                <h1>Order Summary</h1>
                <div className="row">
                    <div className='left mb-3 col-md-8 pr-lg-2'>
                        <div className='cart-product'>
                            <h4>Product</h4>
                            <Cartitem />
                            <hr />
                            <Cartitem />
                            <hr />
                            <Cartitem />
                            <hr />
                            <Cartitem />
                            <hr />
                            <Cartitem />
                            <hr />
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
