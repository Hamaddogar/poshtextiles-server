import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};

const Comments = [{
    status: "Done",
    data: "Lorem Ipsum Hello etc sit amit"
}, {
    status: "Done",
    data: "Lorem Ipsum Hello etc sit amit"
}, {
    status: "Done",
    data: "Lorem Ipsum Hello etc sit amit"
}, {
    status: "Done",
    data: "Lorem Ipsum Hello etc sit amit"
}, {
    status: "Done",
    data: "Lorem Ipsum Hello etc sit amit"
}, {
    status: "Done",
    data: "Lorem Ipsum Hello etc sit amit"
}, {
    status: "Done",
    data: "Lorem Ipsum Hello etc sit amit"
}, {
    status: "Done",
    data: "Lorem Ipsum Hello etc sit amit"
}, {
    status: "Done",
    data: "Lorem Ipsum Hello etc sit amit"
}, {
    status: "Done",
    data: "Lorem Ipsum Hello etc sit amit"
}, {
    status: "Done",
    data: "Lorem Ipsum Hello etc sit amit"
}, {
    status: "Done",
    data: "Lorem Ipsum Hello etc sit amit"
}, {
    status: "Done",
    data: "Lorem Ipsum Hello etc sit amit"
}, {
    status: "Done",
    data: "Lorem Ipsum Hello etc sit amit"
},]

export default function BasicModal({ Modalopen, setModalopen }) {
    const handleClose = () => setModalopen(false);

    return (
        <div>
            <Modal
                open={Modalopen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, maxWidth: "700px", width: "100%" }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography sx={{ color: "black", textAlign: "center", background: "white", padding: "6px" }}>Header Comments</Typography>
                        </Grid>
                        <Grid item container xs={12}>
                            {
                                Comments.map((obj) => {
                                    return <>
                                        <Grid item xs={2} sx={{ border: "1px solid #808080", textAlign: "center" }}>
                                            {obj.status}
                                        </Grid>
                                        <Grid item xs={10} sx={{ border: "1px solid white", background: "#E9EDF1" }}>
                                            {obj.data}
                                        </Grid>
                                    </>
                                })
                            }
                        </Grid>

                    </Grid>
                </Box>
            </Modal>
        </div >
    );
}
