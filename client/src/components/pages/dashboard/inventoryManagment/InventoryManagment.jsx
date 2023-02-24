import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Stack, useMediaQuery, Grid, Typography } from '@mui/material';
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
import { Search, SearchIconWrapper, StyledInputBase, styleSlect } from '../reUseAbles/ReuseAbles';






const InventoryManagment = () => {
    const { inventoryData } = useSelector(store => store.mainReducer);
    const [copy, setCopy] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchIt, setSearchIt] = React.useState("");
    const [orderType, setOrderType] = React.useState('all');
    const deskTopView = useMediaQuery('(min-width:600px)');

    const navigate = useNavigate();



    const handlePageChange = page => {
        setCurrentPage(page);
        setRows(copy.slice(((page - 1) * 20), ((((page - 1) * 20)) + 20)))
    }

    React.useLayoutEffect(() => { setRows(copy.slice(0, 20)) }, [copy]);
    React.useLayoutEffect(() => { setCopy(inventoryData) }, [inventoryData]);
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
        // 
        //eslint-disable-next-line
    }, [searchIt])





    const handleSearch = e => setSearchIt((e.target.value).toLocaleLowerCase());
    // const handleSlectOrder = data => {
    //     dispatch(SELECTED_SALE_ORDER_DATA(data))
    //     navigate('sale-order')
    // }

    const handleChange = event => {
        setOrderType(event.target.value);
        // if (event.target.value === "all") setCopy(inventoryData);
        // else setCopy(inventoryData.filter(item => item.st === event.target.value));
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
                            <MenuItem value='all' sx={{ fontSize: '12px' }}>Show All</MenuItem>
                            <MenuItem value='In Transit' sx={{ fontSize: '12px' }}>In Transit</MenuItem>
                        </Select>
                    </FormControl>
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
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>On Hand</TableCell>
                            <TableCell>On SO</TableCell>
                            <TableCell>On PO</TableCell>
                            <TableCell>In Transit</TableCell>
                            <TableCell>Sales Price</TableCell>
                            <TableCell>ETA Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ color: '#6D6D6D' }} >
                        {rows && rows.length > 0 && rows.map((row, index) => (
                            <TableRow key={index} sx={{
                                '&:last-child td, &:last-child th': { border: 0 }, 'td, th': { color: row.delay ? 'red' : 'inherit', fontSize: deskTopView ? "13px" : '11px', },
                                // backgroundColor: row.delay ? 'rgb(211, 47, 47,.1)' : 'inherit'
                                '&:hover': { backgroundColor: 'rgb(128, 128, 128,.1)', cursor: 'pointer', transition: '.3s' }
                            }}

                            // onClick={() => handleSlectOrder(row)}

                            >
                                <TableCell> {row.name} </TableCell>
                                <TableCell> {row.des} </TableCell>
                                <TableCell>{row.hand}</TableCell>
                                <TableCell>{row.so}</TableCell>
                                <TableCell>{row.po}</TableCell>
                                <TableCell>{row.it}</TableCell>
                                <TableCell>{row.sp}</TableCell>
                                <TableCell>{row.eta} </TableCell>
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
                        total={Math.ceil(copy.length / 8)}
                        current={currentPage}
                        onPageChange={page => handlePageChange(page)}
                    />
                </Stack>
            }
        </div>
    )
}

export default InventoryManagment


