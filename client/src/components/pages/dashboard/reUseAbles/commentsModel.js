import * as React from 'react';
import { Dialog, Grid, Typography } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const CommentsModel = ({ commentModel, setCommentModel, commentsData }) => {

    const handleClose = () => {
        setCommentModel(false)
    };

    const handleClick = comment => {
        setCommentModel(false)
    }


    return (
        <div>
            <Dialog
                open={commentModel}
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
                            commentsData.length > 0 &&
                            commentsData.map((comment, indx) => {
                                return <Grid item container xs={12} key={indx}
                                    sx={{ '&:hover': { background: '#E9EDF1', cursor: 'pointer' } }}
                                    onClick={() => handleClick(comment)}
                                >
                                    <Grid item xs={2} sx={{ border: "1px solid #808080", textAlign: "center" }}>
                                        {comment.date}
                                    </Grid>
                                    <Grid item xs={10} sx={{ border: "1px solid #808080", borderLeft: 0, }}>
                                        {comment.comment}
                                    </Grid>
                                </Grid>
                            })
                        }
                        {
                            commentsData.length === 0 &&
                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <Typography >No Comments</Typography>
                            </Grid>
                        }

                    </Grid>
                </DialogContent>
            </Dialog>
        </div >
    );
}

export default CommentsModel;