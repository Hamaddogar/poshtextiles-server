import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from '../../../utils/authConfig';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN } from '../../../RTK/Reducers/Reducers';
import MCL from "../../assets/images/mc.png"
import { Stack } from '@mui/system';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            Copyright &reg;
            <Link color="inherit" target={'_blank'} href="https://poshtextiles.netlify.app/">
                &nbsp;  poshtextiles &nbsp;
            </Link>
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const Login = () => {
    const { instance, accounts } = useMsal();
    const { isAuthorised } = useSelector(store => store.mainReducer);
    const dispatch = useDispatch();

    const handleLogin = () => {
        instance.loginPopup(loginRequest).catch(e => {
            toast.warn(`${e}`, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        });
    };

    React.useEffect(() => {
        if (accounts.length > 0 && !isAuthorised) {
            instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                dispatch(LOG_IN(response.accessToken))
            }).catch((e) => { console.log("-error ", e) });
        }
        //eslint-disable-next-line
    }, [accounts])




    return (
        <div>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/featured/1600x900/?textiles)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{
                            letterSpacing: '0.00938em',
                            color: 'rgb(99, 100, 102)',
                            fontFamily: 'Roboto',
                            fontSize: '43px',
                            fontWeight: 100,
                            lineHeight: '74px',
                            fontStyle: 'normal',
                        }}>
                            posh textiles
                        </Typography>
                        <Stack sx={{ mt: 2, }} rowGap={6} alignItems={'center'} justifyContent='space-between' >
                            <Stack alignItems={'center'} justifyContent='center' spacing={3} sx={{ width: '100%' }} >
                                <Button fullWidth sx={{ borderRadius: '0px', fontSize: '12px', textTransform: 'capitalize', color: '#1E1E1E' }} variant='outlined' startIcon={<img src={MCL} alt=" " style={{ width: '15px', }} />} color='primary' onClick={handleLogin}>Sign in with Microsoft</Button>
                            </Stack>
                            <Copyright mt={2} />
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login
