import { Visibility } from '@mui/icons-material'
import { Box, Button, Grid, Hidden, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import { headInputStyle } from './ReuseAbles'
import CommentsModel from './commentsModel'
import Billto from './Billto'
import Shipto from './Shipto'

const UpperHeader = ({ handleUpperHeaderSubmit, saleOrderDetails }) => {

    const [billto, setbillto] = React.useState(false);
    const [shipto, setshipto] = React.useState(false);
    const [commentModel, setCommentModel] = React.useState(false)
    const handleOpen = () => setCommentModel(true);


    return (
        <div>
            <CommentsModel commentModel={commentModel} setCommentModel={setCommentModel} commentsData={saleOrderDetails?.edcSalesComments} />
            <Billto billto={billto} setbillto={setbillto} saleOrderDetails={saleOrderDetails} />
            <Shipto shipto={shipto} setshipto={setshipto} saleOrderDetails={saleOrderDetails} />

            <Box component='form' onSubmit={handleUpperHeaderSubmit} >
                <Grid container sx={{ mt: 1, mb: 2 }} alignItems={'flex-end'} justifyContent='space-between' >

                    <Grid container item xs={12} md={10} spacing={1} alignItems={'flex-end'} >
                        <Grid item xs={6} md={4} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Bill To: </Typography>
                            <TextField sx={headInputStyle} fullWidth value={saleOrderDetails?.edcCustomers[0]?.name} size='small' InputProps={{
                                endAdornment: (<InputAdornment position="end"> <Visibility sx={{ fontSize: '17px', cursor: 'pointer' }} onClick={() => setbillto(true)} />  </InputAdornment>)
                            }} />
                        </Grid>

                        <Grid item xs={6} md={4} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Ship To: </Typography>
                            <TextField sx={headInputStyle} fullWidth value={saleOrderDetails?.shipToName} size='small' InputProps={{
                                endAdornment: (<InputAdornment position="end"> <Visibility sx={{ fontSize: '17px', cursor: 'pointer' }} onClick={() => setshipto(true)} /> </InputAdornment>)
                            }} />
                        </Grid>

                        <Grid item xs={6} md={4} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Project Name: </Typography>
                            <TextField sx={headInputStyle} fullWidth value={saleOrderDetails?.projectName} size='small' />
                        </Grid>

                        <Grid item xs={6} md={2} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Terms: </Typography>
                            <TextField sx={headInputStyle} fullWidth value={saleOrderDetails?.paymentTermsCode} size='small' />
                        </Grid>

                        <Grid item xs={6} md={2} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Priority: </Typography>
                            <TextField sx={headInputStyle} fullWidth value={saleOrderDetails?.priority} size='small' />
                        </Grid>

                        <Grid item xs={6} md={2} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Specifier: </Typography>
                            <TextField sx={headInputStyle} fullWidth value={saleOrderDetails?.Specifier} size='small' />
                        </Grid>

                        <Grid item xs={6} md={2} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Sales Person: </Typography>
                            <TextField sx={headInputStyle} fullWidth value={saleOrderDetails?.salespersonCode} size='small' />
                        </Grid>

                        <Grid item xs={6} md={2} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Customer PO: </Typography>
                            <TextField sx={headInputStyle} fullWidth value={saleOrderDetails?.shipToPostCode} size='small' />
                        </Grid>

                        <Grid item xs={6} md={2} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Campaign: </Typography>
                            <TextField sx={headInputStyle} fullWidth value={saleOrderDetails?.campaignNo} size='small' />
                        </Grid>

                        <Grid item xs={6} md={2} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Order Date: </Typography>
                            <TextField sx={headInputStyle} fullWidth  value={saleOrderDetails?.orderDate} size='small' />
                        </Grid>

                        <Grid item xs={6} md={2} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Req Ship Date: </Typography>
                            <TextField sx={headInputStyle} fullWidth  value={saleOrderDetails?.requestedDeliveryDate} size='small' />
                        </Grid>

                        <Grid item xs={6} md={2} >
                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Shipment Date: </Typography>
                            <TextField sx={headInputStyle} fullWidth value={saleOrderDetails?.shipmentDate} size='small' />
                        </Grid>

                        <Hidden mdUp>
                            <Grid item xs={6}>
                                <Box >
                                    <Button onClick={handleOpen} sx={{
                                        background: "#FFFFFF", color: "black", padding: "2px 15px", '&:hover': {
                                            background: "white",
                                            color: "black",
                                            fontWeight: '600'
                                        }
                                    }}>Comments</Button>
                                </Box>
                            </Grid>
                        </Hidden>

                    </Grid>

                    <Hidden mdDown>
                        <Grid item>
                            <Box >
                                <Button onClick={handleOpen} sx={{
                                    background: "#FFFFFF", color: "black", padding: "2px 15px", '&:hover': {
                                        background: "white",
                                        color: "black",
                                        fontWeight: '600'
                                    }
                                }}>Comments</Button>
                            </Box>
                        </Grid>
                    </Hidden>
                </Grid>
            </Box></div>
    )
}

export default UpperHeader