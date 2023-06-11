import React from 'react'
import { Button, Grid, Stack, Typography, Checkbox, CircularProgress, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackArrow from '../../../../assets/icons/back-arrow.png'
import { subHeadInputStyle, Wrapper } from '../../reUseAbles/ReuseAbles';
import { orderDetail } from '../../../../../RTK/Reducers/fakeData';
import BasicTable from '../../Inspection-cutting/table-yargade';






const Inspection = () => {

    const { pickingSelectedProduct, status } = useSelector(store => store.mainReducer);
    const [showSelectedProduct, setShowSelectedProduct] = React.useState(null);
    const [dropShipChecked, setDropShipChecked] = React.useState(false);
    const navigate = useNavigate();
    React.useEffect(() => { setShowSelectedProduct(pickingSelectedProduct) }, [pickingSelectedProduct]);

    return (
        <div>
            {/* <Picking /> */}
            <Box>
                {!showSelectedProduct && status !== 'pending' && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}><CircularProgress /></Box>}
                {showSelectedProduct && <Box>
                    <Wrapper justifyContent={'space-around'} >
                        <Wrapper margin='5px 10px' >
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Bill To: </Typography>
                            <TextField defaultValue={orderDetail.billTo} size='small' sx={subHeadInputStyle} />
                        </Wrapper>

                        <Wrapper margin='5px 10px'>
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Project Name: </Typography>
                            <TextField defaultValue={orderDetail.projectName} size='small' sx={subHeadInputStyle} />
                        </Wrapper>

                        <Wrapper margin='5px 10px'>
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Terms: </Typography>
                            <TextField defaultValue={orderDetail.terms} size='small' sx={{ ...subHeadInputStyle, minWidth: '5rem', maxWidth: '5rem' }} />
                        </Wrapper>


                        <Wrapper margin='5px 10px'>
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Ship To: </Typography>
                            <TextField defaultValue={orderDetail.shipTo} size='small' sx={subHeadInputStyle} />
                        </Wrapper>


                        <Wrapper margin='5px 10px'>
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Priority: </Typography>
                            <TextField defaultValue={orderDetail.priority} size='small' sx={{ ...subHeadInputStyle, minWidth: '5rem', maxWidth: '5rem' }} />
                        </Wrapper>

                        <Wrapper margin='5px 10px'>
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Specifier: </Typography>
                            <TextField defaultValue={orderDetail.specifier} size='small' sx={{ ...subHeadInputStyle, minWidth: '5rem', maxWidth: '5rem' }} />
                        </Wrapper>


                        <Wrapper margin='5px 10px'>
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Order Date: </Typography>
                            <TextField defaultValue={orderDetail.orderDate} size='small' sx={{ ...subHeadInputStyle, minWidth: '5rem', maxWidth: '5rem' }} />
                        </Wrapper>



                        <Wrapper margin='5px 10px'>
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Sales Person: </Typography>
                            <TextField defaultValue={orderDetail.salesPerson} size='small' sx={{ ...subHeadInputStyle, minWidth: '5rem', maxWidth: '5rem' }} />
                        </Wrapper>



                        <Wrapper margin='5px 10px'>
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Customer PO: </Typography>
                            <TextField defaultValue={orderDetail.customerPO} size='small' sx={{ ...subHeadInputStyle, minWidth: '5rem', maxWidth: '5rem' }} />
                        </Wrapper>



                        <Wrapper margin='5px 10px'>
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Campaign: </Typography>
                            <TextField defaultValue={orderDetail.campaign} size='small' sx={{ ...subHeadInputStyle, minWidth: '5rem', maxWidth: '5rem' }} />
                        </Wrapper>




                        <Wrapper margin='5px 10px'>
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Req Ship Date: </Typography>
                            <TextField defaultValue={orderDetail.reqShipDate} size='small' sx={{ ...subHeadInputStyle, minWidth: '5rem', maxWidth: '5rem' }} />
                        </Wrapper>



                    </Wrapper>
                    <Box sx={{ padding: showSelectedProduct ? '15px' : '0px' }} mb={1}>
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
                    </Box>


                    <Box sx={{ padding: '15px', backgroundColor: 'white' }}>
                        <Box sx={{ padding: '15px', border: '1px solid black', borderStyle: 'inset' }}>

                            <Box margin='20px auto auto auto' >
                                <Stack direction='row' justifyContent={"center"} spacing={3}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Button style={{ background: "#E0E0E0", color: "black", padding: "10px 25px", border: "1px solid black" }}>YARDAGE</Button>
                                    </Box>
                                    <Box >
                                        <select id="roll" style={{ marginLeft: "15px", textAlign: "center", width: "100%", borderRadius: "5px", padding: "10px 25px", background: "#E0E0E0", border: "1px solid black" }}>
                                            <option label="TYPE OF DEFECT">Roll- 4" x 6" Shipping label</option>
                                            <option label="roll2">Roll- 4" x 6" Shipping label</option>
                                            <option label="roll3">Roll- 4" x 6" Shipping label</option>
                                            <option label="roll4">Roll- 4" x 6" Shipping label</option>
                                        </select>
                                    </Box>
                                </Stack>
                                <Grid container mt={4}>
                                    <Grid sx={{ border: "1px solid grey" }} item container xs={12} md={8}>
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
                                            <textarea style={{ width: "60%" }} id="w3review" name="w3review" rows="4" cols="50">
                                            </textarea>
                                        </Box>
                                        <Box className="mt20">
                                            <Typography>
                                                Inspection Results:
                                            </Typography>
                                            <Stack spacing={3}>
                                                <Button sx={{ background: "white", border: "1px solid black", padding: "3px 5px", width: "60%", color: "black" }}>Good</Button>
                                                <Button sx={{ background: "white", border: "1px solid black", padding: "3px 5px", width: "60%", color: "black" }}>OK</Button>
                                                <Button sx={{ background: "white", border: "1px solid black", padding: "3px 5px", width: "60%", color: "black" }}>DAMAGED</Button>
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

export default Inspection