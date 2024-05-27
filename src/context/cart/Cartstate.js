import cartcontext from "./cartcontext.js";
import { useState } from "react";
import toast from 'react-hot-toast';

const CartState = (props) => {
    const host = "https://health-mate-server.vercel.app";
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
            console.error(error);
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
                toast.success("Already Added");
            }
            else {
                setitems(json);
                setCartCount(json.length);
                toast.success("Added to cart");
            }
        } catch (error) {
            console.error(error);
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
            toast.success("Deleted Successfully");
            setCartCount(json.length);
        } catch (error) {
            console.error(error)
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
            console.error(error)
        }
    }
    const [items, setitems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    return (
        <cartcontext.Provider value={{ items, getitems, additem, deleteitem,updateitem,cartCount }}>
            {props.children}
        </cartcontext.Provider>
    )
}

export default CartState;


