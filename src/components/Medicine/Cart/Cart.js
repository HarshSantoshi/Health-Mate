
import React, { useEffect, useContext } from 'react'
import Cartitem from './Cartitem.js'
import "./Cart.css"
import Right from './Right.js'
import cartcontext from '../../../context/cart/cartcontext.js'
import Footer from '../../Footer/Footer.js'
import { Link } from 'react-router-dom'
function Cart() {
    const context = useContext(cartcontext);
    const { items, getitems } = context;
    useEffect(() => {
        getitems();
    }, []);
    let totalPrice = 0;
    return (
        <>

            <div className='bg'>
                <Link to='/allmedicinepage'>
                    <div style={{ float: "left", marginLeft: "20px", color: "blue" }}>
                        <i className="fa-solid fa-arrow-left" />
                    </div></Link>
                {
                    items.length === 0 ?
                        <div style={{background:"#f6f6f7",padding:"20px"}}>
                            <div style={{ height: "390px", width: "500px", margin: "auto",paddingTop:"40px" }}>
                                <img src='emptycart.png' alt="Empty cart" style={{ height: "100%", width: "100%" }} />

                            </div>
                            <div className="process-checkout" style={{ width: "500px", margin: "auto", marginTop: "25px" }}>
                                <a className="btn btn_to_checkout" role="button" href='/allmedicinepage' style={{ width: "200px", height: "45px" }}>Add Medicine</a>
                            </div>
                        </div>
                        :
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
                }
            </div>
            <Footer />
        </>

    )
}

export default Cart