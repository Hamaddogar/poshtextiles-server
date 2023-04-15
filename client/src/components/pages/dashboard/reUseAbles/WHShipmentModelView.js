import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { check_Pick_Details, create_New_Shipment, request_AccessToken_MICROSOFT, request_New_Pick } from '../../../../utils/API_HELPERS';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import { saleOrderNoFilter, successPickDetails } from '../../../../RTK/Reducers/Reducers';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Send } from '@mui/icons-material';

const WHShipmentModelView = ({ openCreateWHShip, setOpenCreateWHShip, SNO }) => {

    const dispatch = useDispatch();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [response, setResponse] = React.useState(null);
    const [responsePick, setResponsePick] = React.useState(null);
    const [responsePickWH, setResponsePickWH] = React.useState(null);
    const [pickPageSender, setpickPageSender] = React.useState(false)
    const [microSoftToken, setMicroSoftToken] = React.useState(null)


    const handleClose = () => {
        setOpenCreateWHShip(false);
        setResponse(null);
        setResponsePick(null);
        setResponsePickWH(null);
        setMicroSoftToken(null);
    };

    React.useLayoutEffect(() => {
        if (openCreateWHShip) {
            request_AccessToken_MICROSOFT()
                .then(decide => {
                    if (decide.success) {
                        setMicroSoftToken(decide.token)
                    }
                })
        }
    }, [SNO, openCreateWHShip])

    React.useEffect(() => {
        const body = {
            "orderNo": SNO,
            "createWarehouseShipment": true
        }
        if (openCreateWHShip && microSoftToken) {
            create_New_Shipment(microSoftToken, body)
                .then(response => {
                    console.log("---------", response);
                    const codeCheck = /SH\d{6}/;
                    if ("responseMsg" in response?.creation && (response.creation.responseMsg.match(codeCheck))) {
                        const code = response.creation.responseMsg.match(/SH\d+/)[0];
                        setResponse({
                            error: false,
                            code: code,
                            message: response.creation.responseMsg
                        })
                        if (response.creation.responseMsg.includes("was already created.")) {
                            handlePickDetailsStatus(code);
                            handleRequestPick(code);
                        }
                    } else {
                        setResponse({
                            error: true,
                            message: response.creation.responseMsg
                        })

                    }
                })
        }

        //eslint-disable-next-line
    }, [SNO, openCreateWHShip, microSoftToken])

    // handleNextAction
    const handlePickDetailsStatus = (code) => {
        setResponsePick("loading")
        check_Pick_Details(microSoftToken, code || response.code)
            .then(response => {
                if (response?.pickDetails?.value?.length === 0) {
                    setResponsePick({
                        error: false,
                        data: response?.pickDetails?.value,
                        reqPick: true
                    })
                } else {
                    setResponsePick({
                        error: false,
                        data: response?.pickDetails?.value,
                        reqPick: false
                    })
                }

            })
    }


    const alreadyConditionCheck = (response) => !(response?.message?.includes("was already created."))

    // handleRequestPick
    const handleRequestPick = (code) => {
        setResponsePickWH("loading")
        request_New_Pick(microSoftToken, { "whseShipNo": code || response.code })
            .then(response => {
                setResponsePickWH(response?.requested)
                console.log("<<<<<<<<handleRequestPick>>>>>>>>>>", response);
                dispatch(saleOrderNoFilter({
                    token: microSoftToken,
                    toastPermission: false
                }));
            })
    }


    const handleSuccessPickDetail = (code) => {
        dispatch(successPickDetails({ token: microSoftToken, pickCode: code || response.code }))
            .then(res => {
                console.log("<<<<<<<<<<<<<handleSuccessPickDetail>>>>>>>>>>>>", res.payload);
                if (res?.payload?.NOC?.value?.length > 0) {
                    setpickPageSender(true)
                }
            })
    }


    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={openCreateWHShip}
                // onClose={handleClose}
                aria-labelledby="WHSHIPMENT-title"
            >
                <DialogTitle sx={{ fontSize: '16px' }} id="WHSHIPMENT-title">
                    {
                        !response ?
                            "Loading WhareHouse Details..."
                            :
                            "Your Response is Loaded..."
                    }
                    <Typography sx={{ float: 'right', clear: 'both', fontSize: '13px' }}>Order No : {SNO}</Typography>
                </DialogTitle>


                <DialogContent sx={{ textAlign: 'center', justifyContent: 'center' }}>
                    {!response && <CircularProgress />}
                    {!response?.error && <Typography>{response?.message}</Typography>}
                    {response?.error && <Typography sx={{ color: "#CB0087" }}>{response?.message}</Typography>}
                    <Divider sx={{ borderColor: '#1E1E1E' }} />
                    {responsePick === "loading" && <CircularProgress />}
                    {!(responsePick?.reqPick) && responsePick !== null && responsePick !== "loading" &&
                        <Box>
                            <Typography textAlign={'left'} sx={{ color: '#2E7D32' }}>Picking Details are below</Typography>
                            <Typography>Record Found : {responsePick?.data?.length}</Typography>
                            <Button variant='contained' size='small' onClick={e => handleSuccessPickDetail()} autoFocus>
                                Get Pick Details
                            </Button>
                        </Box>}

                    {alreadyConditionCheck(response) && responsePick?.reqPick && responsePick !== null && responsePick !== "loading" &&
                        <Box>
                            <Typography textAlign={'left'} sx={{ color: '#2E7D32' }}>Picking Details Status is below</Typography>
                            <Typography>Record Found : 0 </Typography>
                            <Typography>Order is Ready to Pick</Typography>
                        </Box>
                    }

                    <Divider sx={{ borderColor: '#1E1E1E' }} />
                    {responsePickWH === "loading" && <CircularProgress />}

                    {responsePickWH?.responseMsg &&
                        <Box>
                            <Typography textAlign={'left'} sx={{ color: '#1976D2' }}>Request to Pick Response is below</Typography>
                            <Typography textAlign='left'>whseShipNo : {responsePickWH?.whseShipNo} </Typography>
                            <Typography>{responsePickWH?.responseMsg} </Typography>
                        </Box>}
                    <Divider sx={{ borderColor: '#1E1E1E' }} />
                    {pickPageSender && <Box>
                        <Typography textAlign={'left'} sx={{ color: '#9C27B0' }}>Now You Can Visit Picking Section</Typography>

                        <Link to='/picking'>
                            <Button variant='contained' color='secondary' size='small' endIcon={<Send />} autoFocus>
                                Move to picking
                            </Button>
                        </Link>
                    </Box>}

                </DialogContent>


                <DialogActions>
                    <Button color='error' variant='contained' size='small' autoFocus onClick={handleClose}>
                        Close
                    </Button>
                    <Button color='success' variant='contained' size='small' disabled={response?.code && alreadyConditionCheck(response) ? false : true} onClick={e => handlePickDetailsStatus()} autoFocus>
                        Check Pick Status
                    </Button>
                    <Button variant='contained' size='small' disabled={responsePick?.reqPick && alreadyConditionCheck(response) ? false : true} onClick={e => handleRequestPick()} autoFocus>
                        Request Pick
                    </Button>
                    <Button variant='contained' disabled={(responsePickWH === "loading" || responsePickWH === null || responsePickWH?.responseMsg === "Nothing to handle. .") || !alreadyConditionCheck(response) ? true : false} size='small' onClick={e => handleSuccessPickDetail()} autoFocus>
                        Get Pick Details
                    </Button>


                </DialogActions>
            </Dialog>
        </div >
    );
}

export default WHShipmentModelView;