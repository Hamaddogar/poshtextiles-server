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
import { createShipment_FEDEXP } from '../../../../utils/FEDEXP_API_HELPERS'
import ShipReportDialog from './ShipReportDialog'


const ShippingQuote = () => {
    const { saleOrderDetails, FEDEXP_TOKEN } = useSelector(store => store.mainReducer);
    const navigate = useNavigate();
    const [billfrom, setbillfrom] = React.useState(false);
    const [shipfrom, setshipfrom] = React.useState(false);
    const [shipReport, SetShipReport] = React.useState({
        open: false,
        response: null,
        error: null
    });

    const [validatedAddress, setValidatedAddress] = React.useState({
        companyName: saleOrderDetails.shipToName,
        addressLine1: saleOrderDetails.shipToAddress,
        addressLine2: saleOrderDetails.shipToAddress2,
        state: saleOrderDetails.shipToCounty,
        city: saleOrderDetails.shipToCity,
        country: saleOrderDetails.shipToCounty,
        postalCode: saleOrderDetails.shipToPostCode,
        addressValidated: saleOrderDetails.addressValidated,
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

    const handleSubmit = event => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget)
        // // api call
        // console.log('--data', event)
        // console.log('--data', data.get('printOn'))
        // console.log('--data', data.get('customer'))
        // console.log('--data', data.get('shipTooo'))
        SetShipReport({ open: true });


        if (FEDEXP_TOKEN && saleOrderDetails?.shippingAgentCode === "FEDEX") {
            const payload_Data = {
                "labelResponseOptions": "URL_ONLY",
                "requestedShipment": {
                    "shipper": {
                        "contact": {
                            "personName": "Muhammad Hamad",
                            "phoneNumber": 1234567890,
                            "companyName": "Posh Textiles"
                        },
                        "address": {
                            "streetLines": [
                                "7670 N.W. 6th Avenue"
                            ],
                            "city": "India",
                            "stateOrProvinceCode": "AR",
                            "postalCode": 72601,
                            "countryCode": "US"
                        }
                    },
                    // "shipper": {
                    //     "contact": {
                    //         "personName": "SHIPPER NAME",
                    //         "phoneNumber": 1234567890,
                    //         "companyName": "Shipper Company Name"
                    //     },
                    //     "address": {
                    //         "streetLines": [
                    //             "SHIPPER STREET LINE 1"
                    //         ],
                    //         "city": "HARRISON",
                    //         "stateOrProvinceCode": "AR",
                    //         "postalCode": 72601,
                    //         "countryCode": "US"
                    //     }
                    // },
                    "recipients": [
                        {
                            "contact": {
                                "personName": saleOrderDetails?.shipToName,
                                "phoneNumber": saleOrderDetails?.edcCustomers[0]?.phoneNo,
                                "companyName": saleOrderDetails?.edcCustomers[0]?.contact
                            },
                            "address": {
                                "streetLines": [
                                    saleOrderDetails?.edcCustomers[0]?.address,
                                    saleOrderDetails?.edcCustomers[0]?.address2
                                ],
                                "city": saleOrderDetails?.edcCustomers[0]?.city,
                                "stateOrProvinceCode": saleOrderDetails?.shipToCounty,
                                "postalCode": saleOrderDetails?.edcCustomers[0]?.postCode,
                                "countryCode": saleOrderDetails?.shipToCountryRegionCode
                            }
                        }
                    ],
                    "shipDatestamp": saleOrderDetails?.shipmentDate,
                    "serviceType": "STANDARD_OVERNIGHT",
                    "packagingType": "FEDEX_SMALL_BOX",
                    "pickupType": "USE_SCHEDULED_PICKUP",
                    "blockInsightVisibility": false,
                    "shippingChargesPayment": {
                        "paymentType": "SENDER"
                    },
                    "shipmentSpecialServices": {
                        "specialServiceTypes": [
                            "FEDEX_ONE_RATE"
                        ]
                    },
                    "labelSpecification": {
                        "imageType": "PDF",
                        "labelStockType": "PAPER_85X11_TOP_HALF_LABEL"
                    },
                    "requestedPackageLineItems": [
                        {}
                    ]
                },
                "accountNumber": {
                    "value": "740561073"
                }
            };

            createShipment_FEDEXP(payload_Data, FEDEXP_TOKEN)
                .then(res => {
                    if (res?.response?.status) {
                        SetShipReport({
                            open: true,
                            response: null,
                            error: res.response.statusText
                        });
                    } else {
                        SetShipReport({
                            open: true,
                            response: res,
                            error: null
                        });
                    }
                });

        } else {
            SetShipReport({
                open: true,
                response: null,
                error: "Only FEDEXP Services"
            });
        };


    };


    return (
        <div>
            <Box component={'form'} onSubmit={handleSubmit}>
                <Billfrom billfrom={billfrom} setbillfrom={setbillfrom} />
                <Shipfrom shipfrom={shipfrom} setshipfrom={setshipfrom} />
                <ShipReportDialog shipReport={shipReport} SetShipReport={SetShipReport} />
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
                                    <SearchIcon onClick={() => { setshipfrom(true) }} sx={{ cursor: "pointer" }} />
                                    :
                                </Typography>

                                <TextField
                                    sx={{ ...headInputStyle, maxWidth: '400px' }}
                                    defaultValue={saleOrderDetails.shipToCountryRegionCode}
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
                                <Box>
                                    <AddressValidateDrawer
                                        validatedAddress={validatedAddress}
                                        setValidatedAddress={setValidatedAddress}
                                    />
                                </Box>
                                <Box sx={{ marginTop: "10px" }}>
                                    <BackButton onClick={() => navigate(-1)} />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <RateQuoteDrawer />
                                <Button
                                    type='submit'
                                    variant='contained'
                                    sx={{ marginLeft: "6px", background: "#4B5AD8", marginTop: "15px", padding: "0px 6px", color: 'white' }}
                                >Ship</Button>
                            </Box>
                        </Grid>

                    </Grid>

                </Grid>
            </Box>
        </div>
    )
}

export default ShippingQuote
