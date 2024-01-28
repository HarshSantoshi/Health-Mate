import React, { useState } from 'react';
import "./Medicineitem.css";
import { Link, useLocation } from 'react-router-dom';
import { Add as AddIcon } from '@mui/icons-material';
import { Remove as RemoveIcon } from '@mui/icons-material';

function Medicineitems(props) {
    const { name, price, imageurl, discount, id } = props;
    const [added, setadd] = useState(false);
    const [qty , setqty] = useState(1);
    const location = useLocation();
    const patientId = location.state?.patientId;
    const handleAddtoCart = async () => {
        try {
            console.log("medicine id ", id);
            console.log("patient id ", patientId);
            setadd(true);
    
            const response = await fetch(`http://localhost:8000/CartRouter/additem/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "token": localStorage.getItem("token")
                },
              
            });
    
            if (!response.ok) {
                throw new Error(`Failed to add item to cart: ${response.status}`);
            }
    
            // Handle the response data if needed
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };
    

    const handleAdd = (e) => {
        // e.stopPropagation();
        setqty(qty => qty + 1);
    }

    const handleRemove = () => {
        if (qty >= 1) {
            setqty(qty - 1);
        } else {
            setadd(false);
        }
        console.log(qty);
    };
    

    return (
        <div className="card">
            <Link to={`/product/${id}`}>
                <img src={imageurl} className="card-img-top img" alt="..." />
                <div className="card-body">
                    <h5 className="card-title name">{name}</h5>
                    <span className='price mt-2'>₹{price}</span>
                    <span style={{ display: "block", marginTop: "-7px" }}>
                        <span><strike className="actual-price">₹ 965.00</strike></span>
                        <span className='discount'>Save {discount}</span>
                    </span>
                </div>
            </Link>
            <button className="btn addtocart" onClick={handleAddtoCart}>
            {added || qty ===0? 
                <div className='selected'>
                    <RemoveIcon onClick={()=>handleRemove()} />
                    {qty}
                    <AddIcon onClick={handleAdd} />
                </div> : "Add to Cart"
            }

            </button>
        </div>
    );
}

export default Medicineitems;
