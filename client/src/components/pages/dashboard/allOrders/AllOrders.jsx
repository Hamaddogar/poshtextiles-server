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
import { SELECTED_SALE_ORDER_DATA } from '../../../../RTK/Reducers/Reducers';
import { lnk, Search, searchDropDown, SearchIconWrapper, StyledInputBase, styleSlect } from '../reUseAbles/ReuseAbles';
import PreLoader from '../../HOC/Loading';
import NoRecord from '../../HOC/NoRecord';







const AllOrders = () => {
    const { allOrders, perPage } = useSelector(store => store.mainReducer);
    const [copy, setCopy] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchIt, setSearchIt] = React.useState("");
    const [orderType, setOrderType] = React.useState('all');
    const [searchItDebounce, setSearchItDebounce] = React.useState("");
    const [searchTo, setSearchTo] = React.useState('no');
    const deskTopView = useMediaQuery('(min-width:600px)');

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handlePageChange = page => {
        setCurrentPage(page);
        setRows(copy.slice(((page - 1) * perPage), ((((page - 1) * perPage)) + perPage)))
    }

    React.useLayoutEffect(() => { setCopy(allOrders) }, [allOrders]);
    React.useLayoutEffect(() => { setRows(copy.slice(0, perPage)) }, [copy, perPage]);
    React.useLayoutEffect(() => {
        if (orderType === "all") setRows(copy.filter(item => (item[searchTo])?.toLocaleLowerCase().includes(searchIt)));
        else setRows(copy.filter(item => (item[searchTo])?.toLocaleLowerCase().includes(searchIt) && item.status === orderType));
        //eslint-disable-next-line
    }, [searchIt]);
    React.useLayoutEffect(() => {
        const getSearched = setTimeout(() => {
            setSearchIt(searchItDebounce.toLocaleLowerCase());
        }, 800);
        return () => clearTimeout(getSearched)
        //eslint-disable-next-line
    }, [searchItDebounce]);



    const handleSearchTo = event => setSearchTo(event.target.value);
    const handleSearch = e => setSearchItDebounce((e.target.value).toLocaleLowerCase());
    const handleSlectOrder = data => {
        dispatch(SELECTED_SALE_ORDER_DATA(data))
        navigate('sale-order')
    }

    const handleChange = event => {
        setOrderType(event.target.value);
        if (event.target.value === "all") setCopy(allOrders);
        else setCopy(allOrders.filter(item => item.status === event.target.value));
    };




    return (
        <div>
            <Grid container alignItems={'center'} justifyContent='space-between' mb={2} rowGap={1} >
                <Grid item xs={6} sm={4} md={6} >
                    <FormControl fullWidth>
                        <Select
                            labelId="orderType-select-label"
                            id="orderType-select"
                            value={orderType}
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

                <Grid item xs={6} sm={6} md={2} textAlign={{ xs: 'right' }} >
                    <Link style={lnk} to='/create-order' >
                        <Button size='small' variant='contained' color='primary' sx={{ minWidth: '121px', fontSize: '12px', textTransform: 'captalize' }}>Create Sale Order</Button>
                    </Link>
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



            <PreLoader>
                <TableContainer component={Paper} sx={{ padding: '0px 4%' }} className='table-Container'>
                    <Table sx={{ minWidth: 750 }} stickyHeader aria-label="table">
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
                                        <TableCell sx={{ maxWidth: '140px' }}> {row.no} </TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}> {row.shipToName} </TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}>{row.externalDocumentNo} </TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}>
                                            <Chip sx={{
                                                '&.MuiChip-root': {
                                                    height: '25px', fontSize: 'inherit', borderRadius: '4px',
                                                    color: row.status === "Open" ? '#FF0000' : row.status === "Pending Approval" ? "#775AFF" : '#46BF7B',
                                                    backgroundColor: row.status === "Open" ? '#FFC8CE' : row.status === "Pending Approval" ? "rgb(25, 118, 210,.4)" : '#AFFFCF'
                                                }
                                            }} label={row.status} />
                                        </TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}>{(row.amount)}</TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}>{row.shipmentDate}</TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}>{row.shippingAgentCode}</TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}>{row.shipmentMethodCode}</TableCell>
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
                            current={currentPage}
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
