import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Button, Divider, Grid, Stack } from '@mui/material';
import { getPacking, request_AccessToken_MICROSOFT } from '../../../../utils/API_HELPERS';
import { useDispatch, useSelector } from 'react-redux';
import PreLoader from '../../HOC/Loading';
import { useNavigate } from 'react-router-dom';
import { Toaster } from '../reUseAbles/Toasters';
import { PACKING_BOXES_PREVIEW_FUN } from '../../../../RTK/Reducers/Reducers';
import SwipeableTextMobileStepper from './SwipeableTextMobileStepper';


const PackingDrawer = ({ toggleDrawer, packingSideBar, handleShippingQuote }) => {


    const { PACKING_DETAILS,PACKING_BOXES_PREVIEW } = useSelector(store => store.mainReducer);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState({ loading: true, valid: false })
    const navigate = useNavigate();

    const handlePakingPreview = () => navigate('/packing-preview');

    React.useLayoutEffect(() => {
        setLoading(pv => ({ ...pv, loading: true }));
        if (packingSideBar && PACKING_DETAILS.pkNo) {
            dispatch(PACKING_BOXES_PREVIEW_FUN(null));
            request_AccessToken_MICROSOFT()
                .then(decide => {
                    if (decide.success) {
                        getPacking({ token: decide.token, code: PACKING_DETAILS.pkNo })
                            .then(response => {
                                console.log("<<<<<create----------Packing>>>>>>>", response);
                                setLoading(pv => ({ ...pv, loading: false }));
                                // response?.getPacking?.value
                                if ("value" in response?.getPacking) dispatch(PACKING_BOXES_PREVIEW_FUN(response?.getPacking?.value))
                                else Toaster('error', ``)
                            })
                            .catch(error => {
                                console.log("<<<<<", error);
                                setLoading(pv => ({ ...pv, loading: false }));
                            })
                    }
                })
        }
        //eslint-disable-next-line
    }, [packingSideBar])


    return (
        <div>
            <React.Fragment>
                <SwipeableDrawer
                    anchor={"right"}
                    open={packingSideBar}
                >
                    <Box
                        sx={{ width: 500, height: "100vh", padding: "10px 20px 0px 20px", background: "#FFFFFF" }}
                        role="presentation"
                    >
                        <PreLoader loading={loading.loading}>
                            <SwipeableTextMobileStepper >
                                <Grid item xs={12} mt={1} sx={{ textAlign: 'right' }}>
                                    <Divider />
                                    <Stack direction='row' alignItems='center' justifyContent={'space-between'}>
                                        <Button color='error' sx={{ fontSize: '13px', textTransform: 'captalize' }} variant='contained' size='small' onClick={loading.loading ? () => { } : toggleDrawer(false)}>Close</Button>
                                        <Box>
                                            <Button sx={{ fontSize: '13px', textTransform: 'captalize' }} variant='contained' size='small' color='success' onClick={handleShippingQuote}>Move to Shipment </Button> &nbsp;
                                            <Button disabled={PACKING_BOXES_PREVIEW?.length > 0 ? false : true} sx={{ fontSize: '13px', textTransform: 'captalize' }} variant='contained' size='small' onClick={handlePakingPreview}>Preview Box</Button>
                                        </Box>
                                    </Stack>
                                </Grid>
                            </SwipeableTextMobileStepper>
                        </PreLoader>

                    </Box>
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}

export default PackingDrawer;