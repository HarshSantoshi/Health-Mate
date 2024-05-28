import React, { useCallback, useEffect, useState } from 'react';
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Button } from '@mui/material';
import "./Table.css";
import { useNavigate } from 'react-router-dom';
import {ClipLoader} from "react-spinners";

const makeStyle = (status) => {
    if (status === 'Approved') {
        return {
            background: 'rgb(145 254 159 / 47%)',
            color: 'green',
        };
    } else if (status === 'Pending') {
        return {
            background: '#ffadad8f',
            color: 'red',
        };
    } else {
        return {
            background: '#59bfff',
            color: 'white',
        };
    }
};

function Table() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const navigate = useNavigate();

    const handleJoinRoom = useCallback((id , meetId)=>{
        navigate(`/meet/${meetId}`, { state: { userID: id } });
    },[navigate])

    const generateRandomNumber = (id) => {
        const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const random = (hash * 9301 + 49297) % 233280;
        const result = Math.floor(random % 1000000);
        return result;
    };

    const fetchPatientName = async (id) => {
        try {
            const response = await fetch(`https://health-mate-server.vercel.app/api/v1/patient/getpatient/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            return data.patient.patientName;
        } catch (error) {
            console.error(error)
        }
    };

    const fetchAppointments = async () => {
        try {
            setLoading(true); // Set loading to true before fetching data
            const response = await fetch(`https://health-mate-server.vercel.app/api/v1/appointment/getallappointments`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('token'),
                },
            });
            const data = await response.json();
            const appointmentsWithPatientNames = await Promise.all(
                data.appointments.map(async (row) => ({
                    ...row,
                    patientName: await fetchPatientName(row.patientId),
                }))
            );
            setAppointments(appointmentsWithPatientNames);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false); // Set loading to false after fetching data (even if there's an error)
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    
    return (
        <div className="Table">
            <h3 style={{ textAlign: "center", marginTop: "10px" }}>Your Appointments</h3>
            {
                loading == true ?
                ( <div style={{margin:" 100px", height : "100px"}}>


<ClipLoader
        color={"blue"}
        loading={loading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

                </div>)
            :
            <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029 " }}
                className='tablecon'
            >
                <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className="sticky-top" style={{ background: "#fff", zIndex: "1" }}>
                        <TableRow>
                            <TableCell>Patient Name</TableCell>
                            <TableCell align="left">Tracking ID</TableCell>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Slot</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">
                                Meeting
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                        {appointments.map((row, i) => (
                            <TableRow
                                key={i}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.patientName}
                                </TableCell>
                                <TableCell align="left">{generateRandomNumber(row._id)}</TableCell>
                                <TableCell align="left">{row.date}</TableCell>
                                <TableCell align="left">{row.starttime} - {row.endtime}</TableCell>
                                <TableCell align="left">
                                    <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                                </TableCell>
                                <TableCell align="left" className="Details">
                                <Button variant="contained" onClick={()=>handleJoinRoom(Date.now().toString() , row._id)}>Join</Button>
                                    </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </MuiTable>
            </TableContainer>
            }
        </div>
    );
}

export default Table;

