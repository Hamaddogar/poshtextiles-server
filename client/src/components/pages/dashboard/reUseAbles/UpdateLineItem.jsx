import { Box, Button, Checkbox, Grid, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { headInputStyle } from './ReuseAbles'
import ThumbNailImageSVG from "../../../assets/images/thumbnail2.svg";


const UpdateLineItem = ({ handleSubmitUpdateLineItem, product, handleCancel, readOnly = false }) => {

    const [data, setData] = React.useState({
        qty: 0,
        price: 0,
        discount: 0,
        minimumQty: 0
    });

    React.useEffect(() => {
        setData({
            qty: product.quantity,
            price: product.unitPrice,
            discount: product.lineDiscountAmount,
            minimumQty: product.minimumQty
        })
    }, [product])


    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: Number(event.target.value)
        })
    }

    return (
        <div>
            <Box id='UpdatelineForm' mb={1} component={'form'} onSubmit={handleSubmitUpdateLineItem}>
                <Stack spacing={2} p={1.5} direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'center', sm: 'flex-start' }} sx={{ transition: '.5s', border: '1px solid black', boxShadow: `1px 1px 2px 1px rgba(0, 0, 0, 0.25)` }}
                >
                    <Box>
                        <Box component='img' alt='img' style={{ width: '100%', minWidth: '146px', maxWidth: '146px', cursor: 'pointer', backgroundColor: 'white', minHeight: '150px' }} src={ThumbNailImageSVG} />
                    </Box>
                    {/* form */}
                    <Box >
                        <Grid container alignItems='center' spacing={1}>
                            <Grid item xs={6} sm={6} md={3} >
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Item Type:</Typography>
                                <TextField inputProps={{ readOnly: readOnly }} required sx={headInputStyle} fullWidth defaultValue={product?.type} name={"itemType"} size='small' />
                            </Grid>

                            <Grid item xs={6} sm={6} md={3}>
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>No. </Typography>
                                <TextField inputProps={{ readOnly: readOnly }} required sx={headInputStyle} fullWidth defaultValue={product?.no} name={"simpleNo"} size='small' />
                            </Grid>

                            <Grid item xs={6} sm={6} md={4}>
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Description: </Typography>
                                <TextField inputProps={{ readOnly: readOnly }} required sx={headInputStyle} fullWidth defaultValue={product?.description} name={"description"} size='small' />
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <Box mt={1}>
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Drop Ship: </Typography>
                                    <Checkbox
                                        defaultChecked={product.dropShipment}
                                        name='dropShip'
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Line Number: </Typography>
                                <TextField inputProps={{ readOnly: readOnly }} required sx={headInputStyle} fullWidth defaultValue={product?.lineNo} name={"itemNo"} size='small' />
                            </Grid>


                            <Grid item xs={6} sm={6} md={2}>
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Quantity: </Typography>
                                <TextField inputProps={{ readOnly: readOnly }} required sx={headInputStyle} fullWidth onChange={handleChange} value={data.qty} type='number' name={"qty"} size='small' />
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Min Quantity: </Typography>
                                <TextField inputProps={{ readOnly: readOnly }} required sx={headInputStyle} fullWidth value={data.minimumQty} name={"minQty"} size='small' />
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Price: </Typography>
                                <TextField inputProps={{ readOnly: readOnly }} required sx={headInputStyle} fullWidth onChange={handleChange} value={data.price} type='number' name={"price"} size='small' />
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Discount: </Typography>
                                <TextField inputProps={{ readOnly: readOnly }} required sx={headInputStyle} fullWidth onChange={handleChange} value={data.discount} type='number' name={"discount"} size='small' />
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Line Amount: </Typography>
                                <TextField inputProps={{ readOnly: readOnly }} required sx={headInputStyle} fullWidth value={((data.price * data.qty) - (data.discount))} type='number' name={"amount"} size='small' />
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1} direction='row' alignItems='center' justifyContent={'center'} >
                                    <TextField inputProps={{ readOnly: readOnly }} sx={headInputStyle} fullWidth
                                        defaultValue={product?.edcSalesComments?.[0]?.comment}
                                        name={"comment"} size='small' />
                                    <Stack direction='row' alignItems='center' justifyContent={'center'}>
                                        <Button color='error' variant='contained' size='small' type='reset' onClick={() => handleCancel('updateItem')}>cancel</Button> &nbsp;
                                        <Button color='primary' type='submit' variant='contained' size='small'>Update</Button>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>

                    </Box>
                </Stack>




            </Box>
        </div>
    )
}

export default UpdateLineItem