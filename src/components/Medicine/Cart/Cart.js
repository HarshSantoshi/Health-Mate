import React, { useEffect, useState } from 'react'
import "./Cart.css"
import { Add as AddIcon } from '@mui/icons-material';
import { Remove as RemoveIcon } from '@mui/icons-material';
import "./Cartitem.css";
import Right from './Right.js'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function Cart() {
    const [items, setitems] = useState([]);
    const patientID = useParams();
    const fetchData = async () => {
        const response = await fetch(`http://localhost:8000/api/v1/cart/fetchitems/${patientID}`, {
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
    }, [items]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/cart/deleteitem/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }
            });
            const Data = await response.json();
            const cartData = Data.patient.carts

            setitems(cartData);
            console.log(cartData);
        } catch (error) {
            console.error('Error deleting item from cart:', error);
        }
    }
    const handleInc =async(element)=>{
        try {
            const response = await fetch(`http://localhost:8000/api/v1/cart/updateitem/${element._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body : JSON.stringify(
                    {
                        quantity:  element.quantity + 1
                    }
                )
            });
            const Data = await response.json();
            const cartData = Data.patient.carts

            // setitems(cartData);
            console.log(cartData);
        } catch (error) {
            console.error('Error updating item in cart:', error);
        }
        
    }
    const handleDec=async(element)=>{
        if(element.quantity === 1){
            await handleDelete(element._id);
            return ;
        }
        try {
            const response = await fetch(`http://localhost:8000/api/v1/cart/updateitem/${element._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body : JSON.stringify(
                    {
                        quantity:  element.quantity - 1
                    }
                )
            });
            const Data = await response.json();
            const cartData = Data.patient.carts
            console.log(cartData);
        } catch (error) {
            console.error('Error updating item in cart:', error);
        }
    }
    return (
        <div className='bg'>
            <div className='cart-container'>
                <h1>Order Summary</h1>
                <div className="row">
                    <div className='left mb-3 col-md-8 pr-lg-2'>
                        <div className='cart-product'>
                            {items.map((element, idx) => {
                                return (
                                    <div  key = {idx} className="card w-100 border-0">
                                        <div className="row g-0">
                                            <div className="col-md-3 img-con">
                                                <img src={element.urltoimage} className="rounded-start image" alt="..." />
                                            </div>
                                            <div className="col-md-9">
                                                <div className="card-body text-start">
                                                    <div className='d-flex justify-content-between'>
                                                        <Link to={`/product/${element._id}`} className='name-med'>{element.fullname}</Link>
                                                        <div onClick={() => handleDelete(element._id)}>
                                                            <i className="fa-solid fa-trash-can remove"></i>
                                                        </div>
                                                    </div>
                                                    <p className="tag">Mfr: Galderma India Pvt Ltd</p>

                                                    <div className='d-flex justify-content-between mt'>
                                                        <div>
                                                            <span className='price mt-2'>₹{element.price}</span>
                                                            <span style={{ display: "block", marginTop: "-7px" }}><span><strike className="actual-price">₹ 965.00</strike></span><span className='discount'>Save {element.discount}</span></span>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: "2px solid black", padding: "10px" }}>

                                                            <RemoveIcon onClick={() => handleDec(element)}/>
                                                            {element.quantity}
                                                            <AddIcon onClick={()=> handleInc(element)} />

                                                        </div>
                                                    </div>
                                                    <p className='delivery my'>Delivery between JANUARY 24-JANUARY 25</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
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
