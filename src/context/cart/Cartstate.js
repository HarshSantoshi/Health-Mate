import cartcontext from "./cartcontext.js";
import { useState } from "react";

const CartState = (props) => {
    const host = "http://localhost:8000";
    //Getallitems
    const getitems = async () => {
        try {
            const response = await fetch(`${host}/api/v1/cart/fetchitems`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('token')
                }
            });
            const json = await response.json();
            
            setitems(json);
            setCartCount(json.length);
        } catch (error) {
            console.log(error);
        }
    }
    //Additem
    const additem = async (id) => {
        try {
            const response = await fetch(`${host}/api/v1/cart/additem`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('token')
                },
                body: JSON.stringify({ id }),
            });
            const json = await response.json();
            if(json.message){
                updateitem(id,json.quantity+1);
            }
            else {
                setitems(json.cart);
                setCartCount(json.cart.length);
                
            }
        } catch (error) {
            console.log(error);
        }
    }
    //Deleteitem
    const deleteitem = async (id) => {
        // eslint-disable-next-line
        try {
            const response = await fetch(`${host}/api/v1/cart/deleteitem/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('token')
                }
            });
            const json = await response.json();
            setitems(json);
            setCartCount(json.length);
        } catch (error) {
            console.log(error)
        }
    }
    //updateitem
    const updateitem = async (id, quantity) => {
        try {
            const response = await fetch(`${host}/api/v1/cart/updateitem`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('token')
                },
                body: JSON.stringify({ id, quantity }),
            });
            // eslint-disable-next-line
            const json = await response.json();
            setitems(json.cart);
           
        } catch (error) {
            console.log(error)
        }
    }
    const [items, setitems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    // const [amount, setamount] = useState({totalmrp:0,discount:0,totalamt:0,deliverych:0,totalpayable:0,totalsaving:0});
    return (
        <cartcontext.Provider value={{ items, getitems, additem, deleteitem,updateitem,cartCount }}>
            {props.children}
        </cartcontext.Provider>
    )
}

export default CartState;


