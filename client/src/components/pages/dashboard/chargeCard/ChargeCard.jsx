import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Chip, Stack, useMediaQuery, Grid, Typography, Menu } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from 'react-responsive-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import BackArrow from '../../../assets/icons/back-arrow.png'
import Pay from '../../../assets/images/pay.png'
import { Search, SearchIconWrapper, StyledInputBase, styleSlect } from '../reUseAbles/ReuseAbles';








const ChargeCard = () => {
    const { chargeCardData, perPage } = useSelector(store => store.mainReducer);
    const [copy, setCopy] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchIt, setSearchIt] = React.useState("");
    const [orderType, setOrderType] = React.useState('all');
    const deskTopView = useMediaQuery('(min-width:600px)');
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePageChange = page => {
        setCurrentPage(page);
        setRows(copy.slice(((page - 1) * perPage), ((((page - 1) * perPage)) + perPage)))
    }

    React.useLayoutEffect(() => { setRows(copy.slice(0, perPage)) }, [copy, perPage]);
    React.useLayoutEffect(() => { setCopy(chargeCardData) }, [chargeCardData]);
    React.useLayoutEffect(() => {
        if (orderType === "all") setRows(copy.filter(item => (item.name).toLocaleLowerCase().includes(searchIt)));
        else setRows(copy.filter(item => (item.name).toLocaleLowerCase().includes(searchIt) && item.st === orderType));
        // const getSearched = setTimeout(() => {

        //     if (copy.length > 0) {
        //         alert()
        //         if (orderType === "all") setRows(copy.filter(item => (item.name).toLocaleLowerCase().includes(searchIt)));
        //         else setRows(copy.filter(item => (item.name).toLocaleLowerCase().includes(searchIt) && item.st === orderType));
        //     }
        //     // setCopy(allOrders.filter(item => item.st === orderType && (item.name).toLocaleLowerCase().includes(searchIt)))
        //     // console.log(copy.filter(item => (item.name).toLocaleLowerCase().includes(searchIt)));
        // }, 1000)
        // return () => clearTimeout(getSearched)

        // eslint-disable-next-line
    }, [searchIt])





    const handleSearch = e => setSearchIt((e.target.value).toLocaleLowerCase());
    // const handleSlectOrder = data => {
    //     dispatch(SELECTED_SALE_ORDER_DATA(data))
    //     navigate('sale-order')
    // }SET_TITLE

    const handleChange = event => {
        setOrderType(event.target.value);
        if (event.target.value === "all") setCopy(chargeCardData);
        else setCopy(chargeCardData.filter(item => item.cst === event.target.value));
    };





    return (
        <div>
            <Grid container alignItems={'center'} justifyContent='space-between' mb={2} rowGap={1} >
                <Grid item xs={6} sm={6} md={7} >
                    <FormControl fullWidth>
                        <Select
                            labelId="orderType-select-label"
                            id="orderType-select"
                            value={orderType}
                            onChange={handleChange}
                            size='small'
                            sx={styleSlect}
                        >
                            <MenuItem value='all' sx={{ fontSize: '12px' }}>All Credit Card Orders</MenuItem>
                            <MenuItem value='Authorized' sx={{ fontSize: '12px' }}>Authorized</MenuItem>
                            <MenuItem value='Declined' sx={{ fontSize: '12px' }}>Declined</MenuItem>
                            <MenuItem value='Not Charged' sx={{ fontSize: '12px' }}>Not Charged</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6} sm={6} md={2} textAlign={{ xs: 'right' }} >
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        size='small' variant='contained' color='primary' sx={{ minWidth: '121px', fontSize: '12px', textTransform: 'captalize' }}>
                        Charge a Card Manually
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem disableRipple sx={{padding:'0px '}} onClick={handleClose}>
                            <Box component={'img'} src={Pay} sx={{maxWidth:'350px'}}  />
                        </MenuItem>
                    </Menu>
                </Grid>

                <Grid item xs={12} md={3} >
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ fontSize: '18px' }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search', width: '100%' }}
                            size='small'
                            fullWidth
                            onChange={handleSearch}
                        />
                    </Search>
                </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{ padding: '0px 4%' }} className='table-Container'>
                <Table sx={{ minWidth: 750 }} stickyHeader aria-label="table">
                    <TableHead>
                        <TableRow sx={{ 'td, th': { fontSize: deskTopView ? "13px" : '11px', fontWeight: 600 } }}>
                            <TableCell>Sales Order No</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Customer P.O.</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Card Status</TableCell>
                            <TableCell>Ship Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ color: '#6D6D6D' }} >
                        {rows && rows.length > 0 && rows.map((row, index) => (
                            <TableRow key={index} sx={{
                                '&:last-child td, &:last-child th': { border: 0 }, 'td, th': { color: row.delay ? 'red' : 'inherit', fontSize: deskTopView ? "13px" : '11px', },
                                // backgroundColor: row.delay ? 'rgb(211, 47, 47,.1)' : 'inherit'
                                '&:hover': { backgroundColor: 'rgb(128, 128, 128,.1)', transition: '.3s' },
                                '& .MuiTableCell-root': {
                                    padding: '10px 16px '
                                }
                            }}>
                                <TableCell> {row.ono} </TableCell>
                                <TableCell> {row.name} </TableCell>
                                <TableCell>{row.po}</TableCell>
                                <TableCell>
                                    <Chip sx={{ '&.MuiChip-root': { height: '25px', fontSize: 'inherit', borderRadius: '4px', color: row.st === "Pending" ? '#FF0000' : '#46BF7B', backgroundColor: row.st === "Pending" ? '#FFC8CE' : '#AFFFCF' } }} label={row.st} />
                                </TableCell>
                                <TableCell>{row.am}</TableCell>
                                <TableCell>{row.cst}</TableCell>
                                <TableCell>{row.dt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* {
                rows.length === 0 && <Box mt={3} textAlign='center' >
                    <Typography>No Record</Typography>
                </Box>
            } */}
            {
                rows.length > 0 &&
                <Stack direction='row' my={3} textAlign='right' mt={2} justifyContent='space-between' alignItems={'center'}>
                    <Button startIcon={<img src={BackArrow} alt='back' width='18px' />} variant='contained' color='error' size='small' onClick={() => navigate(-1)}> Go back</Button>
                    <Pagination
                        total={Math.ceil(copy.length / perPage)}
                        current={currentPage}
                        onPageChange={page => handlePageChange(page)}
                    />
                </Stack>
            }
        </div>
    )
}

export default ChargeCard

