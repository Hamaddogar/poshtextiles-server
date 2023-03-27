import React from 'react';
import { Search } from '@mui/icons-material';
import { Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { orderDetail } from '../../../../RTK/Reducers/fakeData';
import { headInputStyle } from '../reUseAbles/ReuseAbles';





const Topcontent = () => {



    return (
        <div>
            <Box sx={{}} >
                <Grid container alignItems={'flex-end'} justifyContent='space-between' >

                    <Grid item container xs={12} md={10} spacing={1} alignItems={'flex-end'} >

                        <Grid item xs={12} sm={4} md={4} >
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Item Search: &nbsp;&nbsp; </Typography>
                            <TextField label={''} defaultValue={orderDetail.billTo} size='small' sx={headInputStyle} fullWidth InputProps={{
                                startAdornment: (<InputAdornment position="start"> <Search sx={{ fontSize: '17px' }} />  </InputAdornment>)
                            }} />
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} >
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>On Hand: </Typography>
                            <TextField label={''} defaultValue={orderDetail.projectName} size='small' sx={headInputStyle} fullWidth />
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} >
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Description: </Typography>
                            <TextField label={''} defaultValue={orderDetail.priority} size='small' sx={headInputStyle} fullWidth />
                        </Grid>

                        <Grid item xs={12} sm={2} md={2} >
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>SO Qty: </Typography>
                            <TextField label={''} defaultValue={orderDetail.terms} size='small' sx={headInputStyle} fullWidth />
                        </Grid>

                        <Grid item xs={12} sm={2} md={2} >
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>PO Qty: </Typography>
                            <TextField label={''} defaultValue={orderDetail.shipTo} size='small' sx={headInputStyle} fullWidth />
                        </Grid>

                        <Grid item xs={12} sm={2} md={2} >
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>At Mill: </Typography>
                            <TextField label={''} defaultValue={orderDetail.specifier} size='small' sx={headInputStyle} fullWidth />
                        </Grid>

                        <Grid item xs={12} sm={3} md={3} >
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Transit Qty: </Typography>
                            <TextField label={''} defaultValue={orderDetail.orderDate} size='small' sx={headInputStyle} fullWidth />
                        </Grid>

                        <Grid item xs={12} sm={3} md={3} >
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>SQ Qty: </Typography>
                            <TextField label={''} defaultValue={orderDetail.salesPerson} size='small' sx={headInputStyle} fullWidth />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} >
                            <Stack sx={{ border: "2px solid #656769", }}>
                                <p style={{ fontSize: "13px", textAlign: "center", fontWeight: 600, margin: '0px' }}>Sales History</p>
                                <Box style={{ minWidth: "85%", padding: "3px 10px 3px 0px", display: 'flex', justifyContent:'space-between' }}>
                                <Stack direction='row' alignItems={'center'}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize:'14px', minWidth:'60px' }}  >13-24M: </Typography>
                                        <TextField label={''} defaultValue={orderDetail.salesPerson} size='small' sx={headInputStyle} />
                                    </Stack>  <Stack direction='row' alignItems={'center'}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize:'14px', minWidth:'60px' }}  >13-24M: </Typography>
                                        <TextField label={''} defaultValue={orderDetail.salesPerson} size='small' sx={headInputStyle} />
                                    </Stack>
                                    <Stack direction='row' alignItems={'center'}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize:'14px', minWidth:'60px' }}  >13-24M: </Typography>
                                        <TextField label={''} defaultValue={orderDetail.salesPerson} size='small' sx={headInputStyle} />
                                    </Stack>

                                </Box>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} sm={3} md={2} >
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Ready Goods: </Typography>
                            <TextField label={''} defaultValue={orderDetail.customerPO} size='small' sx={headInputStyle} fullWidth />
                        </Grid>

                        <Grid item xs={12} sm={3} md={2} >
                            <Typography mr={1} sx={{ color: '#6D6D6D' }}>Available: </Typography>
                            <TextField label={''} defaultValue={orderDetail.campaign} size='small' sx={headInputStyle} fullWidth />
                        </Grid>


                    </Grid>


                </Grid>
            </Box>
        </div>
    )
}

export default Topcontent