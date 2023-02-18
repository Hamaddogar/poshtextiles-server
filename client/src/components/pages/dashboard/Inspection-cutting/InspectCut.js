import React from 'react'
import { Button, Grid, Stack, Typography, Checkbox, CircularProgress, TextField, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackArrow from '../../../assets/icons/back-arrow.png'
import { headInputStyle, subHeadInputStyle } from '../reUseAbles/ReuseAbles';
import BasicTable from './table-yargade';
import { ADD_NEW_RESULT } from '../../../../RTK/Reducers/Reducers';
import { Visibility } from '@mui/icons-material';
import ThumbNailImageSVG from "../../../assets/images/thumbnail2.svg";





const btnStyle = { background: "white", border: "1px solid #7F7F7F", padding: "3px 5px", width: "60%", color: "#202020" }
const InspectCut = () => {

    const { pickingSelectedProduct, status } = useSelector(store => store.mainReducer);
    const [showSelectedProduct, setShowSelectedProduct] = React.useState(null);
    const [dropShipChecked, setDropShipChecked] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    React.useLayoutEffect(() => { setShowSelectedProduct(pickingSelectedProduct.selected_item) }, [pickingSelectedProduct.selected_item]);

    const handleResult = () => {
        dispatch(ADD_NEW_RESULT({
            etag: showSelectedProduct["@odata.etag"],
        }));
        navigate(-2);
    }
    return (
        <div>
            <Box>
                {!showSelectedProduct && status !== 'pending' && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}><CircularProgress /></Box>}
                {showSelectedProduct && <Box>
                    {/* Upper Form */}
                    <Box sx={{}} >
                        <Grid container sx={{ mt: 1, mb: 2 }} alignItems={'flex-end'} justifyContent='space-between' >
                            <Grid container item xs={12} md={10} spacing={1} alignItems={'flex-end'} >
                                <Grid item xs={6} md={4} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Bill To: </Typography>
                                    <TextField sx={headInputStyle} fullWidth defaultValue={pickingSelectedProduct.sellToContact} size='small' InputProps={{
                                        endAdornment: (<InputAdornment position="end"> <Visibility sx={{ fontSize: '17px', cursor: 'pointer' }} />  </InputAdornment>)
                                    }} />
                                </Grid>

                                <Grid item xs={6} md={4} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Ship To: </Typography>
                                    <TextField sx={headInputStyle} fullWidth defaultValue={pickingSelectedProduct.shipToName} size='small' InputProps={{
                                        endAdornment: (<InputAdornment position="end"> <Visibility sx={{ fontSize: '17px', cursor: 'pointer' }} /> </InputAdornment>)
                                    }} />
                                </Grid>

                                <Grid item xs={6} md={4} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Project Name: </Typography>
                                    <TextField sx={headInputStyle} fullWidth defaultValue={pickingSelectedProduct.shipToName} size='small' />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Terms: </Typography>
                                    <TextField sx={headInputStyle} fullWidth defaultValue={pickingSelectedProduct.shipToCountryRegionCode} size='small' />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Priority: </Typography>
                                    <TextField sx={headInputStyle} fullWidth defaultValue={pickingSelectedProduct.shipmentMethodCode} size='small' />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Specifier: </Typography>
                                    <TextField sx={headInputStyle} fullWidth defaultValue={pickingSelectedProduct.shipToContact} size='small' />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Sales Person: </Typography>
                                    <TextField sx={headInputStyle} fullWidth defaultValue={pickingSelectedProduct.shipToContact} size='small' />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Customer PO: </Typography>
                                    <TextField sx={headInputStyle} fullWidth defaultValue={pickingSelectedProduct.shipToPostCode} size='small' />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Campaign: </Typography>
                                    <TextField sx={headInputStyle} fullWidth defaultValue={pickingSelectedProduct.campaign} size='small' />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Order Date: </Typography>
                                    <TextField sx={headInputStyle} fullWidth type={"date"} defaultValue={pickingSelectedProduct.shipmentDate} size='small' />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Req Ship Date: </Typography>
                                    <TextField sx={headInputStyle} fullWidth type={"date"} defaultValue={pickingSelectedProduct.shipmentDate} size='small' />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Box View */}
                    <Box sx={{ transition: '.5s', border: '1px solid black', boxShadow: `1px 1px 2px 1px rgba(0, 0, 0, 0.25)`, display: 'flex', alignItems: 'flex-start', padding: showSelectedProduct ? '15px' : '0px' }}>
                        {showSelectedProduct &&
                            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'center', sm: 'flex-start' }}>
                                <Box>
                                    <Box component='img' alt='img' style={{ width: '100%', minWidth: '146px', maxWidth: '146px', cursor: 'pointer' }} src={showSelectedProduct.image ? showSelectedProduct.image : ThumbNailImageSVG} />
                                </Box>
                                {/* form */}
                                <Box>
                                    <Grid container alignItems='center' spacing={1}>
                                        <Grid item xs={6} sm={6} md={3} >
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Item Type: </Typography>
                                            <TextField defaultValue={showSelectedProduct.type} size='small' sx={headInputStyle} fullWidth />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={3}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Item Name: </Typography>
                                            <TextField defaultValue={showSelectedProduct.description} size='small' sx={headInputStyle} fullWidth />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={4}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Description: </Typography>
                                            <TextField defaultValue={showSelectedProduct.description2} size='small' sx={headInputStyle} fullWidth />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={2}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Drop Ship: </Typography>
                                            <Checkbox
                                                checked={dropShipChecked}
                                                onChange={e => setDropShipChecked(e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={2}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Item Number: </Typography>
                                            <TextField defaultValue={showSelectedProduct.no} size='small' sx={subHeadInputStyle} fullWidth />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={2}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Quantity: </Typography>
                                            <TextField defaultValue={showSelectedProduct.quantity} size='small' sx={headInputStyle} fullWidth />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={2}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Min Quantity: </Typography>
                                            <TextField defaultValue={showSelectedProduct.outstandingQuantity} size='small' sx={headInputStyle} fullWidth />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={2}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Price: </Typography>
                                            <TextField defaultValue={showSelectedProduct.unitPrice} size='small' sx={headInputStyle} fullWidth />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={2}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Discount: </Typography>
                                            <TextField defaultValue={showSelectedProduct.lineDiscountAmount} size='small' sx={headInputStyle} fullWidth />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={2}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Amount: </Typography>
                                            <TextField defaultValue={showSelectedProduct.lineAmount} size='small' sx={headInputStyle} fullWidth />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Stack spacing={1} direction='row' alignItems='center' justifyContent={'center'} >
                                                <TextField placeholder='Comments' sx={headInputStyle} size='small' fullWidth />
                                                <Stack direction='row' alignItems='center' justifyContent={'center'}>
                                                    {/* <Button color='error' variant='contained' size='small' onClick={e => setShowSelectedProduct(null)}>cancel</Button> &nbsp; */}
                                                    <Button color='primary' variant='contained' size='small'>ok</Button>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Stack>
                        }
                    </Box>

                    {/* main body */}
                    <Box sx={{ padding: '15px', backgroundColor: 'white' }}>
                        <Box sx={{ padding: '15px', border: '1px solid black', borderStyle: 'inset' }}>

                            <Box margin='20px auto auto auto' >
                                <Stack direction='row' justifyContent={"center"} spacing={3}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Button style={{ background: "#E0E0E0", color: "#7A7B7C", padding: "10px 25px", border: "1px solid #7A7B7C" }}>YARDAGE</Button>
                                    </Box>
                                    <Box >
                                        <select id="roll" style={{ marginLeft: "15px", textAlign: "center", color: "#7A7B7C", width: "100%", borderRadius: "5px", padding: "10px 25px", background: "#E0E0E0", border: "1px solid #7A7B7C" }}>
                                            <option label="TYPE OF DEFECT">Roll- 4" x 6" Shipping label</option>
                                            <option label="roll2">Roll- 4" x 6" Shipping label</option>
                                            <option label="roll3">Roll- 4" x 6" Shipping label</option>
                                            <option label="roll4">Roll- 4" x 6" Shipping label</option>
                                        </select>
                                    </Box>
                                </Stack>
                                <Grid container mt={4}>
                                    <Grid sx={{ borderRight: "3px solid #919191" }} item container xs={12} md={8}>
                                        <Grid sx={{ padding: "10px 30px" }} container xs={12} md={6}>
                                            <BasicTable />
                                        </Grid>
                                        <Grid sx={{ padding: "10px 30px" }} container xs={12} md={6}>
                                            <BasicTable />
                                        </Grid>
                                    </Grid>
                                    <Grid sx={{ paddingLeft: "45px" }} item xs={12} md={4}>
                                        <Typography>Inspection Report Status</Typography>
                                        <Box className="mt20">
                                            <label>Inspector Name:</label><br />
                                            <select id="roll" style={{ textAlign: "center", border: "0px", background: "#E9EDF1", width: "60%" }}>
                                                <option label=""></option>
                                                <option label="roll2"></option>
                                                <option label="roll3"></option>
                                                <option label="roll4"></option>
                                            </select>
                                        </Box>
                                        <Box className="mt20">
                                            <label>Inspector's Comments:</label><br />
                                            <textarea style={{ width: "60%", background: "#E9EDF1" }} id="review" name="review" rows="4" cols="50">
                                            </textarea>
                                        </Box>
                                        <Box className="mt20">
                                            <Typography>
                                                Inspection Results:
                                            </Typography>
                                            <Stack spacing={1} mt={1}>
                                                <Button onClick={handleResult} sx={btnStyle}>Good</Button>
                                                <Button onClick={handleResult} sx={btnStyle}>OK</Button>
                                                <Button onClick={handleResult} sx={btnStyle}>DAMAGED</Button>
                                            </Stack>
                                        </Box>

                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>

                </Box >}
                <Grid spacing={3} container direction='row' my={3} textAlign='right' mt={2} justifyContent={{ xs: 'center', md: 'space-between' }} alignItems={'center'}>
                    <Grid item>
                        <Button startIcon={<img src={BackArrow} alt='back' width='18px' />} variant='contained' color='error' size='small' onClick={() => navigate(-1)}> Go back</Button>
                    </Grid>
                </Grid>

            </Box>

        </div>
    )
}

export default InspectCut