import { Visibility } from '@mui/icons-material';
import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_NEW_INVENTORY_PRODUCT } from '../../../../RTK/Reducers/Reducers';
import { subHeadInputStyle, Wrapper } from '../reUseAbles/ReuseAbles'
import NewLocationTransferTable from './NewLocationTransferTable';


const NewLocationTransfer = () => {
    const { pickingSelectedProduct, inventoryAdjustment, perPage } = useSelector(store => store.mainReducer);

    const [showSelectedProduct, setShowSelectedProduct] = React.useState(null);
    const dispatch = useDispatch();
    React.useLayoutEffect(() => { setShowSelectedProduct(pickingSelectedProduct) }, [pickingSelectedProduct]);



    const handleSubmit = e => {
        e.preventDefault()
        dispatch(ADD_NEW_INVENTORY_PRODUCT({
            lotNo: 'LOT221839', itemName: 'TITAN-101', description: '100% Silk White', remainingQty: 70, adjQty: 100, price: 70
        }));
        document.getElementById('new_data').reset();
    }


    const orderDetail = {}



    return (
        <div>
            <Box sx={{}} >
                <Grid container sx={{ mt: 1, mb: 2 }} alignItems={'flex-end'} justifyContent='space-between' >

                    <Grid container item xs={12} md={10} spacing={1} alignItems={'flex-end'} >
                        <Grid item xs={6} >
                            <Wrapper >
                                <Typography mr={1} sx={{ color: '#6D6D6D' }}>Transfer From:  </Typography>
                                <TextField defaultValue={orderDetail.billTo} size='small' sx={{ ...subHeadInputStyle, minWidth: '17rem', maxWidth: '17rem' }} InputProps={{
                                    endAdornment: (<InputAdornment position="end"> <Visibility sx={{ fontSize: '17px' }} />  </InputAdornment>)
                                }} />
                            </Wrapper>
                        </Grid>

                        <Grid item xs={6} >
                            <Wrapper>
                                <Typography mr={1} sx={{ color: '#6D6D6D' }}>In-Transit Code:  </Typography>
                                <TextField defaultValue={orderDetail.projectName} size='small' sx={{ ...subHeadInputStyle, minWidth: '17rem', maxWidth: '17rem' }} />
                            </Wrapper>
                        </Grid>

                        <Grid item xs={6}>
                            <Wrapper>
                                <Typography mr={1} sx={{ color: '#6D6D6D' }}>Transfer To: &nbsp; &nbsp; </Typography>
                                <TextField defaultValue={orderDetail.terms} size='small' sx={{ ...subHeadInputStyle, minWidth: '17rem', maxWidth: '17rem' }} />
                            </Wrapper>
                        </Grid>

                        <Grid item xs={6} >
                            <Wrapper>
                                <Typography mr={1} sx={{ color: '#6D6D6D' }}>Req Ship Date: </Typography>
                                <TextField type={"date"} defaultValue={orderDetail.reqShipDate} size='small' sx={{ ...subHeadInputStyle, minWidth: '17rem', maxWidth: '17rem' }} />
                            </Wrapper>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>


            <Box mb={1}>
                <Box sx={{ transition: '.5s', border: '1px solid black', boxShadow: `1px 1px 2px 1px rgba(0, 0, 0, 0.25)`, display: 'flex', alignItems: 'flex-start', padding: showSelectedProduct ? '15px' : '0px' }}>
                    <Box sx={{ padding: '15px' }} >
                        <Box style={{ width: '100%', minWidth: '146px', maxWidth: '146px', cursor: 'pointer', backgroundColor: 'white', minHeight: '140px' }}></Box>
                    </Box>
                    <Box component='form' onSubmit={handleSubmit} id='new_data'
                        sx={{ display: 'flex', alignItems: 'flex-start' }}>

                        <Wrapper justifyContent={'space-between'} py={2}>
                            <Stack margin='7px 10px' >
                                <Typography mr={1} sx={{ color: '#6D6D6D' }}>LOT No: </Typography>
                                <TextField size='small' sx={{ ...subHeadInputStyle, minWidth: '15rem', maxWidth: '15rem' }} />
                            </Stack>

                            <Stack margin='7px 10px'>
                                <Typography mr={1} sx={{ color: '#6D6D6D' }}>Remaining Quantity: </Typography>
                                <TextField size='small' sx={{ ...subHeadInputStyle, minWidth: '11rem', maxWidth: '11rem' }} />
                            </Stack>

                            <Stack margin='7px 10px'>
                                <Typography mr={1} sx={{ color: '#6D6D6D' }}>Item Number: </Typography>
                                <TextField size='small' sx={{ ...subHeadInputStyle, minWidth: '15rem', maxWidth: '15rem' }} />
                            </Stack>

                            <Wrapper margin='7px 10px'>
                                <Typography mr={1} sx={{ color: '#6D6D6D' }}>Item Name: </Typography>
                                <TextField size='small' sx={{ ...subHeadInputStyle, minWidth: '15rem', maxWidth: '15rem' }} />
                            </Wrapper>


                            <Wrapper margin='7px 10px'>
                                <Typography mr={1} sx={{ color: '#6D6D6D' }}>Description: </Typography>
                                <TextField size='small' sx={{ ...subHeadInputStyle, minWidth: '10rem', maxWidth: '10rem' }} />
                            </Wrapper>

                            <Stack direction={'row'} justifyContent={{ xs: 'center', md: 'space-between' }} margin='3px 10px' width='100%' spacing={2} >
                                <TextField size='small' sx={{ ...subHeadInputStyle, minWidth: '80%', }} fullWidth />
                                <Box margin='5px 0px' minWidth='200px'>
                                    <Button type={'reset'} color='error' variant='contained' size='small'>Cancel</Button> &nbsp;&nbsp;
                                    <Button type={'submit'} color='primary' variant='contained' size='small'>ok</Button>
                                </Box>
                            </Stack>
                        </Wrapper>

                    </Box>
                </Box>

                {/* table */}
                <Box>
                    <NewLocationTransferTable perPage={perPage} data={inventoryAdjustment} />
                </Box>

            </Box>
        </div>
    )
}

export default NewLocationTransfer;