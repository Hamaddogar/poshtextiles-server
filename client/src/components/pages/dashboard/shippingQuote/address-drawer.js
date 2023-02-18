import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { Grid, TextField, Typography } from '@mui/material';
import { headInputStyle } from '../reUseAbles/ReuseAbles';
import { Container } from '@mui/system';

export default function AddressValidateDrawer({ validatedAddress, setValidatedAddress }) {
    const [drawerState, setDrawerState] = React.useState(false);
    //     companyName,
    // addressLine1,
    // addressLine2,
    // state,
    // city,
    // postalCode,

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { return; }
        setDrawerState(open);
    };

    const handleSubmit = event => {
        event.preventDefault();
    }


    return (
        <div>
            <React.Fragment>
                <Button style={{ background: "#4B5AD8", marginTop: "15px", padding: "0px 6px", color: "white" }} onClick={toggleDrawer(true)}>Validate Address</Button>
                <SwipeableDrawer
                    anchor={"left"}
                    open={drawerState}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    <Box
                        sx={{ width: 500, height: "100vh", padding: "10px 20px 0px 30px", background: "#E9EDF1" }}
                        role="presentation"
                    >
                        <Container component='form' onSubmit={handleSubmit}>
                            <Typography >* Represents fields Required</Typography>

                            <Grid container spacing={3} >
                                {/* left side */}
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>Company Name<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField sx={headInputStyle} fullWidth defaultValue={validatedAddress.companyName} size='small' />
                                    </Box>

                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>Address Line 2<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField sx={headInputStyle} fullWidth defaultValue={validatedAddress.addressLine2} size='small' />
                                    </Box>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>City<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField sx={headInputStyle} fullWidth defaultValue={validatedAddress.city} size='small' />
                                    </Box>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>Country<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField sx={headInputStyle} fullWidth defaultValue={validatedAddress.country} size='small' />
                                    </Box>


                                </Grid>

                                {/* right side */}
                                <Grid item xs={12} md={6} >

                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>Address Line 1<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField sx={headInputStyle} fullWidth defaultValue={validatedAddress.addressLine1} size='small' />
                                    </Box>

                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>State<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField sx={headInputStyle} fullWidth defaultValue={validatedAddress.state} size='small' />
                                    </Box>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>Postal Code<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField sx={headInputStyle} fullWidth defaultValue={validatedAddress.postalCode} size='small' />
                                    </Box>

                                </Grid>

                                <Grid xs={12} textAlign='right'>
                                    <Button type='submit' disabled={validatedAddress.addressValidated} variant='contained' sx={{ background: "#A4A4A4", padding: "3px 9px", marginTop: "15px" }}>Validate</Button>
                                </Grid>

                            </Grid>
                        </Container>
                    </Box>
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}