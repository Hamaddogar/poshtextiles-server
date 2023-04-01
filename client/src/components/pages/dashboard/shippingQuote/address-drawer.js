import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, TextField, Typography } from '@mui/material';
import { headInputStyle } from '../reUseAbles/ReuseAbles';
import { Container } from '@mui/system';
import { request_AccessToken_FEDEXP, validate_Address_FEDEX, validate_Address_UPS } from '../../../../utils/API_HELPERS';
// import { validateAddressFEDEXP, validateAddressUPS } from '../../../../RTK/Reducers/Reducers';
import { toast } from 'react-toastify';
import { payload_Address_Handler } from '../../../../utils/Helper';

export default function AddressValidateDrawer({
    toggleDrawer, drawerStateAddress,
    setAllowShipment,
    saleOrderDetails
}) {

    const [loading, setLoading] = React.useState({ loading: "idle", valid: false })

    const recursiveCaller = (func, counter = 0) => {
        // calling api
        func.then(response => {
            if (("error" in response) && !(response.error) && response.valid) {
                toast.dismiss();
                setAllowShipment(true);
                setLoading({ loading: "reponded", valid: true })
            }
            else if ((response.name) && counter < 5) {
                counter++;
                recursiveCaller(func, counter);
            } else if (("error" in response || response.error) && counter >= 5) {
                toast.dismiss();
                setLoading({ loading: "reponded", valid: false })
                toast.error(`${response.message}`, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
            } else {
                toast.dismiss();
                setLoading({ loading: "idle", valid: false })
                toast.error(`${response.message}`, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
            }
        })
    };



    const handleSubmit = () => {

        if (saleOrderDetails.edcWhseShipments.length > 0) {
            if (saleOrderDetails?.shippingAgentCode === "FEDEX") {
                setLoading({ loading: "loading", valid: false })
                toast.loading('Validating Address...', {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: true
                });
                request_AccessToken_FEDEXP().then(token => {
                    console.log('--------token', token);
                    recursiveCaller(validate_Address_FEDEX(token, payload_Address_Handler(saleOrderDetails)));
                })
            } else if (saleOrderDetails?.shippingAgentCode === "UPS") {
                setLoading({ loading: "loading", valid: false })
                toast.loading('Validating Address...', {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: true
                });
                recursiveCaller(validate_Address_UPS(payload_Address_Handler(saleOrderDetails)));
            } else if (saleOrderDetails?.shippingAgentCode === "STAMPS") {
                toast.warn(`${"working on STAMPS"}`, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
            } else {
                toast.warn(`No courier isattached`, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
            }
        } else {
            drawerStateAddress && toast.error('No Shipment Details Found ...', { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }

    };

    return (
        <div>
            <React.Fragment>

                <SwipeableDrawer
                    anchor={"left"}
                    open={drawerStateAddress}
                    onClose={loading.loading === "loading" ? () => { } : toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    <Box
                        sx={{ width: 500, height: "100vh", padding: "10px 20px 0px 30px", background: "#E9EDF1" }}
                        role="presentation"
                    >
                        <Container>
                            <Typography >* Represents fields Required</Typography>

                            <Grid container spacing={3} >
                                {/* left side */}
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>Company Name<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField required name='companyName' sx={headInputStyle} fullWidth value={saleOrderDetails?.edcCustomers[0]?.name} size='small' />
                                    </Box>

                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>Address Line 2<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField name="address2" sx={headInputStyle} fullWidth value={saleOrderDetails?.edcCustomers[0]?.address2} size='small' />
                                    </Box>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>City<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField required name="city" sx={headInputStyle} fullWidth value={saleOrderDetails?.edcCustomers[0]?.city} size='small' />
                                    </Box>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>Country<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField required name="country" sx={headInputStyle} fullWidth value={saleOrderDetails?.edcCustomers[0]?.county} size='small' />
                                    </Box>
                                </Grid>

                                {/* right side */}
                                <Grid item xs={12} md={6} >

                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>Address Line 1<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField required name='address1' sx={headInputStyle} fullWidth value={saleOrderDetails?.edcCustomers[0]?.address} size='small' />
                                    </Box>

                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>State<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField required name='state' sx={headInputStyle} fullWidth value={saleOrderDetails?.edcCustomers[0]?.county} size='small' />
                                    </Box>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>Postal Code<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField required name='postalCode' sx={headInputStyle} fullWidth value={saleOrderDetails?.edcCustomers[0]?.postCode} size='small' />
                                    </Box>

                                </Grid>

                                <Grid xs={12} textAlign='right'>
                                    <LoadingButton
                                        sx={{ marginTop: "15px", fontSize: '14px' }}
                                        loading={loading.loading === "loading"}
                                        color={loading.valid ? "success" : loading.loading === "responded" ? "error" : 'primary'}
                                        loadingPosition="start"
                                        variant="contained"
                                        onClick={() => loading.valid ? () => { } : handleSubmit()}
                                    >
                                        {loading.valid ? "Addess is Valid - Move to Shipment" : loading.loading === "responded" ? "Try Again to Validate" : "Validate Now"}
                                    </LoadingButton>
                                </Grid>

                            </Grid>
                        </Container>
                    </Box>
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}