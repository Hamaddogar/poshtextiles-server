import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import scissors from '../../../assets/icons/scissors.png';
import inspectionBtn from '../../../assets/icons/inspectionbtn.png';
import { useNavigate } from 'react-router-dom';

const PickingTable = () => {


    const rows = [
        { bin: "BIN1", lot: "LOT2021", qty: "43", id: 'hash1' },
        { bin: "BIN1", lot: "LOT2021", qty: "43", id: 'hash1' },
        { bin: "BIN1", lot: "LOT2021", qty: "43", id: 'hash1' },
        { bin: "BIN1", lot: "LOT2021", qty: "43", id: 'hash1' },
        { bin: "BIN1", lot: "LOT2021", qty: "43", id: 'hash1' },
        { bin: "BIN1", lot: "LOT2021", qty: "43", id: 'hash1' },
        { bin: "BIN1", lot: "LOT2021", qty: "43", id: 'hash1' },
        { bin: "BIN1", lot: "LOT2021", qty: "43", id: 'hash1' },
        { bin: "BIN1", lot: "LOT2021", qty: "43", id: 'hash1' },
    ]

    const navigate = useNavigate()



    return (
        <div>
            <TableContainer component={Paper} className="bsn">
                <Table size="small" aria-label="a dense table">
                    <TableHead >
                        <TableRow>
                            <TableCell sx={{ border: '1px solid black', backgroundColor: '#E9EDF1' }}> BIN </TableCell>
                            <TableCell sx={{ border: '1px solid black', backgroundColor: '#E9EDF1' }} >LOT</TableCell>
                            <TableCell sx={{ border: '1px solid black', backgroundColor: '#E9EDF1' }} > Quantity </TableCell>
                            <TableCell sx={{ borderBottom: 0, }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, indx) => (
                            <TableRow key={indx} sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                // onClick={e => handleSelect(row)}
                            >
                                <TableCell> {row.bin} </TableCell>
                                <TableCell>{row.lot}</TableCell>
                                <TableCell>{row.qty}</TableCell>
                                <TableCell align='right'>
                                    <Button variant='contained' startIcon={<img style={{ width: '20px' }} alt='scissors' src={inspectionBtn} />} sx={{ backgroundColor: '#49D668', fontSize: '11px' }}
                                        onClick={() => navigate('/inspection')}
                                    >Inspect</Button> &nbsp; &nbsp;
                                    <Button variant='contained' startIcon={<img style={{ width: '20px' }} alt='scissors' src={scissors} />} sx={{ backgroundColor: '#9747FF', fontSize: '11px' }}
                                        onClick={() => navigate('/cutting')}
                                    >cut</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default PickingTable