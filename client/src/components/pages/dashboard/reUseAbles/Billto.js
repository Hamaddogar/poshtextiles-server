import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Grid, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { style, subHeadInputStyle } from './ReuseAbles';

export default function Billto({ billto, setbillto, saleOrderDetails }) {
    const handleClose = () => setbillto(false);

    return (
        <div>
            <Modal
                open={billto}
                onClose={handleClose}
                sx={{ display: 'flex', alignItems: 'center' }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, maxWidth: "400px", width: "100%", padding: "8px 14px", maxHeight: '95vh', overflowY: 'auto' }}>
                    <Box>
                        <label>Name:</label><br />
                        <select id="Posh Textile, Inc." style={{ border: "0px", background: "white", width: "100%", marginTop: "4px" }}>
                            <option label={saleOrderDetails.shipToName}></option>
                        </select>
                    </Box>
                    <Box mt={1}>
                        <label>Contact:</label><br />
                        <TextField placeholder="0000000" defaultValue={saleOrderDetails?.sellToContactNo} sx={{ ...subHeadInputStyle, maxWidth: '100%', width: '100%' }} />
                    </Box>
                    <Box mt={1}>
                        <label>Address line 1:</label><br />
                        <TextField placeholder="Street 45" defaultValue={saleOrderDetails?.shipToAddress} sx={{ ...subHeadInputStyle, maxWidth: '100%', width: '100%' }} />
                    </Box>
                    <Box mt={1}>
                        <label>Address line 2:(Optional)</label><br />
                        <TextField placeholder="house etc." defaultValue={saleOrderDetails?.shipToAddress2} sx={{ ...subHeadInputStyle, maxWidth: '100%', width: '100%' }} />
                    </Box>
                    <Grid container spacing={2} justifyContent={"space-between"}>
                        <Grid mt={0.5} item xs={12} md={6}>
                            <label>City:</label><br />
                            <TextField placeholder="Berlin" defaultValue={saleOrderDetails?.shipToCity} sx={{ ...subHeadInputStyle, maxWidth: '100%', width: '100%' }} />
                        </Grid>
                        <Grid mt={0.5} item xs={12} md={6}>
                            <label>State:</label><br />
                            <TextField placeholder="Uter Pardesh" defaultValue={saleOrderDetails?.shipToCountryRegionCode} sx={{ ...subHeadInputStyle, maxWidth: '100%', width: '100%' }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <label>Zip:</label><br />
                            <TextField placeholder="493AG45" defaultValue={saleOrderDetails?.shipToPostCode} sx={{ ...subHeadInputStyle, maxWidth: '100%', width: '100%' }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <label>Country:</label><br />
                            <TextField placeholder="America" defaultValue={saleOrderDetails?.shipToCountryRegionCode} sx={{ ...subHeadInputStyle, maxWidth: '100%', width: '100%' }} />
                        </Grid>
                    </Grid>
                    <Box mt={1}>
                        <label>Phone Number:</label><br />
                        <TextField placeholder="0000000" defaultValue={saleOrderDetails?.ShipToPhoneNo} sx={{ ...subHeadInputStyle, maxWidth: '100%', width: '100%' }} />
                    </Box>
                    <Box mt={1}>
                        <label>Email Address:</label><br />
                        <TextField type={"email"} placeholder="xyz@gmail.com" defaultValue={saleOrderDetails?.sellToEMail} sx={{ ...subHeadInputStyle, maxWidth: '100%', width: '100%' }} />
                    </Box>
                    <Stack justifyContent={"space-between"} mt={2} direction={"row"}>
                        <Button onClick={handleClose} sx={{ background: "red", color: "white", padding: "0px 6px", '&:hover': { background: "red", color: "white" } }}>Delete</Button>
                        <Button onClick={handleClose} sx={{ background: "dodgerBlue", color: "white", padding: "0px 6px", '&:hover': { background: "dodgerBlue", color: "white" } }}>Cancel </Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}
