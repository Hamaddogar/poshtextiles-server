import React from 'react'
import { Avatar, ButtonBase, FormControl, Hidden, Select } from '@mui/material'
import { Box, Stack } from '@mui/system'
import hamburger from '../assets/icons/hamburger.png'
import avatar from '../assets/icons/avatar.png'
import notification from '../assets/icons/notification.png'

import assignment from '../assets/icons/assignment.png'
import buildcircle from '../assets/icons/buildcircle.png'
import getapp from '../assets/icons/getapp.png'
import localshipping from '../assets/icons/localshipping.png'
import swaphoriz from '../assets/icons/swaphoriz.png'
import partial from '../assets/icons/partial.png'

import { Link, useNavigate } from 'react-router-dom'
import { ArrowDropDown, Login, Mail, Settings } from '@mui/icons-material'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { LOG_OUT } from '../../RTK/Reducers/Reducers'
import { useDispatch } from 'react-redux'
import { styleSlect } from '../pages/dashboard/reUseAbles/ReuseAbles'



export const menuStyle = {
    elevation: 0,
    sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 8,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
};



const btn = {
    background: '#FFFFFF',
    boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
    padding: '10px 20px',
    fontSize: '11px',
    fontWeight: 800
}
const btnSm = {
    background: '#FFFFFF',
    boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '9px',
    fontWeight: 600
}

const lnk = {
    textDecoration: 'none',
    color: 'inherit',
}



const Header = () => {
    const dispatch = useDispatch();
    const [stateDrawer, setStateDrawer] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState({
        name: null,
        avatar: null,
        notifications: null,
    });

    const navigate = useNavigate();


    const handleClick = (event, menu) => setAnchorEl({ ...anchorEl, [menu]: event.currentTarget });
    const handleClose = (e, menu) => setAnchorEl({ ...anchorEl, [menu]: null });
    const handleLogOut = (e, menu) => dispatch(LOG_OUT());



    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { return; }
        setStateDrawer(open);
    };

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
                    { icon: assignment, linkTo: '/' },
                    { icon: swaphoriz, linkTo: 'stock-details' },
                    { icon: buildcircle, linkTo: 'setting' },
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









    const [route, setRoute] = React.useState("/");
    const myRoutes = [
        { linkTo: "/", name: "homee" },
        { linkTo: "orders", name: "orders" },
        { linkTo: "notifications", name: "notifications" },
        { linkTo: "profile", name: "profile" },
        { linkTo: "setting", name: "setting" },
        { linkTo: "shipping-quote", name: "shipping-quote" },
        { linkTo: "charge-card", name: "charge-card" },
        { linkTo: "history", name: "history" },
        { linkTo: "stock-details", name: "stock-details" },
        { linkTo: "inspect-cut", name: "inspect-cut" },
        { linkTo: "inventory", name: "inventory" },
        { linkTo: "bin", name: "Bin Page" },
        { linkTo: "pinventory", name: "Physical Inventory" },
        { linkTo: "picking", name: "Picking Page" },
        { linkTo: "inspection", name: "Inspection Page" },
        { linkTo: "inventory-adjustment", name: "Inventory Adjustment" },
    ]
    

    React.useEffect(() => {
        // navigate(route);
        // alert(route)
        //eslint-disable-next-line
    }, [route]);





    return (
        <Box px={3} py={{ xs: 1, md: 2 }} >
            <Stack direction='row' spacing={3} alignItems='center' justifyContent={'space-between'} >
                <Stack direction='row' columnGap={{ xs: 2, md: 10 }} alignItems='center'  >
                    <Box>
                        <Box component='img' src={hamburger} alt='menu' width='30px' sx={{ cursor: 'pointer' }}
                            onClick={toggleDrawer(true)}
                        />
                        <Hidden smDown>
                            <Box
                                component='img' src={partial} alt='menu'
                                className='partial'
                                onClick={toggleDrawer(true)}
                            // onDrag={toggleDrawer(true)}
                            />
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
                    <Box>
                        <Hidden smDown>
                            <Stack direction={'row'} spacing={{ xs: 1, md: 3 }} alignItems='center'>
                                <Link style={lnk} to='/shipping-quote'>
                                    <ButtonBase sx={btn} size='small' > SHIPPING QUOTE </ButtonBase>
                                </Link>
                                <Link style={lnk} to='/charge-card'>
                                    <ButtonBase sx={btn} size='small' > CHARGE CARD </ButtonBase>
                                </Link>
                                <Link style={lnk} to='/history'>
                                    <ButtonBase sx={btn} size='small' > HISTORY </ButtonBase>
                                </Link>
                                <Box>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="routes-select-label"
                                            id="routes-select"
                                            value={route}
                                            onChange={(e) => setRoute(e.target.value)}
                                            size='small'
                                            sx={{ ...styleSlect, backgroundColor: 'white', }}
                                        >
                                            {
                                                myRoutes.map(route => <MenuItem value={route.linkTo} sx={{ fontSize: '12px' }}>{route.name}</MenuItem>)
                                            }

                                        </Select>
                                    </FormControl>
                                </Box>
                            </Stack>
                        </Hidden>
                    </Box>
                </Stack>
                <Box>
                    <Stack direction={'row'} spacing={1} alignItems='center'>
                        <ButtonBase
                            aria-controls={Boolean(anchorEl.name) ? 'name-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={Boolean(anchorEl.name) ? 'true' : undefined}
                            onClick={(e) => handleClick(e, 'name')}
                            disableRipple
                            sx={{ color: '#6D6D6D' }}
                        >
                            John Doe <ArrowDropDown sx={{ fontSize: '18px', color: '#6D6D6D' }} />
                        </ButtonBase>

                        <Box component='img'
                            src={avatar}
                            alt=" "
                            sx={{ width: '22px', cursor: 'pointer' }}
                            aria-controls={Boolean(anchorEl.avatar) ? 'avatar-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={Boolean(anchorEl.avatar) ? 'true' : undefined}
                            onClick={(e) => handleClick(e, 'avatar')}
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

            <Hidden smUp>
                <Stack direction={'row'} justifyContent='center' spacing={{ xs: 1, md: 3 }} alignItems='center'>
                    <Link style={lnk} to='/shipping-quote'>
                        <ButtonBase sx={btnSm} size='small' > SHIPPING QUOTE </ButtonBase>
                    </Link>
                    <Link style={lnk} to='/charge-card'>
                        <ButtonBase sx={btnSm} size='small' > CHARGE CARD </ButtonBase>
                    </Link>
                    <Link style={lnk} to='/history'>
                        <ButtonBase sx={btnSm} size='small' > HISTORY </ButtonBase>
                    </Link>
                    <Box>
                        <FormControl fullWidth>
                            <Select
                                labelId="routes-select-label"
                                id="routes-select"
                                value={route}
                                onChange={(e) => setRoute(e.target.value)}
                                size='small'
                                sx={{ ...styleSlect, backgroundColor: 'white', }}
                            >
                                {
                                    myRoutes.map(route => <MenuItem value={route.linkTo} sx={{ fontSize: '12px' }}>{route.name}</MenuItem>)
                                }

                            </Select>
                        </FormControl>
                    </Box>
                </Stack>
            </Hidden>


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
                        <Avatar sx={{ '&.MuiAvatar-root': { width: 18, height: 18, fontSize: '12px' } }} /> Profile
                    </MenuItem>
                </Link>

                <Link style={lnk} to='/settings'>
                    <MenuItem sx={{ fontSize: '12px' }}>
                        <Avatar sx={{ '&.MuiAvatar-root': { width: 18, height: 18, fontSize: '12px' } }} > <Settings sx={{ fontSize: '10px' }} /> </Avatar>Settings
                    </MenuItem>
                </Link>


                <MenuItem sx={{ fontSize: '12px' }} onClick={handleLogOut}>
                    <Avatar sx={{ '&.MuiAvatar-root': { width: 18, height: 18, fontSize: '12px' } }}  > <Login sx={{ fontSize: '10px' }} /> </Avatar> Log Out
                </MenuItem>

            </Menu>
            {/* Menu Avatar */}
            <Menu
                anchorEl={anchorEl.avatar}
                id="avatar-menu"
                open={Boolean(anchorEl.avatar)}
                onClose={e => handleClose(e, 'avatar')}
                onClick={e => handleClose(e, 'avatar')}
                PaperProps={menuStyle}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {/* <MenuItem sx={{ fontSize: '12px' }}>
                    <Avatar sx={{ '&.MuiAvatar-root': { width: 18, height: 18, fontSize: '12px' } }} /> Avatar
                </MenuItem> */}

                <Link style={lnk} to='/profile'>
                    <MenuItem sx={{ fontSize: '12px' }}>
                        <Avatar sx={{ '&.MuiAvatar-root': { width: 18, height: 18, fontSize: '12px' } }} /> Profile
                    </MenuItem>
                </Link>

                <Link style={lnk} to='/settings'>
                    <MenuItem sx={{ fontSize: '12px' }}>
                        <Avatar sx={{ '&.MuiAvatar-root': { width: 18, height: 18, fontSize: '12px' } }} > <Settings sx={{ fontSize: '10px' }} /> </Avatar>Settings
                    </MenuItem>
                </Link>


                <MenuItem sx={{ fontSize: '12px' }} onClick={handleLogOut}>
                    <Avatar sx={{ '&.MuiAvatar-root': { width: 18, height: 18, fontSize: '12px' } }}  > <Login sx={{ fontSize: '10px' }} /> </Avatar> Log Out
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

export default Header
