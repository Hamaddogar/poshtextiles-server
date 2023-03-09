import React from 'react';
import { Avatar, ButtonBase, Hidden } from '@mui/material';
import { Box, Stack } from '@mui/system';
import hamburger from '../assets/icons/hamburger.png';
import avatar from '../assets/icons/avatar.png';
import notification from '../assets/icons/notification.png';
import assignment from '../assets/icons/assignment.png';
import buildcircle from '../assets/icons/buildcircle.png';
import getapp from '../assets/icons/getapp.png';
import localshipping from '../assets/icons/localshipping.png';
import swaphoriz from '../assets/icons/swaphoriz.png';
import { Link } from 'react-router-dom';
import { ArrowDropDown, Login, Mail } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { LOG_OUT, USE_POSTMAN_TOKEN } from '../../RTK/Reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';
import { btnSm, lnk, menuStyle, scroller } from '../pages/dashboard/reUseAbles/ReuseAbles';
import { useMsal } from '@azure/msal-react';





const NavMenu = ({ children }) => {

    const dispatch = useDispatch();
    const { postMan } = useSelector(store => store.mainReducer);
    const { instance, accounts } = useMsal();
    // states
    const [stateDrawer, setStateDrawer] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState({
        name: null,
        avatar: null,
        notifications: null,
    });
    // actions
    const handleClick = (event, menu) => setAnchorEl({ ...anchorEl, [menu]: event.currentTarget });
    const handleClose = (e, menu) => setAnchorEl({ ...anchorEl, [menu]: null });

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { return; }
        setStateDrawer(open);
    };
    // Side bar Links 
    const list = () => (
        <Box
            // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            sx={{ backgroundColor: '#495BD6', paddingY: 2 }}
        >

            <List >
                {[
                    { icon: localshipping, linkTo: '/' },
                    { icon: getapp, linkTo: '/' },
                    { icon: assignment, linkTo: '/inventory' },
                    { icon: swaphoriz, linkTo: '/stock-details' },
                    { icon: buildcircle, linkTo: '/inventory-adjustment' },
                ].map((item, index) => (
                    <ListItem sx={{ margin: '15px 0px' }} key={index} disablePadding>
                        <Link style={lnk} to={item.linkTo}>
                            <ListItemButton sx={{ padding: '0px 5px 0px 0px' }} >
                                <ListItemIcon sx={{ justifyContent: 'center' }} >
                                    <img src={item.icon} alt={item.icon} style={{ maxWidth: '35px' }} />
                                </ListItemIcon>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    // Side bar Toggler
    const opener = () => {
        let sideBar = document.getElementById('partial-view');
        if (sideBar.classList.contains('partial-view-open')) {
            sideBar.classList.remove('partial-view-open')
            sideBar.classList.add('partial-view-close')
        } else {
            sideBar.classList.remove('partial-view-close')
            sideBar.classList.add('partial-view-open')
        }
    };
    // Microsoft Logout function
    const handleLogout = async () => {
        await instance.logoutPopup();
        dispatch(LOG_OUT())
    };
    // onClick={scroller}
    React.useEffect(() => {
        scroller();
        //eslint-disable-next-line
    }, [window.location.pathname])


    return (
        <Box px={3} py={{ xs: 1, md: 2 }} >
            <Stack direction='row' spacing={3} alignItems='center' justifyContent={'space-between'} >
                <Stack direction='row' columnGap={{ xs: 2, md: 10 }} alignItems='center'  >
                    <Box>
                        <Hidden smUp>
                            <Box component='img' src={hamburger} alt='menu' width='30px' sx={{ cursor: 'pointer' }}
                                onClick={toggleDrawer(true)}
                            />
                        </Hidden>
                        <Hidden smDown>
                            <Box component='img' src={hamburger} alt='menu' width='30px' sx={{ cursor: 'pointer' }}
                                onClick={opener}
                            />
                            <div id="partial-view" className="partial-view-close">
                                {list()}
                            </div>
                        </Hidden>
                        <SwipeableDrawer
                            anchor={'left'}
                            open={stateDrawer}
                            onClose={toggleDrawer(false)}
                            onOpen={toggleDrawer(true)}
                            sx={{
                                '& .MuiBackdrop-root': {
                                    backgroundColor: 'transparent'
                                }, '& .MuiDrawer-paper': {
                                    backgroundColor: '#FFFFFF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderTopRightRadius: '30px',
                                    borderBottomRightRadius: '30px',
                                    height: 'auto',
                                    top: '15%',
                                }
                            }}
                        >
                            {list('left')}
                        </SwipeableDrawer>
                    </Box>

                    <Stack direction='row' alignItems={'center'} spacing={2} >  {children}
                        {/* <Link style={lnk} to='/token'>
                            <ButtonBase sx={btnSm} size='small' > Update_Token </ButtonBase>
                        </Link>
                        <ButtonBase sx={btnSm} size='small'
                            onClick={() => {
                                dispatch(USE_POSTMAN_TOKEN())
                            }}
                        > {postMan ? "Using Post-Man Token" : "Using Account Token"} </ButtonBase> */}
                    </Stack>
                </Stack>
                <Box>
                    <Stack direction={'row'} spacing={1} alignItems='center'>
                        <ButtonBase
                            aria-controls={Boolean(anchorEl.name) ? 'name-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={Boolean(anchorEl.name) ? 'true' : undefined}
                            onClick={(e) => handleClick(e, 'name')}
                            disableRipple
                            sx={{ color: '#6D6D6D', fontSize: '12px' }}
                        >
                            {accounts[0]?.name} <ArrowDropDown sx={{ fontSize: '16px', color: '#6D6D6D' }} />
                        </ButtonBase>

                        <Box component='img'
                            src={avatar}
                            alt=" "
                            sx={{ width: '22px', cursor: 'pointer' }}
                        />
                        <Box component='img'
                            src={notification}
                            alt=" "
                            sx={{ width: '22px', cursor: 'pointer' }}
                            aria-controls={Boolean(anchorEl.notifications) ? 'notifications-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={Boolean(anchorEl.notifications) ? 'true' : undefined}
                            onClick={(e) => handleClick(e, 'notifications')}
                        />
                    </Stack>
                </Box>
            </Stack>
            {/* Menu Name */}
            <Menu
                anchorEl={anchorEl.name}
                id="name-menu"
                name="name"
                open={Boolean(anchorEl.name)}
                onClose={e => handleClose(e, 'name')}
                onClick={e => handleClose(e, 'name')}
                PaperProps={menuStyle}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Link style={lnk} to='/profile'>
                    <MenuItem sx={{ fontSize: '12px' }}>
                        <Avatar sx={{ bgcolor: '#15C39A', '&.MuiAvatar-root': { width: 20, height: 20, fontSize: '12px' } }} /> Profile
                    </MenuItem>
                </Link>

                <MenuItem sx={{ fontSize: '12px' }} onClick={() => handleLogout("popup")}>
                    <Avatar sx={{ bgcolor: '#FF8700', '&.MuiAvatar-root': { width: 20, height: 20, fontSize: '12px' } }}  > <Login sx={{ fontSize: '10px' }} /> </Avatar> Sign-Out
                </MenuItem>

            </Menu>
            {/* Menu Notifications */}
            <Menu
                anchorEl={anchorEl.notifications}
                id="Notifications-menu"
                open={Boolean(anchorEl.notifications)}
                onClose={e => handleClose(e, 'notifications')}
                onClick={e => handleClose(e, 'notifications')}
                PaperProps={menuStyle}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Link style={lnk} to='/notifications'>
                    <MenuItem sx={{ fontSize: '12px' }}>
                        <Avatar sx={{ '&.MuiAvatar-root': { width: 18, height: 18, fontSize: '12px' } }} > <Mail sx={{ fontSize: '10px' }} /> </Avatar> Notifications
                    </MenuItem>
                </Link>

                <Link style={lnk} to='/latest'>
                    <MenuItem sx={{ fontSize: '12px' }}>
                        <Avatar sx={{ '&.MuiAvatar-root': { width: 18, height: 18, fontSize: '12px' } }} > <Mail sx={{ fontSize: '10px' }} /> </Avatar> Lastest  - Notifications
                    </MenuItem>
                </Link>

            </Menu>



        </Box>
    )
}

export default NavMenu
