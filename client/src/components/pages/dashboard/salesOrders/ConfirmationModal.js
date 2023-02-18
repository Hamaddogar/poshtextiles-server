import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';

export default function ConDialog({ openConfirmation, setOpenConfirmation, deleteLineItem }) {
    const { status, deleteIndex } = openConfirmation;
    const handleCloseCancel = () => setOpenConfirmation({ status: false, deleteIndex: null });
    const handleCloseAgree = () => {
        deleteLineItem(deleteIndex);
        setOpenConfirmation({ status: false, deleteIndex: null });
    };

    return (
        <div>
            <Dialog
                open={status}
                onClose={handleCloseCancel}
                sx={{ width: "100%" }}
            >
                <Stack sx={{ padding: "20px 14px" }} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <ReportProblemIcon sx={{ color: "red", fontSize: "40px" }} />
                    <Typography sx={{ color: "black", width: "40%" }}>
                        Are you sure you want to delete this item?
                    </Typography>
                    <Button sx={{
                        background: "red", color: "white", padding: "0px 6px", '&:hover': {
                            background: "red",
                            color: "white"
                        }
                    }} onClick={handleCloseAgree}>Delete</Button>
                    <Button sx={{
                        background: "dodgerBlue", color: "white", padding: "0px 6px", '&:hover': {
                            background: "dodgerBlue",
                            color: "white"
                        }
                    }} onClick={handleCloseCancel}>
                        Cancel
                    </Button>
                </Stack>

            </Dialog>
        </div>
    );
}
