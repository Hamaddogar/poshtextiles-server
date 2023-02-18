import { Checkbox, CircularProgress, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import 'bootstrap/dist/css/bootstrap.css';
import BackArrow from '../../../assets/icons/back-arrow.png'
import { headInputStyle, subHeadInputStyle } from '../reUseAbles/ReuseAbles';
import { Visibility } from '@mui/icons-material';
import PickingTable from './PickingTable';
import fabric from '../../../assets/icons/fabric.png';
import shelf from '../../../assets/icons/shelf.png';
import ThumbNailImageSVG from "../../../assets/images/thumbnail2.svg";







const Picking = () => {

    const { pickingSelectedProduct, status } = useSelector(store => store.mainReducer);
    const [showSelectedProduct, setShowSelectedProduct] = React.useState(null);
    const [dropShipChecked, setDropShipChecked] = React.useState(false);
    const navigate = useNavigate();
    React.useLayoutEffect(() => { setShowSelectedProduct(pickingSelectedProduct.selected_item) }, [pickingSelectedProduct.selected_item]);

    return (
        <div>
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
                        <Box >
                            <Stack direction='row' justifyContent={"center"} spacing={4}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box component='img' alt='img' src={shelf} />
                                    <Button variant='outlined' sx={{ color: '#6D6D6D', border: '1px solid #1D1D1E', borderRadius: 0 }} size='large' >Scan Bin</Button>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box component='img' alt='img' src={fabric} />
                                    <Button variant='outlined' sx={{ color: '#6D6D6D', border: '1px solid #1D1D1E', borderRadius: 0 }} size='large' >Scan LOT</Button>
                                </Box>
                            </Stack>

                            <Box maxWidth={'sm'} margin='20px auto auto auto' >
                                <PickingTable />
                            </Box>

                        </Box>
                    </Box >
                </Box>

            </Box >}
            <Grid spacing={3} container direction='row' my={3} textAlign='right' mt={2} justifyContent={{ xs: 'center', md: 'space-between' }} alignItems={'center'}>
                <Grid item>
                    <Button startIcon={<img src={BackArrow} alt='back' width='18px' />} variant='contained' color='error' size='small' onClick={() => navigate(-1)}> Go back</Button>
                </Grid>
            </Grid>

        </div >
    )
}

export default Picking
