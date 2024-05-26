import doctorcontext from "./doctorcontext.js";
import { useState } from "react";

const DoctorState = (props) => {
    const host = "https://health-mate-server.vercel.app";

    //Fetchdoctor
    const fetchData = async (id) => {
        try {
            const response = await fetch(`${host}/api/v1/doctors/getdoctor/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const json = await response.json();
            setdoctor(json.doctor);
            setexperience(json.doctor.experience);
            seteducation(json.doctor.education);
        } catch (error) {
            console.error('Error fetching doctor details:', error);
        }
    };
    //Update Info
    const updatedoctor = async (specialization,experienceYrs,about,fees,currentlyserving,phoneNo) => {
        try {
            const response = await fetch(`${host}/api/v1/doctors/updatedoctor`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('token')
                },
                body: JSON.stringify({specialization,experienceYrs,about,fees,currentlyserving,phoneNo}),
            });
            const json = await response.json();
            setdoctor(json.record);
        } catch (error) {
            console.error('Error Updating doctor details:', error);
        }
    };
    const Addexp = async (hospital, service, startdate, enddate) => {
        try {
            const response = await fetch(`${host}/api/v1/doctors/addexperience`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('token')
                },
                body: JSON.stringify({hospital, service, startdate, enddate}),
            });
            const json = await response.json();
            setexperience(json);
        } catch (error) {
            console.error('Error Adding Experience details:', error);
        }
    };
    const Deleteexp = async (id) => {
        try {
            const response = await fetch(`${host}/api/v1/doctors/deleteexperience/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('token')
                }
            });
            const json = await response.json();
            setexperience(json);
        } catch (error) {
            console.error('Error Deleting Experience details:', error);
        }
    };
    const Addedu = async (institution, speciality, startdate, enddate) => {
        try {
            const response = await fetch(`${host}/api/v1/doctors/addeducation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('token')
                },
                body: JSON.stringify({institution, speciality, startdate, enddate}),
            });
            const json = await response.json();
            seteducation(json);
        } catch (error) {
            console.error('Error Adding Education details:', error);
        }
    };
    const Deleteedu = async (id) => {
        try {
            const response = await fetch(`${host}/api/v1/doctors/deleteeducation/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('token')
                }
            });
            const json = await response.json();
            seteducation(json);
        } catch (error) {
            console.error('Error Deleting Education details:', error);
        }
    };
    const [doctor, setdoctor] = useState([]);
    const [experience, setexperience] = useState([]);
    const [education, seteducation] = useState([]);

    return (
        <doctorcontext.Provider value={{ doctor, experience, education, fetchData ,updatedoctor,Addexp,Deleteexp,Addedu,Deleteedu}}>
            {props.children}
        </doctorcontext.Provider>
    )
}

export default DoctorState;


