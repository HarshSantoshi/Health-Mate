import React,{useEffect,useState} from 'react'
import Medicineitems from './Medicineitems.js'
import "./Medicinedeals.css"

function Medicinedeals(props) {
    const { title } = props;

    const [medicine, setmedicine] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://health-mate-server.vercel.app/api/v1/medicine/getallmedicine");
                const data = await response.json();
                setmedicine(data.medicine || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='deals back' >
            <h2 className="title mx-4">{title}</h2>
            <div className='cards' style={{ width: "100%" }}>
                {medicine.map((element, i) => {
                    return <div className="col-md-2" key={element._id}>
                        <Medicineitems key={i} name={element.name} price={element.price} imageurl={element.urltoimage} discount={element.discount} id={element._id}/>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Medicinedeals
