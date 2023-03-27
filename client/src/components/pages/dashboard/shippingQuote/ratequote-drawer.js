import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { Checkbox, Container, Divider, FormControl, FormControlLabel, Grid, MenuItem, Select, Skeleton, Slider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import logoUPS from './Assets/upslogo.png';
import logoFED from './Assets/fedlogo.png';
import { rateListFEDEXP, rateListUPS, requestAccessToken_FEDEXP } from '../../../../utils/API_HELPERS';
import { payload_Rates_Handler } from '../../../../utils/Helper';
import { FEDEX_Service_Types, UPS_Service_Types } from '../../../../utils/DATA_Helper';

export default function RateQuoteDrawer({ toggleDrawerRate, drawerstateRate, saleOrderDetails }) {

    const [slider, setSlider] = React.useState([0, 2000]);
    const [rateListData, setRateListData] = React.useState({
        loading: "idle",
        list: [],
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
        list: [],
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
                        list: response.message,
                        error: false
                    })

                } else if ((response.name) && counter < 5) {
                    counter++;
                    recursiveCallerRates(action, counter)
                } else if (("error" in response || response.error) && counter >= 5) {
                    setRateListData({
                        loading: "responded",
                        list: [],
                        error: response.message
                    })
                } else {
                    setRateListData({
                        loading: "responded",
                        list: [],
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
            requestAccessToken_FEDEXP().then(token => {
                recursiveCallerRates(rateListFEDEXP({
                    token: token,
                    body: payload_Rates_Handler(saleOrderDetails, serviceType.value ? serviceType : { label: 'Standard Overnight', value: 'STANDARD_OVERNIGHT' }),
                    toastPermission: true,
                    details: serviceType
                }))
            })

        } else if (condition && saleOrderDetails?.shippingAgentCode === "UPS") {
            loadingFunction();
            recursiveCallerRates(rateListUPS({
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
                list: []
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
                list: []
            })
        } else if (saleOrderDetails?.shippingAgentCode === "UPS") {
            const daaa = UPS_Service_Types.filter(opt => opt.value === event.target.value)
            setServiceType(daaa[0]);
            setRateListData({
                loading: "idle",
                list: []
            })
        } else if (saleOrderDetails?.shippingAgentCode === "STAMPS") {
            const daaa = UPS_Service_Types.filter(opt => opt.value === event.target.value)
            setServiceType(daaa[0]);
            setRateListData({
                loading: "idle",
                list: []
            })
        } else {
            const daaa = UPS_Service_Types.filter(opt => opt.value === event.target.value)
            setServiceType(daaa[0]);
            setRateListData({
                loading: "idle",
                list: []
            })
        }
    }

    // handleClickProduct
    const handleClickProduct = (item) => {
        console.log('handleClickProduct', item);
    }



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
                        sx={{ width: 500, minHeight: "100vh", padding: "20px 15px 0px 15px", background: "#E9EDF1" }}
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
                                        {/* <Box sx={{ width: "100%", color: "#000000" }}>
                                            <Typography sx={{ fontSize: '13px' }}>ETA: {`${slider.first[0]}-${slider.first[1]}`} Days</Typography>
                                            <Slider
                                                sx={{ marginLeft: "5px" }}
                                                getAriaLabel={() => 'Price Range'}
                                                value={slider.first}
                                                onChange={handleChange}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={value => `${value}`}
                                                size='small'
                                                name='first'
                                            />
                                        </Box> */}
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
                                <Grid item xs={12}>
                                    <Divider > Rates </Divider>
                                </Grid>
                                {/* right section */}
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

                                    {
                                        rateListData.loading === "responded" &&
                                        (rateListData?.list)?.length > 0 &&
                                        (rateListData?.list.filter(item => {
                                            return item.rate >= slider[0] && item.rate <= slider[1];
                                        }))?.map((item, indx, self) => {
                                            // (rateListData?.list)?.map((item, indx, self) => {
                                            return (
                                                <>
                                                    <Box sx={{
                                                        borderTop: "1px solid #AFB2B5", borderBottom: indx === self.length - 1 ? "1px solid #AFB2B5" : "none", padding: "8px 0px 6px 0px", "&:hover": {
                                                            backgroundColor: 'white'
                                                        }
                                                    }}>
                                                        <Grid container justifyContent={"space-between"} alignItems={"center"}>
                                                            <Grid item xs={2}>
                                                                <Stack direction={"row"} alignItems={"center"}>
                                                                    <Box>
                                                                        {
                                                                            !(saleOrderDetails?.shippingAgentCode) === "UPS" ?
                                                                                <img alt=" " src={logoUPS} style={{ width: "50px" }} />
                                                                                :
                                                                                <img alt=" " src={logoFED} style={{ width: "50px" }} />
                                                                        }
                                                                    </Box>
                                                                    {/* <Typography sx={{ fontSize: '14px' }}>{item.serviceName}</Typography> */}
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={10}>
                                                                <Stack direction={"row"} alignItems={"center"} justifyContent={"flex-end"}>
                                                                    <Typography sx={{ marginRight: "5px", fontSize: '11px' }}>
                                                                        {item.serviceName} / {item.netWeight} {item.unit}
                                                                    </Typography>
                                                                    <Box >
                                                                        <Button
                                                                            onClick={() => handleClickProduct(item)}
                                                                            size='small' sx={{
                                                                                background: "dodgerBlue", color: "white", "&:hover": {
                                                                                    backgroundColor: 'dodgerBlue'
                                                                                }
                                                                            }}>{item.rate} {item.currency}</Button>
                                                                    </Box>

                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </>
                                            )
                                        })
                                    }

                                    {
                                        rateListData.loading === "responded" && (rateListData.error) &&
                                        <Box textAlign={'center'} >
                                            {rateListData.error}
                                        </Box>
                                    }
                                    {
                                        rateListData.loading === "responded" && (rateListData.list.length === 0) &&
                                        <Box textAlign={'center'} >
                                            No Rates Are Found
                                        </Box>
                                    }


                                </Grid>
                            </Grid>
                        </Container>

                    </Box>
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}