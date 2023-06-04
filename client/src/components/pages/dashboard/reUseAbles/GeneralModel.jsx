import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const GeneralModel = ({ open, setOpen,heading, children }) => {


    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="general-dialog-title"
                aria-describedby="general-dialog-description"
            >
                <DialogTitle id="general-dialog-title">{heading}</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText
                        id="general-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {children}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' size='small' onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default GeneralModel;
