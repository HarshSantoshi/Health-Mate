import React, { useContext } from 'react';
import "./Medicineitem.css";
import { Link } from 'react-router-dom';
// import { Add as AddIcon } from '@mui/icons-material';
// import { Remove as RemoveIcon } from '@mui/icons-material';
import toast from 'react-hot-toast';
import cartcontext from '../../../context/cart/cartcontext.js';

function Medicineitems(props) {
    const { name, price, imageurl, discount, id } = props;
    const { additem } = useContext(cartcontext);
    const handleAddtoCart =(e)=>{
        e.preventDefault();
        additem(id);
        toast.success("Added to cart");
    }
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
            <button className="btn addtocart" onClick={handleAddtoCart}>Add to Cart</button>
        </div>
    );
}

export default Medicineitems;


// {added || qty ===0? 
//     <div className='selected'>
//         <RemoveIcon onClick={()=>handleRemove()} />
//         {qty}
//         <AddIcon onClick={handleAdd} />
//     </div> : "Add to Cart"
// }










    // const handleRemove = () => {
    //     if (qty >= 1) {
    //         setqty(qty - 1);
    //     } else {
    //         setadd(false);
    //     }
    //     console.log(qty);
    // };