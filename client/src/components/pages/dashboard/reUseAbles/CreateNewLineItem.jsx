import { Box, Button, Checkbox, Grid, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { headInputStyle } from './ReuseAbles'
import ThumbNailImageSVG from "../../../assets/images/thumbnail2.svg";


const CreateNewLineItem = ({ handleSubmitLineItem,handleCancel }) => {

    const [data, setData] = React.useState({})

    const handleChange = (event) => {
        const value = Number(event.target.value)
        setData({
            ...data,
            [event.target.name]: value
        })
    }

    return (
        <div>
            <Box sx={{ padding: '0px' }} id='lineForm' mb={1} component={'form'} onSubmit={handleSubmitLineItem}>

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
                                <TextField required sx={headInputStyle} fullWidth defaultValue={''} name={"itemType"} size='small' />
                            </Grid>

                            <Grid item xs={6} sm={6} md={3}>
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>No. </Typography>
                                <TextField required sx={headInputStyle} fullWidth defaultValue={'S10017-003'} name={"simpleNo"} size='small' />
                            </Grid>

                            <Grid item xs={6} sm={6} md={4}>
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Description: </Typography>
                                <TextField required sx={headInputStyle} fullWidth defaultValue={''} name={"description"} size='small' />
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <Box mt={1}>
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Drop Ship: </Typography>
                                    <Checkbox
                                        name='dropShip'
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Item Number: </Typography>
                                <TextField required sx={headInputStyle} fullWidth defaultValue={''} name={"itemNo"} size='small' />
                            </Grid>


                            <Grid item xs={6} sm={6} md={2}>
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Quantity: </Typography>
                                <TextField required sx={headInputStyle} fullWidth onChange={handleChange} value={data.qty} type='number' name={"qty"} size='small' />
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Min Quantity: </Typography>
                                <TextField required sx={headInputStyle} fullWidth onChange={handleChange} value={data.minQty} type='number' name={"minQty"} size='small' />
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Price: </Typography>
                                <TextField required sx={headInputStyle} fullWidth onChange={handleChange} value={data.price} type='number' name={"price"} size='small' />
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Discount: </Typography>
                                <TextField required sx={headInputStyle} fullWidth onChange={handleChange} value={data.discount} type='number' name={"discount"} size='small' />
                            </Grid>

                            <Grid item xs={6} sm={6} md={2}>
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Net Amount: </Typography>
                                <TextField required sx={headInputStyle} fullWidth onChange={handleChange} value={((data.price * data.qty) - (data.discount))} type='number' name={"amount"} size='small' />
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1} direction='row' alignItems='center' justifyContent={'center'} >
                                    <TextField required sx={headInputStyle} fullWidth
                                        placeholder='comment here ...'
                                        name={"comment"} size='small' />
                                    <Stack direction='row' alignItems='center' justifyContent={'center'}>
                                        <Button color='error' variant='contained' size='small' type='reset' onClick={()=>handleCancel('newItem')}>cancel</Button> &nbsp;
                                        <Button color='primary' type='submit' variant='contained' size='small'>ADD</Button>
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

export default CreateNewLineItem