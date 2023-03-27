import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './bin.css'

function createData(no, currentbin, newbin, date, price) {
    return { no, currentbin, newbin, date, price };
}

const rows = [
    createData("001", "A11", "Ah4", "21-12-2022", "$4.0"),
    createData("002", "AB2", "Ah4", "21-12-2022", "$4.3"),
    createData("003", "AB3", "Ah4", "21-12-2022", "$6.0"),
    createData("004", "AB4", "Ah4", "21-12-2022", "$4.3"),
    createData("005", "AB5", "Ah4", "21-12-2022", "$3.9"),
    createData("001", "A11", "Ah4", "21-12-2022", "$4.0"),
    createData("002", "AB2", "Ah4", "21-12-2022", "$4.3"),
    createData("003", "AB3", "Ah4", "21-12-2022", "$6.0"),
    createData("004", "AB4", "Ah4", "21-12-2022", "$4.3"),
    createData("005", "AB5", "Ah4", "21-12-2022", "$3.9"),
    createData("001", "A11", "Ah4", "21-12-2022", "$4.0"),
    createData("002", "AB2", "Ah4", "21-12-2022", "$4.3"),
    createData("001", "A11", "Ah4", "21-12-2022", "$4.0"),
    createData("002", "AB2", "Ah4", "21-12-2022", "$4.3"),
    createData("003", "AB3", "Ah4", "21-12-2022", "$6.0"),
    createData("004", "AB4", "Ah4", "21-12-2022", "$4.3"),
    createData("005", "AB5", "Ah4", "21-12-2022", "$3.9"),
    createData("001", "A11", "Ah4", "21-12-2022", "$4.0"),
    createData("002", "AB2", "Ah4", "21-12-2022", "$4.3"),
    createData("003", "AB3", "Ah4", "21-12-2022", "$6.0"),
    createData("004", "AB4", "Ah4", "21-12-2022", "$4.3"),
    createData("005", "AB5", "Ah4", "21-12-2022", "$3.9"),
    createData("001", "A11", "Ah4", "21-12-2022", "$4.0"),
    createData("002", "AB2", "Ah4", "21-12-2022", "$4.3"),
];

export default function BinTable() {
    return (
        <TableContainer component={Paper} sx={{ padding: "10px 14px 30px 14px" }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell align="right">Current Bin</TableCell>
                        <TableCell align="right">New Bin</TableCell>
                        <TableCell align="right">Transfer Date</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row,indx) => (
                        <TableRow
                            key={indx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.no}
                            </TableCell>
                            <TableCell align="right">{row.currentbin}</TableCell>
                            <TableCell align="right">{row.newbin}</TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
