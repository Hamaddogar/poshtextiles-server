import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    six: number,
    seven: number
) {
    return { name, calories, fat, carbs, protein, six, seven };
}

const rows = [
    createData("Nov-20", "New", "Nov-20", 10, "LHR", 15, 5),
    createData("Nov-20", "New", "Nov-20", 10, "LHR", 15, 5),
    createData("Nov-20", "New", "Nov-20", 10, "LHR", 15, 5),
    createData("Nov-20", "New", "Nov-20", 10, "LHR", 15, 5),
    createData("Nov-20", "New", "Nov-20", 10, "LHR", 15, 5),
    createData("Nov-20", "New", "Nov-20", 10, "LHR", 15, 5),
    createData("Nov-20", "New", "Nov-20", 10, "LHR", 15, 5),
];

export default function BasicTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ETA</TableCell>
                        <TableCell align="right">Entry Type</TableCell>
                        <TableCell align="right">Posting Date</TableCell>
                        <TableCell align="right">Item Name</TableCell>
                        <TableCell align="right">Location</TableCell>
                        <TableCell align="right">Original QTY</TableCell>
                        <TableCell align="right">Remaining QTY</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                            <TableCell align="right">{row.six}</TableCell>
                            <TableCell align="right">{row.seven}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
