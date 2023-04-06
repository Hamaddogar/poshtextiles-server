import { Box, Button, FormControl, Grid, Menu, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { headInputStyle, styleSlect } from '../reUseAbles/ReuseAbles';
import { toast } from 'react-toastify';

const ActionCards = () => {

    const [chargeType, setChargeType] = React.useState("Authorize");
    const [selectCustomer, setSelectCustomer] = React.useState("Poshtextiles");
    const [selectCard, setSelectCard] = React.useState("Master");
    const [amount, setAmount] = React.useState(0);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleChangeCardType = event => {
        setChargeType(event.target.value);
    };


    const handleChangeCustomer = event => {
        setSelectCustomer(event.target.value);
    };

    const handleChangeCard = event => {
        setSelectCard(event.target.value);
    };




    const handleAmount = event => {
        setAmount(event.target.value)
    }


    const handleChargeAmount = () => {
        if (amount > 0) {
            console.log('amount');
            setChargeType("Authorize");
            setSelectCustomer("Poshtextiles");
            setSelectCard("Master");
            setAmount(0);
        } else {
            toast.error(`Enter Some Amount!`, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }
    }



    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                size='small' variant='contained' color='primary' sx={{ minWidth: '121px', fontSize: '12px', textTransform: 'captalize' }}>
                Charge a Card Manually
            </Button>
            {/* Charge a Card Manually CARD SECTIONS */}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {/* onClick={handleClose} */}
                <MenuItem disableRipple sx={{ padding: '0px ' }} >
                    <Grid sx={{maxWidth:'400px', backgroundColor:'#E9EDF1'}} p={3} container alignItems={'center'} justifyContent='space-between' rowGap={1} >
                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: '15px' }}>Charge Type</Typography>
                            <FormControl fullWidth>
                                <Select
                                    labelId="card-select-label"
                                    id="card-select"
                                    value={chargeType}
                                    onChange={handleChangeCardType}
                                    size='small'
                                    sx={{...styleSlect, maxWidth:'100%', backgroundColor:'white', boxShadow:'0px 2px 3px #C6C9CD'}}
                                >
                                    <MenuItem value='Authorize' sx={{ fontSize: '12px' }}>Authorize</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: '15px' }}>Select Customer</Typography>
                            <FormControl fullWidth>
                                <Select
                                    labelId="customer-select-label"
                                    id="customer-select"
                                    value={selectCustomer}
                                    onChange={handleChangeCustomer}
                                    size='small'
                                    sx={{...styleSlect, maxWidth:'100%', backgroundColor:'white', boxShadow:'0px 2px 3px #C6C9CD'}}
                                >
                                    <MenuItem value='Poshtextiles' sx={{ fontSize: '12px' }}>Poshtextiles</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>




                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: '15px' }}>Select Card</Typography>
                            <FormControl fullWidth>
                                <Select
                                    labelId="card-select-label"
                                    id="card-select"
                                    value={selectCard}
                                    onChange={handleChangeCard}
                                    size='small'
                                    sx={{...styleSlect, maxWidth:'100%', backgroundColor:'white', boxShadow:'0px 2px 3px #C6C9CD'}}
                                >
                                    <MenuItem value='Master' sx={{ fontSize: '12px' }}>Master</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>



                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: '15px' }}>Select Card</Typography>
                            <TextField sx={headInputStyle} type='number' fullWidth onChange={handleAmount} value={amount} size='small' />
                        </Grid>

                        <Grid item xs={12}>
                            <Stack mt={2} direction={'row'} alignItems='center' justifyContent={'space-between'}>
                                <Button size='small' variant='contained' color='error'>Cancel</Button>
                                <Button size='small' variant='contained' color='info' onClick={handleChargeAmount}>ok</Button>
                            </Stack>
                        </Grid>













                    </Grid>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default ActionCards