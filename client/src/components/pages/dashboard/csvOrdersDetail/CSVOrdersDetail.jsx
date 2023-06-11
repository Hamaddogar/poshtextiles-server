import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Stack, useMediaQuery, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../reUseAbles/ReuseAbles';



const CSVOrdersDetail = () => {
    const { csv_OrdersDetail } = useSelector(store => store.mainReducer);

    const [copyDetails, setCopyDetails] = React.useState([]);
    const deskTopView = useMediaQuery('(min-width:600px)');
    const navigate = useNavigate();

    React.useEffect(() => { setCopyDetails(csv_OrdersDetail) }, [csv_OrdersDetail]);


    return (
        <div>
            <Typography pl={2} pb={2}>Record 1 of {copyDetails.total}</Typography>
            <Box p={3} backgroundColor='#FFFFFF'>


                <Grid container alignItems={'flex-start'} justifyContent={'center'} >
                    {/* Material Bank Details */}
                    <Grid item xs={12} md={6} >
                        <Box sx={{ border: '1px solid #BFBFBF', padding: '10px 10px 30px 10px' }}>
                            <Typography variant='h4'>Material Bank Details</Typography>
                        </Box>
                        <Box sx={{ border: '1px solid #BFBFBF', padding: '10px 10px' }}>
                            <TableContainer component={Paper} elevation={0} sx={{ backgroundColor: 'transparent' }} className='table-Container'>
                                <Table sx={{ minWidth: 450 }} stickyHeader aria-label="sticky table">
                                    <TableBody sx={{ color: '#6D6D6D' }} >
                                        {copyDetails?.product && Object.keys(copyDetails?.product).map((key, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ padding: '4px 10px 4px 0px' }}>{key}</TableCell>
                                                <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product[key]}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        <Box sx={{ border: '1px solid #BFBFBF', padding: '10px 10px 30px 10px' }}>
                            <Typography variant='h6' textAlign={'center'} fontSize='15px'>Item Details</Typography>
                            <TableContainer component={Paper} elevation={0} sx={{ backgroundColor: 'transparent' }} className='table-Container'>
                                <Table sx={{ minWidth: 450 }} stickyHeader aria-label="sticky table">
                                    <TableHead sx={{}}>
                                        <TableRow sx={{ 'td, th': { fontSize: deskTopView ? "13px" : '11px', border: 0, backgroundColor: '#E9EDF1' } }}>
                                            <TableCell sx={{ padding: '4px 4px 4px 0px' }}>Manufacturer Sku</TableCell>
                                            <TableCell sx={{ padding: '4px 4px 4px 0px' }}> Name</TableCell>
                                            <TableCell sx={{ padding: '4px 4px 4px 0px' }}>Color</TableCell>
                                            <TableCell sx={{ padding: '4px 4px 4px 0px' }}>Quantity</TableCell>
                                            <TableCell sx={{ padding: '4px 4px 4px 0px' }}>MB Shipped</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ color: '#6D6D6D', 'td, th': { border: 0 } }} >
                                        <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product?.["Manufacturer Sku"]}</TableCell>
                                        <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product?.["Name"]}</TableCell>
                                        <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product?.["Color"]}</TableCell>
                                        <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product?.["Quantity"]}</TableCell>
                                        <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product?.["MB Shipped"]}</TableCell>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box py={2}></Box>
                            {/* table 2 */}
                            <TableContainer component={Paper} elevation={0} sx={{ backgroundColor: 'transparent' }} className='table-Container'>
                                <Table sx={{ minWidth: 450 }} stickyHeader aria-label="sticky table">
                                    <TableHead sx={{}}>
                                        <TableRow sx={{ 'td, th': { fontSize: deskTopView ? "13px" : '11px', border: 0, backgroundColor: '#E9EDF1' } }}>
                                            <TableCell sx={{ padding: '4px 4px 4px 0px' }}>Project Name</TableCell>
                                            <TableCell sx={{ padding: '4px 4px 4px 0px' }}> Project Desc</TableCell>
                                            <TableCell sx={{ padding: '4px 4px 4px 0px' }}>Project Type</TableCell>
                                            <TableCell sx={{ padding: '4px 4px 4px 0px' }}>Project Phase</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ color: '#6D6D6D', 'td, th': { border: 0 } }} >
                                        <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product?.["Project Name"]}</TableCell>
                                        <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product?.["Project Description"]}</TableCell>
                                        <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product?.["Project Type"]}</TableCell>
                                        <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product?.["Project Phase"]}</TableCell>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>

                    {/* Business Central Match */}
                    <Grid item xs={12} md={6} >
                        <Box sx={{ border: '1px solid #BFBFBF', padding: '10px 10px 30px 10px' }}>
                            <Typography variant='h4'>Business Central Match</Typography>
                        </Box>
                        <Box sx={{ border: '1px solid #BFBFBF', padding: '10px 10px' }}>
                            <TableContainer component={Paper} elevation={0} sx={{ backgroundColor: 'transparent' }} className='table-Container'>
                                <Table sx={{ minWidth: 450 }} stickyHeader aria-label="sticky table">
                                    <TableBody sx={{ color: '#6D6D6D' }} >
                                        {copyDetails?.product && Object.keys(copyDetails?.product).map((key, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ padding: '4px 10px 4px 0px' }}>{key}</TableCell>
                                                <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product[key]}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        <Box sx={{ border: '1px solid #BFBFBF', padding: '10px 10px 30px 10px' }}>
                            <Typography variant='h6' textAlign={'center'} fontSize='15px'>Item Details</Typography>
                            <TableContainer component={Paper} elevation={0} sx={{ backgroundColor: 'transparent' }} className='table-Container'>
                                <Table sx={{ minWidth: 450 }} stickyHeader aria-label="sticky table">
                                    <TableHead sx={{}}>
                                        <TableRow sx={{ 'td, th': { fontSize: deskTopView ? "13px" : '11px', border: 0, backgroundColor: '#E9EDF1' } }}>
                                            <TableCell sx={{ padding: '4px 4px 4px 0px' }}>Manufacturer Sku</TableCell>
                                            <TableCell sx={{ padding: '4px 4px 4px 0px' }}> Name</TableCell>
                                            <TableCell sx={{ padding: '4px 4px 4px 0px' }}>Color</TableCell>
                                            <TableCell sx={{ padding: '4px 4px 4px 0px' }}>Quantity</TableCell>
                                            <TableCell sx={{ padding: '4px 4px 4px 0px' }}>MB Shipped</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ color: '#6D6D6D', 'td, th': { border: 0 } }} >
                                        <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product?.["Manufacturer Sku"]}</TableCell>
                                        <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product?.["Name"]}</TableCell>
                                        <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product?.["Color"]}</TableCell>
                                        <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product?.["Quantity"]}</TableCell>
                                        <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product?.["MB Shipped"]}</TableCell>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box py={2}></Box>
                            {/* table 2 */}
                            <TableContainer component={Paper} elevation={0} sx={{ backgroundColor: 'transparent' }} className='table-Container'>
                                <Table sx={{ minWidth: 450 }} stickyHeader aria-label="sticky table">
                                    <TableHead sx={{}}>
                                        <TableRow sx={{ 'td, th': { fontSize: deskTopView ? "13px" : '11px', border: 0, backgroundColor: '#E9EDF1' } }}>
                                            <TableCell sx={{ padding: '4px 4px 4px 0px' }}>Project Name</TableCell>
                                            <TableCell sx={{ padding: '4px 4px 4px 0px' }}> Project Desc</TableCell>
                                            <TableCell sx={{ padding: '4px 4px 4px 0px' }}>Project Type</TableCell>
                                            <TableCell sx={{ padding: '4px 4px 4px 0px' }}>Project Phase</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ color: '#6D6D6D', 'td, th': { border: 0 } }} >
                                        <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product?.["Project Name"]}</TableCell>
                                        <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product?.["Project Description"]}</TableCell>
                                        <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product?.["Project Type"]}</TableCell>
                                        <TableCell sx={{ padding: '4px 4px 4px 0px' }}>{copyDetails?.product?.["Project Phase"]}</TableCell>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>

                </Grid>
            </Box>






            <Stack direction='row' my={3} mt={2} justifyContent='space-between' alignItems={'center'}>
                <BackButton onClick={() => navigate(-1)} />
                <Button vatiant='outlined' size='small' sx={{ backgroundColor: '#0AFF22', borderColor: '#0AFF22' }}>Approve & Next</Button>
            </Stack>
        </div>
    )
}


export default CSVOrdersDetail
