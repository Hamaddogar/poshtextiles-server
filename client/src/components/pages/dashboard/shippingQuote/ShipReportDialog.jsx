import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import File from "../../../assets/icons/file.svg";
import LoadingButton from '@mui/lab/LoadingButton';
import { print_Labels } from '../../../../utils/API_HELPERS';
// import ProgressIndicator from '../reUseAbles/ProgressIndicator';

export default function ShipReportDialog({ shipReport, SetShipReport, numbers }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [printProcess, setprintProcess] = React.useState({
        loading: false,
        message: "",
        error: false
    })
    const ShipReportDialogClose = () => {
        SetShipReport({
            open: false
        });
        setprintProcess({
            loading: false,
            message: "",
            error: false
        })
    };



    const handlePrint = async (data) => {
        setprintProcess({
            loading: true,
            message: "",
            error: false
        })

        print_Labels(data)
            .then(res => {
                if (!(res.data.error)) {
                    setprintProcess({
                        loading: false,
                        message: "",
                        error: false
                    });
                } else {
                    setprintProcess({
                        loading: false,
                        message: res.data.message,
                        error: true
                    });
                }

                // setprintProcess(false)
            })

    }


    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={shipReport.open}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle sx={{ minWidth: '400px' }} id="responsive-dialog-title">
                    {
                        shipReport.error && 'Something went wrong!'
                    }
                    {shipReport.response && !shipReport.error && 'Your Report is Ready.'}
                </DialogTitle>
                <DialogContent>
                    <Grid container alignItems={'center'} >
                        {
                            shipReport.response && !shipReport.error ?
                                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                    <Box component='img' src={File} alt="report file" sx={{ width: '95%', maxWidth: '250px', textAlign: 'center' }} />
                                </Grid>
                                :
                                <>
                                    {
                                        shipReport.error ?
                                            <Typography >{shipReport.error}</Typography>
                                            :
                                            <Grid item xs={12}>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <Box mb={2}> Working in Progrss... </Box>
                                                    <Box> <CircularProgress /></Box>
                                                    {/* <ProgressIndicator interval={numbers > 10 ? 2000 : 800} /> */}
                                                </Box>
                                            </Grid>
                                    }
                                </>
                        }
                    </Grid>
                    <Container>
                        <Typography sx={{ color: '#DE7D69' }}>{printProcess.message ? `Printing Issue : \n ${printProcess.message}`: ""}</Typography>
                    </Container>
                </DialogContent>
                <DialogActions>
                    {shipReport.response && !shipReport.error && <>
                        <Button size='small' color='error' variant='contained'
                            onClick={ShipReportDialogClose}
                        >Close</Button>
                        &nbsp; &nbsp;
                        <a
                            style={{ textDecoration: 'none' }}
                            target={"_blank"}
                            rel="noreferrer"
                            href={shipReport?.response?.data?.file}
                            download="shipment-label.pdf"
                        >
                            <Button size='small' color='success' variant='contained'>Preview</Button>
                        </a>


                        <LoadingButton
                            // sx={{ marginTop: "15px", fontSize: '14px' }}
                            loading={printProcess.loading}
                            color={printProcess.error ? "error" : "success"}
                            disabled={printProcess.loading}
                            loadingPosition="start"
                            variant="contained"
                            size='small'
                            onClick={() => handlePrint(shipReport?.response?.data?.data)}
                        >
                            {printProcess.loading ? "Printing" : "Print Labels"}
                        </LoadingButton>






                    </>}
                    {shipReport.error && <Button color='error' variant='contained'
                        onClick={ShipReportDialogClose}
                    >Close</Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}
