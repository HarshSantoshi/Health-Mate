import React, { useContext } from 'react'
import { paymenthandler } from '../../Payment/Payment.js'
import "./Right.css"

function Right({totalPrice}) {
    
    // console.log(totalPrice);
    const totalAmount = Math.round(totalPrice * 100) / 100 - 0.13*Math.round(totalPrice*100)/100 ;
    const totalDiscount = 0.13*Math.round(totalPrice*100)/100;
    const handlepayment = async (e)=>{
        e.preventDefault();
        const paymentCompleted = await paymenthandler(Math.round(totalAmount)*100);
        if (paymentCompleted){

        }else {
            console.log('Payment failed');
        }
    }
    return (
        <div className='totalamt'>
            <h4 className='title'>Payment Details</h4>
            <div className='total'>
                <div className="subtotal">
                    <label>MRP Total</label>
                    <span id="cart_sub_total">₹ {Math.round(totalPrice * 100) / 100}</span>
                </div>
                <div className="subtotal">
                    <label >Additional Discount</label>
                    <span >- ₹ {Math.round(totalDiscount*100)/100}</span>
                </div>
                <div className="subtotal">
                    <label >Total Amount</label>
                    <span >₹ {Math.round(totalAmount*100)/100}</span>
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
                    <span >₹ {Math.round(totalAmount*100)/100 + 0.0} </span>
                </div>
                <div className="save-amount cart-savings mx-2 d-flex justify-content-between">
                    <label >Total Savings</label>
                    <span >₹ {Math.round(totalDiscount*100)/100}</span>
                </div>
            </div>
            <div className="process-col">
                <div className="totalamount">
                    <span className="text">Total Payable</span>
                    <span className="save-price">₹ {Math.round(totalAmount*100)/100 + 0.0}</span>
                </div>
                <div className="process-checkout">
                    <a className="btn btn_to_checkout" role="button" onClick={handlepayment}>Proceed</a>
                </div>
            </div>
        </div>
    )
}

export default Right
