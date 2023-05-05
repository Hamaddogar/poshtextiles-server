import { Box, Button, FormControl, Grid, Menu, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { headInputStyle, styleSlect } from '../reUseAbles/ReuseAbles';
import { toast } from 'react-toastify';
import { chargeCard, customers_Getter, request_AccessToken_MICROSOFT } from '../../../../utils/API_HELPERS';
import AE from "../../../assets/icons/american.png"
import MC from "../../../assets/icons/master.png"
import VC from "../../../assets/icons/visa.png"
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
const ActionCards = () => {

    function hideNumber(num) {
        const numStr = num.toString();
        const len = numStr.length;
        let hiddenNum = '';
        for (let i = 0; i < len - 3; i++) {
            hiddenNum += '*';
            if ((i + 1) % 4 === 0) {
                hiddenNum += ' ';
            }
        }
        hiddenNum += numStr.slice(-3);
        return hiddenNum;
    }


    const cards = [
        {
            name: "MASTER CARD",
            no: 5555555555554444,
            img: MC,
            exp: '0824',
            cvv: '999'
        }, {
            name: "VISA CARD",
            no: 4111111111111111,
            img: VC,
            exp: '0824',
            cvv: '999'
        }, {
            name: "AMERICAN EXPRESS",
            no: 378282246310005,
            img: AE,
            exp: '0824',
            cvv: '999'
        }
    ]


    const [chargeType, setChargeType] = React.useState("Authorize");
    const [selectCustomer, setSelectCustomer] = React.useState({ no: '' });
    const [allCustomer, setAllCustomer] = React.useState([]);
    const [selectCard, setSelectCard] = React.useState(cards[0]);
    const [amount, setAmount] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [chargeCardLoading, setchargeCardLoading] = React.useState(false);
    const [chargeCardDone, setchargeCardDone] = React.useState(false);


    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => {
        setAnchorEl(null);
        setchargeCardDone(false)
        setchargeCardLoading(false)
        setSelectCard(cards[0]);
        setChargeType("Authorize");
        setSelectCustomer({ no: '' });
        setAmount(0);
    };
    const handleAmount = event => setAmount(event.target.value);
    const handleChangeCardType = event => setChargeType(event.target.value);


    const handleChangeCustomer = event => {
        const selected = allCustomer.filter(man => man.no === event.target.value)
        setSelectCustomer(selected[0]);
    };

    const handleChangeCard = event => {
        const selected = cards.filter(card => card.name === event.target.value)
        setSelectCard(selected[0]);
    };

    const custerDealer = () => {
        // instance
        //     .acquireTokenSilent({
        //         ...loginRequest,
        //         account: accounts[0],
        //     })
        //     .then((response) => {
        //         customers_Getter(response.accessToken)
        //             .then(res => {
        //                 setAllCustomer(res)
        //                 console.log("---ressss----", res);
        //             }).catch(error => {
        //                 alert('errror')
        //             })

        //     })
        //     .catch((e) => { console.log("-error ", e) });


        request_AccessToken_MICROSOFT()
            .then(decide => {
                if (decide.success) {
                    customers_Getter(decide.token)
                        .then(res => {
                            setAllCustomer(res)
                            console.log("---ressss----", res);
                        }).catch(error => {
                            alert('errror')
                        })
                }
            })








    }





    const handleChargeAmount = () => {
        if (amount > 0 && selectCard.cvv && selectCustomer.no) {
            setchargeCardLoading(true)
            setchargeCardDone(false)

            chargeCard({ amount, cardNumber: selectCard.no, expirationDate: selectCard.exp, cvv: selectCard.cvv })
                .then(response => {
                    setchargeCardLoading(false)
                    // console.log(response.response.transactionResponse.accountType);
                    if (response.success) {
                        setchargeCardDone(true)
                        setchargeCardLoading(false)
                        setSelectCard(cards[0]);
                        setChargeType("Authorize");
                        setSelectCustomer({ no: '' });
                        setAmount(0);
                    } else {
                        // console.log(response);
                    }

                }).catch(error => {
                    setchargeCardLoading(false)
                    console.log(error);
                    toast.error(`error`, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });

                })

        } else {
            toast.error(amount === 0 ? `Enter Some Amount!` : !selectCard.cvv ? "Please Select a Card" : "Please Sect a Customer", { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }
    }




    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={Boolean(anchorEl) ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                onClick={handleClick}
                size='small' variant='contained' color='primary' sx={{ minWidth: '121px', fontSize: '12px', textTransform: 'captalize' }}>
                Charge a Card Manually
            </Button>
            {/* Charge a Card Manually CARD SECTIONS */}
            <Menu
                sx={{}}
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {/* onClick={handleClose} */}
                <MenuItem disableRipple sx={{ padding: '0px ', opacity: chargeCardLoading ? .5 : 1 }} >
                    <Grid sx={{ maxWidth: '400px', backgroundColor: '#E9EDF1' }} p={3} container alignItems={'center'} justifyContent='space-between' rowGap={1} >

                        <Grid item xs={12}>
                            {
                                chargeCardDone &&
                                <Stack spacing={1} direction={'row'} alignItems={'center'} justifyContect='center'>
                                    <DoneOutlineIcon color='success' />
                                    <Typography sx={{ color: 'green' }}>Card is Successfully Charged</Typography>
                                </Stack>
                            }
                        </Grid>


                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: '15px' }}>Charge Type</Typography>
                            <FormControl fullWidth>
                                <Select
                                    labelId="card-select-label"
                                    id="card-select"
                                    value={chargeType}
                                    onChange={handleChangeCardType}
                                    size='small'
                                    sx={{ ...styleSlect, maxWidth: '100%', backgroundColor: 'white', boxShadow: '0px 2px 3px #C6C9CD' }}
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
                                    value={selectCustomer.no}
                                    onChange={handleChangeCustomer}
                                    size='small'
                                    sx={{ ...styleSlect, maxWidth: '100%', backgroundColor: 'white', boxShadow: '0px 2px 3px #C6C9CD' }}
                                    onOpen={allCustomer.length ? () => { } : custerDealer}
                                    displayEmpty
                                >
                                    {selectCustomer.no === '' &&
                                        <MenuItem value="" sx={{ textAlign: 'center' }}>
                                            Select Customer
                                        </MenuItem>}
                                    {allCustomer.length > 0 &&
                                        allCustomer.map((man, indx) => (
                                            <MenuItem value={man.no} key={indx} sx={{ fontSize: '13px' }} >
                                                {man.name}
                                            </MenuItem>
                                        ))}

                                </Select>
                            </FormControl>
                        </Grid>




                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: '15px' }}>Select Card</Typography>
                            <FormControl fullWidth>
                                <Select
                                    labelId="card-select-label"
                                    id="card-select"
                                    value={selectCard.name}
                                    onChange={handleChangeCard}
                                    size='small'
                                    sx={{ ...styleSlect, maxWidth: '100%', backgroundColor: 'white', boxShadow: '0px 2px 3px #C6C9CD' }}
                                >
                                    {cards.length > 0 &&
                                        cards.map((card, indx) => (
                                            <MenuItem value={card.name} key={indx} sx={{ fontSize: '13px' }} >
                                                <Stack direction='row' alignItems={'center'} justifyContent={'space-between'}>
                                                    <Box component={'img'} src={card.img} sx={{ maxWidth: '30px' }} /> &nbsp; &nbsp; &nbsp; &nbsp;
                                                    <span>{card.name}</span> &nbsp; &nbsp; &nbsp; &nbsp;
                                                    <span>{hideNumber(card.no)}</span>
                                                </Stack>
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>



                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: '15px' }}>Select Card</Typography>
                            <TextField sx={headInputStyle} type='number' fullWidth onChange={handleAmount} value={amount} size='small' />
                        </Grid>

                        <Grid item xs={12}>
                            <Stack mt={2} direction={'row'} alignItems='center' justifyContent={'space-between'}>
                                <Button size='small' variant='contained' color='error' onClick={handleClose}>close</Button>
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