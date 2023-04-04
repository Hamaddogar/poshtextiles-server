import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Button, Checkbox, Container, FormControlLabel, Grid, Skeleton, Slider, Stack, Typography } from '@mui/material';
import { rate_List_FEDEX, rate_List_STAMPS, rate_List_UPS, request_AccessToken_FEDEXP, token_STAMPS } from '../../../../utils/API_HELPERS';
import { payload_Rates_Handler } from '../../../../utils/Helper';
import FedexRates from './FedexRates';
import UPSRates from './UPSRates';
import { toast } from 'react-toastify';
import StampsRates from './StampsRates';

export default function RateQuoteDrawer({ toggleDrawerRate, drawerstateRate, saleOrderDetails }) {

    const [slider, setSlider] = React.useState([0, 1500]);
    const [reload, setReload] = React.useState(false);
    const [rateListData, setRateListData] = React.useState({
        loading: "idle",
        allService: [],
        error: false
    });



    const loadingFunction = () => setRateListData({
        loading: "loading",
        allService: [],
        error: false
    });

    // for rate lists recursiveCaller
    const recursiveCallerRates = (action, counter = 0) => {
        // calling function 
        action
            .then(response => {
                console.log("-----rates--------", response);
                if (("error" in response) && !(response.error)) {
                    setRateListData({
                        loading: "responded",
                        allService: response.allServices,
                        error: false
                    })

                } else if ((response.name) && counter < 5) {
                    counter++;
                    recursiveCallerRates(action, counter)
                } else if (("error" in response || response.error) && counter >= 5) {
                    setRateListData({
                        loading: "responded",
                        allService: [],
                        error: response.message
                    })
                } else {
                    setRateListData({
                        loading: "responded",
                        allService: [],
                        error: response.message
                    })
                }
            })
    };
    React.useLayoutEffect(() => {
        const condition = rateListData.loading === "idle" && drawerstateRate;
        // calling apis
        if (saleOrderDetails.edcWhseShipments.length > 0) {
            if (condition && saleOrderDetails?.shippingAgentCode === "FEDEX") {
                loadingFunction();
                request_AccessToken_FEDEXP().then(token => {
                    recursiveCallerRates(rate_List_FEDEX({
                        token: token,
                        body: payload_Rates_Handler(saleOrderDetails),
                        toastPermission: true,
                    }))
                })

            } else if (condition && saleOrderDetails?.shippingAgentCode === "UPS") {
                loadingFunction();
                recursiveCallerRates(rate_List_UPS({
                    body: payload_Rates_Handler(saleOrderDetails),
                    toastPermission: true,
                }))

            } else if (condition && saleOrderDetails?.shippingAgentCode === "STAMPS") {
                loadingFunction();
                token_STAMPS()
                    .then(token => {
                        recursiveCallerRates(rate_List_STAMPS(token, payload_Rates_Handler(saleOrderDetails)))
                    });
            } else if (!drawerstateRate) {
                setRateListData({
                    loading: "idle",
                    allService: [],
                })
            }
        } else {
            drawerstateRate && toast.error('No Shipment Details Found ...', { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }

        //eslint-disable-next-line
    }, [drawerstateRate, reload])


    const handleReload = () => {
        setRateListData({
            loading: "idle",
            allService: [],
        })
        setReload(!reload)
    }




    return (
        <div>
            <React.Fragment >
                <SwipeableDrawer
                    anchor={"left"}
                    open={drawerstateRate}
                    onClose={rateListData.loading === "loading" ? () => { } : toggleDrawerRate(false)}
                    onOpen={toggleDrawerRate(true)}
                >
                    <Box
                        sx={{ width: 500, minHeight: '650px', padding: "20px 15px 0px 15px", background: "#E9EDF1" }}
                        role="presentation"
                    >
                        <Container component='form' sx={{ backgroundColor: '#E9EDF1' }}>
                            <Grid container spacing={3}>

                                {/* left section */}
                                <Grid item xs={12}>
                                    <Stack direction='row' alignItems={'center'} justifyContent={'space-between'}>
                                        <Box sx={{ marginTop: "20px", minWidth: '50%' }}>
                                            Carriers
                                            <Box>
                                                <FormControlLabel
                                                    label={saleOrderDetails?.shippingAgentCode}
                                                    control={
                                                        <Checkbox size='small' checked={true} />
                                                    }
                                                />
                                            </Box>

                                        </Box>
                                        <Button size='small' sx={{ fontSize: '11px' }} variant='contained' color='success' onClick={handleReload}>Reload Rates</Button>
                                    </Stack>

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
                                                max={1500}
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
                                        !(rateListData.loading === "loading") && (saleOrderDetails?.shippingAgentCode === "FEDEX") &&
                                        <FedexRates rateListData={rateListData} slider={slider} />
                                    }

                                    {
                                        !(rateListData.loading === "loading") && (saleOrderDetails?.shippingAgentCode === "UPS") &&
                                        <UPSRates rateListData={rateListData} slider={slider} />
                                    }

                                    {
                                        !(rateListData.loading === "loading") && (saleOrderDetails?.shippingAgentCode === "STAMPS") &&
                                        <StampsRates rateListData={rateListData} slider={slider} />
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