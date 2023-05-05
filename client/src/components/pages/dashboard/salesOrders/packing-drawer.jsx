import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Divider, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { headInputStyle } from '../reUseAbles/ReuseAbles';
import { Container } from '@mui/system';
import { request_AccessToken_FEDEXP, request_AccessToken_STAMPS, request_AccessToken_STAMPS_server, validate_Address_FEDEX, validate_Address_STAMPS, validate_Address_UPS } from '../../../../utils/API_HELPERS';
// import { validateAddressFEDEXP, validateAddressUPS } from '../../../../RTK/Reducers/Reducers';
import { toast } from 'react-toastify';
import { payload_Address_Handler } from '../../../../utils/Helper';
import { useDispatch, useSelector } from 'react-redux';
import PreLoader from '../../HOC/Loading';
import { Delete } from '@mui/icons-material';


const PackingDrawer = ({ toggleDrawer, packingSideBar }) => {


    // const { stamps_token } = useSelector(store => store.mainReducer)
    // const dispatch = useDispatch();
    const [loading, setLoading] = React.useState({ loading: false, valid: false })
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
    ])

    const handlePakingPreview = () => {
        alert('handlePakingPreview')
    }




    // useEffect(() => {
     
    //     if (packingSideBar) {
            
    //     }
        
    // }, [packingSideBar])
    








    // const recursiveCaller = (func, counter = 0) => {
    //     // calling api
    //     func.then(response => {
    //         if (("error" in response) && !(response.error) && response.valid) {
    //             toast.dismiss();
    //             setAllowShipment(true);
    //             setLoading({ loading: "reponded", valid: true })
    //         }
    //         else if ((response.error) && counter < 5) {
    //             console.log(counter);
    //             counter++;
    //             recursiveCaller(func, counter);
    //         } else if (response.error && counter >= 5) {
    //             if (response.code === 401) {
    //                 dispatch(STAMPS_TOKEN({ set: false }))
    //                 toast.dismiss();
    //                 setLoading({ loading: "reponded", valid: false })
    //                 toast.error(`Try Again!`, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    //             } else {
    //                 toast.dismiss();
    //                 setLoading({ loading: "reponded", valid: false })
    //                 toast.error(`${response.message}`, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    //             }
    //         } else {
    //             toast.dismiss();
    //             setLoading({ loading: "idle", valid: false })
    //             toast.error(`${response.message}`, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    //         }
    //     })
    // };



    // const handleSubmit = () => {

    //     if (saleOrderDetails.edcWhseShipments.length > 0) {
    //         if (saleOrderDetails?.shippingAgentCode === "FEDEX") {
    //             setLoading({ loading: "loading", valid: false })
    //             toast.loading('Validating Address...', {
    //                 position: "top-right",
    //                 autoClose: false,
    //                 hideProgressBar: true
    //             });
    //             request_AccessToken_FEDEXP().then(token => {
    //                 recursiveCaller(validate_Address_FEDEX(token, payload_Address_Handler(saleOrderDetails)));
    //             })
    //         } else if (saleOrderDetails?.shippingAgentCode === "UPS") {
    //             setLoading({ loading: "loading", valid: false })
    //             toast.loading('Validating Address...', {
    //                 position: "top-right",
    //                 autoClose: false,
    //                 hideProgressBar: true
    //             });
    //             recursiveCaller(validate_Address_UPS(payload_Address_Handler(saleOrderDetails)));
    //         } else if (saleOrderDetails?.shippingAgentCode === "STAMPS") {
    //             setLoading({ loading: "loading", valid: false })
    //             toast.loading('Validating Address...', {
    //                 position: "top-right",
    //                 autoClose: false,
    //                 hideProgressBar: true
    //             });
    //             if (stamps_token) {
    //                 recursiveCaller(
    //                     validate_Address_STAMPS(stamps_token, payload_Address_Handler(saleOrderDetails))
    //                 );
    //             } else {
    //                 request_AccessToken_STAMPS()
    //                     .then(res => {
    //                         if (res.token) {
    //                             recursiveCaller(
    //                                 validate_Address_STAMPS(res.token, payload_Address_Handler(saleOrderDetails))
    //                             );
    //                             dispatch(STAMPS_TOKEN({ set: true, token: res.token, code: res.code }))
    //                         }
    //                         console.log("res", res);
    //                     });

    //             };
    //         } else {
    //             toast.warn(`No courier isattached`, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    //         }
    //     } else {
    //         packingSideBar && toast.error('No Shipment Details Found ...', { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    //     }

    // };

    return (
        <div>
            <React.Fragment>

                <SwipeableDrawer
                    anchor={"right"}
                    open={packingSideBar}
                    // onClose={loading.loading === "loading" ? () => { } : toggleDrawer(false)}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    <Box
                        sx={{ width: 500, height: "100vh", padding: "10px 20px 0px 20px", background: "#FFFFFF" }}
                        role="presentation"
                    >
                        <Grid container spacing={.4} justifyContent={'space-between'} alignItems={'center'} sx={{ color: '#919191' }} >
                            <Grid item xs={12} sx={{ borderBottom: '1px solid black' }}>
                                <Stack direction='row' alignItems={'center'} justifyContent={'center'}>
                                    <Typography variant='h5'>Box</Typography>
                                </Stack>
                                <Box my={3} sx={{ textAlign: 'center' }}>
                                    <Button variant='outlined'>Scan LOT</Button>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{ height: '60vh' }} className='scroll'>
                                    <PreLoader loading={loading.loading}>
                                        <TableContainer component={Paper} className="bsn">
                                            <Table size="small" aria-label="a dense table">
                                                <TableHead sx={{ backgroundColor: '#F1F3F4' }}>
                                                    <TableRow sx={{ 'td, th': { border: 0 } }}>
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
                                                            <TableCell>{row.qty} <Delete sx={{ color: 'gray', fontSize: '15px' }} /></TableCell>

                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </PreLoader>
                                </Box>
                            </Grid>


                            <Grid item container alignItems='center' justifyContent={'space-between'} xs={12}>
                                <Grid item xs={6}>
                                    <Typography>
                                        Total QTY :
                                    </Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography sx={{ textAlign: 'right' }}>
                                        144.95 lbs
                                    </Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography>
                                        Box Weight :
                                    </Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography sx={{ textAlign: 'right' }}>
                                        144.95 lbs
                                    </Typography>
                                </Grid>

                            </Grid>
                            <Grid item xs={12} mt={1} sx={{ textAlign: 'right' }}>
                                <Divider />
                                <Button sx={{ fontSize: '13px', textransform: 'captalize' }} variant='contained' size='small' onClick={handlePakingPreview}>Preview</Button>
                            </Grid>

                        </Grid>
                    </Box>
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}

export default PackingDrawer;