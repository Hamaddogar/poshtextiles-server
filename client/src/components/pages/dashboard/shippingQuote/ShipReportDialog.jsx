import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import File from "../../../assets/icons/file.svg";
import ProgressIndicator from '../reUseAbles/ProgressIndicator';

export default function ShipReportDialog({ shipReport, SetShipReport, numbers }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const ShipReportDialogClose = () => {
        SetShipReport({
            open: false
        });
    };

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
                                                    <ProgressIndicator interval={numbers > 10 ? 2000 : 800} />
                                                </Box>
                                            </Grid>
                                    }
                                </>
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {shipReport.response && !shipReport.error && <>
                        <Button color='error' variant='contained'
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
                            <Button color='success' variant='contained'>Download PDF</Button>
                        </a>
                    </>}
                    {shipReport.error && <Button color='error' variant='contained'
                        onClick={ShipReportDialogClose}
                    >Close</Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}
