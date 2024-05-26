import React, { useEffect, useState ,useCallback} from 'react';
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Button } from '@mui/material';
import "../Doctor/Dashboard/Table/Table.css";
import { useNavigate } from 'react-router-dom';

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
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    const generateRandomNumber = (id) => {
        const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const random = (hash * 9301 + 49297) % 233280;
        const result = Math.floor(random % 1000000);
        return result;
    };
    const handleJoinRoom = useCallback((id , meetId)=>{
        console.log(meetId)
        console.log(id)
        navigate(`/meet/${meetId}`, { state: { userID: id  } });
    },[navigate])

    const fetchDoctorName = async (id) => {
        try {
            const response = await fetch(`https://health-mate-server.vercel.app/api/v1/doctors/getdoctor/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            return data?.doctor?.doctorName;
        } catch (error) {
            console.log("Error while fetching Name of patient ", error);
            return ""; 
        }
    };

    const fetchBookings = async () => {
        try {
            const response = await fetch(`https://health-mate-server.vercel.app/api/v1/appointment/getallbookings`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('token'),
                },
            });
            const data = await response.json();
            // console.log(data.bookings);

            const bookingsWithDoctorNames = await Promise.all(
                data.appointments.map(async (row) => ({
                    ...row,
                    doctorName: await fetchDoctorName(row.doctorId),
                }))
            );

            setBookings(bookingsWithDoctorNames);
        } catch (error) {
            console.log("Error while fetching appointment details in booking ", error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="Table" style={{width:"80%"  , margin:"20px auto" }}>
            <h3 style={{ textAlign: "center", marginTop: "10px" }}>Your bookings</h3>
            <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029 " }}
                className='tablecon'
            >
                <MuiTable sx={{ minWidth: 650}} aria-label="simple table">
                    <TableHead className="sticky-top" style={{ background: "#fff", zIndex: "1" }}>
                        <TableRow>
                            <TableCell>Doctor Name</TableCell>
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
                        {bookings &&  bookings.map((row, i) => (
                            <TableRow
                                key={i}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row?.doctorName}
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
        </div>
    );
}

export default Table;

