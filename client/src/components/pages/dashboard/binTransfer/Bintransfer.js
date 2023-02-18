import { Button, Grid, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BackButton, Search, StyledInputBase } from '../reUseAbles/ReuseAbles'

const Bintransfer2 = () => {
    const navigate = useNavigate();
    // const [searchIt, setSearchIt] = React.useState("");
    // const handleSearch = e => setSearchIt((e.target.value).toLocaleLowerCase());

    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={10}>
                    <Box sx={{ border: "1px solid black", padding: "14px 12px 8px 30px" }}>
                        <Box sx={{ width: "60%", margin: "auto" }}>
                            <Stack direction={"row"} spacing={2} justifyContent={"space-around"}>
                                <Button sx={{ background: "#FFFFFF", border: "1px solid #7F7F7F", padding: "20px 40px", borderRadius: 0, color: '#B6B6B6', minWidth: '250px' }} size='large'>Scan Bin</Button>
                                <Button sx={{ background: "#FFFFFF", border: "1px solid #7F7F7F", padding: "20px 40px", borderRadius: 0, color: '#B6B6B6', minWidth: '250px' }} size='large'>Scan LOT</Button>
                            </Stack>

                        </Box>
                        <Box sx={{ textAlign: "right" }}>
                            <Button variant="contained" sx={{ background: "#495BD6", color: "white" }}>OK</Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Box sx={{ border: "1px solid black", padding: "32px 26px" }}>
                        <Typography sx={{ textAlign: "center", fontSize: "20px" }}>New Bin</Typography>
                        <Search>
                            <StyledInputBase
                                inputProps={{ 'aria-label': 'search', width: '20%' }}
                                size='small'
                            // onChange={handleSearch}
                            />
                        </Search>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ padding: "8px", background: "white" }}>
                <Box sx={{ border: "1px solid black", minHeight: "80vh" }}>

                </Box>

            </Box>

            <Box mt={2}>
                <BackButton onClick={e => navigate(-1)} />
            </Box>
        </div>
    )
}

export default Bintransfer2