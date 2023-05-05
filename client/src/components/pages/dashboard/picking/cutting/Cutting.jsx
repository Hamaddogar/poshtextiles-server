import React from 'react'
import { Button, Grid, Typography, CircularProgress, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BackButton, subHeadInputStyle, Wrapper } from '../../reUseAbles/ReuseAbles';
import { orderDetail } from '../../../../../RTK/Reducers/fakeData';
import scissors from '../../../../assets/icons/scissors.png';
import { MARK_DONE_CUTTING_GREEN_PACKING } from '../../../../../RTK/Reducers/Reducers';





const Cutting = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pickingSelectedProduct, status } = useSelector(store => store.mainReducer);
    const [showSelectedProduct, setShowSelectedProduct] = React.useState(null);
    // const [dropShipChecked, setDropShipChecked] = React.useState(false);
    React.useLayoutEffect(() => {
        setShowSelectedProduct(pickingSelectedProduct);
    }, [pickingSelectedProduct]);


    const handleDoneCutting = () => {
        dispatch(MARK_DONE_CUTTING_GREEN_PACKING(true))
        navigate('/sale-order');
    }



    return (
        <div>
            {/* <Picking /> */}
            <Box>
                {!showSelectedProduct && status !== 'pending' && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}><CircularProgress /></Box>}
                {showSelectedProduct && <Box>
                    {/* <Box sx={{ padding: showSelectedProduct ? '15px' : '0px' }} mb={1}>
                        <Box sx={{ transition: '.5s', border: '1px solid black', boxShadow: `1px 1px 2px 1px rgba(0, 0, 0, 0.25)`, display: 'flex', alignItems: 'flex-start', padding: showSelectedProduct ? '15px' : '0px' }}>
                            {showSelectedProduct && <>
                                <Box>
                                    <Box component='img' alt='img' style={{ width: '100%', minWidth: '146px', maxWidth: '146px', cursor: 'pointer' }} src={showSelectedProduct.image} />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>

                                    <Wrapper justifyContent={'flex-start'} >
                                        <Wrapper margin='3px 10px' >
                                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Item Type: </Typography>
                                            <TextField defaultValue={orderDetail.billTo} size='small' sx={subHeadInputStyle} />
                                        </Wrapper>

                                        <Wrapper margin='3px 10px'>
                                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Item Name: </Typography>
                                            <TextField defaultValue={orderDetail.projectName} size='small' sx={subHeadInputStyle} />
                                        </Wrapper>

                                        <Wrapper margin='3px 10px'>
                                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Description: </Typography>
                                            <TextField defaultValue={orderDetail.terms} size='small' sx={{ ...subHeadInputStyle, minWidth: '5rem', maxWidth: '5rem' }} />
                                        </Wrapper>

                                        <Wrapper margin='3px 10px'>
                                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Drop Ship: </Typography>
                                            <Checkbox
                                                checked={dropShipChecked}
                                                onChange={e => setDropShipChecked(e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </Wrapper>


                                        <Wrapper margin='3px 10px'>
                                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Item Number: </Typography>
                                            <TextField defaultValue={orderDetail.shipTo} size='small' sx={subHeadInputStyle} />
                                        </Wrapper>


                                        <Wrapper margin='3px 10px'>
                                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Quantity: </Typography>
                                            <TextField defaultValue={orderDetail.priority} size='small' sx={{ ...subHeadInputStyle, minWidth: '5rem', maxWidth: '5rem' }} />
                                        </Wrapper>

                                        <Wrapper margin='3px 10px'>
                                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Min Quantity: </Typography>
                                            <TextField defaultValue={orderDetail.priority} size='small' sx={{ ...subHeadInputStyle, minWidth: '5rem', maxWidth: '5rem' }} />
                                        </Wrapper>
                                        <Wrapper margin='3px 10px'>
                                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Quantity Selected: </Typography>
                                            <TextField defaultValue={orderDetail.priority} size='small' sx={{ ...subHeadInputStyle, minWidth: '5rem', maxWidth: '5rem' }} />
                                        </Wrapper>

                                        <Wrapper justifyContent={{ xs: 'center', md: 'space-between' }} margin='3px 10px' width='100%' spacing={2} >
                                            <TextField defaultValue={orderDetail.priority} size='small' sx={{ ...subHeadInputStyle, minWidth: '80%', }} fullWidth />
                                            <Box margin='5px 0px'>
                                                <Button color='error' variant='contained' size='small' onClick={e => setShowSelectedProduct(pickingSelectedProduct)}>cancel</Button> &nbsp;
                                                <Button color='primary' variant='contained' size='small'>ok</Button>
                                            </Box>
                                        </Wrapper>




                                    </Wrapper>

                                </Box>
                            </>
                            }
                        </Box>
                    </Box> */}

                    <Box sx={{ padding: '15px', backgroundColor: 'white' }}>
                        <Box sx={{ padding: '15px', border: '1px solid black', borderStyle: 'inset', minHeight: '500px' }}>
                            <Wrapper justifyContent={'flex-start'} margin='3px 10px'>
                                <Typography mr={1} sx={{ color: '#6D6D6D' }}>Qty to Cut: </Typography>
                                <TextField defaultValue={orderDetail.priority} size='small' sx={{ ...subHeadInputStyle, minWidth: '5rem', maxWidth: '8rem', backgroundColor: '#E9EDF1' }} />
                            </Wrapper>

                            <Button variant='contained' startIcon={<img style={{ width: '20px' }} alt='scissors' src={scissors} />} sx={{ backgroundColor: '#9747FF', fontSize: '11px' }}
                                onClick={() => navigate('/cutting')}
                            >cut</Button>

                            <Wrapper justifyContent={'flex-start'} margin='3px 10px'>
                                <Typography mr={1} sx={{ color: '#6D6D6D' }}>Remaining Qty: </Typography>
                                <TextField defaultValue={orderDetail.priority} size='small' sx={{ ...subHeadInputStyle, minWidth: '5rem', maxWidth: '8rem', backgroundColor: '#E9EDF1' }} />
                            </Wrapper>

                            <Wrapper justifyContent={'flex-start'} margin='3px 10px'>
                                <Typography mr={1} sx={{ color: '#6D6D6D' }}>Child LOT No.: </Typography>
                                <TextField defaultValue={orderDetail.priority} size='small' sx={{ ...subHeadInputStyle, minWidth: '5rem', maxWidth: '8rem', backgroundColor: '#E9EDF1' }} />
                            </Wrapper>

                            <Wrapper justifyContent={'flex-start'} margin='3px 10px'>
                                <Typography mr={1} sx={{ color: '#6D6D6D' }}>Child LOT Qty: </Typography>
                                <TextField defaultValue={orderDetail.priority} size='small' sx={{ ...subHeadInputStyle, minWidth: '5rem', maxWidth: '8rem', backgroundColor: '#E9EDF1' }} />
                            </Wrapper>
                        </Box>
                    </Box>

                </Box >}


                <Grid container direction='row' my={1} textAlign='right' mt={2} justifyContent={{ xs: 'center', md: 'space-between' }} alignItems={'center'}>
                    <Grid item>
                        <BackButton onClick={() => navigate(-1)} />
                    </Grid>
                    <Grid item>
                        <Button variant='contained' color='success' size='small' onClick={handleDoneCutting}> DONE CUTTING</Button>
                    </Grid>
                </Grid>

            </Box>

        </div>
    )
}

export default Cutting