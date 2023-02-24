import React from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../reUseAbles/ReuseAbles'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import LocationTransferTable from './LocationTransferTable';
import { Button, Grid } from '@mui/material';
import { useSelector } from 'react-redux';


const LocationTransfer = () => {
    const { inventoryAdjustment, perPage } = useSelector(store => store.mainReducer);

    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Link to="/new-location-transfer">
                        <Button variant="contained" sx={{ background: "#4A5CD8", color: "white", borderRadius: "2px", padding: "2px 8px" }}>New Location Transfer</Button>
                    </Link>
                </Grid>
                <Grid item xs={12} md={6} sx={{ paddingLeft: "30%" }} >
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ fontSize: '18px' }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search', width: '20%' }}
                            size='small'
                        // onChange={handleSearch}
                        />
                    </Search>
                </Grid>
                <Grid item container xs={12} sx={{ marginTop: "20px" }}>
                    <LocationTransferTable data={inventoryAdjustment} perPage={perPage} />
                </Grid>
            </Grid>
        </div>
    )
}

export default LocationTransfer