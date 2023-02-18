import { Button, Grid, Typography, useMediaQuery } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import login from "../../assets/images/login.png"

const Page404 = () => {

    const matches = useMediaQuery('(max-width:600px)');
    return (
        <div>

            <Container maxWidth='md' >
                <Grid container sx={{ minHeight: '100vh' }} alignItems='center'>
                    <Grid item xs={12} sm={6} sx={{ display: matches ? "none" : 'block' }}>
                        <Box component='img' src={login} alt="banner" sx={{ maxWidth: '350px', width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={5}>
                        <Box textAlign='center'>

                            {/* <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={'text'}
                                    value={values.mail}
                                    onChange={handleChange('password')}
                                />
                            </FormControl>


                            <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>


                        </Box>
                        <TextField variant='outlined' size='small' fullWidth
                            InputAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>

                            }
                        />
                        <br /> */}
                            <Typography sx={{ fontFamily: 'Roboto', fontSize: '63px', color: '#636466', fontWeight: '100', lineHeight: '74px', fontStyle: 'normal' }}> Page Not Found </Typography>
                            <Box textAlign='center' mt={4}>
                                <Link to={-1}>
                                    <Button variant='contained' size='medium' color='primary' sx={{ fontSize: '12px', backgroundColor: '#28348A' }} >Back to Dashboard</Button>
                                </Link>

                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </Container>



        </div>
    )
}

export default Page404
