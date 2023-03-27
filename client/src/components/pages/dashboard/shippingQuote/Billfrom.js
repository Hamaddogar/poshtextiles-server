import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Grid, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { useSelector } from 'react-redux';

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


export default function Billfrom({ billfrom, setbillfrom }) {

    const { saleOrderDetails } = useSelector(store => store.mainReducer);
    const handleClose = () => setbillfrom(false);

    return (
        <div>
            <Modal
                open={billfrom}
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
                        <TextField placeholder="0000000" defaultValue={saleOrderDetails?.sellToContactNo} sx={subHeadInputStyle} />
                    </Box>
                    <Box mt={1}>
                        <label>Address line 1:</label><br />
                        <TextField placeholder="Street 45" defaultValue={saleOrderDetails?.shipToAddress} sx={subHeadInputStyle} />
                    </Box>
                    <Box mt={1}>
                        <label>Address line 2:(Optional)</label><br />
                        <TextField placeholder="house etc." defaultValue={saleOrderDetails?.shipToAddress2} sx={subHeadInputStyle} />
                    </Box>
                    <Grid container spacing={2} justifyContent={"space-between"}>
                        <Grid mt={0.5} item xs={12} md={6}>
                            <label>City:</label><br />
                            <TextField placeholder="Berlin" defaultValue={saleOrderDetails?.shipToCity} sx={subHeadInputStyle} />
                        </Grid>
                        <Grid mt={0.5} item xs={12} md={6}>
                            <label>State:</label><br />
                            <TextField placeholder="Uter Pardesh" defaultValue={saleOrderDetails?.shipToCountryRegionCode} sx={subHeadInputStyle} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <label>Zip:</label><br />
                            <TextField placeholder="493AG45" defaultValue={saleOrderDetails?.shipToPostCode} sx={subHeadInputStyle} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <label>Country:</label><br />
                            <TextField placeholder="America" defaultValue={saleOrderDetails?.shipToCountryRegionCode} sx={subHeadInputStyle} />
                        </Grid>
                    </Grid>
                    <Box mt={1}>
                        <label>Phone Number:</label><br />
                        <TextField placeholder="0000000" defaultValue={saleOrderDetails?.ShipToPhoneNo} sx={subHeadInputStyle} />
                    </Box>
                    <Box mt={1}>
                        <label>Email Address:</label><br />
                        <TextField type={"email"} placeholder="xyz@gmail.com" defaultValue={saleOrderDetails?.sellToEMail} sx={subHeadInputStyle} />
                    </Box>
                    <Stack justifyContent={"space-between"} mt={2} direction={"row"}>
                        <Button onClick={handleClose} sx={{ background: "red", color: "white", padding: "0px 6px", '&:hover': { background: "red", color: "white" } }}>Delete</Button>
                        <Button onClick={handleClose} sx={{ background: "dodgerBlue", color: "white", padding: "0px 6px", '&:hover': { background: "dodgerBlue", color: "white" } }}>Cancel </Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
        // <div>
        //     <Modal
        //         open={billfrom}
        //         onClose={handleClose}
        //         sx={{ overflowY: "scroll" }}
        //         aria-labelledby="modal-modal-title"
        //         aria-describedby="modal-modal-description"
        //     >
        //         <Box sx={{ ...style, maxWidth: "350px", width: "100%", padding: "8px 14px" }}>
        //             <Box>
        //                 <label>Name:</label><br />
        //                 <select id="Posh Textile, Inc." style={{ border: "0px", background: "white", width: "100%", marginTop: "4px" }}>
        //                     <option label="Posh Textile, Inc."></option>
        //                     <option label="roll2"></option>
        //                     <option label="roll3"></option>
        //                     <option label="roll4"></option>
        //                 </select>
        //             </Box>
        //             <Box mt={2}>
        //                 <label>Address line 1:</label><br />
        //                 <TextField placeholder="Street 45" sx={subHeadInputStyle} />
        //             </Box>
        //             <Box mt={2}>
        //                 <label>Address line 2:(Optional)</label><br />
        //                 <TextField placeholder="house etc." sx={subHeadInputStyle} />
        //             </Box>
        //             <Grid container spacing={2} justifyContent={"space-between"}>
        //                 <Grid mt={1} item xs={12} md={6}>
        //                     <label>City:</label><br />
        //                     <TextField placeholder="Berlin" sx={subHeadInputStyle} />
        //                 </Grid>
        //                 <Grid mt={1} item xs={12} md={6}>
        //                     <label>State:</label><br />
        //                     <TextField placeholder="Uter Pardesh" sx={subHeadInputStyle} />
        //                 </Grid>
        //                 <Grid item xs={6}>
        //                     <label>Zip:</label><br />
        //                     <TextField placeholder="493AG45" sx={subHeadInputStyle} />
        //                 </Grid>
        //             </Grid>
        //             <Box mt={2}>
        //                 <label>Phone Number:</label><br />
        //                 <TextField placeholder="0000000" sx={subHeadInputStyle} />
        //             </Box>
        //             <Box mt={2}>
        //                 <label>Email Address:</label><br />
        //                 <TextField type={"email"} placeholder="xyz@gmail.com" sx={subHeadInputStyle} />
        //             </Box>
        //             <Stack justifyContent={"space-between"} mt={2} direction={"row"}>
        //                 <Button onClick={() => {
        //                     handleClose()
        //                 }} sx={{
        //                     background: "red", color: "white", padding: "0px 6px", '&:hover': {
        //                         background: "red",
        //                         color: "white"
        //                     }
        //                 }}>Cancel</Button>
        //                 <Button onClick={() => {
        //                     handleClose()
        //                 }} sx={{
        //                     background: "dodgerBlue", color: "white", padding: "0px 6px", '&:hover': {
        //                         background: "dodgerBlue",
        //                         color: "white"
        //                     }
        //                 }}>
        //                     OK
        //                 </Button>
        //             </Stack>
        //         </Box>
        //     </Modal>
        // </div >
    );
}
