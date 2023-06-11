import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from 'react-responsive-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import { useMediaQuery } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { BackButton } from '../reUseAbles/ReuseAbles';
import { useNavigate } from 'react-router-dom';

const PhysicalInventoryTable = ({ data, perPage }) => {
    perPage += 10;
    const [copy, setCopy] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const navigate = useNavigate();
    const deskTopView = useMediaQuery('(min-width:600px)');

    React.useEffect(() => { setRows(copy.slice(0, perPage)) }, [copy, perPage]);
    React.useEffect(() => { setCopy(data) }, [data]);
    const handlePageChange = page => {
        setCurrentPage(page);
        setRows(copy.slice(((page - 1) * perPage), ((((page - 1) * perPage)) + perPage)))
    };



    return (
        <Stack justifyContent={'space-between'} sx={{ backgroundColor: 'white', padding: '10px', minHeight: '80vh' }}>
            <TableContainer >
                <Table sx={{ minWidth: 650, width: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{
                            'td, th': {
                                fontSize: deskTopView ? "13px" : '11px', fontWeight: 600,
                            },
                            '& .MuiTableCell-root': {
                                padding: '5px 10px '
                            }
                        }}>
                            <TableCell>LOT No.</TableCell>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Remaining Qty</TableCell>
                            <TableCell>Adj Qty</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.length > 0 &&
                            rows.map((row, index) => (
                                <TableRow key={index}
                                    sx={{
                                        'td, th': { color: row.delay ? 'red' : 'inherit', fontSize: deskTopView ? "13px" : '11px', borderColor: '#DADADA' },
                                        '& .MuiTableCell-root': {
                                            padding: '5px 10px '
                                        }
                                    }}
                                >
                                    <TableCell>{row.lotNo}</TableCell>
                                    <TableCell>{row.itemName}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.remainingQty}</TableCell>
                                    <TableCell>{row.adjQty}</TableCell>
                                    <TableCell>${row.price}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* {
                rows.length === 0 && <Box mt={3} textAlign='center' >
                    <Typography>No Record</Typography>
                </Box>
            } */}
            {
                rows.length > 0 &&
                <Stack direction='row' textAlign='right' mt={2} justifyContent='space-between' alignItems={'center'}>
                    <Box>
                        <BackButton onClick={e => navigate(-1)} />
                    </Box>
                    <Pagination
                        total={Math.ceil(copy.length / perPage)}
                        current={currentPage}
                        onPageChange={page => handlePageChange(page)}
                    />
                </Stack>
            }
        </Stack>
    );
}

export default PhysicalInventoryTable