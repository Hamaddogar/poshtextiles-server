import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Grid, TextField } from '@mui/material';
import { Stack } from '@mui/system';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#E9EDF1',
    boxShadow: 24,
};
const styleSlect = {
    width: '100%',
    fontSize: '12px',
    fontWeight: 800,
    // color: "white",
    '.MuiOutlinedInput-notchedOutline': {
        // borderColor: 'rgba(228, 219, 233, 0.25)',
        border: 'none'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        // borderColor: 'rgba(228, 219, 233, 0.25)',
        border: 'none'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        // borderColor: 'rgba(228, 219, 233, 0.25)',
        border: 'none'
    },
    '.MuiSvgIcon-root ': {
        // fill: "white !important",
    },
}
const subHeadInputStyle = { ...styleSlect, backgroundColor: 'white', minWidth: '10rem', borderRadius: '4px', '&.MuiOutlinedInput-input': { padding: '0px' }, 'input': { padding: '0px 5px', fontWeight: 500 } }


export default function ShipToDialoge({ shipToDia, setshipToDia, customer }) {


    return (
        <div>
            <Modal
                open={shipToDia}
                sx={{ display: 'flex', alignItems: 'center' }}
                onClose={() => setshipToDia(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, maxWidth: "400px", width: "100%", padding: "8px 14px", maxHeight: '95vh', overflowY: 'auto' }}>

                    <Box mt={1}>
                        <Stack direction={"row"} spacing={1} justifyContent={'space-around'}>
                            <Button sx={{ padding: "12px 30px", background: "#495BD6", color: "black" }}>Customer</Button>
                            {/* <Button sx={{ padding: "12px 30px", background: "#E0E0E0", color: "#9D9D9D" }}>Customer</Button> */}
                        </Stack>
                    </Box>

                    <Box mt={2}>
                            <label>Customer:</label><br />
                            <TextField name='customer' placeholder="Customer" defaultValue={customer.name} sx={subHeadInputStyle} />

                    </Box>
                    <Box mt={1}>
                            <label>ShipTo:</label><br />
                            <TextField name='shipTooo' placeholder="0000000" defaultValue={customer.name} sx={subHeadInputStyle} />
                    </Box>

                    <Box mt={1}>
                        <label>Contact:</label><br />
                        <TextField placeholder="0000000" defaultValue={customer.contact} sx={subHeadInputStyle} />
                    </Box>
                    <Box mt={1}>
                        <label>Address line 1:</label><br />
                        <TextField placeholder="Street 45" defaultValue={customer.address} sx={subHeadInputStyle} />
                    </Box>
                    <Box mt={1}>
                        <label>Address line 2:(Optional)</label><br />
                        <TextField placeholder="house etc." defaultValue={customer.address2} sx={subHeadInputStyle} />
                    </Box>
                    <Grid container spacing={2} justifyContent={"space-between"}>
                        <Grid mt={0.5} item xs={12} md={6}>
                            <label>City:</label><br />
                            <TextField placeholder="Berlin" defaultValue={customer.city} sx={subHeadInputStyle} />
                        </Grid>
                        <Grid mt={0.5} item xs={12} md={6}>
                            <label>State:</label><br />
                            <TextField placeholder="Uter Pardesh" defaultValue={customer.county} sx={subHeadInputStyle} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <label>Zip:</label><br />
                            <TextField placeholder="493AG45" defaultValue={customer.postCode} sx={subHeadInputStyle} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <label>Country:</label><br />
                            <TextField placeholder="America" defaultValue={customer.countryRegionCode} sx={subHeadInputStyle} />
                        </Grid>
                    </Grid>
                    <Box mt={1}>
                        <label>Phone Number:</label><br />
                        <TextField placeholder="0000000" defaultValue={customer.phoneNo} sx={subHeadInputStyle} />
                    </Box>
                    <Box mt={1}>
                        <label>Email Address:</label><br />
                        <TextField type={"email"} placeholder="xyz@gmail.com" defaultValue={customer.eMail} sx={subHeadInputStyle} />
                    </Box>
                    <Stack justifyContent={"space-between"} mt={2} direction={"row"}>
                        <Button onClick={() => setshipToDia(false)} sx={{
                            background: "red", color: "white", padding: "0px 6px", '&:hover': {
                                background: "red",
                                color: "white"
                            }
                        }}>Cancel</Button>
                        <Button onClick={() => setshipToDia(false)} sx={{
                            background: "dodgerBlue", color: "white", padding: "0px 6px", '&:hover': {
                                background: "dodgerBlue",
                                color: "white"
                            }
                        }}>
                            OK
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}
