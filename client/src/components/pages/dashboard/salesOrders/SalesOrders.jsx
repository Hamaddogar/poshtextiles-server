import { ClickAwayListener, Grow, Hidden, InputAdornment, MenuList, Popper, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';
import Pagination from 'react-responsive-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import { DeleteOutline, EditOutlined, KeyboardArrowDown, } from '@mui/icons-material';
import Done from '../../../assets/images/done.png'
import { BackButton, headInputStyle, scroller } from '../reUseAbles/ReuseAbles';
import BasicModal from './Modal';
import { SELECTED_SALE_ORDER_DATA, SELECT_PICKING_PRODUCT } from '../../../../RTK/Reducers/Reducers';
import ConDialog from './ConfirmationModal';
import Billto from './Billto';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Shipto from './Shipto';
import p0 from "../../../assets/images/p0.png";
import p1 from "../../../assets/images/p1.png";
import p2 from "../../../assets/images/p2.png";
import p3 from "../../../assets/images/p3.png";
import p4 from "../../../assets/images/p4.png";
import p5 from "../../../assets/images/p5.png";
import p6 from "../../../assets/images/p6.png";
import p7 from "../../../assets/images/p7.png";
import p8 from "../../../assets/images/p8.png";
import p9 from "../../../assets/images/p9.png";
import p10 from "../../../assets/images/p10.png";
import p11 from "../../../assets/images/p11.png";
import p12 from "../../../assets/images/p12.png";
import p13 from "../../../assets/images/p13.png";
import p14 from "../../../assets/images/p14.png";
import p15 from "../../../assets/images/p15.png";
import CreateNewLineItem from '../reUseAbles/CreateNewLineItem';
import UpdateLineItem from '../reUseAbles/UpdateLineItem';

const SalesOrders = () => {

    const { saleOrderDetails, perPage } = useSelector(store => store.mainReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // states
    const [copy, setCopy] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [showSelectedProduct, setShowSelectedProduct] = React.useState(null);
    // Modal Options
    const [Modalopen, setModalopen] = React.useState(false);
    const handleOpen = () => setModalopen(true);
    // Confirmation Modal Options
    const [openConfirmation, setOpenConfirmation] = React.useState({ status: false, deleteIndex: null });
    // Billto Modal Details
    const [billto, setbillto] = React.useState(false);
    const [shipto, setshipto] = React.useState(false);
    const [newItem, setNewItem] = React.useState(false);

    // for actions 
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);

    const handlePageChange = page => {
        setCurrentPage(page);
        setRows(copy.slice(((page - 1) * perPage), ((((page - 1) * perPage)) + perPage)))
    }

    React.useLayoutEffect(() => {
        setCopy(saleOrderDetails.edcSalesLines)
        //eslint-disable-next-line
    }, [saleOrderDetails.edcSalesLines]);
    React.useEffect(() => { setRows(copy.slice(0, perPage)) }, [copy, perPage]);

    React.useEffect(() => {
        if (prevOpen.current === true && open === false) anchorRef.current.focus();
        prevOpen.current = open;
    }, [open]);

    const handleShowSelectedProduct = product => {
        setShowSelectedProduct(product);
        scroller();
    }

    const handleSelectedPickingProduct = product => {
        dispatch(SELECT_PICKING_PRODUCT({
            selected_item: product,
            ...saleOrderDetails,
            edcSalesLines: null,
            edcCustomers: null,
            edcWhseShipments: null,
        }));
        navigate('/picking')
    };

    const handleToggle = () => setOpen((prevOpen) => !prevOpen);

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) { return; }
        setOpen(false);
        scroller()
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') setOpen(false);
    }

    const handleClickNewItem = () => {
        setShowSelectedProduct(null);
        setNewItem(true);
        scroller();
    }


    // lineItem UPdate function
    const handleSubmitUpdateLineItem = (event) => {
        handleCancel('updateItem')
        event.preventDefault();
        const data = new FormData(event.target);
        const index = rows.indexOf(showSelectedProduct)
        rows.splice(index, 1, {
            ...showSelectedProduct,
            "no": data.get('simpleNo'),
            "lineNo": data.get('itemNo'),
            "type": data.get('itemType'),
            "quantity": data.get('qty'),
            "outstandingQuantity": data.get('minQty'),
            "lineAmount": data.get('amount'),
            "amountIncludingVAT": data.get('amount'),
            "edcSalesComments": [{ value: data.get('comment') }],
            "lineDiscountAmount": data.get('discount'),
            "dropShipment": data.get('dropShip') ? true : false,
            "unitPrice": data.get('price'),
            "itemCategoryCode": data.get('description'),
        })
        setRows([...rows])

    }


    // lineItems Delete function
    const deleteLineItem = (index) => {
        rows.splice(index, 1);
        setRows([...rows]);
    }

    // update uppser header section handler
    const handleUpperHeaderSubmit = e => {
        e.preventDefault();
        // const data = new FormData(e.target);
        alert('working to update')
    };


    // add new line Item function
    const handleSubmitLineItem = (event) => {
        handleCancel('newItem')
        event.preventDefault();
        const data = new FormData(event.target);
        setRows([
            ...rows,
            {
                "no": data.get('simpleNo'),
                "lineNo": data.get('itemNo'),
                "type": data.get('itemType'),
                "quantity": data.get('qty'),
                "outstandingQuantity": data.get('minQty'),
                "lineAmount": data.get('amount'),
                "amountIncludingVAT": data.get('amount'),
                "edcSalesComments": [{ value: data.get('comment') }],
                "lineDiscountAmount": data.get('discount'),
                "dropShipment": data.get('dropShip') ? true : false,
                "unitPrice": data.get('price'),
                "itemCategoryCode": data.get('description'),
                "unitOfMeasureCode": "YDS",
                "promisedDeliveryDate": saleOrderDetails.shipmentDate,
                "requestedDeliveryDate": saleOrderDetails.requestedDeliveryDate,
            }
        ])

    }

    const handleShippingQuote = () => {
        dispatch(SELECTED_SALE_ORDER_DATA({
            ...saleOrderDetails,
            edcSalesLines: rows
        }));
        navigate('/shipping-quote')
    }


    const handleCancel = closeTo => {
        if (closeTo === "newItem") setNewItem(false)
        else setShowSelectedProduct(null)
    }

    const images = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15];


    return (
        <div>
            <ConDialog openConfirmation={openConfirmation} setOpenConfirmation={setOpenConfirmation} deleteLineItem={deleteLineItem} />
            <BasicModal Modalopen={Modalopen} setModalopen={setModalopen} />
            <Billto billto={billto} setbillto={setbillto} />
            <Shipto shipto={shipto} setshipto={setshipto} />

            <Box>
                {/* Upper Form */}
                <Box component='form' onSubmit={handleUpperHeaderSubmit} >
                    <Grid container sx={{ mt: 1, mb: 2 }} alignItems={'flex-end'} justifyContent='space-between' >

                        <Grid container item xs={12} md={10} spacing={1} alignItems={'flex-end'} >
                            <Grid item xs={6} md={4} >
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Bill To: </Typography>
                                <TextField sx={headInputStyle} fullWidth defaultValue={saleOrderDetails?.edcCustomers[0]?.name} size='small' InputProps={{
                                    endAdornment: (<InputAdornment position="end"> <VisibilityIcon sx={{ fontSize: '17px', cursor: 'pointer' }} onClick={() => setbillto(true)} />  </InputAdornment>)
                                }} />
                            </Grid>

                            <Grid item xs={6} md={4} >
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Ship To: </Typography>
                                <TextField sx={headInputStyle} fullWidth defaultValue={saleOrderDetails.shipToName} size='small' InputProps={{
                                    endAdornment: (<InputAdornment position="end"> <VisibilityIcon sx={{ fontSize: '17px', cursor: 'pointer' }} onClick={() => setshipto(true)} /> </InputAdornment>)
                                }} />
                            </Grid>

                            <Grid item xs={6} md={4} >
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Project Name: </Typography>
                                <TextField sx={headInputStyle} fullWidth defaultValue={saleOrderDetails.projectName} size='small' />
                            </Grid>

                            <Grid item xs={6} md={2} >
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Terms: </Typography>
                                <TextField sx={headInputStyle} fullWidth defaultValue={saleOrderDetails.paymentTermsCode} size='small' />
                            </Grid>

                            <Grid item xs={6} md={2} >
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Priority: </Typography>
                                <TextField sx={headInputStyle} fullWidth defaultValue={saleOrderDetails.priority} size='small' />
                            </Grid>

                            <Grid item xs={6} md={2} >
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Specifier: </Typography>
                                <TextField sx={headInputStyle} fullWidth defaultValue={saleOrderDetails.Specifier} size='small' />
                            </Grid>

                            <Grid item xs={6} md={2} >
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Sales Person: </Typography>
                                <TextField sx={headInputStyle} fullWidth defaultValue={saleOrderDetails.salespersonCode} size='small' />
                            </Grid>

                            <Grid item xs={6} md={2} >
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Customer PO: </Typography>
                                <TextField sx={headInputStyle} fullWidth defaultValue={saleOrderDetails.shipToPostCode} size='small' />
                            </Grid>

                            <Grid item xs={6} md={2} >
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Campaign: </Typography>
                                <TextField sx={headInputStyle} fullWidth defaultValue={saleOrderDetails.campaignNo} size='small' />
                            </Grid>

                            <Grid item xs={6} md={2} >
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Order Date: </Typography>
                                <TextField sx={headInputStyle} fullWidth type={"date"} defaultValue={saleOrderDetails.orderDate} size='small' />
                            </Grid>

                            <Grid item xs={6} md={2} >
                                <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Req Ship Date: </Typography>
                                <TextField sx={headInputStyle} fullWidth type={"date"} defaultValue={saleOrderDetails.requestedDeliveryDate} size='small' />
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
                </Box>

                <Box sx={{ padding: '0px' }} mb={1}>
                    {
                        newItem && !showSelectedProduct &&
                        <CreateNewLineItem handleSubmitLineItem={handleSubmitLineItem} handleCancel={handleCancel} />
                    }
                    {showSelectedProduct && !newItem &&
                        <UpdateLineItem handleSubmitUpdateLineItem={handleSubmitUpdateLineItem} handleCancel={handleCancel} product={showSelectedProduct} />
                    }
                </Box>


                {/* lines Items mapping */}
                <Box sx={{ padding: '15px', backgroundColor: 'white' }}>
                    <Box sx={{ padding: '15px', border: '1px solid black', borderStyle: 'inset', minHeight: '600px' }}>
                        <Grid container alignItems={'center'} rowGap={3} sx={{ margin: '10px' }}>
                            {rows && rows.map((item, index) => <Grid xs={12} sm={6} md={4} item justifyContent='space-between' key={index} sx={{ minHeight: '100px', }} >
                                <Box sx={{ cursor: item.status ? "default" : 'pointer' }} px={{ xs: '1', md: 2, lg: 3 }} onClick={() => item.status ? null : handleSelectedPickingProduct(item)}>
                                    <Grid container justifyContent='space-between'>
                                        <Grid xs={6} item sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {item.status && <Box component='img' alt='img' style={{ maxWidth: '70%', position: 'absolute' }} src={Done} />}
                                            <Box component='img' alt='img' style={{ width: '100%', maxWidth: '146px', cursor: 'pointer' }} src={item.image ? item.image : images[index]} />
                                        </Grid>
                                        <Grid item container direction={'column'} justifyContent={'space-between'} xs={6} px={1} sx={{ position: 'relative' }}>

                                            <Stack sx={{ height: '100%', display: 'flex', justifyContent: 'space-between' }} >
                                                <Typography textAlign='center' mt={1} variant='h1' fontSize={item.itemCategoryCode.length > 25 ? { xs: '5vw', sm: '2vw', md: '1vw' } : { xs: '6vw', sm: '2.3vw', md: '1.3vw' }} fontWeight={500} >{item?.itemCategoryCode || item.description}</Typography>
                                                <Stack direction='row' alignItems={'center'} justifyContent='space-between'>
                                                    <Typography fontSize='12px'>MOQ : <span style={{ fontSize: '20px' }}>{item.outstandingQuantity}</span></Typography>
                                                    <Typography fontSize='12px' textAlign={'right'}>QTY : <span style={{ fontSize: '20px' }}>{item.quantity}</span></Typography>
                                                </Stack>
                                            </Stack>
                                            {
                                                !item.status && <Stack sx={{ position: 'absolute', right: { xs: '0px', sm: '0px', md: '-10px' } }}>
                                                    <DeleteOutline sx={{ fontSize: { xs: '22px', sm: '18px', md: '22px' }, cursor: 'pointer', color: '#9A5123', tranisition: '.5s', '&:hover': { color: '#E23C2F' } }}
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            setOpenConfirmation({
                                                                status: true,
                                                                deleteIndex: index
                                                            })
                                                        }}
                                                    />
                                                    <EditOutlined sx={{ fontSize: { xs: '22px', sm: '18px', md: '22px' }, cursor: 'pointer', color: '#404040', tranisition: '.5s', '&:hover': { color: '#495BD6' } }}
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            setNewItem(false);
                                                            handleShowSelectedProduct(item);
                                                        }}
                                                    />
                                                </Stack>
                                            }
                                        </Grid>
                                    </Grid>
                                </Box>

                            </Grid>)
                            }
                        </Grid>
                    </Box >
                </Box>
            </Box >

            <Grid spacing={3} container direction='row' my={3} textAlign='right' mt={.5} justifyContent={{ xs: 'center', md: 'space-between' }} alignItems={'center'}>
                <Grid item>
                    <Box>
                        <BackButton onClick={() => navigate(-1)} />
                        &nbsp; &nbsp; &nbsp;
                        <Button
                            variant='contained'
                            sx={{ backgroundColor: '#495BD6' }}
                            size='small'
                            ref={anchorRef}
                            id="composition-button"
                            aria-controls={open ? 'composition-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            endIcon={<KeyboardArrowDown />}
                        > Actions </Button>
                    </Box>
                </Grid>
                <Grid item>
                    <Button onClick={handleClickNewItem} variant='contained' size='small'> + add new item</Button>
                </Grid>
                <Grid item>
                    <Box onClick={scroller}>
                        <Pagination
                            total={Math.ceil(copy.length / perPage)}
                            current={currentPage}
                            onPageChange={page => handlePageChange(page)}
                        />
                    </Box>
                </Grid>
            </Grid>


            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom', }}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                    sx={{ backgroundColor: '#495BD6', color: 'white' }}
                                    onClick={handleClose}
                                >
                                    {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                                    <MenuItem sx={{ borderBottom: '1px solid white', fontSize: '13px' }} >RELEASE</MenuItem>
                                    <MenuItem onClick={handleShippingQuote} sx={{ borderBottom: '1px solid white', fontSize: '13px' }} >SHIP</MenuItem>
                                    <MenuItem sx={{ fontSize: '13px' }}>UNRELEASE</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div >
    )
}

export default SalesOrders
