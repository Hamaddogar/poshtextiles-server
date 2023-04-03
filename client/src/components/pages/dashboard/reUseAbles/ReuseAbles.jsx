
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Box, Button, Menu, Stack, Typography } from '@mui/material';
import BackArrow from '../../../assets/icons/back-arrow.png'


export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 1),
    // '&:hover': {
    //     backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    marginRight: theme.spacing(0),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(0),
        width: 'auto',
    },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px'
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(.5, .5, .5, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
}));

export const styleSlect = {
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
};

export const NoBorder = {
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
}


export const searchDropDown = {
    ...styleSlect,
    maxWidth: 'auto',
    width: {
        xs: 'auto',
        md: '140px'
    },
    border: '1px solid #C1C1C1',
    borderRight: 'none',
    borderRadius: '0px',
};

export const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));




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



export const btn = {
    background: '#FFFFFF',
    boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
    padding: '10px 20px',
    fontSize: '11px',
    fontWeight: 800
}
export const btnSm = {
    background: '#FFFFFF',
    boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '9px',
    fontWeight: 600
}

export const lnk = {
    textDecoration: 'none',
    color: 'inherit',
}




export const subHeadInputStyle = { ...styleSlect, maxWidth: 'auto', backgroundColor: 'white', borderRadius: '4px', '&.MuiOutlinedInput-input': { padding: '0px' }, 'input': { padding: '0px 5px', fontWeight: 500 } }

export const headInputStyle = {
    backgroundColor: 'white',
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
    '&.MuiOutlinedInput-input': {
        padding: '0px'
    },
    'input': {
        padding: '2px 7px',
        fontWeight: 500,
        fontSize: '15px'
    },
}



export const Wrapper = ({ children, justifyContent, alignItems, ...rest }) => <Box {...rest} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: alignItems ? alignItems : 'center', justifyContent: justifyContent ? justifyContent : 'center' }}>
    {children}
</Box>

export const StackWrapper = ({ children, justifyContent, ...rest }) => <Stack {...rest} direction='row'>
    {children}
</Stack>

export const BackButton = ({ ...rest }) => <Button {...rest} startIcon={<img src={BackArrow} alt='back' width='18px' />} variant='contained' color='error' size='small' > Go back</Button>

export const SideTextWrapper = ({ text, icon, fontSize = { xs: '22px', sm: '50px', md: '65px' } }) => <Box id='title-section'>
    <Stack columnGap={2} direction='row' alignItems='center'>
        <Box component={'img'} src={icon} alt={' '} sx={{ width: '100%', maxWidth: '50px' }} />
        <Typography fontSize={fontSize} > {text} </Typography>
    </Stack>
</Box>



export const myRoutes = [
    { linkTo: "/", name: "home" },
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


export const scroller = () => {
    let displayer = document.getElementById('displayer');
    displayer.scrollTop = 0;
}