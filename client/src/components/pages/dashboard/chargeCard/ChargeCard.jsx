import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Chip, Stack, useMediaQuery, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from 'react-responsive-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import BackArrow from '../../../assets/icons/back-arrow.png'
import { Search, SearchIconWrapper, StyledInputBase, styleSlect } from '../reUseAbles/ReuseAbles';
import ActionCards from './ActionCards';








const ChargeCard = () => {
    const { chargeCardData, perPage } = useSelector(store => store.mainReducer);
    const [copy, setCopy] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchIt, setSearchIt] = React.useState("");
    const [orderType, setOrderType] = React.useState('all');
    const deskTopView = useMediaQuery('(min-width:600px)');
    const navigate = useNavigate();

    const handlePageChange = page => {
        setCurrentPage(page);
        setRows(copy.slice(((page - 1) * perPage), ((((page - 1) * perPage)) + perPage)))
    }

    React.useEffect(() => { setRows(copy.slice(0, perPage)) }, [copy, perPage]);
    React.useEffect(() => { setCopy(chargeCardData) }, [chargeCardData]);
    React.useEffect(() => {
        if (orderType === "all") setRows(copy.filter(item => (item.name).toLocaleLowerCase().includes(searchIt)));
        else setRows(copy.filter(item => (item.name).toLocaleLowerCase().includes(searchIt) && item.st === orderType));
        // eslint-disable-next-line
    }, [searchIt])

    const handleSearch = e => setSearchIt((e.target.value).toLocaleLowerCase());

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
                            sx={{ ...styleSlect, maxWidth: '170px' }}
                        >
                            <MenuItem value='all' sx={{ fontSize: '12px' }}>All Credit Card Orders</MenuItem>
                            <MenuItem value='Authorized' sx={{ fontSize: '12px' }}>Authorized</MenuItem>
                            <MenuItem value='Declined' sx={{ fontSize: '12px' }}>Declined</MenuItem>
                            <MenuItem value='Not Charged' sx={{ fontSize: '12px' }}>Not Charged</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6} sm={6} md={2} textAlign={{ xs: 'right' }} >
                    <ActionCards />
                </Grid>

                <Grid item xs={12} md={3} >
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ fontSize: '18px' }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Customer Name…"
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

