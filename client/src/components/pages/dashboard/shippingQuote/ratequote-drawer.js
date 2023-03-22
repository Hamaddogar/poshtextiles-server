import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { Checkbox, Container, FormControlLabel, Grid, Skeleton, Slider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import logoUPS from './Assets/upslogo.png';
import logoFED from './Assets/fedlogo.png';

export default function RateQuoteDrawer({ toggleDrawerRate, drawerstateRate, service, rateListData }) {

    const [rows, setRows] = React.useState([])
    const [slider, setSlider] = React.useState({
        first: [1, 100],
        second: [0, 100],
    });

    React.useEffect(() => {
        setRows(rateListData.list)
        //eslint-disable-next-line
    }, [rateListData.list])

    const handleChange = (event, newValue) => {
        setSlider({
            ...slider,
            [event.target.name]: newValue
        })
    };

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
                        sx={{ width: 500, height: "100vh", padding: "20px 15px 0px 15px", background: "#E9EDF1" }}
                        role="presentation"
                    >
                        <Container component='form'>
                            <Grid container spacing={3}>

                                {/* left section */}
                                <Grid item xs={12} md={5}>
                                    <Box>
                                        <label>Sort By:</label><br />
                                        <select id="roll" style={{ width: "100%", borderRadius: "5px", border: "0px", padding: "0px 8px" }}>
                                            <option label="Price">price</option>
                                        </select>
                                    </Box>
                                    <Box sx={{ marginTop: "20px" }}>
                                        Carriers
                                        <Stack>
                                            <Box>
                                                <FormControlLabel
                                                    label="FEDEXP"
                                                    control={
                                                        <Checkbox size='small' checked={service === "FEDEX"} />
                                                    }
                                                />
                                            </Box>
                                            <Box>
                                                <FormControlLabel
                                                    label="UPS"
                                                    control={
                                                        <Checkbox size='small' checked={service === "UPS"} />
                                                    }
                                                />
                                            </Box>

                                        </Stack>

                                    </Box>
                                    <Box>
                                        <Box sx={{ width: "100%", color: "#000000" }}>
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
                                        </Box>
                                        <Box sx={{ width: "100%", color: "#000000" }}>
                                            <Typography sx={{ fontSize: '13px' }}>Price: {`$${slider.second[0]}-$${slider.second[1]}`} </Typography>
                                            <Slider
                                                sx={{ marginLeft: "5px" }}
                                                getAriaLabel={() => 'Price Range2'}
                                                value={slider.second}
                                                onChange={handleChange}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={value => `${value}`}
                                                size='small'
                                                name="second"
                                            />
                                        </Box>
                                    </Box>

                                </Grid>

                                {/* right section */}
                                <Grid item xs={12} md={7} >
                                    {
                                        rateListData.loading && <Box>
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
                                        !rateListData.loading && rows.length > 0 && rows.map((item, indx, self) => {
                                            return (
                                                <>
                                                    <Box sx={{
                                                        borderTop: "1px solid #AFB2B5", marginTop: "5px", borderBottom: indx === self.length - 1 ? "1px solid #AFB2B5" : "none", padding: "4px 0px", "&:hover": {
                                                            backgroundColor: 'white'
                                                        }
                                                    }}>
                                                        <Grid container justifyContent={"space-between"} alignItems={"center"}>
                                                            <Grid item xs={6}>
                                                                <Stack direction={"row"} alignItems={"center"}>
                                                                    <Box>
                                                                        {
                                                                            !service === "UPS" ?
                                                                                <img alt=" " src={logoUPS} style={{ width: "50px" }} />
                                                                                :
                                                                                <img alt=" " src={logoFED} style={{ width: "50px" }} />
                                                                        }
                                                                    </Box>
                                                                    {/* <Typography sx={{ fontSize: '14px' }}>{item.serviceName}</Typography> */}
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Stack direction={"row"} alignItems={"center"} justifyContent={"flex-end"}>
                                                                    <Typography sx={{ marginRight: "5px", fontSize: '14px' }}>
                                                                        {item.serviceCode}
                                                                    </Typography>
                                                                    <Box >
                                                                        <Button
                                                                            onClick={() => handleClickProduct(item)}
                                                                            size='small' sx={{
                                                                                background: "dodgerBlue", color: "white", "&:hover": {
                                                                                    backgroundColor: 'dodgerBlue'
                                                                                }
                                                                            }}>${item.rate}</Button>
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
                                        !rateListData.loading && rows.length === 0 &&
                                        <Box textAlign={'center'} >
                                            No Date Found
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