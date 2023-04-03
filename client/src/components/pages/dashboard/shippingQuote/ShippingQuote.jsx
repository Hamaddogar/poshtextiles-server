import { Button, FormControl, Grid, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddressValidateDrawer from './address-drawer'
import RateQuoteDrawer from './ratequote-drawer'
import './quote.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Billfrom from './Billfrom'
import SearchIcon from '@mui/icons-material/Search';
import Shipfrom from './Shipfrom'
import { useSelector } from 'react-redux'
import { BackButton, headInputStyle, styleSlect } from '../reUseAbles/ReuseAbles'
import { create_Shipment_FEDEXP, create_Shipment_STAMPS, createShipment_UPS, request_AccessToken_FEDEXP } from '../../../../utils/API_HELPERS'
import ShipReportDialog from './ShipReportDialog'
import { payload_Shipment_Handler } from '../../../../utils/Helper'
import ShipToDialoge from './ShipToDia'
import { toast } from 'react-toastify'


const ShippingQuote = () => {


    const { saleOrderDetails } = useSelector(store => store.mainReducer);
    const navigate = useNavigate();
    const [drawerstateRate, setdrawerstateRate] = React.useState(false);
    const [allowShipment, setAllowShipment] = React.useState(false);
    const [billfrom, setbillfrom] = React.useState(false);
    const [shipfrom, setshipfrom] = React.useState(false);
    const [shipToDia, setshipToDia] = React.useState(false);

    const [shipReport, SetShipReport] = React.useState({
        open: false,
        response: null,
        error: null
    });

    const [selections, setSelections] = React.useState({
        printOn: "No Option Avaliable",
        extraServices: "No Option Avaliable",
        carrier: saleOrderDetails?.shippingAgentCode || "No Option Avaliable",
    });

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
                            create_Shipment_FEDEXP(payload_Shipment_Handler(saleOrderDetails), token)
                        )
                    });
            } else if (condition && saleOrderDetails?.shippingAgentCode === "UPS") {
                recursiveCaller(
                    createShipment_UPS(payload_Shipment_Handler(saleOrderDetails))
                )
            } else if (condition && saleOrderDetails?.shippingAgentCode === "STAMPS") {
                recursiveCaller(
                    create_Shipment_STAMPS("TOKEN", payload_Shipment_Handler(saleOrderDetails))
                );
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
    const [drawerStateAddress, setdrawerStateAddress] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { return; }
        setdrawerStateAddress(open);
    };

    // toggleDrawerRate
    const toggleDrawerRate = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { return; }
        setdrawerstateRate(open);
    };

    // console.log("---------->", saleOrderDetails);
    return (
        <div>
            <Box component={'form'} onSubmit={handleSubmit}>
                <Billfrom billfrom={billfrom} setbillfrom={setbillfrom} />
                <Shipfrom shipfrom={shipfrom} setshipfrom={setshipfrom} />
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
                                        <MenuItem value={selections.printOn} sx={{ fontSize: '12px' }}>{selections.printOn}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>

                            <Stack direction={'row'} alignItems='center'>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>
                                    Ship From &nbsp;&nbsp;
                                    <SearchIcon onClick={() => { setshipfrom(true) }} sx={{ cursor: "pointer" }} />
                                    :
                                </Typography>

                                <TextField name='shipFrom' fullWidth onClick={() => setbillfrom(true)} placeholder='Posh Textiles Inc.' size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} InputProps={{
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
                                    defaultValue={
                                        saleOrderDetails?.edcCustomers[0]?.name + "\n" +
                                        saleOrderDetails?.edcCustomers[0]?.address + "\n" +
                                        saleOrderDetails?.edcCustomers[0]?.address2 + "\n" +
                                        saleOrderDetails?.edcCustomers[0]?.county + "\n" +
                                        saleOrderDetails?.edcCustomers[0]?.postCode + "\n" +
                                        saleOrderDetails?.edcCustomers[0]?.city + "\n" +
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
                                <TextField defaultValue={saleOrderDetails?.shippingAgentServiceCode} fullWidth placeholder='Service' size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                            </Stack>

                            <Stack direction={'row'} alignItems='center'>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Phone No : </Typography>
                                <TextField defaultValue={saleOrderDetails?.edcCustomers[0].phoneNo} fullWidth placeholder='Carrier' size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                            </Stack>

                            <Stack direction={'row'} alignItems='center'>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Email Tracking : </Typography>
                                <TextField defaultValue={saleOrderDetails?.edcCustomers[0].eMail} fullWidth placeholder='Email Tracking' size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                            </Stack>

                            <Stack direction={'row'} alignItems='center'>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Ship Date : </Typography>
                                <TextField type="date" defaultValue={saleOrderDetails?.shipmentDate} fullWidth placeholder='Ship Date' size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                            </Stack>
                        </Stack>

                    </Grid>

                    {/* right section */}
                    <Grid item xs={12} md={6}>

                        <Stack rowGap={1} sx={saleOrderDetails?.edcWhseShipments.length ? {} : { pointerEvents: `none`, opacity: '.6' }}>
                            <Stack direction={'row'} alignItems='center'>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>No. of Boxes : </Typography>
                                <TextField type="number" defaultValue={saleOrderDetails?.edcWhseShipments[0]?.NoofBoxes} fullWidth placeholder='No. of Boxes' size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                            </Stack>
                            {/* Weight section */}
                            <Stack direction={'row'} alignItems='center' columnGap={1.5}>

                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '99px' }}>Weight : </Typography>

                                <Stack direction={'row'} alignItems='center'>
                                    <TextField type="number" defaultValue={saleOrderDetails?.edcWhseShipments[0]?.GrossWeight} fullWidth placeholder='Weight' size='small' sx={{ ...headInputStyle, maxWidth: '80px' }} />
                                    <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>lbs </Typography>
                                </Stack>


                                <Stack direction={'row'} alignItems='center'>
                                    <TextField type="number" defaultValue={0} fullWidth placeholder='Weight' size='small' sx={{ ...headInputStyle, maxWidth: '80px' }} />
                                    <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>oz </Typography>
                                </Stack>

                                <Stack direction={'row'} alignItems='center'>
                                    <TextField type="number" defaultValue={0} fullWidth placeholder='Weight' size='small' sx={{ ...headInputStyle, maxWidth: '80px' }} />
                                    <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>Auto </Typography>
                                </Stack>

                            </Stack>


                            {/* Dimensions section */}
                            <Stack direction={'row'} alignItems='center' columnGap={1.5}>

                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '99px' }}>Dimensions : </Typography>

                                <Stack direction={'row'} alignItems='center'>
                                    <TextField type="number" defaultValue={saleOrderDetails?.edcWhseShipments[0]?.GrossWeight} fullWidth placeholder='Weight' size='small' sx={{ ...headInputStyle, maxWidth: '80px' }} />
                                    <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>"L </Typography>
                                </Stack>


                                <Stack direction={'row'} alignItems='center'>
                                    <TextField type="number" defaultValue={0} fullWidth placeholder='Weight' size='small' sx={{ ...headInputStyle, maxWidth: '80px' }} />
                                    <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>"W</Typography>
                                </Stack>

                                <Stack direction={'row'} alignItems='center'>
                                    <TextField type="number" defaultValue={0} fullWidth placeholder='Weight' size='small' sx={{ ...headInputStyle, maxWidth: '80px' }} />
                                    <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>"H </Typography>
                                </Stack>

                            </Stack>


                            <Stack direction={'row'} alignItems='center'>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>Insure for $ : </Typography>
                                <TextField type="number" defaultValue={Number(saleOrderDetails?.edcWhseShipments[0]?.InsuranceAmount)} fullWidth size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
                            </Stack>


                            <Stack direction={'row'} alignItems='center'>
                                <Typography sx={{ color: '#6D6D6D', fontSize: '14px', minWidth: '110px' }}>COD : </Typography>
                                <TextField type="number" defaultValue={Number(saleOrderDetails?.edcWhseShipments[0]?.CodAmount)} fullWidth size='small' sx={{ ...headInputStyle, maxWidth: '400px' }} />
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
