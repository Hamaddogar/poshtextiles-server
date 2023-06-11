import { Button, Grid } from '@mui/material'
import React from 'react'
import { BackButton, Search, SearchIconWrapper, StyledInputBase } from '../reUseAbles/ReuseAbles'
import SearchIcon from '@mui/icons-material/Search';
import BinTable from './Bintable';
import { Link, useNavigate } from 'react-router-dom';


const Bin = () => {
    // const [searchIt, setSearchIt] = React.useState("");
    // const handleSearch = e => setSearchIt((e.target.value).toLocaleLowerCase());
    const navigate = useNavigate();
    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Link to="/bintransfer">
                        <Button variant="contained" sx={{ background: "#4A5CD8", color: "white", borderRadius: "10px", padding: "2px 8px" }}>New Bin Transfer</Button>
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
                <Grid sx={{ marginTop: "20px" }} item xs={12}>
                    <BinTable />
                </Grid>
                <Grid sx={{ marginTop: "20px" }} item xs={12}>
                    <BackButton onClick={() => navigate(-1)} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Bin