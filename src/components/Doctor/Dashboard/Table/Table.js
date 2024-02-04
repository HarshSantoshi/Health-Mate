import React from 'react'
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import {Button} from '@mui/material';
import "./Table.css";

const makeStyle = (status) => {
    if (status === 'Approved') {
        return {
            background: 'rgb(145 254 159 / 47%)',
            color: 'green',
        }
    }
    else if (status === 'Pending') {
        return {
            background: '#ffadad8f',
            color: 'red',
        }
    }
    else {
        return {
            background: '#59bfff',
            color: 'white',
        }
    }
}

function createData(name, trackingId, date,slot, status) {
    return { name, trackingId, date,slot, status };
}

const rows = [
    createData("Harsh", 18908424, "2 March 2022","12:00-12:15", "Approved"),
    createData("Sagar", 18908424, "2 March 2022","12:00-12:15", "Pending"),
    createData("Aman", 18908424, "2 March 2022","12:00-12:15", "Approved"),
    createData("Abhishek", 18908421, "2 March 2022","12:00-12:15", "Delivered"),
    createData("Abhishek", 18908421, "2 March 2022","12:00-12:15", "Delivered"),
    createData("Abhishek", 18908421, "2 March 2022","12:00-12:15", "Delivered"),
    createData("Abhishek", 18908421, "2 March 2022","12:00-12:15", "Delivered"),
    createData("Abhishek", 18908421, "2 March 2022","12:00-12:15", "Delivered"),
    createData("Abhishek", 18908421, "2 March 2022","12:00-12:15", "Delivered"),
];

function Table() {
    return (
        <div className="Table">
            <h3 style={{ textAlign: "left" }}>Appointments</h3>
            <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029 " }}
                className='tablecon'
            >
                <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className="sticky-top"style={{background:"#fff",zIndex:"1"}}>
                        <TableRow>
                            <TableCell>Patient Name</TableCell>
                            <TableCell align="left">Tracking ID</TableCell>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Slot</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                        {rows.map((row,i) => (
                            <TableRow
                                key={i}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.trackingId}</TableCell>
                                <TableCell align="left">{row.date}</TableCell>
                                <TableCell align="left">{row.slot}</TableCell>
                                <TableCell align="left">
                                    <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                                </TableCell>
                                <TableCell align="left" className="Details"><Button variant="contained">Join Meet</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </MuiTable>
            </TableContainer>
        </div>
    )
}

export default Table
