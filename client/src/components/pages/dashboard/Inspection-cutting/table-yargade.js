import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import './inspect.css'

function createData(quantity, name, action) {
    return { quantity, name, action };
}

const rows = [
    createData(5, "Misweave"),
    createData(19, "Thread"),
    createData(29, "Hole"),
    createData(9, "Spot"),
    createData(10, "oil spot"),
    createData(67, "Missing thread"),
    createData(91, "torn"),
];

export default function BasicTable() {
    return (
        <TableContainer component={Paper} className="bsn">
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Yargade</TableCell>
                        <TableCell align="center">Type of Defect</TableCell>
                        <TableCell align="center"> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.quantity}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" component="th" scope="row">
                                {row.quantity}
                            </TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center"><DeleteIcon /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}