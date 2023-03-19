import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Dialog, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


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
}, {
    status: "Done",
    data: "Lorem Ipsum Hello etc sit amit"
}, {
    status: "Done",
    data: "Lorem Ipsum Hello etc sit amit"
},
]

export default function CommentsModel({ commentModel, setCommentModel }) {





    const handleClose = () => {
        setCommentModel({
            ...commentModel,
            open: false,
        })
    };

    const handleClick = comment => {
        setCommentModel({
            open: false,
            selected: true,
            comment: comment,
        })
    }


    return (
        <div>
            <Dialog
                open={commentModel.open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}

            >
                <DialogTitle id="scroll-dialog-title">Select Comment</DialogTitle>
                <DialogContent dividers>
                    <Grid container >
                        {
                            Comments.map((obj, indx) => {
                                return <Grid item container xs={12} key={indx}
                                    sx={{ '&:hover': { background: '#E9EDF1', cursor: 'pointer' } }}
                                    onClick={() => handleClick(obj)}
                                >
                                    <Grid item xs={2} sx={{ border: "1px solid #808080", textAlign: "center" }}>
                                        {obj.status}
                                    </Grid>
                                    <Grid item xs={10} sx={{ border: "1px solid #808080", borderLeft: 0, }}>
                                        {obj.data}
                                    </Grid>
                                </Grid>
                            })
                        }

                    </Grid>
                </DialogContent>
            </Dialog>
        </div >
    );
}
