import { Grid, Stack, Typography, Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import Pagination from 'react-responsive-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import { DeleteOutline, EditOutlined, } from '@mui/icons-material';
import Done from '../../../assets/images/done.png'
import { BackButton, scroller } from '../reUseAbles/ReuseAbles';
import { PACKING_DETAILS_FUN, SELECTED_SALE_ORDER_DATA } from '../../../../RTK/Reducers/Reducers';
import ConDialog from './ConfirmationModal';
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
import UpperHeader from '../reUseAbles/UpperHeader';
import WHShipmentModelView from '../reUseAbles/WHShipmentModelView';
import PackingDrawer from './packing-drawer';
import { createPacking, request_AccessToken_MICROSOFT } from '../../../../utils/API_HELPERS';
import { Toaster } from '../reUseAbles/Toasters';
import Actions, { ActionMenuItem } from '../reUseAbles/Actions';

const images = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15];

const SalesOrders = () => {

    const { saleOrderDetails, perPage, sale_order_paking, WH_SHIP_NO, WH_SHIP_DETAILS, PACKING_DETAILS } = useSelector(store => store.mainReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // states
    const [copy, setCopy] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [showSelectedProduct, setShowSelectedProduct] = React.useState(null);
    const [openConfirmation, setOpenConfirmation] = React.useState({ status: false, deleteIndex: null });
    const [newItem, setNewItem] = React.useState(false);
    const [openCreateWHShip, setOpenCreateWHShip] = React.useState(false);
    const [packingSideBar, setPackingSideBar] = React.useState(false);

    React.useEffect(() => {
        setCopy(saleOrderDetails.edcSalesLines);
        //eslint-disable-next-line
    }, [saleOrderDetails.edcSalesLines]);

    React.useEffect(() => { setRows(copy.slice(0, perPage)) }, [copy, perPage]);

    const handlePageChange = page => {
        setCurrentPage(page);
        setRows(copy.slice(((page - 1) * perPage), ((((page - 1) * perPage)) + perPage)))
    };

    const handleShowSelectedProduct = product => {
        setShowSelectedProduct(product);
        scroller();
    };

    const handleSelectedPickingProduct = product => {
        if (WH_SHIP_NO?.WHno && WH_SHIP_NO?.sno === saleOrderDetails?.no && WH_SHIP_DETAILS?.status && WH_SHIP_DETAILS?.shipItems?.length > 0) {
            navigate('/picking')
        } else {
            Toaster('warn', 'Create WH Shipment!');
            scroller(false);
        }
    };

    const handleClickNewItem = () => {
        setShowSelectedProduct(null);
        setNewItem(true);
        scroller();
    };

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

    };

    // lineItems Delete function
    const deleteLineItem = (index) => {
        rows.splice(index, 1);
        setRows([...rows]);
    };

    // update uppser header section handler
    const handleUpperHeaderSubmit = e => {
        e.preventDefault();
        // const data = new FormData(e.target);
    };

    // add new line Item function
    const handleSubmitLineItem = (event) => {
        handleCancel('newItem');
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

    };

    const handleShippingQuote = () => {
        navigate('/shipping-quote')
        dispatch(SELECTED_SALE_ORDER_DATA({
            ...saleOrderDetails,
            edcSalesLines: rows
        }));
        scroller();
    };

    const handleCancel = closeTo => {
        if (closeTo === "newItem") setNewItem(false);
        else setShowSelectedProduct(null);
    };

    const handleCreateWHShip = () => {
        setOpenCreateWHShip(true);
        scroller();
    };

    const handleCreatePACKING = () => {
        dispatch(PACKING_DETAILS_FUN(null));
        Toaster('loading', `Creating Packing...`)
        request_AccessToken_MICROSOFT()
            .then(decide => {
                if (decide.success) {
                    createPacking({ token: decide.token, body: { "whseShipNo": WH_SHIP_NO?.WHno } })
                        .then(response => {
                            if ("packingNo" in response?.newPacking) {
                                dispatch(PACKING_DETAILS_FUN({
                                    status: true,
                                    shipNo: response?.newPacking?.whseShipNo,
                                    SNo: WH_SHIP_NO?.sno,
                                    pkNo: response?.newPacking?.packingNo,
                                }));
                                if (response?.newPacking?.responseMsg === "Created") {
                                    Toaster('success', `Packing ${response?.newPacking?.responseMsg}`)
                                } else {
                                    Toaster('dismiss')
                                }
                            } else {
                                Toaster('error', `Something Went Wrong!`)
                            }
                        })
                }
            })
    };

    const handleBack = () => {
        navigate('/');
        scroller()
    };

    const toggleDrawerPacking = (open) => (event) => setPackingSideBar(open);



    return (
        <div>
            <PackingDrawer handleShippingQuote={handleShippingQuote} toggleDrawer={toggleDrawerPacking} packingSideBar={packingSideBar} />
            <WHShipmentModelView openCreateWHShip={openCreateWHShip} setOpenCreateWHShip={setOpenCreateWHShip} SNO={saleOrderDetails.no} />
            <ConDialog openConfirmation={openConfirmation} setOpenConfirmation={setOpenConfirmation} deleteLineItem={deleteLineItem} />
            <Box>
                {/* Upper Form */}
                <UpperHeader saleOrderDetails={saleOrderDetails} handleUpperHeaderSubmit={handleUpperHeaderSubmit} />
                <Box sx={{ padding: '0px' }} mb={1}>
                    {
                        newItem &&
                        !showSelectedProduct &&
                        <CreateNewLineItem handleSubmitLineItem={handleSubmitLineItem} handleCancel={handleCancel} />
                    }
                    {
                        showSelectedProduct &&
                        !newItem &&
                        <UpdateLineItem handleSubmitUpdateLineItem={handleSubmitUpdateLineItem} handleCancel={handleCancel} product={showSelectedProduct} />
                    }
                </Box>


                {/* lines Items mapping */}
                <Box sx={{ padding: '15px', backgroundColor: 'white' }}>
                    <Box sx={{ padding: '15px', border: '1px solid black', borderStyle: 'inset', minHeight: '600px' }}>
                        <Grid container alignItems={'center'} rowGap={3} sx={{ margin: '10px' }}>
                            {rows && rows.map((item, index) => <Grid xs={12} sm={6} md={4} item justifyContent='space-between' key={index} sx={{ minHeight: '100px', }} >
                                <Box sx={{ cursor: sale_order_paking ? "default" : 'pointer' }} px={{ xs: '1', md: 2, lg: 3 }} onClick={() => sale_order_paking ? null : handleSelectedPickingProduct(item)}>
                                    <Grid container justifyContent='space-between'>
                                        <Grid xs={6} item sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {sale_order_paking && <Box component='img' alt='img' style={{ maxWidth: '70%', position: 'absolute' }} src={Done} />}
                                            <Box component='img' alt='img' style={{ width: '100%', maxWidth: '146px', cursor: 'pointer' }} src={item.image ? item.image : images[index % 15]} />
                                        </Grid>
                                        <Grid item container direction={'column'} justifyContent={'space-between'} xs={6} px={1} sx={{ position: 'relative' }}>

                                            <Stack sx={{ height: '100%', display: 'flex', justifyContent: 'space-between' }} >
                                                <Typography textAlign='center' mt={1} variant='h1' fontSize={item.itemCategoryCode.length > 25 ? { xs: '5vw', sm: '2vw', md: '1vw' } : { xs: '6vw', sm: '2.3vw', md: '1.3vw' }} fontWeight={500} >{item.description}</Typography>
                                                <Stack direction='row' alignItems={'center'} justifyContent='space-between'>
                                                    <Typography fontSize='12px'>MOQ : <span style={{ fontSize: '20px' }}>{item.minimumQty}</span></Typography>
                                                    <Typography fontSize='12px' textAlign={'right'}>QTY : <span style={{ fontSize: '20px' }}>{item.quantity}</span></Typography>
                                                </Stack>
                                            </Stack>
                                            {
                                                !sale_order_paking && <Stack sx={{ position: 'absolute', right: { xs: '0px', sm: '0px', md: '-10px' } }}>
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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>

                        <BackButton onClick={handleBack} />
                        &nbsp; &nbsp; &nbsp;
                        <Actions id={'slaeOrder-menu'}>
                            <ActionMenuItem label={'RELEASE NOW'} />
                            {WH_SHIP_NO?.WHno && WH_SHIP_NO?.sno === saleOrderDetails?.no && WH_SHIP_DETAILS?.status && WH_SHIP_DETAILS?.shipItems?.length > 0 ?
                                <Link to='/picking' style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <ActionMenuItem label={'Shipment is Done Move to Picking'} />
                                </Link>
                                :
                                <ActionMenuItem click={handleCreateWHShip} label={'Create WH Shipment'} />
                            }
                            <ActionMenuItem label={'UNRELEASE NOW'} last={true} />
                        </Actions>
                    </Box>
                </Grid>
                <Grid item>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <Button onClick={handleClickNewItem} variant='contained' size='small'> + add new item</Button>
                        {WH_SHIP_NO?.WHno && WH_SHIP_NO?.sno === saleOrderDetails?.no && PACKING_DETAILS?.status && PACKING_DETAILS?.pkNo ?
                            <Button variant='contained' size='small' color='success'
                                onClick={toggleDrawerPacking(true)}> Next Packing </Button>
                            :
                            <Button variant='contained' size='small' disabled={WH_SHIP_NO?.WHno ? false : true}
                                onClick={handleCreatePACKING}> Create PACKING </Button>}
                    </Stack>
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
        </div >
    )
}

export default SalesOrders
