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

const LedgerTable = ({ data, perPage }) => {
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
    }


    return (
        <Box>
            <TableContainer>
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
                            <TableCell>ETA</TableCell>
                            <TableCell>Entry Type</TableCell>
                            <TableCell>Posting Date</TableCell>
                            <TableCell>Item Name</TableCell>
                            <TableCell>LOT Number</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Original Qty</TableCell>
                            <TableCell>Remaining Qty</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.length > 0 &&
                            rows.map((row, index) => (
                                <TableRow key={index}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 }, 'td, th': { color: row.delay ? 'red' : 'inherit', fontSize: deskTopView ? "13px" : '11px', borderColor: '#DADADA' },
                                        '& .MuiTableCell-root': {
                                            padding: '5px 10px '
                                        }
                                    }}
                                >
                                    <TableCell>{row.eta}</TableCell>
                                    <TableCell>{row.entryType}</TableCell>
                                    <TableCell>{row.postDate}</TableCell>
                                    <TableCell>{row.itemName}</TableCell>
                                    <TableCell>{row.lotNumber}</TableCell>
                                    <TableCell>{row.location}</TableCell>
                                    <TableCell>{row.originalQty}</TableCell>
                                    <TableCell>{row.remainingQty}</TableCell>
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
        </Box>
    );
}

export default LedgerTable