import { Box, Button, FormControl, Grid, Menu, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { headInputStyle, styleSlect } from '../reUseAbles/ReuseAbles';
import { toast } from 'react-toastify';
import { customers_Getter } from '../../../../utils/API_HELPERS';
import { loginRequest } from '../../../../utils/authConfig';
import { useMsal } from '@azure/msal-react';
import AE from "../../../assets/icons/american.png"
import MC from "../../../assets/icons/master.png"
import VC from "../../../assets/icons/visa.png"


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
            no: 1234567891234567,
            img: MC,
        }, {
            name: "VISA CARD",
            no: 1234567891234569,
            img: VC,
        }, {
            name: "AMERICAN EXPRESS",
            no: 1234567891234510,
            img: AE,
        }
    ]



    // {
    //     "@odata.etag": "W/\"JzE5OzkzNDI3Nzg0MDE5NTA5MDM2ODExOzAwOyc=\"",
    //     "systemId": "c655d6a7-925f-ed11-8c34-000d3a05b6ae",
    //     "no": "C0004044",
    //     "name": "NIINA DI LORENZO DESIGNS(NIINA INTERIOR DESIGN)",
    //     "name2": "",
    //     "searchName": "NIINA DI LORENZO DESIGNS(NIINA INTERIOR DESIGN)",
    //     "address": "122 LOWER BENCH RD",
    //     "address2": "",
    //     "city": "",
    //     "postCode": "V2A 1A8",
    //     "county": "BRITISH COLUMBIA",
    //     "countryRegionCode": "CA",
    //     "currencyCode": "",
    //     "eMail": "niina@niinadilorenzodesigns.ca",
    //     "faxNo": "",
    //     "mobilePhoneNo": "",
    //     "vatRegistrationNo": "",
    //     "territoryCode": "",
    //     "salespersonCode": "HOUSE",
    //     "phoneNo": "(250) 328 8355",
    //     "homePage": "",
    //     "creditLimitLCY": 0,
    //     "contact": "NIINA DI LORENZO",
    //     "contactID": "00000000-0000-0000-0000-000000000000",
    //     "balanceLCY": 0,
    //     "paymentTermsCode": "",
    //     "customerPriceGroup": "",
    //     "paymentMethodCode": "",
    //     "locationCode": "",
    //     "apiSync": false,
    //     "edcCustContacts": [
    //         {
    //             "@odata.etag": "W/\"JzIwOzE0ODE3Nzg5MTkxMTgwODI2OTk4MTswMDsn\"",
    //             "customerNo": "C0004044",
    //             "no": "CT011596",
    //             "systemId": "f232a1e4-dc82-ed11-9989-6045bdbd02f1",
    //             "companyNo": "CT011596",
    //             "name": "NIINA DI LORENZO DESIGNS(NIINA INTERIOR DESIGN)",
    //             "name2": "",
    //             "address": "122 LOWER BENCH RD",
    //             "address2": "",
    //             "city": "",
    //             "postCode": "V2A 1A8",
    //             "county": "BRITISH COLUMBIA",
    //             "countryRegionCode": "CA",
    //             "territoryCode": "",
    //             "eMail": "niina@niinadilorenzodesigns.ca",
    //             "eMail2": "",
    //             "faxNo": "",
    //             "homePage": "",
    //             "firstName": "",
    //             "middleName": "",
    //             "surname": "",
    //             "salutationCode": "COMPANY",
    //             "salespersonCode": "HOUSE",
    //             "phoneNo": "(250) 328 8355",
    //             "mobilePhoneNo": "",
    //             "companyName": "NIINA DI LORENZO DESIGNS(NIINA INTERIOR DESIGN)",
    //             "currencyCode": "",
    //             "jobTitle": "",
    //             "languageCode": "",
    //             "type": "Company",
    //             "lastDateModified": "2022-11-08"
    //         },
    //         {
    //             "@odata.etag": "W/\"JzE5Ozg5NzE2NzcwNDI4MjY1NDQ1OTcxOzAwOyc=\"",
    //             "customerNo": "C0004044",
    //             "no": "CT011597",
    //             "systemId": "f432a1e4-dc82-ed11-9989-6045bdbd02f1",
    //             "companyNo": "CT011596",
    //             "name": "NIINA DI LORENZO",
    //             "name2": "",
    //             "address": "122 LOWER BENCH RD",
    //             "address2": "",
    //             "city": "",
    //             "postCode": "V2A 1A8",
    //             "county": "BRITISH COLUMBIA",
    //             "countryRegionCode": "CA",
    //             "territoryCode": "",
    //             "eMail": "niina@niinadilorenzodesigns.ca",
    //             "eMail2": "",
    //             "faxNo": "",
    //             "homePage": "",
    //             "firstName": "NIINA",
    //             "middleName": "DI",
    //             "surname": "LORENZO",
    //             "salutationCode": "UNISEX",
    //             "salespersonCode": "HOUSE",
    //             "phoneNo": "(250) 328 8355",
    //             "mobilePhoneNo": "",
    //             "companyName": "NIINA DI LORENZO DESIGNS(NIINA INTERIOR DESIGN)",
    //             "currencyCode": "",
    //             "jobTitle": "",
    //             "languageCode": "",
    //             "type": "Person",
    //             "lastDateModified": "2022-11-08"
    //         }
    //     ]
    // }





    const [chargeType, setChargeType] = React.useState("Authorize");
    const [selectCustomer, setSelectCustomer] = React.useState({ no: '' });
    const [allCustomer, setAllCustomer] = React.useState([]);
    const [selectCard, setSelectCard] = React.useState({ name: "MASTER CARD" });
    const [amount, setAmount] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const { accounts, instance } = useMsal();


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
        const selected = allCustomer.filter(man => man.no === event.target.value)
        setSelectCustomer(selected[0]);
    };

    const handleChangeCard = event => {
        const selected = cards.filter(card => card.name === event.target.value)
        setSelectCard(selected[0]);
    };

    const custerDealer = () => {
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                customers_Getter(response.accessToken)
                    .then(res => {
                        setAllCustomer(res)
                        console.log("---ressss----", res);
                    }).catch(error => {
                        alert('errror')
                    })

            })
            .catch((e) => { console.log("-error ", e) });

    }



    const handleAmount = event => {
        setAmount(event.target.value)
    }


    const handleChargeAmount = () => {
        if (amount > 0) {
            console.log('amount');
            setSelectCard({ name: "MASTER CARD" });
            setChargeType("Authorize");
            setSelectCustomer({ no: '' });
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
                    <Grid sx={{ maxWidth: '400px', backgroundColor: '#E9EDF1' }} p={3} container alignItems={'center'} justifyContent='space-between' rowGap={1} >
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
                                    {allCustomer.length === 0 &&
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
                                <Button size='small' variant='contained' color='error'onClick={handleClose}>Cancel</Button>
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