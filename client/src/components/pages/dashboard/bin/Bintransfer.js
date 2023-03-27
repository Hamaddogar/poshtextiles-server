import { Button, Grid, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'
import { Search, StyledInputBase } from '../reUseAbles/ReuseAbles'

const Bintransfer = () => {
    // const [searchIt, setSearchIt] = React.useState("");
    // const handleSearch = e => setSearchIt((e.target.value).toLocaleLowerCase());

    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={10}>
                    <Box sx={{ border: "1px solid black", padding: "14px 12px 8px 30px" }}>
                        <Box sx={{ width: "60%", margin: "auto" }}>
                            <Stack direction={"row"} justifyContent={"space-around"}>
                                <Button variant="contained" sx={{ background: "#FFFFFF", border: "1px solid black", color: "black", padding: "20px 40px" }}>SCAN BIN</Button>
                                <Button variant="contained" sx={{ background: "#FFFFFF", border: "1px solid black", color: "black", padding: "20px 40px" }}>SCAN LOT</Button>
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
                <Box sx={{ border: "1px solid black", height: "60vh" }}>

                </Box>
            </Box>
        </div>
    )
}

export default Bintransfer