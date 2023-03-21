import { Checkbox, CircularProgress, ClickAwayListener, Grow, Hidden, InputAdornment, MenuList, Popper, Stack, TextField, Typography } from '@mui/material';
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
import { BackButton, headInputStyle, scroller, subHeadInputStyle } from '../reUseAbles/ReuseAbles';
import BasicModal from './Modal';
import { SELECT_PICKING_PRODUCT } from '../../../../RTK/Reducers/Reducers';
import ConDialog from './ConfirmationModal';
import Billto from './Billto';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Shipto from './Shipto';
import ThumbNailImageSVG from "../../../assets/images/thumbnail2.svg";

const SalesOrders = () => {

    const { saleOrderDetails, perPage } = useSelector(store => store.mainReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // states
    const [copy, setCopy] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    // const [orderDetail] = React.useState(saleOrderDetails);
    const [showSelectedProduct, setShowSelectedProduct] = React.useState(null);
    const [dropShipChecked, setDropShipChecked] = React.useState(false);
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

    const deleteLineItem = (index) => {
        rows.splice(index, 1);
        setRows([...rows]);
    }


    const handleUpperHeaderSubmit = e => {
        e.preventDefault();
        const data = new FormData(e.target);
        alert('working to update')
    };

    const handleLineItemSubmit = e => {
        e.preventDefault();
        const data = new FormData(e.target);
        alert('working to add Line Item')
    };





    console.log("saleOrderDetails", saleOrderDetails);
    console.log("showSelectedProduct", showSelectedProduct);

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

                <Box sx={{ padding: showSelectedProduct ? '15px' : '0px' }} mb={1}>
                    {
                        newItem && !showSelectedProduct &&
                        <Stack spacing={2} p={showSelectedProduct ? 0 : 1.5} direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'center', sm: 'flex-start' }} sx={{ transition: '.5s', border: '1px solid black', boxShadow: `1px 1px 2px 1px rgba(0, 0, 0, 0.25)` }}>
                            <Box>
                                <Box style={{ width: '100%', minWidth: '146px', maxWidth: '146px', cursor: 'pointer', backgroundColor: 'white', minHeight: '150px' }} />
                            </Box>
                            {/* form */}
                            <Box component='form' onSubmit={handleLineItemSubmit}>
                                <Grid container alignItems='center' spacing={1}>
                                    <Grid item xs={6} sm={6} md={3} >
                                        <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Item Type:</Typography>
                                        <TextField sx={headInputStyle} fullWidth defaultValue={''} placeholder={""} size='small' />
                                    </Grid>

                                    <Grid item xs={6} sm={6} md={3}>
                                        <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Item Name: </Typography>
                                        <TextField sx={headInputStyle} fullWidth defaultValue={''} placeholder={""} size='small' />
                                    </Grid>

                                    <Grid item xs={6} sm={6} md={4}>
                                        <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Description: </Typography>
                                        <TextField sx={headInputStyle} fullWidth defaultValue={''} placeholder={""} size='small' />
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
                                        <TextField sx={headInputStyle} fullWidth defaultValue={''} placeholder={""} size='small' />
                                    </Grid>


                                    <Grid item xs={6} sm={6} md={2}>
                                        <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Quantity: </Typography>
                                        <TextField sx={headInputStyle} fullWidth defaultValue={''} placeholder={""} size='small' />
                                    </Grid>

                                    <Grid item xs={6} sm={6} md={2}>
                                        <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Min Quantity: </Typography>
                                        <TextField sx={headInputStyle} fullWidth defaultValue={''} placeholder={""} size='small' />
                                    </Grid>

                                    <Grid item xs={6} sm={6} md={2}>
                                        <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Price: </Typography>
                                        <TextField sx={headInputStyle} fullWidth defaultValue={''} placeholder={""} size='small' />
                                    </Grid>

                                    <Grid item xs={6} sm={6} md={2}>
                                        <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Discount: </Typography>
                                        <TextField sx={headInputStyle} fullWidth defaultValue={''} placeholder={""} size='small' />
                                    </Grid>

                                    <Grid item xs={6} sm={6} md={2}>
                                        <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Amount: </Typography>
                                        <TextField sx={headInputStyle} fullWidth defaultValue={''} placeholder={""} size='small' />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Stack spacing={1} direction='row' alignItems='center' justifyContent={'center'} >
                                            <TextField sx={headInputStyle} fullWidth defaultValue={''} placeholder={""} size='small' />
                                            <Stack direction='row' alignItems='center' justifyContent={'center'}>
                                                <Button color='error' variant='contained' size='small' onClick={e => setNewItem(false)}>cancel</Button> &nbsp;
                                                <Button color='primary' variant='contained' size='small'>ok</Button>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                </Grid>

                            </Box>
                        </Stack>
                    }
                    <Box sx={{ transition: '.5s', border: '1px solid black', boxShadow: `1px 1px 2px 1px rgba(0, 0, 0, 0.25)`, display: 'flex', alignItems: 'flex-start', padding: showSelectedProduct ? '15px' : '0px' }}>
                        {showSelectedProduct && !newItem &&
                            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'center', sm: 'flex-start' }}>
                                <Box>
                                    <Box component='img' alt='img' style={{ width: '100%', minWidth: '146px', maxWidth: '146px', cursor: 'pointer' }} src={showSelectedProduct.image ? showSelectedProduct.image : ThumbNailImageSVG} />
                                </Box>
                                {/* form */}
                                <Box>
                                    <Grid container alignItems='center' spacing={1}>
                                        <Grid item xs={6} sm={6} md={3} >
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Item Type: </Typography>
                                            <TextField defaultValue={showSelectedProduct.type} size='small' sx={headInputStyle} fullWidth />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={3}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Item Name: </Typography>
                                            <TextField defaultValue={showSelectedProduct.itemCategoryCode} size='small' sx={headInputStyle} fullWidth />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={4}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Description: </Typography>
                                            <TextField defaultValue={showSelectedProduct.description} size='small' sx={headInputStyle} fullWidth />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={2}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Drop Ship: </Typography>
                                            <Checkbox
                                                checked={showSelectedProduct.dropShipment}
                                                onChange={e => setDropShipChecked(e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={2}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Item Number: </Typography>
                                            <TextField defaultValue={showSelectedProduct.no} size='small' sx={subHeadInputStyle} fullWidth />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={2}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Quantity: </Typography>
                                            <TextField defaultValue={showSelectedProduct.quantity} size='small' sx={headInputStyle} fullWidth />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={2}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Min Quantity: </Typography>
                                            <TextField defaultValue={showSelectedProduct.outstandingQuantity} size='small' sx={headInputStyle} fullWidth />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={2}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Price: </Typography>
                                            <TextField defaultValue={showSelectedProduct.unitPrice} size='small' sx={headInputStyle} fullWidth />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={2}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Discount: </Typography>
                                            <TextField defaultValue={showSelectedProduct.lineDiscountAmount} size='small' sx={headInputStyle} fullWidth />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={2}>
                                            <Typography component='span' sx={{ color: '#6D6D6D', fontSize: '14px' }}>Amount: </Typography>
                                            <TextField defaultValue={showSelectedProduct.lineAmount} size='small' sx={headInputStyle} fullWidth />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Stack spacing={1} direction='row' alignItems='center' justifyContent={'center'} >
                                                <TextField onClick={handleOpen} placeholder='Comments' sx={headInputStyle} size='small' fullWidth />
                                                <Stack direction='row' alignItems='center' justifyContent={'center'}>
                                                    <Button color='error' variant='contained' size='small' onClick={e => setShowSelectedProduct(null)}>cancel</Button> &nbsp;
                                                    <Button color='primary' variant='contained' size='small'>ok</Button>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Stack>
                        }
                    </Box>
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
                                            <Box component='img' alt='img' style={{ width: '100%', maxWidth: '146px', cursor: 'pointer' }} src={item.image ? item.image : require(`../../../assets/images/p${index % 12}.png`)} />
                                        </Grid>
                                        <Grid item container direction={'column'} justifyContent={'space-between'} xs={6} px={1} sx={{ position: 'relative' }}>

                                            <Stack sx={{ height: '100%', display: 'flex', justifyContent: 'space-between' }} >
                                                <Typography textAlign='center' mt={1} variant='h1' fontSize={item.itemCategoryCode.length > 25 ? { xs: '5vw', sm: '2vw', md: '1vw' } : { xs: '6vw', sm: '3vw', md: '2vw' }} fontWeight={500} >{item?.itemCategoryCode || item.description}</Typography>
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
                                    <MenuItem onClick={() => navigate('/shipping-quote')} sx={{ borderBottom: '1px solid white', fontSize: '13px' }} >SHIP</MenuItem>
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
