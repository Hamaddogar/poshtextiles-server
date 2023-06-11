import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Stack, useMediaQuery, Grid, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from 'react-responsive-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { CSV_DATA_LOCAL_RED, CSV_PRODUCT_DETAIL, csvOrderDealer } from '../../../../RTK/Reducers/Reducers';
import { BackButton, NoBorder, Search, SearchIconWrapper, StyledInputBase } from '../reUseAbles/ReuseAbles';
import PreLoader from '../../HOC/Loading';
import NoRecord from '../../HOC/NoRecord';
import Papa from 'papaparse';
import { toast } from 'react-toastify';
import { request_AccessToken_MICROSOFT } from '../../../../utils/API_HELPERS';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';






const CSVOrders = () => {
    const { perPage, csv_data_local, csv_data_responded, csv_fileName } = useSelector(store => store.mainReducer);

    const [loading, setLoading] = React.useState({ load: false, fileName: "" })
    const [copy, setCopy] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchIt, setSearchIt] = React.useState("");

    const [searchItDebounce, setSearchItDebounce] = React.useState("");
    const deskTopView = useMediaQuery('(min-width:600px)');

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handlePageChange = page => {
        setCurrentPage(page);
        setRows(copy.slice(((page - 1) * perPage), ((((page - 1) * perPage)) + perPage)))
    }

    React.useEffect(() => { if (copy.length > 0) setRows(copy?.slice(0, perPage)) }, [copy, perPage]);

    React.useEffect(() => {
        if (csv_data_responded?.length > 0) setCopy(csv_data_responded)
        else if (csv_data_local?.length > 0) setCopy(csv_data_local)
        //eslint-disable-next-line
    }, [csv_data_local, csv_data_responded]);
    React.useEffect(() => {
        setRows(copy.filter(item => (item["SKU"])?.toLocaleLowerCase().includes(searchIt)));
        //eslint-disable-next-line
    }, [searchIt]);



    React.useEffect(() => {
        const getSearched = setTimeout(() => {
            setSearchIt(searchItDebounce.toLocaleLowerCase());
        }, 500);
        return () => clearTimeout(getSearched)
        //eslint-disable-next-line
    }, [searchItDebounce]);



    const handleSearch = e => setSearchItDebounce((e.target.value).toLocaleLowerCase());

    const handleSlectOrder = data => {
        dispatch(CSV_PRODUCT_DETAIL({
            total: copy.length,
            product: data,
        }))
        navigate('/csv-order-detail')
    }



    const handleCSV = event => {
        event.preventDefault();
        const data = new FormData(event.target);
        const file = data.get('mycsv');
        setLoading({ load: true, fileName: file.name });
        const allowedExtensions = ["csv"];
        const fileExtension = file.name.split(".").pop();

        if (allowedExtensions.includes(fileExtension)) {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    dispatch(CSV_DATA_LOCAL_RED({
                        total: results.data.length,
                        data: results.data,
                        name: file.name
                    }))
                    setLoading({ load: false });
                },
            });
        } else {
            setLoading({ load: false, ...loading });
            toast.error('Only CSV File is Accepted', { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }

    }



    const handleSendToServer = () => {
        if (csv_data_local.length > 0) {
            request_AccessToken_MICROSOFT()
                .then(decide => {
                    if (decide.success) {
                        dispatch(csvOrderDealer({ token: decide.token, body: csv_data_local }))
                    }
                })
        } else {
            toast.error('No Data Found Please Upload File Again!', { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }
    }








    return (
        <div>
            <Grid container alignItems={'center'} justifyContent='space-between' pb={2} rowGap={1}
                sx={{ position: 'sticky', top: 0, zIndex: 5, backgroundColor: '#E9EDF1' }}>

                <Grid item xs={6} sm={6} >
                    <Stack direction='row' alignItems='center' columnGap={1} component='form' onSubmit={handleCSV} >
                        <TextField size='small' type='file' variant='outlined' name='mycsv' accept='.csv' required sx={NoBorder} />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button size='small' type='submit' variant='contained' color='success' sx={{ minWidth: '121px', fontSize: '12px', textTransform: 'captalize' }}>Upload CSV Now</Button> &nbsp; &nbsp; &nbsp;
                            {
                                csv_data_local?.length > 0 &&
                                !(csv_data_responded?.length > 0) &&
                                <Button onClick={handleSendToServer} size='small' type='submit' variant='contained' color='primary' sx={{ minWidth: '121px', fontSize: '12px', textTransform: 'captalize' }}>Process CSV Now</Button>
                            }
                        </Box>
                    </Stack>
                    {(loading.fileName || csv_fileName) && <Typography p={1} > Data from File : {loading.fileName || csv_fileName} </Typography>}
                </Grid>

                <Grid item xs={12} md={4} >
                    <Stack direction='row' justifyContent={'flex-end'}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon sx={{ fontSize: '18px' }} />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="SKU Search…"
                                inputProps={{ 'aria-label': 'search', width: '100%' }}
                                size='small'
                                fullWidth
                                onChange={handleSearch}
                            />
                        </Search>
                    </Stack>
                </Grid>
            </Grid>



            <PreLoader loading={loading.load}>
                <TableContainer component={Paper} sx={{ padding: '0px 4%' }} className='table-Container'>
                    <Table sx={{ minWidth: 750 }} stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{ 'td, th': { fontSize: deskTopView ? "13px" : '11px', fontWeight: 600 } }}>
                                <TableCell>SKU</TableCell>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Company Practice</TableCell>
                                <TableCell>Project Type</TableCell>
                                <TableCell>Order Date</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Ship Via</TableCell>
                                <TableCell>Match</TableCell>
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
                                            padding: '10px 16px ',
                                            backgroundColor: index % 2 === 0 ? 'rgb(255, 0, 0,.1)' : 'transparent'
                                        }
                                    }}
                                        onClick={() => handleSlectOrder(row)}
                                    >
                                        <TableCell sx={{ maxWidth: '140px' }}> {row["SKU"] ? row["SKU"] : "-----"} </TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}> {row["First Name"] ? row["First Name"] + " " + row["Last Name"] : "-----"} </TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}>{row["Company Practice"] ? row["Company Practice"] : "-----"} </TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}>{(row["Project Type"]) ? row["Project Type"] : "-----"}</TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}>{row["Order Date"] ? row["Order Date"] : "-----"}</TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}>{row["Quantity"] >= 0 ? row["Quantity"] : "NA"}</TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}>{row["Shipping Method"] ? row["Shipping Method"].split(' ')[0] : "-----"}</TableCell>
                                        <TableCell sx={{ maxWidth: '140px' }}>Yes/No <ArrowRightIcon /> </TableCell>
                                        {/* <TableCell sx={{ maxWidth: '140px' }}>
                                            <Chip sx={{
                                                '&.MuiChip-root': {
                                                    height: '25px', fontSize: 'inherit', borderRadius: '4px',
                                                    color: row.status === "Open" ? '#FF0000' : row.status === "Pending Approval" ? "#775AFF" : '#46BF7B',
                                                    backgroundColor: row.status === "Open" ? '#FFC8CE' : row.status === "Pending Approval" ? "rgb(25, 118, 210,.4)" : '#AFFFCF'
                                                }
                                            }} label={row.status} />
                                        </TableCell> */}
                                    </TableRow>

                                )
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>



                {/* pagination */}
                <Stack direction='row' my={3} mt={2} justifyContent='space-between' alignItems={'center'}>
                    {
                        rows.length > 0 && <BackButton onClick={() => navigate(-1)} />
                    }


                    <Box>
                        <Pagination
                            total={Math.ceil(copy.length / perPage)}
                            current={currentPage}
                            onPageChange={page => handlePageChange(page)}
                        />
                    </Box>
                </Stack>
            </PreLoader>

            <NoRecord backButton={true} size={rows.length} />
        </div>
    )
}


export default CSVOrders
