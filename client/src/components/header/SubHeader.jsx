import React from 'react'

const SubHeader = () => {
  return (
    <div>
      <Grid container alignItems={'center'} justifyContent='space-between' my={2} rowGap={1} >
                <Grid item xs={6} sm={6} md={7} >
                    <FormControl fullWidth>
                        <Select
                            labelId="orderType-select-label"
                            id="orderType-select"
                            value={orderType}
                            onChange={handleChange}
                            size='small'
                            sx={{
                                maxWidth: '120px',
                                fontSize: '12px',
                                fontWeight: 800,
                                // color: "white",
                                '.MuiOutlinedInput-notchedOutline': {
                                    // borderColor: 'rgba(228, 219, 233, 0.25)',
                                    border: 'none'
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    // borderColor: 'rgba(228, 219, 233, 0.25)',
                                    border: 'none'
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    // borderColor: 'rgba(228, 219, 233, 0.25)',
                                    border: 'none'
                                },
                                '.MuiSvgIcon-root ': {
                                    // fill: "white !important",
                                },
                            }}
                        >
                            <MenuItem value='all' sx={{ fontSize: '12px' }}>All Orders</MenuItem>
                            <MenuItem value='1' sx={{ fontSize: '12px' }}>Orders 2</MenuItem>
                            <MenuItem value='2' sx={{ fontSize: '12px' }}>Orders 3</MenuItem>
                            <MenuItem value='3' sx={{ fontSize: '12px' }}>Orders 4</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6} sm={6} md={2} textAlign={{ xs: 'right' }} >
                    <Button size='small' variant='contained' color='primary' sx={{ minWidth: '121px', fontSize: '12px', textTransform: 'captalize' }}>Create Sale Order</Button>
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
                        />
                    </Search>
                </Grid>


            </Grid>
    </div>
  )
}

export default SubHeader
