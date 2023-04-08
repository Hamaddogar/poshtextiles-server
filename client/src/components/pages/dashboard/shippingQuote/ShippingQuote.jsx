import { Button, FormControl, Grid, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddressValidateDrawer from './address-drawer'
import RateQuoteDrawer from './ratequote-drawer'
import './quote.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import ShipfromDialoge from './ShipfromDialoge'
import { useDispatch, useSelector } from 'react-redux'
import { BackButton, headInputStyle, styleSlect } from '../reUseAbles/ReuseAbles'
import { create_Shipment_FEDEXP, create_Shipment_STAMPS, createShipment_UPS, request_AccessToken_FEDEXP, request_AccessToken_STAMPS } from '../../../../utils/API_HELPERS'
import ShipReportDialog from './ShipReportDialog'
import { payload_Shipment_Handler } from '../../../../utils/Helper'
import ShipToDialoge from './ShipToDia'
import { toast } from 'react-toastify'
import { STAMPS_TOKEN } from '../../../../RTK/Reducers/Reducers'
import ShipFromPreview from './ShipFromPreview'


const ShippingQuote = () => {
    const { stamps_token } = useSelector(store => store.mainReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { saleOrderDetails, ship_from_location } = useSelector(store => store.mainReducer);
    const [drawerStateAddress, setdrawerStateAddress] = React.useState(false);
    const [drawerstateRate, setdrawerstateRate] = React.useState(false);
    const [allowShipment, setAllowShipment] = React.useState(false);
    const [shipFromPreview, setShipFromPreview] = React.useState(false);
    const [shipfrom, setshipfrom] = React.useState(false);
    const [shipToDia, setshipToDia] = React.useState(false);
    const [shipReport, SetShipReport] = React.useState({ open: false, response: null, error: null });

    const [selections, setSelections] = React.useState({
        printOn: "3",
        extraServices: "No Option Avaliable",
        carrier: saleOrderDetails?.shippingAgentCode || "No Option Avaliable",
    });

    const printOptions = [{
        label: `Shipping Label - 8 1⁄2" x 11" Paper`,
        value: "1"
    }, {
        label: `Envelop - #10, 4 1⁄8"  x 9 1⁄2"`,
        value: "2"
    }, {
        label: `Roll - 4" x 6" Shipping Label`,
        value: "3"
    }]

    const handleChange = event => setSelections({
        ...selections,
        [event.target.name]: [event.target.value]
    });

    // for shipment labels recursiveCaller
    const recursiveCaller = (action, counter = 0) => {
        action.then(res => {
            console.log("---labels----", res)
            if (!(res?.data?.error)) {
                SetShipReport({
                    open: true,
                    response: res,
                    error: null,
                });
            } else if ((res.name || res.data.error) && counter < 5) {
                counter++;
                recursiveCaller(action, counter)
            } else if (("error" in res.data || res.data.error) && counter >= 5) {
                if (res.data.code === 401) {
                    dispatch(STAMPS_TOKEN({ set: false }))
                    SetShipReport({
                        open: true,
                        response: null,
                        error: "Please Try Again!",
                    });
                } else {
                    SetShipReport({
                        open: true,
                        response: null,
                        error: res.data.message ? res.data.message : "unexpected Error Try Again",
                    });
                }

            } else {
                SetShipReport({
                    open: true,
                    response: null,
                    error: res.data.message ? res.data.message : "unexpected Error Try Again",
                });
            }
        })
    };


    // for shipment 
    const handleSubmit = event => {
        event.preventDefault();

        if (saleOrderDetails.edcWhseShipments.length > 0) {
            SetShipReport({ open: true });
            const condition = saleOrderDetails?.edcSalesLines?.length > 0
            if (condition && saleOrderDetails?.shippingAgentCode === "FEDEX") {
                request_AccessToken_FEDEXP()
                    .then(token => {
                        recursiveCaller(
                            create_Shipment_FEDEXP(payload_Shipment_Handler(saleOrderDetails,selections.printOn), token)
                        )
                    });
            } else if (condition && saleOrderDetails?.shippingAgentCode === "UPS") {
                recursiveCaller(
                    createShipment_UPS(payload_Shipment_Handler(saleOrderDetails,selections.printOn))
                )
            } else if (condition && saleOrderDetails?.shippingAgentCode === "STAMPS") {
                if (stamps_token) {
                    recursiveCaller(
                        create_Shipment_STAMPS(stamps_token, payload_Shipment_Handler(saleOrderDetails,selections.printOn))
                    );
                } else {
                    request_AccessToken_STAMPS()
                        .then(res => {
                            if (res.token) {
                                recursiveCaller(
                                    create_Shipment_STAMPS(res.token, payload_Shipment_Handler(saleOrderDetails,selections.printOn))
                                );
                                dispatch(STAMPS_TOKEN({ set: true, token: res.token, code: res.code }))
                            }
                            console.log("res", res);
                        });
                };

            } else if (!condition) {
                SetShipReport({
                    open: true,
                    response: null,
                    error: "Line Items must be presernt"
                });
            } else {
                SetShipReport({
                    open: true,
                    response: null,
                    error: "This Service is not Supported Yet"
                });
            };
        } else {
            toast.error('No Shipment Details Found ...', { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }

    };




    // address


    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { return; }
        setdrawerStateAddress(open);
    };

    // toggleDrawerRate
    const toggleDrawerRate = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { return; }
        setdrawerstateRate(open);
    };

    console.log("---------->ship_from_location", saleOrderDetails);
    return (
        <div>
            <Box component={'form'} onSubmit={handleSubmit}>
                <ShipFromPreview shipFromPreview={shipFromPreview} setShipFromPreview={setShipFromPreview} />
                <ShipfromDialoge shipfrom={shipfrom} setshipfrom={setshipfrom} />
                <ShipToDialoge shipToDia={shipToDia} setshipToDia={setshipToDia} customer={saleOrderDetails?.edcCustomers[0]} />
                <ShipReportDialog shipReport={shipReport} SetShipReport={SetShipReport} numbers={saleOrderDetails?.edcSalesLines?.length} />
                <AddressValidateDrawer saleOrderDetails={saleOrderDetails} allowShipment={allowShipment} setAllowShipment={setAllowShipment} toggleDrawer={toggleDrawer} drawerStateAddress={drawerStateAddress} />
                <RateQuoteDrawer saleOrderDetails={saleOrderDetails} toggleDrawerRate={toggleDrawerRate} drawerstateRate={drawerstateRate} />
                <Grid container >

                    {/* left section */}
                    <Grid item xs={12} md={6} >
                        <Stack sx={{ width: '100%' }} rowGap={2}>
                            <Stack direction={'row'} alignItems='center'>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Print On : </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        id="printOn"
                                        value={selections.printOn}
                                        onChange={handleChange}
                                        size='small'
                                        name='printOn'
                                        sx={{ ...styleSlect, maxWidth: '400px', backgroundColor: 'white' }}
                                    >
                                        {
                                            printOptions.map(item => (
                                                <MenuItem key={item.value} value={item.value} sx={{ fontSize: '12px' }}>{item.label}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Stack>

                            <Stack direction={'row'} alignItems='center'>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>
                                    Ship From &nbsp;&nbsp;
                                    <SearchIcon onClick={() => { setshipfrom(true) }} sx={{ cursor: "pointer" }} />
                                    :
                                </Typography>

                                <TextField name='shipFrom' fullWidth onClick={() => setShipFromPreview(true)} value={ship_from_location?.name} size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <VisibilityIcon sx={{ cursor: 'pointer' }} />
                                        </InputAdornment>
                                    )
                                }} />
                            </Stack>

                            <Stack direction={'row'}>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>
                                    Ship To &nbsp;&nbsp;
                                    <SearchIcon onClick={() => { setshipToDia(true) }} sx={{ cursor: "pointer" }} />
                                    :
                                </Typography>

                                <TextField
                                    sx={{ ...headInputStyle, maxWidth: '400px', fontSize: '10px', textDecoration: "italic" }}
                                    value={
                                        saleOrderDetails?.edcCustomers[0]?.name + "\n" +
                                        saleOrderDetails?.edcCustomers[0]?.address + "\n" +
                                        saleOrderDetails?.edcCustomers[0]?.address2 + "\n" +
                                        saleOrderDetails?.edcCustomers[0]?.city + "\n" +
                                        saleOrderDetails?.edcCustomers[0]?.postCode + "\n" +
                                        saleOrderDetails?.edcCustomers[0]?.county + "\n" +
                                        saleOrderDetails?.edcCustomers[0]?.countryRegionCode
                                    }
                                    size='small'
                                    multiline
                                    minRows={8}
                                    maxRows={8}
                                    fullWidth
                                    name='shipTo'
                                />

                            </Stack>


                            <Stack direction={'row'} alignItems='center'>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Carrier : </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        id="carrier"
                                        value={selections.carrier}
                                        onChange={handleChange}
                                        size='small'
                                        name='carrier'
                                        sx={{ ...styleSlect, maxWidth: '400px', backgroundColor: 'white' }}
                                    >
                                        <MenuItem value={selections.carrier} sx={{ fontSize: '12px' }}>{selections.carrier}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>

                            <Stack direction={'row'} alignItems='center'>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Service : </Typography>
                                <TextField value={saleOrderDetails?.shippingAgentServiceCode} fullWidth placeholder='Service' size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                            </Stack>

                            <Stack direction={'row'} alignItems='center'>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Phone No : </Typography>
                                <TextField value={saleOrderDetails?.edcCustomers[0].phoneNo} fullWidth placeholder='Carrier' size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                            </Stack>

                            <Stack direction={'row'} alignItems='center'>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Email Tracking : </Typography>
                                <TextField value={saleOrderDetails?.edcCustomers[0].eMail} fullWidth placeholder='Email Tracking' size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                            </Stack>

                            <Stack direction={'row'} alignItems='center'>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Ship Date : </Typography>
                                <TextField type="date" value={saleOrderDetails?.shipmentDate} fullWidth placeholder='Ship Date' size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                            </Stack>
                        </Stack>

                    </Grid>

                    {/* right section */}
                    <Grid item xs={12} md={6}>
                        <Stack rowGap={1} sx={saleOrderDetails?.edcWhseShipments.length ? {} : { pointerEvents: `none`, opacity: '.6' }}>
                            <Stack direction={'row'} alignItems='center'>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>No. of Boxes : </Typography>
                                <TextField type="number" value={saleOrderDetails?.edcWhseShipments[0]?.NoofBoxes} fullWidth placeholder='No. of Boxes' size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                            </Stack>

                            <Stack direction={'row'} alignItems='center' columnGap={1.5}>

                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '99px' }}>Weight : </Typography>

                                <Stack direction={'row'} alignItems='center'>
                                    <TextField type="number" value={saleOrderDetails?.edcWhseShipments[0]?.GrossWeight} fullWidth placeholder='Weight' size='small' sx={{ ...headInputStyle, maxWidth: '80px' }} />
                                    <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>{saleOrderDetails?.edcSalesLines[0].unitOfMeasureCode} </Typography>
                                </Stack>


                                <Stack direction={'row'} alignItems='center'>
                                    <TextField type="number" value={0} fullWidth placeholder='Weight' size='small' sx={{ ...headInputStyle, maxWidth: '80px' }} />
                                    <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>oz </Typography>
                                </Stack>

                                <Stack direction={'row'} alignItems='center'>
                                    <TextField type="number" value={0} fullWidth placeholder='Weight' size='small' sx={{ ...headInputStyle, maxWidth: '80px' }} />
                                    <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>Auto </Typography>
                                </Stack>

                            </Stack>


                            {/* Dimensions section */}
                            <Stack direction={'row'} alignItems='center' columnGap={1.5}>

                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '99px' }}>Dimensions : </Typography>

                                <Stack direction={'row'} alignItems='center'>
                                    <TextField type="number" value={saleOrderDetails?.edcWhseShipments?.[0]?.edcBoxDetails?.[0]?.length} fullWidth placeholder='Weight' size='small' sx={{ ...headInputStyle, maxWidth: '80px' }} />
                                    <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>"L </Typography>
                                </Stack>


                                <Stack direction={'row'} alignItems='center'>
                                    <TextField type="number" value={saleOrderDetails?.edcWhseShipments?.[0]?.edcBoxDetails?.[0]?.width} fullWidth placeholder='Weight' size='small' sx={{ ...headInputStyle, maxWidth: '80px' }} />
                                    <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>"W</Typography>
                                </Stack>

                                <Stack direction={'row'} alignItems='center'>
                                    <TextField type="number" value={saleOrderDetails?.edcWhseShipments?.[0]?.edcBoxDetails?.[0]?.height} fullWidth placeholder='Weight' size='small' sx={{ ...headInputStyle, maxWidth: '80px' }} />
                                    <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>"H </Typography>
                                </Stack>

                            </Stack>


                            <Stack direction={'row'} alignItems='center'>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Insure for $ : </Typography>
                                <TextField type="number" value={Number(saleOrderDetails?.edcWhseShipments[0]?.InsuranceAmount)} fullWidth size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                            </Stack>


                            <Stack direction={'row'} alignItems='center'>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>COD : </Typography>
                                <TextField type="number" value={Number(saleOrderDetails?.edcWhseShipments[0]?.CodAmount)} fullWidth size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                            </Stack>

                            <Stack direction={'row'} alignItems='center'>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Extra Service : </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        id="extraServices"
                                        value={selections.extraServices}
                                        onChange={handleChange}
                                        size='small'
                                        name='extraServices'
                                        sx={{ ...styleSlect, backgroundColor: '#E0E0E0' }}
                                    >
                                        <MenuItem value={selections.extraServices} sx={{ fontSize: '12px' }}>{selections.extraServices}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>

                        </Stack>

                    </Grid>


                    {/* footer actions */}
                    <Grid item container mt={.5}>
                        <Grid item xs={6}>
                            <Box>
                                <Button
                                    style={{ background: "#4B5AD8", marginTop: "15px", padding: "0px 6px", color: "white" }}
                                    onClick={toggleDrawer(true)}>Validate Address</Button>

                                <Box sx={{ marginTop: "10px" }}>
                                    <BackButton onClick={() => navigate(-1)} />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button style={{ background: "#4B5AD8", marginTop: "15px", padding: "2px 6px", color: "white" }} onClick={toggleDrawerRate(true)}>RATE QUOTE</Button>
                                <Button
                                    disabled={!allowShipment}
                                    type='submit'
                                    variant='contained'
                                    sx={{ marginLeft: "6px", background: "#4B5AD8", marginTop: "15px", padding: "0px 6px", color: 'white' }}
                                > Ship </Button>
                            </Box>
                        </Grid>

                    </Grid>

                </Grid>
            </Box>
        </div>
    )
}

export default ShippingQuote
