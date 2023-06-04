import { CircularProgress, Divider, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { BackButton, handleNoAction } from '../reUseAbles/ReuseAbles';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import UpperHeader from '../reUseAbles/UpperHeader';
import PreLoader from '../../HOC/Loading';
// import UpdateLineItem from '../reUseAbles/UpdateLineItem';
import printHtmlToPDF from "print-html-to-pdf";


const PackingPreview = () => {
    const { saleOrderDetails, PACKING_BOXES_PREVIEW } = useSelector(store => store.mainReducer);
    const navigate = useNavigate();
    const [rows] = React.useState([
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
    const [loading] = React.useState({
        loading: false
    });

    const pagePrint = async () => {
        const node = document.getElementById("print-me");
        const pdfOption = {
            jsPDF: {
                unit: 'px',
                format: 'a4',
            },
            spin: true,
            fileName: saleOrderDetails.shipToAddress,
            fitToPage: false,
            margin: {
                left: 10,
                right: 10
            },
        }
        // await html2pdf().set(pdfOption).from(node).save()
        await printHtmlToPDF.print(node, pdfOption);
    }

    return (
        <div>
            {!saleOrderDetails && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}><CircularProgress /></Box>}
            {saleOrderDetails && <Box id="print-me">
                <UpperHeader saleOrderDetails={saleOrderDetails} handleUpperHeaderSubmit={handleNoAction} />
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
                                                <Typography sx={{ fontSize: '12px' }}>{saleOrderDetails?.edcCustomers?.[0]?.name} </Typography>
                                                <Typography sx={{ fontSize: '12px' }}>{saleOrderDetails?.edcCustomers?.[0]?.address} </Typography>
                                                <Typography sx={{ fontSize: '12px' }}>{saleOrderDetails?.edcCustomers?.[0]?.address2} </Typography>
                                                <Typography sx={{ fontSize: '12px' }}>
                                                    {` ${saleOrderDetails?.edcCustomers?.[0]?.city}, ${saleOrderDetails?.edcCustomers?.[0]?.county}, ${saleOrderDetails?.edcCustomers?.[0]?.postCode}, ${saleOrderDetails?.edcCustomers?.[0]?.countryRegionCode} `}
                                                </Typography>
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
                                                    <Typography sx={{ backgroundColor: '#D9D9D9', fontSize: '12px' }} px={2} py={.1} >{PACKING_BOXES_PREVIEW?.length}</Typography>
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
                    <Button variant='contained' size='small' onClick={pagePrint} > Print </Button>
                </Grid>
            </Grid>
        </div >
    )
}

export default PackingPreview
