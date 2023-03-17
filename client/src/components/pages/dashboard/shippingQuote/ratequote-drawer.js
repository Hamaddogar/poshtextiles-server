import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { Checkbox, Container, FormControlLabel, Grid, Skeleton, Slider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import logoUPS from './Assets/upslogo.png';
import logoFED from './Assets/fedlogo.png';
import { useSelector } from 'react-redux';

function valuetext(value) {
    return `${value}`;
}
function valuetext2(value) {
    return `${value}`;
}

export default function RateQuoteDrawer({ toggleDrawerRate, drawerstateRate, service }) {


    const { loadingRateList, UPSList, FEDEXPList } = useSelector(store => store.mainReducer);
    const [rows, setRows] = React.useState([])
    const [value, setValue] = React.useState([0, 100]);
    const [value2, setValue2] = React.useState([0, 100]);



    React.useEffect(() => {
        if (service === "UPS" && UPSList?.length) setRows(UPSList)
        else if (service === "FEDEXP" && FEDEXPList?.length) setRows(FEDEXPList)
        //eslint-disable-next-line
    }, [UPSList, FEDEXPList])

    console.log('row', rows);

    // Range Slider Data


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
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
                                                        <Checkbox size='small' checked={service === "FEDEXP"} />
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
                                            <Typography>ETA: 1-5 Days</Typography>
                                            <Slider
                                                sx={{ marginLeft: "5px" }}
                                                getAriaLabel={() => 'Price Range'}
                                                value={value}
                                                onChange={handleChange}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={valuetext}
                                            />
                                        </Box>
                                        <Box sx={{ width: "100%", color: "#000000" }}>
                                            <Typography>Price: $5-$99 </Typography>
                                            <Slider
                                                sx={{ marginLeft: "5px" }}
                                                getAriaLabel={() => 'Price Range2'}
                                                value={value2}
                                                onChange={handleChange2}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={valuetext2}
                                            />
                                        </Box>
                                    </Box>

                                </Grid>

                                {/* right section */}
                                <Grid item xs={12} md={7} >
                                    {
                                        loadingRateList && <Box>
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
                                        !loadingRateList && rows.map((item, indx, self) => {
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
                                                                    <Typography sx={{ fontSize: '14px' }}>{item.serviceName}</Typography>
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




                                </Grid>
                            </Grid>
                        </Container>

                    </Box>
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}