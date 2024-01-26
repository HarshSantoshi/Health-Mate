import React from 'react'
import "./Right.css"

function Right() {
    return (
        <div className='totalamt'>
            <h4 className='title'>Payment Details</h4>
            <div className='total'>
                <div className="subtotal">
                    <label>MRP Total</label>
                    <span id="cart_sub_total">₹ 965.00</span>
                </div>
                <div className="subtotal">
                    <label >Additional Discount</label>
                    <span >- ₹ 115.80</span>
                </div>
                <div className="subtotal">
                    <label >Total Amount</label>
                    <span >₹ 849.20</span>
                </div>
                <div className="subtotal">
                    <label _ngcontent-lhm-c7="">Shipping/Delivery Charges</label>
                    <p>
                    <span ><strike>Rs.29.00</strike></span>
                    <span className='mx-1'>₹ 0.00</span>
                    </p>
                </div>
                <div className="total-payable subtotal">
                    <label >Total Payable</label>
                    <span >₹ 849.20</span>
                </div>
                <div className="save-amount cart-savings mx-2 d-flex justify-content-between">
                    <label >Total Savings</label>
                    <span >₹ 115.80</span>
                </div>
            </div>
            <div className="process-col">
                <div className="totalamount">
                    <span className="text">Total Payable</span>
                    <span className="save-price">₹ 849.20</span>
                </div>
                <div className="process-checkout">
                    <a className="btn btn_to_checkout" href="/" role="button">Proceed</a>
                </div>
            </div>
        </div>
    )
}

export default Right
