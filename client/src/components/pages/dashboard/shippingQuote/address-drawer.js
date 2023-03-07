import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, TextField, Typography } from '@mui/material';
import { headInputStyle } from '../reUseAbles/ReuseAbles';
import { Container } from '@mui/system';
import { requestAccessToken_FEDEXP } from '../../../../utils/FEDEXP_API_HELPERS';
import { validateAddressFEDEXP, validateAddressUPS } from '../../../../RTK/Reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';

export default function AddressValidateDrawer({ toggleDrawer,
    drawerStateAddress, validatedAddress, setAllowShipment }) {

    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.mainReducer)

    const handleSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        const data = new FormData(event.target);


        if (validatedAddress.courier === "FEDEX") {
            const payload = {
                "validateAddressControlParameters": {
                    "includeResolutionTokens": true
                },
                "addressesToValidate": [
                    {
                        "address": {
                            "streetLines": [
                                data.get('address1'),
                                data.get('address2'),
                            ],
                            "city": data.get('city'),
                            "stateOrProvinceCode": data.get('state'),
                            "postalCode": data.get('postalCode'),
                            "countryCode": data.get('country'),
                            "urbanizationCode": "EXT VISTA BELLA",
                            "addressVerificationId": "string"
                        }
                    }
                ]
            }
            requestAccessToken_FEDEXP()
                .then(token => {
                    dispatch(validateAddressFEDEXP({
                        token,
                        body: payload,
                        toastPermission: true
                    })).then(res => {
                        if (res.payload) setAllowShipment(res.payload)
                        else dispatch(validateAddressFEDEXP({
                            token,
                            body: payload,
                            toastPermission: true
                        })).then(res => {
                            if (res.payload) setAllowShipment(res.payload)
                        });
                    })
                })
        } else if (validatedAddress.courier === "UPS") {

            let payload = {
                "AddressKeyFormat": {
                    "ConsigneeName": data.get('companyName'),
                    "AddressLine": [
                        data.get('address1'),
                        data.get('address2'),
                    ],
                    "Region": data.get('state'),
                    "PoliticalDivision1": data.get('state'),
                    "PoliticalDivision2": data.get('city'),
                    "PostcodePrimaryLow": data.get('postalCode').split("-")[0],
                    "PostcodeExtendedLow": data.get('postalCode').split("-")[1],
                    "CountryCode": data.get('country')
                }
            }
            

            dispatch(validateAddressUPS({
                body: payload,
                toastPermission: true
            })).then(res => {
                if (res.payload) setAllowShipment(res.payload)
                else dispatch(validateAddressUPS({
                    body: payload,
                    toastPermission: true
                }))
            })
        };


    };

    return (
        <div>
            <React.Fragment>

                <SwipeableDrawer
                    anchor={"left"}
                    open={drawerStateAddress}
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
                                        <TextField required name='companyName' sx={headInputStyle} fullWidth defaultValue={validatedAddress.companyName} size='small' />
                                    </Box>

                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>Address Line 2<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField name="address2" sx={headInputStyle} fullWidth defaultValue={validatedAddress.addressLine2} size='small' />
                                    </Box>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>City<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField required name="city" sx={headInputStyle} fullWidth defaultValue={validatedAddress.city} size='small' />
                                    </Box>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>Country<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField required name="country" sx={headInputStyle} fullWidth defaultValue={validatedAddress.countryCode} size='small' />
                                    </Box>


                                </Grid>

                                {/* right side */}
                                <Grid item xs={12} md={6} >

                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>Address Line 1<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField required name='address1' sx={headInputStyle} fullWidth defaultValue={validatedAddress.addressLine1} size='small' />
                                    </Box>

                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>State<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField required name='state' sx={headInputStyle} fullWidth defaultValue={validatedAddress.state} size='small' />
                                    </Box>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography sx={{ color: '#6D6D6D', fontSize: '14px' }}>Postal Code<font style={{ color: "red" }}>*</font></Typography>
                                        <TextField required name='postalCode' sx={headInputStyle} fullWidth defaultValue={validatedAddress.postalCode} size='small' />
                                    </Box>

                                </Grid>

                                <Grid xs={12} textAlign='right'>
                                    <LoadingButton
                                        sx={{ marginTop: "15px", fontSize: '14px' }}
                                        loading={loading}
                                        color={validatedAddress.addressValidated ? "success" : 'primary'}
                                        // disabled={validatedAddress.addressValidated}
                                        loadingPosition="start"
                                        variant="outlined"
                                        type='submit'
                                    >
                                        {
                                            validatedAddress.addressValidated ?
                                                "Addess is Valid"
                                                :
                                                "Validate Now"
                                        }
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