import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './inventory.css'

function createData(lotno, itemname, description, cquantity, pquantity) {
    return { lotno, itemname, description, cquantity, pquantity };
}

const rows = [
    createData("001", "A11", "Ah4", "lahore", "4.0"),
    createData("002", "AB2", "Ah4", "lahore", "4.3"),
    createData("003", "AB3", "Ah4", "lahore", "6.0"),
    createData("004", "AB4", "Ah4", "lahore", "4.3"),
    createData("005", "AB5", "Ah4", "lahore", "3.9"),
    createData("006", "A11", "Ah4", "lahore", "4.0"),
    createData("007", "AB2", "Ah4", "lahore", "4.3"),
    createData("008", "AB3", "Ah4", "lahore", "6.0"),
    createData("009", "AB4", "Ah4", "lahore", "4.3"),
    createData("0010", "AB5", "Ah4", "lahore", "3.9"),
    createData("0011", "A11", "Ah4", "lahore", "4.0"),
    createData("0012", "AB2", "Ah4", "lahore", "4.3"),
];

export default function Pinventorytable() {
    return (
        <TableContainer component={Paper} sx={{ padding: "10px 14px 30px 14px" }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Lot No.</TableCell>
                        <TableCell align="right">Item Name</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Current City</TableCell>
                        <TableCell align="right">Physical Quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.lotno}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.lotno}
                            </TableCell>
                            <TableCell align="right">{row.itemname}</TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{row.cquantity}</TableCell>
                            <TableCell align="right">{row.pquantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
