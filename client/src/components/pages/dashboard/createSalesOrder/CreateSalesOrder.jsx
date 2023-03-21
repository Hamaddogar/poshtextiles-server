import { Checkbox, Hidden, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import Pagination from 'react-responsive-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import { BackButton, headInputStyle } from '../reUseAbles/ReuseAbles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentsModel from './commentsModel';
import { createNewOrder } from '../../../../RTK/Reducers/Reducers';
import { useDispatch } from 'react-redux';
// import { v4 as uuidv4 } from 'uuid';
import ThumbNailImageSVG from "../../../assets/images/thumbnail2.svg";
import { requestAccessToken_MICROSOFT } from '../../../../utils/FEDEXP_API_HELPERS';
const CreateSalesOrder = () => {

    const [lineItems, setLineItems] = React.useState([]);
    const [rows, setRows] = React.useState(lineItems);
    const [dropShipChecked, setDropShipChecked] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [commentModel, setCommentModel] = React.useState({
        open: false,
        selected: false,
        comment: {}
    });
    const handleOpen = () => setCommentModel({ ...commentModel, open: true });
    const orderDetail = {}


    const navigate = useNavigate();
    const dispatch = useDispatch();



    React.useEffect(() => {
     
        setRows(lineItems)
        
    }, [lineItems])
    


    const handlePageChange = page => {
        setCurrentPage(page);
        setRows(rows.slice(((page - 1) * 9), ((((page - 1) * 9)) + 9)))
    }



    // for actions 
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target)

        const body = {
            "no": "",
            "sellToCustomerNo": "C0003647",
            "shipToCode": data.get('shipTo'),
            "projectName": data.get('projectName'),
            "specifier": data.get('specifier'),
            "orderDate": data.get('orderDate'),
            "salespersonCode": data.get('salesPerson'),
            "campaignNo": data.get('campaign'),
            "requestedDeliveryDate": data.get('reqDate'),
            "contact": data.get('projectName'),
            "shippingAgentCode": "FEDEX",
            "externalDocumentNo": data.get('po'),
            "shipmentDate": data.get('orderDate'),
            "priority": data.get('priority'),
            "edcSalesLines": lineItems
        }

        requestAccessToken_MICROSOFT().then(token => {
            dispatch(createNewOrder({
                token: token,
                body: body,
                toastPermission: true,
            }))
        })



    }


    const handleSubmitLineItem = (event) => {
        event.preventDefault();
        const data = new FormData(event.target)


        setLineItems([
            ...lineItems,
            {
                "linename": data.get('itemName'),
                "lineNo": data.get('itemNo'),
                "type": data.get('itemType'),
                "no": "S10017-007",
                "quantity": data.get('qty'),
                "minquantity": data.get('minQty'),
                "dropShipment": dropShipChecked
            }
        ])




    }





    return (
        <div>
            <CommentsModel commentModel={commentModel} setCommentModel={setCommentModel} />
            <Box>
                <Box >
                    <Box component={'form'} onSubmit={handleSubmit} >
                        <Grid container sx={{ mt: 1, mb: 2 }} alignItems={'flex-end'} justifyContent='space-between' >

                            <Grid container item xs={12} md={10} spacing={1} alignItems={'flex-end'} >
                                <Grid item xs={6} md={4} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Bill To: </Typography>
                                    <TextField required name='billTo' sx={headInputStyle} fullWidth defaultValue={orderDetail.billTo} size='small' InputProps={{
                                        endAdornment: (<InputAdornment position="end"> <VisibilityIcon sx={{ fontSize: '17px' }} />  </InputAdornment>)
                                    }} />
                                </Grid>

                                <Grid item xs={6} md={4} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Ship To: </Typography>
                                    <TextField required name='shipTo' sx={headInputStyle} fullWidth defaultValue={orderDetail.shipTo} size='small' InputProps={{
                                        endAdornment: (<InputAdornment position="end"> <VisibilityIcon sx={{ fontSize: '17px' }} /> </InputAdornment>)
                                    }} />
                                </Grid>

                                <Grid item xs={6} md={4} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Project Name: </Typography>
                                    <TextField required name='projectName' sx={headInputStyle} fullWidth defaultValue={orderDetail.projectName} size='small'

                                    />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Terms: </Typography>
                                    <TextField required name='terms' sx={headInputStyle} fullWidth defaultValue={orderDetail.terms} size='small' />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Priority: </Typography>
                                    <TextField sx={headInputStyle} required name='priority' fullWidth defaultValue={orderDetail.priority} size='small' />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Specifier: </Typography>
                                    <TextField sx={headInputStyle} required name='specifier' fullWidth defaultValue={orderDetail.specifier} size='small' />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Sales Person: </Typography>
                                    <TextField sx={headInputStyle} required name='salesPerson' fullWidth defaultValue={orderDetail.salesPerson} size='small' />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Customer PO: </Typography>
                                    <TextField sx={headInputStyle} required name='po' fullWidth defaultValue={orderDetail.customerPO} size='small' />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Campaign: </Typography>
                                    <TextField sx={headInputStyle} fullWidth required name='campaign' defaultValue={orderDetail.campaign} size='small' />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Order Date: </Typography>
                                    <TextField sx={headInputStyle} required name='orderDate' fullWidth type={"date"} defaultValue={orderDetail.orderDate} size='small' />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Req Ship Date: </Typography>
                                    <TextField sx={headInputStyle} required name='reqDate' fullWidth type={"date"} defaultValue={orderDetail.reqShipDate} size='small' />
                                </Grid>

                                <Hidden mdUp>
                                    <Grid item xs={6}>
                                        <Box mb={2}>
                                            <Button onClick={handleOpen} sx={{
                                                background: "#FFFFFF", color: "black", padding: "2px 15px", '&:hover': {
                                                    background: "white",
                                                    color: "black",
                                                    fontWeight: '600'
                                                }
                                            }}>Comments</Button>
                                        </Box>
                                        <Box>
                                            <Button color='primary' type='submit' variant='contained' size='small'>Create Order</Button>
                                        </Box>
                                    </Grid>
                                </Hidden>

                            </Grid>
                            <Hidden mdDown>
                                <Grid item>
                                    <Box mb={2}>
                                        <Button onClick={handleOpen} sx={{
                                            background: "#FFFFFF", color: "black", padding: "2px 15px", '&:hover': {
                                                background: "white",
                                                color: "black",
                                                fontWeight: '600'
                                            }
                                        }}>Comments</Button>
                                    </Box>
                                    <Box>
                                        <Button color='primary' type='submit' variant='contained' size='small'>Create Order</Button>
                                    </Box>
                                </Grid>
                            </Hidden>
                        </Grid>
                    </Box>


                    {/* box section */}
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
                                        <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Item Name: </Typography>
                                        <TextField required sx={headInputStyle} fullWidth defaultValue={''} name={"itemName"} size='small' />
                                    </Grid>

                                    <Grid item xs={6} sm={6} md={4}>
                                        <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Description: </Typography>
                                        <TextField required sx={headInputStyle} fullWidth defaultValue={''} name={"description"} size='small' />
                                    </Grid>

                                    <Grid item xs={6} sm={6} md={2}>
                                        <Box mt={1}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Drop Ship: </Typography>
                                            <Checkbox
                                                checked={dropShipChecked}
                                                onChange={e => setDropShipChecked(e.target.checked)}
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
                                        <TextField required sx={headInputStyle} fullWidth defaultValue={''} type='number' name={"qty"} size='small' />
                                    </Grid>

                                    <Grid item xs={6} sm={6} md={2}>
                                        <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Min Quantity: </Typography>
                                        <TextField required sx={headInputStyle} fullWidth defaultValue={''} type='number' name={"minQty"} size='small' />
                                    </Grid>

                                    <Grid item xs={6} sm={6} md={2}>
                                        <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Price: </Typography>
                                        <TextField required sx={headInputStyle} fullWidth defaultValue={''} type='price' name={""} size='small' />
                                    </Grid>

                                    <Grid item xs={6} sm={6} md={2}>
                                        <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Discount: </Typography>
                                        <TextField required sx={headInputStyle} fullWidth defaultValue={''} type='number' name={"discount"} size='small' />
                                    </Grid>

                                    <Grid item xs={6} sm={6} md={2}>
                                        <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Amount: </Typography>
                                        <TextField required sx={headInputStyle} fullWidth defaultValue={''} type='number' name={"amount"} size='small' />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Stack spacing={1} direction='row' alignItems='center' justifyContent={'center'} >
                                            <TextField required sx={headInputStyle} fullWidth
                                                value={commentModel.selected ? commentModel.comment.data : ""}
                                                name={"comment"} size='small' />
                                            <Stack direction='row' alignItems='center' justifyContent={'center'}>
                                                <Button color='error' variant='contained' size='small' type='reset'>cancel</Button> &nbsp;
                                                <Button color='primary' type='submit' variant='contained' size='small'>ADD</Button>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                </Grid>

                            </Box>
                        </Stack>




                    </Box>


                </Box>

                <Box sx={{ padding: '15px', backgroundColor: 'white' }}>
                    <Box sx={{ padding: '15px', border: '1px solid black', borderStyle: 'inset' }}>
                        <Grid container alignItems={'flex-start'} rowGap={3} sx={{ margin: '10px', minHeight: '70vh' }}>
                            {rows && rows.map((item, index) => <Grid xs={12} sm={6} md={4} item justifyContent='space-between' key={index} sx={{ minHeight: '100px', }} >
                                <Box sx={{ cursor: 'pointer' }} px={{ xs: '1', md: 2, lg: 3 }} onClick={() => ""}>
                                    <Grid container justifyContent='space-between'>
                                        <Grid xs={6} item> <Box component='img' alt='img' style={{ width: '100%', maxWidth: '146px', cursor: 'pointer' }} src={item.image ? item.image : ThumbNailImageSVG} /> </Grid>
                                        <Grid item container direction={'column'} justifyContent={'space-between'} xs={6} px={1} sx={{ position: 'relative' }}>

                                            <Stack sx={{ height: '100%', display: 'flex', justifyContent: 'space-between' }} >
                                                <Typography textAlign='center' mt={1} variant='h1' fontSize={item?.linename?.length > 25 ? { xs: '5vw', sm: '2vw', md: '1vw' } : { xs: '6vw', sm: '3vw', md: '2vw' }} fontWeight={500} >{item?.linename || item.description}</Typography>
                                                <Stack direction='row' alignItems={'center'} justifyContent='space-between'>
                                                    <Typography fontSize='12px'>MOQ : <span style={{ fontSize: '20px' }}>{item.minquantity}</span></Typography>
                                                    <Typography fontSize='12px' textAlign={'right'}>QTY : <span style={{ fontSize: '20px' }}>{item.quantity}</span></Typography>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Box>

                            </Grid>)
                            }
                        </Grid>
                    </Box >
                </Box>
            </Box >
            {
                rows.length > 0 &&
                <Grid spacing={3} container direction='row' my={3} textAlign='right' mt={2} justifyContent={{ xs: 'center', md: 'space-between' }} alignItems={'center'}>
                    <Grid item>
                        <Box>
                            <BackButton onClick={() => navigate(-1)} /> &nbsp; &nbsp; &nbsp;
                        </Box>
                    </Grid>
                    <Grid item>
                        <Pagination
                            total={Math.ceil(rows / 9)}
                            current={currentPage}
                            onPageChange={page => handlePageChange(page)}
                        />
                    </Grid>
                </Grid>
            }

            {
                rows.length === 0 && <Box mt={2}>
                    <BackButton onClick={() => navigate(-1)} />
                    &nbsp; &nbsp; &nbsp;
                </Box>
            }



        </div >
    )
}

export default CreateSalesOrder
