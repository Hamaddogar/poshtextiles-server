import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Chip, Stack, useMediaQuery, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from 'react-responsive-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import { Box } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import { PAGE_DEALER_ALL_ORDERS, SELECTED_SALE_ORDER_DATA, shipFromLocation } from '../../../../RTK/Reducers/Reducers';
import { lnk, Search, searchDropDown, SearchIconWrapper, StyledInputBase, styleSlect } from '../reUseAbles/ReuseAbles';
import PreLoader from '../../HOC/Loading';
import NoRecord from '../../HOC/NoRecord';
import { request_AccessToken_MICROSOFT } from '../../../../utils/API_HELPERS';







const AllOrders = () => {
    const { allOrders, perPage, loading, currentPageAllOrders, orderTypeAllOrders } = useSelector(store => store.mainReducer);
    const [copy, setCopy] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [searchIt, setSearchIt] = React.useState("");
    const [searchItDebounce, setSearchItDebounce] = React.useState("");
    const [searchTo, setSearchTo] = React.useState('no');
    const deskTopView = useMediaQuery('(min-width:600px)');

    const navigate = useNavigate();
    const dispatch = useDispatch()


    React.useLayoutEffect(() => {
        if (orderTypeAllOrders === "all") setCopy(allOrders);
        else setCopy(allOrders.filter(item => item.status === orderTypeAllOrders));
        //eslint-disable-next-line
    }, [allOrders]);
    React.useLayoutEffect(() => {
        setRows(copy.slice(0, perPage));
        handlePageChange(currentPageAllOrders);
        //eslint-disable-next-line
    }, [copy, perPage]);
    React.useLayoutEffect(() => {
        if (orderTypeAllOrders === "all") setRows(copy.filter(item => (item[searchTo])?.toLocaleLowerCase().includes(searchIt)));
        else setRows(copy.filter(item => (item[searchTo])?.toLocaleLowerCase().includes(searchIt) && item.status === orderTypeAllOrders));
        //eslint-disable-next-line
    }, [searchIt]);
    React.useLayoutEffect(() => {
        const getSearched = setTimeout(() => {
            setSearchIt(searchItDebounce.toLocaleLowerCase());
        }, 800);
        return () => clearTimeout(getSearched)
        //eslint-disable-next-line
    }, [searchItDebounce]);


    const handlePageChange = page => {
        dispatch(PAGE_DEALER_ALL_ORDERS({ to: "page", currentPage: page, orderType: 'all' }));
        setRows(copy.slice(((page - 1) * perPage), ((((page - 1) * perPage)) + perPage)))
    }
    const handleSearchTo = event => setSearchTo(event.target.value);
    const handleSearch = e => setSearchItDebounce((e.target.value).toLocaleLowerCase());
    const handleSlectOrder = data => {
        dispatch(SELECTED_SALE_ORDER_DATA(data))
        request_AccessToken_MICROSOFT()
            .then(decide => {
                if (decide.success) {
                    dispatch(shipFromLocation({
                        token: decide.token,
                        locationCode: data.edcCustomers[0].locationCode,
                    }))
                }
            })
        navigate('sale-order')
    }

    const handleChange = event => {
        dispatch(PAGE_DEALER_ALL_ORDERS({ to: "both", orderType: event.target.value, currentPage: 1 }));
        if (event.target.value === "all") setCopy(allOrders);
        else setCopy(allOrders.filter(item => item.status === event.target.value));
    };




    return (
        <div>
            <Grid container alignItems={'center'} justifyContent='space-between' pb={2} rowGap={1}
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 5,
                    backgroundColor: '#E9EDF1'
                }}
            >
                <Grid item xs={6} sm={4} md={4} >
                    <FormControl fullWidth>
                        <Select
                            labelId="orderType-select-label"
                            id="orderType-select"
                            value={orderTypeAllOrders}
                            onChange={handleChange}
                            size='small'
                            sx={styleSlect}
                        >
                            <MenuItem value='all' sx={{ fontSize: '12px' }}>All Orders</MenuItem>
                            <MenuItem value='Open' sx={{ fontSize: '12px' }}>Open</MenuItem>
                            <MenuItem value='Released' sx={{ fontSize: '12px' }}>Released</MenuItem>
                            <MenuItem value='Pending Approval' sx={{ fontSize: '12px' }}>Pending Approval</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6} sm={6} md={4} textAlign={{ xs: 'right' }} >
                    <Stack direction='row' columnGap={1} >
                        <Link style={lnk} to='/create-order' >
                            <Button size='small' variant='contained' color='primary' sx={{ minWidth: '121px', fontSize: '12px', textTransform: 'captalize' }}>Create Order</Button>
                        </Link>
                        <Link style={lnk} to='/csv-order' >
                            <Button size='small' variant='contained' color='success' sx={{ minWidth: '121px', fontSize: '12px', textTransform: 'captalize' }}>Upload CSV</Button>
                        </Link>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4} >
                    <Stack direction='row' justifyContent={'flex-end'}>
                        <FormControl>
                            <Select
                                labelId="searchTo-select-label"
                                id="searchTo-select"
                                value={searchTo}
                                onChange={handleSearchTo}
                                size='small'
                                sx={searchDropDown}
                            >
                                <MenuItem value='no' sx={{ fontSize: '12px' }}>Sales Order No</MenuItem>
                                <MenuItem value='shipToName' sx={{ fontSize: '12px' }}>Customer Name</MenuItem>
                                <MenuItem value='shipToPostCode' sx={{ fontSize: '12px' }}>Customer P.O.</MenuItem>
                            </Select>
                        </FormControl>

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
                    </Stack>
                </Grid>
            </Grid>

            <PreLoader loading={loading}>
                <TableContainer component={Paper} sx={{ padding: '0px 4%' }} className='table-Container'>
                    <Table sx={{ minWidth: 750 }} stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{ 'td, th': { fontSize: deskTopView ? "13px" : '11px', fontWeight: 600 } }}>
                                <TableCell>Sales Order No</TableCell>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Customer P.O.</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Ship Date</TableCell>
                                <TableCell>Ship Via</TableCell>
                                <TableCell>Priority</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ color: '#6D6D6D' }} >
                            {rows && rows.length > 0 &&
                                rows.map((row, index) => (
                                    <TableRow key={index} sx={{
                                        '&:last-child td, &:last-child th': { border: 0 }, 'td, th': { color: row.delay ? 'red' : 'inherit', fontSize: deskTopView ? "13px" : '11px', borderColor: '#DADADA' },
                                        // backgroundColor: row.delay ? 'rgb(211, 47, 47,.1)' : 'inherit'
                                        '&:hover': { backgroundColor: 'rgb(128, 128, 128,.1)', cursor: 'pointer', transition: '.3s' },
                                        '& .MuiTableCell-root': {
                                            padding: '10px 16px '
                                        }
                                    }}
                                        onClick={() => handleSlectOrder(row)}
                                    >
                                        <TableCell sx={{ maxWidth: '140px' }}> {row.no ? row.no : "-----"} </TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}> {row.shipToName ? row.shipToName : "-----"} </TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}>{row.externalDocumentNo ? row.externalDocumentNo : "-----"} </TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}>
                                            <Chip sx={{
                                                '&.MuiChip-root': {
                                                    height: '25px', fontSize: 'inherit', borderRadius: '4px',
                                                    color: row.status === "Open" ? '#FF0000' : row.status === "Pending Approval" ? "#775AFF" : '#46BF7B',
                                                    backgroundColor: row.status === "Open" ? '#FFC8CE' : row.status === "Pending Approval" ? "rgb(25, 118, 210,.4)" : '#AFFFCF'
                                                }
                                            }} label={row.status} />
                                        </TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}>{(row.amount) >= 0 ? `$ ${row.amount}` : "-----"}</TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}>{row.shipmentDate ? row.shipmentDate : "-----"}</TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}>{row.shippingAgentCode ? row.shippingAgentCode : "NA"}</TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}>{row.priority ? row.priority : "-----"}</TableCell>
                                    </TableRow>

                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* pagination */}
                <Stack direction='row' my={3} mt={2} justifyContent='flex-end' alignItems={'center'}>
                    <Box>
                        <Pagination
                            total={Math.ceil(copy.length / perPage)}
                            current={currentPageAllOrders}
                            onPageChange={page => handlePageChange(page)}
                        />
                    </Box>
                </Stack>
            </PreLoader>
            <NoRecord backButton={false} size={rows.length} />
        </div>
    )
}

export default AllOrders
