import { FormControl, Hidden, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import Pagination from 'react-responsive-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import { BackButton, fromResetter, headInputStyle } from '../reUseAbles/ReuseAbles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentsModel from './commentsModel';
import ThumbNailImageSVG from "../../../assets/images/thumbnail2.svg";
import { create_New_SaleOrder, request_AccessToken_MICROSOFT } from '../../../../utils/API_HELPERS';
import { useMsal } from '@azure/msal-react';
import { toast } from 'react-toastify';
import CreateNewLineItem from '../reUseAbles/CreateNewLineItem';
const CreateSalesOrder = () => {

    const [lineItems, setLineItems] = React.useState([]);
    const [rows, setRows] = React.useState(lineItems);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [commentModel, setCommentModel] = React.useState({
        open: false,
        selected: false,
        comment: {}
    });
    const [agentCode, setAgentCode] = React.useState("FEDEX")

    const shippingAgents = ["FEDEX", "STAMPS", "UPS"]

    function convertToUpperCase(text) {
        return text.toUpperCase();
    }


    const handleOpen = () => setCommentModel({ ...commentModel, open: true });
    const orderDetail = {
        'sellToCustomerNo': "C0003647",
        'shipToCode': "01",
        'projectName': "LIBRARY",
        'contact': "LIBRARY ",
        "specifier": "",
        'salesPerson': "BEVERLY J",
        "campaign": "",
        'po': "KG-TEST-893",
        'orderDate': "2022-05-25",
        'priority': "Sea 3",
        'reqDate': "2023-06-01",
        "shipDate": "2023-06-02",
    }


    const { instance, accounts } = useMsal();
    const navigate = useNavigate();



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
            "sellToCustomerNo": convertToUpperCase(data.get('sellToCustomerNo')),
            "shippingAgentCode": agentCode,
            "shipToCode": data.get('shipToCode'),
            "projectName": convertToUpperCase(data.get('projectName')),
            // "specifier": data.get('specifier'),
            "specifier": "",
            "orderDate": data.get('orderDate'),
            "salespersonCode": convertToUpperCase(data.get('salesPerson')),
            "campaignNo": "",
            // "campaignNo": data.get('campaign'),
            "requestedDeliveryDate": data.get('reqDate'),
            "contact": convertToUpperCase(data.get('contact')),
            "externalDocumentNo": convertToUpperCase(data.get('po')),
            "shipmentDate": data.get('shipDate'),
            "priority": data.get('priority'),
            "edcSalesLines": [...lineItems]
        }

        if (lineItems.length > 0) {
            request_AccessToken_MICROSOFT(instance, accounts).then(token => {
                create_New_SaleOrder({
                    token: token,
                    body: body,
                    toastPermission: true,
                }).then(response => {
                    if (response?.response?.data?.error?.error) {
                        toast.error(`${response?.response?.data?.error?.message}`, {
                            position: "top-right",
                            autoClose: false,
                            hideProgressBar: true
                        });
                    } else if (response.created) {
                        fromResetter("newOrderForm");
                        fromResetter("newOrderItemForm");
                        setLineItems([])
                    }
                })
            })
        } else {
            toast.error('Line Items must be present', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: true
            });
            // toast.loading('Validating Address...', {
            //     position: "top-right",
            //     autoClose: false,
            //     hideProgressBar: true
            // });
        }



    }


    const handleSubmitLineItem = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        setLineItems([
            ...lineItems,
            {
                "lineNo": Number(data.get('itemNo')),
                "type": data.get('itemType'),
                "no": data.get('simpleNo'),
                "quantity": Number(data.get('qty')),
                "dropShipment": data.get('dropShip') === "on" ? true : false,
            }
        ])

    }





    return (
        <div>
            <CommentsModel commentModel={commentModel} setCommentModel={setCommentModel} />
            <Box>
                <Box >
                    <Box component={'form'} noValidate id='newOrderForm' onSubmit={handleSubmit} >
                        <Grid container sx={{ mt: 1, mb: 2 }} alignItems={'flex-end'} justifyContent='space-between' >

                            <Grid container item xs={12} md={10} spacing={1} alignItems={'flex-end'} >
                                <Grid item xs={6} md={4} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Ship To: </Typography>
                                    <TextField required name='shipTo' sx={headInputStyle} fullWidth defaultValue={orderDetail.shipTo} size='small' InputProps={{
                                        endAdornment: (<InputAdornment position="end"> <VisibilityIcon sx={{ fontSize: '17px' }} />  </InputAdornment>)
                                    }} />
                                </Grid>

                                <Grid item xs={6} md={4} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Ship To Code: </Typography>
                                    <TextField required name='shipToCode' sx={headInputStyle} fullWidth defaultValue={orderDetail.shipToCode} size='small' InputProps={{
                                        endAdornment: (<InputAdornment position="end"> <VisibilityIcon sx={{ fontSize: '17px' }} /> </InputAdornment>)
                                    }} />
                                </Grid>

                                <Grid item xs={6} md={4} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Project Name: </Typography>
                                    <TextField required name='projectName' sx={headInputStyle} fullWidth defaultValue={orderDetail.projectName} size='small'
                                    />
                                </Grid>


                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Contact: </Typography>
                                    <TextField required name='contact' sx={headInputStyle} fullWidth defaultValue={orderDetail.contact} size='small' />
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
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Customer PO *uniqe: </Typography>
                                    <TextField sx={headInputStyle} required name='po' fullWidth defaultValue={orderDetail.po} size='small' />
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
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Ship Date: </Typography>
                                    <TextField sx={headInputStyle} required name='shipDate' fullWidth type={"date"} defaultValue={orderDetail.shipDate} size='small' />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Req Ship Date: </Typography>
                                    <TextField sx={headInputStyle} required name='reqDate' fullWidth type={"date"} defaultValue={orderDetail.reqDate} size='small' />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Sell Customer No: </Typography>
                                    <TextField sx={headInputStyle} required name='sellToCustomerNo' fullWidth type={"text"} defaultValue={orderDetail.sellToCustomerNo} size='small' />
                                </Grid>

                                <Grid item xs={6} md={2} >
                                    <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>shipping Agent Code: </Typography>

                                    <FormControl fullWidth>
                                        <Select
                                            labelId="agentCode-select-label"
                                            id="agentCode-select"
                                            value={agentCode}
                                            onChange={e => setAgentCode(e.target.value)}
                                            size='small'
                                            sx={{ backgroundColor: '#FFFFFF', '& input': { fontSize: '13px' }, fontSize: '12px', }}
                                        >
                                            {
                                                shippingAgents.map(option => <MenuItem value={option} sx={{ fontSize: '12px' }}>{option}</MenuItem>)
                                            }

                                        </Select>
                                    </FormControl>

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
                    <CreateNewLineItem handleCancel={() => { }} handleSubmitLineItem={handleSubmitLineItem} commentModel={commentModel} />


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
                                                <Typography textAlign='center' mt={1} variant='h1' fontSize={item?.linename?.length > 25 ? { xs: '5vw', sm: '2vw', md: '1vw' } : { xs: '6vw', sm: '3vw', md: '2vw' }} fontWeight={500} >{item?.linename || item.type}</Typography>
                                                <Stack direction='row' alignItems={'center'} justifyContent='space-between'>
                                                    <Typography fontSize='12px'>MOQ : <span style={{ fontSize: '20px' }}>{item.quantity}</span></Typography>
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
