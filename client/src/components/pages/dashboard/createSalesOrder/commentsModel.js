import * as React from 'react';
import { Dialog, Grid } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';



const Comments = [
    {
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
