import { CircularProgress, Divider, FormControl, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import 'bootstrap/dist/css/bootstrap.css';
import { BackButton, Search, SearchIconWrapper, StyledInputBase, handleNoAction, searchDropDown } from '../reUseAbles/ReuseAbles';
import PickingTable from './PickingTable';
import fabric from '../../../assets/icons/fabric.png';
import shelf from '../../../assets/icons/shelf.png';
import UpperHeader from '../reUseAbles/UpperHeader';
import { SearchSharp } from '@mui/icons-material';
import PreLoader from '../../HOC/Loading';
// import UpdateLineItem from '../reUseAbles/UpdateLineItem';







const PackingPreview = () => {

    const { saleOrderDetails, } = useSelector(store => store.mainReducer);
    const navigate = useNavigate();
    const [rows, setRows] = React.useState([
        {
            name: 'SONNEL TEA',
            lotNo: '23232323',
            qty: '23.43'
        }, {
            name: 'SONNEL TEA',
            lotNo: '23232323',
            qty: '23.43'
        }, {
            name: 'SONNEL TEA',
            lotNo: '23232323',
            qty: '23.43'
        }, {
            name: 'SONNEL TEA',
            lotNo: '23232323',
            qty: '23.43'
        }, {
            name: 'SONNEL TEA',
            lotNo: '23232323',
            qty: '23.43'
        }, {
            name: 'SONNEL TEA',
            lotNo: '23232323',
            qty: '23.43'
        }, {
            name: 'SONNEL TEA',
            lotNo: '23232323',
            qty: '23.43'
        }, {
            name: 'SONNEL TEA',
            lotNo: '23232323',
            qty: '23.43'
        }, {
            name: 'SONNEL TEA',
            lotNo: '23232323',
            qty: '23.43'
        }, {
            name: 'SONNEL TEA',
            lotNo: '23232323',
            qty: '23.43'
        },
    ]);
    // const [rows, setRows] = React.useState([])
    const [loading, setLoading] = React.useState({
        loading: false
    });
    const [searchIt, setSearchIt] = React.useState("");
    const [searchToBL, setSearchToBL] = React.useState('lot');

    const handleSearchTo = event => setSearchToBL(event.target.value);
    const handleSearchIt = event => setSearchIt(event.target.value);


    return (
        <div>
            {!saleOrderDetails && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}><CircularProgress /></Box>}
            {saleOrderDetails && <Box>
                <UpperHeader saleOrderDetails={saleOrderDetails} handleUpperHeaderSubmit={handleNoAction} />
                {/* <UpdateLineItem handleSubmitUpdateLineItem={handleNoAction} handleCancel={handleNoAction} product={pickingSelectedProduct} readOnly={true} /> */}

                {/* main body */}
                <Box sx={{ padding: '15px', backgroundColor: 'white' }}>
                    <Box sx={{ padding: '15px', border: '1px solid black', borderStyle: 'inset' }}>
                        <Grid container columns={13} alignItems={'flex-start'} justifyContent={'space-between'}>
                            <Grid item xs={12} md={6}>
                                <PreLoader loading={loading.loading}>
                                    <TableContainer component={Paper} className="bsn">
                                        <Table size="small" aria-label="a dense table">
                                            <TableHead sx={{ backgroundColor: '#F1F3F4' }}>
                                                <TableRow sx={{
                                                    'td, th': { border: 0 }, '&.MuiTableCell-root': {
                                                        padding: 0
                                                    }
                                                }}>
                                                    <TableCell> Item Name </TableCell>
                                                    <TableCell >LOT No</TableCell>
                                                    <TableCell > QTY </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row, indx) => (
                                                    <TableRow key={indx} sx={{ '&:td, &:th': { border: 0 } }}
                                                    // onClick={e => handleSelect(row)}
                                                    >
                                                        <TableCell> {row.name} </TableCell>
                                                        <TableCell>{row.lotNo}</TableCell>
                                                        <TableCell>{row.qty}
                                                            {/* <Delete sx={{ color: 'gray', fontSize: '15px' }} /> */}
                                                        </TableCell>

                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    {/* Box Weight */}
                                    <Box my={3} sx={{ fontSize: '12px' }}>
                                        <Stack direction='row' spacing={1} mb={1}>
                                            <Typography sx={{ fontSize: '12px' }}>Decleared Value : </Typography>
                                            <Typography sx={{ backgroundColor: '#D9D9D9', fontSize: '12px' }} px={2} py={.1} >343</Typography>
                                        </Stack>

                                        <Stack direction='row' spacing={1} mb={1}>
                                            <Typography sx={{ fontSize: '12px' }}>COD Value : </Typography>
                                            <Typography sx={{ backgroundColor: '#D9D9D9', fontSize: '12px' }} px={2} py={.1} >343</Typography>
                                        </Stack>

                                        <Stack direction='row' spacing={1} mb={1}>
                                            <Typography sx={{ fontSize: '12px' }}>Box Weight : </Typography>
                                            <Typography sx={{ backgroundColor: '#D9D9D9', fontSize: '12px' }} px={2} py={.1} >343</Typography>
                                        </Stack>

                                        <Stack direction='row' spacing={1} mb={1}>
                                            <Typography sx={{ fontSize: '12px' }}>Dimentions : </Typography>
                                            <Typography sx={{ backgroundColor: '#D9D9D9', fontSize: '12px' }} px={9} py={.1} ></Typography>
                                        </Stack>
                                        <Stack direction='row'>
                                            L"<Typography sx={{ backgroundColor: '#D9D9D9', fontSize: '12px' }} px={2} py={.1} >343</Typography>
                                            W"<Typography sx={{ backgroundColor: '#D9D9D9', fontSize: '12px' }} px={2} py={.1} >343</Typography>
                                            H"<Typography sx={{ backgroundColor: '#D9D9D9', fontSize: '12px' }} px={2} py={.1} >343</Typography>
                                        </Stack>
                                    </Box>
                                    {/* Box Weight */}
                                    <Box my={3} sx={{ fontSize: '12px' }}>
                                        <Typography sx={{ color: '#767676', fontSize: '12px' }}>
                                            Bill Shipping Charges to:
                                        </Typography>

                                        <Grid container >
                                            <Grid item xs={6}>
                                                <Typography sx={{ fontSize: '12px' }}>Nice Customer </Typography>
                                                <Typography sx={{ fontSize: '12px' }}>123 Main St </Typography>
                                                <Typography sx={{ fontSize: '12px' }}>Williams Shopping Center </Typography>
                                                <Typography sx={{ fontSize: '12px' }}>Rye, NJ, 09012  USA </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Stack direction='row' spacing={1} mb={1}>
                                                    <Typography sx={{ fontSize: '12px' }}>Total Weight : </Typography>
                                                    <Typography sx={{ backgroundColor: '#D9D9D9', fontSize: '12px' }} px={2} py={.1} >285.00</Typography>
                                                </Stack>
                                                <Stack direction='row' spacing={1} mb={1}>
                                                    <Typography sx={{ fontSize: '12px' }}>Total Quantity : </Typography>
                                                    <Typography sx={{ backgroundColor: '#D9D9D9', fontSize: '12px' }} px={2} py={.1} >144.43</Typography>
                                                </Stack>
                                                <Stack direction='row' spacing={1} mb={1}>
                                                    <Typography sx={{ fontSize: '12px' }}>Total Boxes : </Typography>
                                                    <Typography sx={{ backgroundColor: '#D9D9D9', fontSize: '12px' }} px={2} py={.1} >1</Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>

                                    </Box>
                                </PreLoader>
                            </Grid>
                            <Divider flexItem orientation='vertical' style={{ backgroundColor: "#A0A3A5" }} />
                            <Grid item xs={12} md={6}>
                                <PreLoader loading={loading.loading}>
                                    <TableContainer component={Paper} className="bsn">
                                        <Table size="small" aria-label="a dense table">
                                            <TableHead sx={{ backgroundColor: '#F1F3F4' }}>
                                                <TableRow sx={{
                                                    'td, th': { border: 0 }, '&.MuiTableCell-root': {
                                                        padding: 0
                                                    }
                                                }}>
                                                    <TableCell> BOX </TableCell>
                                                    <TableCell >Tracking Number</TableCell>
                                                    <TableCell > Weight </TableCell>
                                                    <TableCell > DV </TableCell>
                                                    <TableCell > COD </TableCell>
                                                    <TableCell > Charges </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row, indx) => (
                                                    <TableRow key={indx} sx={{ '&:td, &:th': { border: 0 } }}
                                                    // onClick={e => handleSelect(row)}
                                                    >
                                                        <TableCell> {row.name} </TableCell>
                                                        <TableCell>{row.lotNo}</TableCell>
                                                        <TableCell>{row.qty} </TableCell>
                                                        <TableCell>{row.qty} </TableCell>
                                                        <TableCell>{row.qty} </TableCell>

                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </PreLoader>
                            </Grid>
                        </Grid>
                    </Box >
                </Box>

            </Box >}
            <Grid spacing={3} container direction='row' my={3} textAlign='right' mt={2} justifyContent={{ xs: 'center', md: 'space-between' }} alignItems={'center'}>
                <Grid item>
                    <BackButton onClick={() => navigate(-1)} />
                </Grid>
                <Grid item>
                    <Button variant='contained' size='small' > Print </Button>
                </Grid>
            </Grid>

        </div >
    )
}

export default PackingPreview
