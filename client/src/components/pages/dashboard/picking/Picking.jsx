import { CircularProgress, FormControl, MenuItem, Select, Stack } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import 'bootstrap/dist/css/bootstrap.css';
import { BackButton, Search, SearchIconWrapper, StyledInputBase, handleNoAction, searchDropDown } from '../reUseAbles/ReuseAbles';
import PickingTable from './PickingTable';
import fabric from '../../../assets/icons/fabric.png';
import shelf from '../../../assets/icons/shelf.png';
import UpperHeader from '../reUseAbles/UpperHeader';
import { SearchSharp } from '@mui/icons-material';
// import UpdateLineItem from '../reUseAbles/UpdateLineItem';







const Picking = () => {

    const { saleOrderDetails, } = useSelector(store => store.mainReducer);
    const navigate = useNavigate();

    const [searchIt, setSearchIt] = React.useState("");
    const [searchToBL, setSearchToBL] = React.useState('lot');

    const handleSearchTo = event => setSearchToBL(event.target.value);
    const handleSearchIt = event => setSearchIt(event.target.value);


    return (
        <div>
            {!saleOrderDetails && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}><CircularProgress /></Box>}
            {saleOrderDetails && <Box>
                <UpperHeader saleOrderDetails={saleOrderDetails} handleUpperHeaderSubmit={handleNoAction} />
                {/* <UpdateLineItem handleSubmitUpdateLineItem={handleNoAction} handleCancel={handleNoAction} product={pickingSelectedProduct} readOnly={true} /> */}

                {/* main body */}
                <Box sx={{ padding: '15px', backgroundColor: 'white' }}>
                    <Box sx={{ padding: '15px', border: '1px solid black', borderStyle: 'inset' }}>
                        <Box >
                            <Stack direction='row' justifyContent={"center"} spacing={4}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box component='img' alt='img' src={fabric} />
                                    <Button variant='outlined' sx={{ color: '#6D6D6D', border: '1px solid #1D1D1E', borderRadius: 0 }} size='large' >Scan LOT</Button>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box component='img' alt='img' src={shelf} />
                                    <Button variant='outlined' sx={{ color: '#6D6D6D', border: '1px solid #1D1D1E', borderRadius: 0 }} size='large' >Scan Bin</Button>
                                </Box>
                                
                            </Stack>

                    <Stack direction='row' justifyContent={'center'} sx={{backgroundColor:'#E9EDF1'}} py={.6}>
                        <FormControl>
                            <Select
                                labelId="searchTo-select-label"
                                id="searchTo-select"
                                value={searchToBL}
                                onChange={handleSearchTo}
                                size='small'
                                sx={searchDropDown}
                            > 
                                <MenuItem value='bin' sx={{ fontSize: '12px' }}>Scan Bin</MenuItem>
                                <MenuItem value='lot' sx={{ fontSize: '12px' }}>Scan LOT</MenuItem>
                            </Select>
                        </FormControl>

                        <Search>
                            <SearchIconWrapper>
                                <SearchSharp sx={{ fontSize: '18px' }} />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search', width: '100%' }}
                                size='small'
                                fullWidth
                                onChange={handleSearchIt}
                            />
                        </Search>
                    </Stack>

                            <Box maxWidth={'sm'} margin='20px auto auto auto' >
                                <PickingTable searchToBL={searchToBL} searchIt={searchIt} />
                            </Box>

                        </Box>
                    </Box >
                </Box>

            </Box >}
            <Grid spacing={3} container direction='row' my={3} textAlign='right' mt={2} justifyContent={{ xs: 'center', md: 'space-between' }} alignItems={'center'}>
                <Grid item>
                    <BackButton onClick={() => navigate(-1)} />
                </Grid>
            </Grid>

        </div >
    )
}

export default Picking
