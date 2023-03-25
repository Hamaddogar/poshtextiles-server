import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { Autocomplete, Checkbox, Container, Divider, FormControlLabel, Grid, Skeleton, Slider, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import logoUPS from './Assets/upslogo.png';
import logoFED from './Assets/fedlogo.png';
import { rateListFEDEXP, rateListUPS, requestAccessToken_FEDEXP } from '../../../../utils/API_HELPERS';
import { payload_Rates_Handler } from '../../../../utils/Helper';
import { FEDEX_Service_Types, UPS_Service_Types } from '../../../../utils/DATA_Helper';

export default function RateQuoteDrawer({ toggleDrawerRate, drawerstateRate, saleOrderDetails }) {

    const [slider, setSlider] = React.useState([0, 1000]);
    const [rateListData, setRateListData] = React.useState({
        loading: "idle",
        list: [],
        copy: [],
        error: false
    });



    const [serviceType, setServiceType] = React.useState(() => {
        if (saleOrderDetails?.shippingAgentCode === "FEDEX") {
            return { initial: { label: 'Standard Overnight', value: 'STANDARD_OVERNIGHT' }, list: FEDEX_Service_Types }
        } else if (saleOrderDetails?.shippingAgentCode === "UPS") {
            return { initial: { value: '03', label: 'UPS Ground' }, list: UPS_Service_Types }
        } else if (saleOrderDetails?.shippingAgentCode === "STAMPS") {
            return { initial: { label: 'Standard Overnight', value: 'STANDARD_OVERNIGHT' }, list: FEDEX_Service_Types }
        }
    })


    const loadingFunction = () => setRateListData({
        loading: "loading",
        list: [],
        copy: [],
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
                        copy: response.message,
                        error: false
                    })

                } else if ((response.name) && counter < 5) {
                    counter++;
                    recursiveCallerRates(action, counter)
                } else if (("error" in response) && counter >= 5) {
                    setRateListData({
                        loading: "responded",
                        list: [],
                        copy: [],
                        error: response.message
                    })
                } else {
                    setRateListData({
                        loading: "idle",
                        list: [],
                        copy: [],
                        error: response.message
                    })
                }
            })
    };
    React.useLayoutEffect(() => {
        const condition = rateListData.loading === "idle" && drawerstateRate;
        // calling apis
        if (condition && saleOrderDetails?.shippingAgentCode === "UPS") {
            loadingFunction();
            recursiveCallerRates(rateListUPS({
                body: payload_Rates_Handler(saleOrderDetails, serviceType.initial.value ? serviceType.initial.value : "03"),
                toastPermission: true
            }))

        } else if (condition && saleOrderDetails?.shippingAgentCode === "FEDEX") {
            loadingFunction();
            requestAccessToken_FEDEXP().then(token => {
                recursiveCallerRates(rateListFEDEXP({
                    token: token,
                    body: payload_Rates_Handler(saleOrderDetails, serviceType.initial.value ? serviceType.initial.value : "STANDARD_OVERNIGHT"),
                    toastPermission: true
                }))
            })

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



    const handleChange = (event, newValue) => {
        setSlider(newValue)
        console.log(newValue, 'newValue');
        const filteredItems = rateListData.copy.filter(item => {
            return item.rate >= newValue[0] && item.rate <= newValue[0];
        });
        console.log(filteredItems, 'filteredItems');
        //   setRateListData({
        //     list: filteredItems,
        //     ...rateListData,
        // })
    };




    const handleChangeServiceType = (event, newValue) => {
        setRateListData({
            loading: "idle",
            list: []
        })
        if (newValue) setServiceType({ initial: newValue, ...serviceType });
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
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={serviceType.list}
                                            value={serviceType.initial}
                                            onChange={handleChangeServiceType}
                                            getOptionLabel={(option) => option.label}
                                            sx={{
                                                width: "100%", fontSize: '13px'
                                            }}
                                            size='small'
                                            renderInput={
                                                (params) => <TextField size='small' {...params}
                                                    sx={{
                                                        fontSize: '10px',
                                                        '& .MuiInputBase-root ': {
                                                            fontSize: '13px',
                                                        }
                                                    }} />
                                            }
                                        />









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
                                                onChange={handleChange}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={value => `${value}`}
                                                size='small'
                                                name="second"
                                                max={1000}
                                                step={100}
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
                                        // (rateListData?.list.filter(item => {
                                        //     return item.rate >= slider[0] && item.rate <= slider[1];
                                        //   }))?.map((item, indx, self) => {
                                        (rateListData?.list)?.map((item, indx, self) => {
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
                                                                        {serviceType?.initial?.label} / {item.netWeight} {item.unit}
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



                                </Grid>
                            </Grid>
                        </Container>

                    </Box>
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}