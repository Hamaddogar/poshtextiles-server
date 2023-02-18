import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { Container, Grid, Slider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import logo from './Assets/upslogo.png'

function valuetext(value) {
    return `${value}`;
}
function valuetext2(value) {
    return `${value}`;
}

export default function RateQuoteDrawer() {
    const [drawerstate, setDrawerState] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { return; }
        setDrawerState(open);
    };

    // List Data For Drawer

    const listData = [{
        img: logo,
        company: "UPS",
        time: "2 Days",
        value: 8
    }, {
        img: logo,
        company: "UPS",
        time: "8 Days",
        value: 28
    }, {
        img: logo,
        company: "UPS",
        time: "6 Days",
        value: 84
    }, {
        img: logo,
        company: "UPS",
        time: "12 Days",
        value: 9.0
    }, {
        img: logo,
        company: "UPS",
        time: "47 Days",
        value: 2.0
    }, {
        img: logo,
        company: "UPS",
        time: "2 Days",
        value: 8
    }]

    // Range Slider Data
    const [value, setValue] = React.useState([0, 100]);
    const [value2, setValue2] = React.useState([0, 100]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
    };

    return (
        <div>
            <React.Fragment >
                <Button style={{ background: "#4B5AD8", marginTop: "15px", padding: "2px 6px", color: "white" }} onClick={toggleDrawer(true)}>RATE QUOTE</Button>
                <SwipeableDrawer
                    anchor={"left"}
                    open={drawerstate}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
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
                                            <option label="Price">Roll- 4" x 6" Shipping label</option>
                                            <option label="roll2">Roll- 4" x 6" Shipping label</option>
                                            <option label="roll3">Roll- 4" x 6" Shipping label</option>
                                            <option label="roll4">Roll- 4" x 6" Shipping label</option>
                                        </select>
                                    </Box>
                                    <Box sx={{ marginTop: "20px" }}>
                                        Carriers
                                        <Stack>
                                            <Box>
                                                <input type={"checkbox"} />&nbsp;&nbsp;USPS
                                            </Box>
                                            <Box>
                                                <input type={"checkbox"} />&nbsp;&nbsp;UPS
                                            </Box>
                                            <Box>
                                                <input type={"checkbox"} />&nbsp;&nbsp;FEDEX
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
                                        listData.map((item, indx, self) => {
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
                                                                        <img alt=" " src={item.img} style={{ width: "50px" }} />
                                                                    </Box>
                                                                    <Typography sx={{fontSize:'14px'}}>{item.company}</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Stack direction={"row"} alignItems={"center"} justifyContent={"flex-end"}>
                                                                    <Typography sx={{ marginRight: "5px",fontSize:'14px' }}>
                                                                        {item.time}
                                                                    </Typography>
                                                                    <Box >
                                                                        <Button size='small' sx={{
                                                                            background: "dodgerBlue", color: "white", "&:hover": {
                                                                                backgroundColor: 'dodgerBlue'
                                                                            }
                                                                        }}>${item.value}</Button>
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