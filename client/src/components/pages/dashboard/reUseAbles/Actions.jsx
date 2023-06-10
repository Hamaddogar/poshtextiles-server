import { KeyboardArrowDown } from '@mui/icons-material';
import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import React from 'react'
import { handleNoAction } from './ReuseAbles';


const Actions = ({ id, children }) => {
    // Actions UI-Reserved-S
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) anchorRef.current.focus();
        prevOpen.current = open;
    }, [open]);
    const handleToggle = () => setOpen((prevOpen) => !prevOpen);
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) { return; }
        setOpen(false);
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') setOpen(false);
    }
    return (
        <div>
            <Button
                variant='contained'
                sx={{ backgroundColor: '#495BD6' }}
                size='small'
                ref={anchorRef}
                id={id}
                aria-controls={open ? id : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                endIcon={<KeyboardArrowDown />}
            > Actions </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom', }}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id={id}
                                    aria-labelledby={`${id}-button`}
                                    onKeyDown={handleListKeyDown}
                                    sx={{ backgroundColor: '#495BD6', color: 'white' }}
                                    onClick={handleClose}
                                >
                                    {children}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}

export default Actions;
export const ActionMenuItem = ({ label, click = handleNoAction, last = false }) => <MenuItem sx={last ? { fontSize: '13px' } : { borderBottom: '1px solid white', fontSize: '13px' }} onClick={click}>{label}</MenuItem>
