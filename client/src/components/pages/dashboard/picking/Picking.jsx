import { CircularProgress, ClickAwayListener, FormControl, Grow, MenuItem, MenuList, Paper, Popper, Select, Stack, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import 'bootstrap/dist/css/bootstrap.css';
import { BackButton, Search, SearchIconWrapper, StyledInputBase, handleNoAction, searchDropDown } from '../reUseAbles/ReuseAbles';
import PickingTable from './PickingTable';
import fabric from '../../../assets/icons/fabric.png';
import shelf from '../../../assets/icons/shelf.png';
import UpperHeader from '../reUseAbles/UpperHeader';
import { KeyboardArrowDown, SearchSharp } from '@mui/icons-material';
import { MARK_DONE_CUTTING_GREEN_PACKING } from '../../../../RTK/Reducers/Reducers';
import { registerPacking, request_AccessToken_MICROSOFT } from '../../../../utils/API_HELPERS';
import GeneralModel from '../reUseAbles/GeneralModel';
import { Toaster } from '../reUseAbles/Toasters';
// import UpdateLineItem from '../reUseAbles/UpdateLineItem';







const Picking = () => {

    const { saleOrderDetails } = useSelector(store => store.mainReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selected, setSelected] = React.useState({ id: "", item: {} })
    const [registered, setRegistered] = React.useState({ response: {}, loading: false })
    const [searchIt, setSearchIt] = React.useState("");
    const [searchToBL, setSearchToBL] = React.useState('lot');
    const [generalModel, setGeneralModel] = React.useState(false);

    const handleSearchTo = event => setSearchToBL(event.target.value);
    const handleSearchIt = event => setSearchIt(event.target.value);


    // Actions UI-Reserved-S
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) anchorRef.current.focus();
        prevOpen.current = open;
    }, [open]);
    const handleToggle = () => setOpen((prevOpen) => !prevOpen);
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) { return; }
        setOpen(false);
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') setOpen(false);
    }
    // Actions UI-Reserved-E

    const handleCompleteHere = () => {
        dispatch(MARK_DONE_CUTTING_GREEN_PACKING(true));
        navigate('/sale-order');
    }






    const handleRegisterPickItem = () => {
        if (selected.id && selected.item.WHPickNo) {
            setGeneralModel(true);
            setRegistered({ response: {}, loading: true });
            request_AccessToken_MICROSOFT()
                .then(decide => {
                    if (decide.success) {
                        registerPacking({ token: decide.token, pkCode: selected.item.WHPickNo })
                            .then(response => {
                                console.log("<<<<<handleRegisterPickItem >>>>>>>", response);
                                setRegistered({ response: response?.registerDetail, loading: false });
                            })
                            .catch(error => {
                                console.log("<<<<<", error);
                                // setLoading({ ...loading, load: false });
                            })
                    }
                })
        } else {
            Toaster('warn', "Please Select an Item from Table")
        }
    };







    return (
        <div>
            <GeneralModel open={generalModel} setOpen={setGeneralModel} heading={'Register Pick'}>
                <Box sx={{ width: '400px' }}></Box>
                <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={2}>
                    <Grid item xs={12}>
                        {registered.loading && <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress />
                        </Box>}
                    </Grid>
                    <Grid item xs={12}>
                        {!(registered?.loading) && registered?.response?.responseMsg &&
                            <Typography color={registered?.response?.responseMsg === "Created" ? "success" : 'error'}>
                                {registered?.response?.responseMsg}
                            </Typography>
                        }
                    </Grid>
                </Grid>
            </GeneralModel>

            {!saleOrderDetails && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}><CircularProgress /></Box>}
            {saleOrderDetails && <Box>
                <UpperHeader saleOrderDetails={saleOrderDetails} handleUpperHeaderSubmit={handleNoAction} />
                {/* main body */}
                <Box sx={{ padding: '15px', backgroundColor: 'white' }}>
                    <Box sx={{ padding: '15px', border: '1px solid black', borderStyle: 'inset' }}>
                        <Box >
                            <Stack direction='row' justifyContent={"center"} spacing={4}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box component='img' alt='img' src={fabric} />
                                    <Button variant='outlined' sx={{ color: '#6D6D6D', border: '1px solid #1D1D1E', borderRadius: 0 }} size='large' >Scan LOT</Button>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box component='img' alt='img' src={shelf} />
                                    <Button variant='outlined' sx={{ color: '#6D6D6D', border: '1px solid #1D1D1E', borderRadius: 0 }} size='large' >Scan Bin</Button>
                                </Box>
                            </Stack>

                            <Stack direction='row' justifyContent={'center'} sx={{ backgroundColor: '#E9EDF1' }} py={.6}>
                                <FormControl>
                                    <Select
                                        labelId="searchTo-select-label"
                                        id="searchTo-select"
                                        value={searchToBL}
                                        onChange={handleSearchTo}
                                        size='small'
                                        sx={searchDropDown}
                                    >
                                        <MenuItem value='bin' sx={{ fontSize: '12px' }}>Scan Bin</MenuItem>
                                        <MenuItem value='lot' sx={{ fontSize: '12px' }}>Scan LOT</MenuItem>
                                    </Select>
                                </FormControl>

                                <Search>
                                    <SearchIconWrapper>
                                        <SearchSharp sx={{ fontSize: '18px' }} />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search', width: '100%' }}
                                        size='small'
                                        fullWidth
                                        onChange={handleSearchIt}
                                    />
                                </Search>
                            </Stack>

                            <Box maxWidth={'md'} margin='20px auto auto auto' >
                                <PickingTable
                                    selected={selected}
                                    setSelected={setSelected}
                                    searchToBL={searchToBL}
                                    searchIt={searchIt}
                                />
                            </Box>

                        </Box>
                    </Box >
                </Box>

            </Box >}
            <Grid spacing={3} container direction='row' my={3} textAlign='right' mt={2} justifyContent={{ xs: 'center', md: 'space-between' }} alignItems={'center'}>
                <Grid item>
                    <Box>
                        <BackButton onClick={() => navigate('/sale-order')} />
                        &nbsp; &nbsp; &nbsp;
                        <Button
                            variant='contained'
                            sx={{ backgroundColor: '#495BD6' }}
                            size='small'
                            ref={anchorRef}
                            id="composition-button"
                            aria-controls={open ? 'composition-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            endIcon={<KeyboardArrowDown />}
                        > Actions </Button>
                    </Box>
                </Grid>
            </Grid>

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom', }}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                    sx={{ backgroundColor: '#495BD6', color: 'white' }}
                                    onClick={handleClose}
                                >
                                    <MenuItem sx={{ borderBottom: '1px solid white', fontSize: '13px' }} onClick={handleRegisterPickItem} >Register Pick Now</MenuItem>
                                    <MenuItem sx={{ fontSize: '13px' }} onClick={handleCompleteHere}>Complete Picking</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div >
    )
}

export default Picking
