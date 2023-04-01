import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Checkbox, Container, FormControl, FormControlLabel, Grid, MenuItem, Select, Skeleton, Slider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { rate_List_FEDEX, rate_List_UPS, request_AccessToken_FEDEXP } from '../../../../utils/API_HELPERS';
import { payload_Rates_Handler } from '../../../../utils/Helper';
import { FEDEX_Service_Types, UPS_Service_Types } from '../../../../utils/DATA_Helper';
import FedexRates from './FedexRates';
import UPSRates from './UPSRates';

export default function RateQuoteDrawer({ toggleDrawerRate, drawerstateRate, saleOrderDetails }) {

    const [slider, setSlider] = React.useState([0, 2000]);
    const [rateListData, setRateListData] = React.useState({
        loading: "idle",
        allService: [],
        singleService: [],
        error: false
    });



    const [serviceType, setServiceType] = React.useState(() => {
        if (saleOrderDetails?.shippingAgentCode === "FEDEX") {
            return { label: 'Standard Overnight', value: 'STANDARD_OVERNIGHT' }
        } else if (saleOrderDetails?.shippingAgentCode === "UPS") {
            return { value: '03', label: 'UPS Ground' }
        } else if (saleOrderDetails?.shippingAgentCode === "STAMPS") {
            return { value: '03', label: 'UPS Ground' }
        } else {
            return { value: '03', label: 'UPS Ground' }
        }
    });
    const [serviceTypeOptions] = React.useState(() => {
        if (saleOrderDetails?.shippingAgentCode === "FEDEX") {
            return FEDEX_Service_Types
        } else if (saleOrderDetails?.shippingAgentCode === "UPS") {
            return UPS_Service_Types
        } else if (saleOrderDetails?.shippingAgentCode === "STAMPS") {
            return FEDEX_Service_Types
        } else {
            return FEDEX_Service_Types
        }
    })


    const loadingFunction = () => setRateListData({
        loading: "loading",
        allService: [],
        singleService: [],
        error: false
    });

    // for rate lists recursiveCaller
    const recursiveCallerRates = (action, counter = 0) => {
        // calling function 
        action
            .then(response => {
                if (("error" in response) && !(response.error)) {
                    setRateListData({
                        loading: "responded",
                        allService: response.allServices,
                        singleService: response.message,
                        error: false
                    })

                } else if ((response.name) && counter < 5) {
                    counter++;
                    recursiveCallerRates(action, counter)
                } else if (("error" in response || response.error) && counter >= 5) {
                    setRateListData({
                        loading: "responded",
                        allService: [],
                        singleService: [],
                        error: response.message
                    })
                } else {
                    setRateListData({
                        loading: "responded",
                        allService: [],
                        singleService: [],
                        error: response.message
                    })
                }
            })
    };
    React.useLayoutEffect(() => {
        const condition = rateListData.loading === "idle" && drawerstateRate;
        // calling apis
        if (condition && saleOrderDetails?.shippingAgentCode === "FEDEX") {
            loadingFunction();
            request_AccessToken_FEDEXP().then(token => {
                recursiveCallerRates(rate_List_FEDEX({
                    token: token,
                    body: payload_Rates_Handler(saleOrderDetails, serviceType.value ? serviceType : { label: 'Standard Overnight', value: 'STANDARD_OVERNIGHT' }),
                    toastPermission: true,
                    details: serviceType
                }))
            })

        } else if (condition && saleOrderDetails?.shippingAgentCode === "UPS") {
            loadingFunction();
            recursiveCallerRates(rate_List_UPS({
                body: payload_Rates_Handler(saleOrderDetails, serviceType.value ? serviceType : { value: '03', label: 'UPS Ground' }),
                toastPermission: true,
                details: serviceType
            }))

        } else if (condition && saleOrderDetails?.shippingAgentCode === "STAMPS") {
            loadingFunction();
            payload_Rates_Handler(saleOrderDetails)
        } else if (!drawerstateRate) {
            setRateListData({
                loading: "idle",
                allService: [],
                singleService: []
            })
        }
        //eslint-disable-next-line
    }, [drawerstateRate, serviceType])



    const handleChangeServiceType = (event, newValue) => {

        if (saleOrderDetails?.shippingAgentCode === "FEDEX") {
            const daaa = FEDEX_Service_Types.filter(opt => opt.value === event.target.value)
            setServiceType(daaa[0]);
            setRateListData({
                loading: "idle",
                allService: [],
                singleService: []
            })
        } else if (saleOrderDetails?.shippingAgentCode === "UPS") {
            const daaa = UPS_Service_Types.filter(opt => opt.value === event.target.value)
            setServiceType(daaa[0]);
            setRateListData({
                loading: "idle",
                allService: [],
                singleService: []
            })
        } else if (saleOrderDetails?.shippingAgentCode === "STAMPS") {
            const daaa = UPS_Service_Types.filter(opt => opt.value === event.target.value)
            setServiceType(daaa[0]);
            setRateListData({
                loading: "idle",
                allService: [],
                singleService: []
            })
        } else {
            const daaa = UPS_Service_Types.filter(opt => opt.value === event.target.value)
            setServiceType(daaa[0]);
            setRateListData({
                loading: "idle",
                allService: [],
                singleService: []
            })
        }
    }

    // handleClickProduct
    // const handleClickProduct = (item) => {
    //     console.log('handleClickProduct', item);
    // }



    return (
        <div>
            <React.Fragment >
                <SwipeableDrawer
                    anchor={"left"}
                    open={drawerstateRate}
                    onClose={toggleDrawerRate(false)}
                    onOpen={toggleDrawerRate(true)}
                >
                    <Box
                        sx={{ width: 500, padding: "20px 15px 0px 15px", background: "#E9EDF1" }}
                        role="presentation"
                    >
                        <Container component='form'>
                            <Grid container spacing={3}>

                                {/* left section */}
                                <Grid item xs={12}>
                                    <Box>
                                        <label>Service Types:</label><br />
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="routes-select-label"
                                                id="routes-select"
                                                value={serviceType.value}
                                                onChange={handleChangeServiceType}
                                                size='small'
                                                sx={{ '& input': { fontSize: '13px' }, fontSize: '12px', }}
                                            >
                                                {
                                                    serviceTypeOptions.map(option => <MenuItem value={option.value} sx={{ fontSize: '12px' }}>{option.label}</MenuItem>)
                                                }

                                            </Select>
                                        </FormControl>

                                    </Box>
                                    <Box sx={{ marginTop: "20px" }}>
                                        Carriers
                                        <Stack>
                                            <Box>
                                                <FormControlLabel
                                                    label={saleOrderDetails?.shippingAgentCode}
                                                    control={
                                                        <Checkbox size='small' checked={true} />
                                                    }
                                                />
                                            </Box>

                                        </Stack>

                                    </Box>
                                    <Box>
                                        <Box sx={{ width: "100%", color: "#000000" }}>
                                            <Typography sx={{ fontSize: '13px' }}>Price: {`$${slider[0]}-$${slider[1]}`} </Typography>
                                            <Slider
                                                sx={{ marginLeft: "5px" }}
                                                getAriaLabel={() => 'Price Range2'}
                                                value={slider}
                                                onChange={(event, newValue) => setSlider(newValue)}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={value => `${value}`}
                                                size='small'
                                                name="second"
                                                max={2000}
                                                step={1}
                                                aria-labelledby="non-linear-slider"
                                            />
                                        </Box>
                                    </Box>

                                </Grid>

                                {/* rates display section */}
                                <Grid item xs={12} >

                                    {
                                        rateListData.loading === "loading" && <Box>
                                            <Skeleton height={2} />
                                            <Skeleton height={30} />
                                            <Skeleton height={2} />
                                            <Skeleton height={30} />
                                            <Skeleton height={2} />
                                            <Skeleton height={30} />
                                            <Skeleton height={2} />
                                            <Skeleton height={30} />
                                            <Skeleton height={2} />
                                            <Skeleton height={30} />
                                            <Skeleton height={2} />
                                            <Skeleton height={30} />
                                            <Skeleton height={2} />
                                            <Skeleton height={30} />
                                            <Skeleton height={2} />
                                            <Skeleton height={30} />
                                            <Skeleton height={2} />
                                            <Skeleton height={30} />
                                            <Skeleton height={2} />

                                        </Box>
                                    }
                                </Grid>

                                <Grid item xs={12} >
                                    {
                                        (saleOrderDetails?.shippingAgentCode === "FEDEX") &&
                                        <FedexRates rateListData={rateListData} slider={slider} service={saleOrderDetails?.shippingAgentCode} />
                                    }

                                    {
                                        (saleOrderDetails?.shippingAgentCode === "UPS") &&
                                        <UPSRates rateListData={rateListData} slider={slider} service={saleOrderDetails?.shippingAgentCode} />
                                    }



                                    <Box py={3}></Box>


                                </Grid>






                            </Grid>
                        </Container>

                    </Box>
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}