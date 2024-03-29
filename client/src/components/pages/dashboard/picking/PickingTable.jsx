import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import scissors from '../../../assets/icons/scissors.png';
import inspectionBtn from '../../../assets/icons/inspectionbtn.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLots, pickingPageDealer, request_AccessToken_MICROSOFT } from '../../../../utils/API_HELPERS';
import PreLoader from '../../HOC/Loading';
import { INS_CUT_ITEM, WH_SHIP_DETAILS_FUN } from '../../../../RTK/Reducers/Reducers';
import GeneralModel from '../reUseAbles/GeneralModel';
import { MoreVert } from '@mui/icons-material';
import { Toaster } from '../reUseAbles/Toasters';

const PickingTable = ({ searchToBL, searchIt, selected, setSelected, data, setData, rows, setRows }) => {
    const { WH_SHIP_DETAILS } = useSelector(store => store.mainReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [lots, setLots] = React.useState({ loading: false, data: [] });
    const [generalModel, setGeneralModel] = React.useState(false)

    React.useEffect(() => {
        if (WH_SHIP_DETAILS?.shipItems?.length) {
            setLoading(true);
            request_AccessToken_MICROSOFT()
                .then(decide => {
                    if (decide.success) {
                        pickingPageDealer({
                            token: decide.token,
                            picks: WH_SHIP_DETAILS?.shipItems,
                        }).then(res => {
                            if (!(res.error)) {
                                const withId = res.data.map((item, indx) => {
                                    const uid = `${item?.name}-${indx}-main`;
                                    return { id: uid, ...item }
                                })
                                setData(withId);
                                setRows(withId);
                                setLoading(false);
                            }
                        })
                    }
                })
        };
        //eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        // binCode.lotNo
        if (searchToBL === 'lot' && searchIt) {
            const filtered = data.filter(item => item.lotNo === searchIt);
            setRows(filtered)
        } else if (searchToBL === 'bin' && searchIt) {
            const filtered = data.filter(item => item.binCode === searchIt);
            setRows(filtered)
        } else if (searchIt === '') {
            setRows(data)
        }
        //eslint-disable-next-line
    }, [searchIt, searchToBL])


    const handleClickINS_CUT_ITEM = (item, NTO) => {
        dispatch(INS_CUT_ITEM(item));
        navigate(NTO);
    }

    const handleSelected = (indx, id, item) => setSelected({ id, item });

    const handleLots = (item) => () => {
        setLots({ loading: true, data: [] })
        setGeneralModel(true);
        request_AccessToken_MICROSOFT()
            .then(decide => {
                if (decide.success) {
                    getLots({
                        token: decide.token,
                        item: {
                            no: item.itemNo,
                            locationCode: item.locationCode
                        }
                    }).then(res => {
                        const withId = res.lots.map((item, indx) => {
                            const uid = `${item?.name}-${indx}-lot`;
                            return { id: uid, ...item }
                        })
                        setLots({ loading: false, data: withId });
                    })
                }
            })
    };

    const handleSelectedLotNo = (lotDeails) => {
        setSelected(pv => ({ ...pv, item: { ...pv.item, lotNo: lotDeails.lotNo }, patch: true }));
        const newData = data.map(item => item.id === selected.id ? { ...item, lotNo: lotDeails.lotNo } : item)
        const patchedLotNoItems = WH_SHIP_DETAILS?.shipItems.map(item =>
            (item.systemId === selected.item.systemId &&
                item.actionType === selected.item.actionType
            ) ? { ...item, lotNo: lotDeails.lotNo } : item);

        dispatch(WH_SHIP_DETAILS_FUN({
            ...WH_SHIP_DETAILS,
            shipItems: patchedLotNoItems
        }))
        setData(newData);
        setRows(newData);
        // console.log(data);
        Toaster('success', 'Lot No Selected. Patch Now!');
    };


    return (
        <div>
            <GeneralModel open={generalModel} setOpen={setGeneralModel} heading={'Select Lot No'}>
                <Box sx={{ width: '400px' }}></Box>
                <Grid container alignItems={'center'} justifyContent={'space-between'} spacing={2}>

                    <Grid item xs={12}>
                        <TableContainer component={Paper} className="bsn">
                            <Table size="small" aria-label="a dense table">
                                <TableHead >
                                    <TableRow>
                                        <TableCell sx={{ border: '1px solid black', backgroundColor: '#E9EDF1' }}> Item </TableCell>
                                        <TableCell sx={{ border: '1px solid black', backgroundColor: '#E9EDF1' }} >LOT</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        lots?.data?.length > 0 && lots?.data?.map((lot, indx) =>
                                        (<TableRow key={indx} sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            '&:hover': { backgroundColor: "rgb(233, 237, 241,.6)" },
                                            cursor: 'pointer',
                                        }}
                                            onClick={e => handleSelectedLotNo(lot)}
                                        >
                                            <TableCell> {lot?.itemNo} </TableCell>
                                            <TableCell> {lot?.lotNo} </TableCell>
                                        </TableRow>))
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12}>
                        {lots.loading && <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress />
                        </Box>}
                        {!lots.loading && lots?.data?.length === 0 && <Box sx={{ textAlign: 'center' }}>
                            <Typography>Not Lot Found</Typography>
                        </Box>}
                    </Grid>
                </Grid>
            </GeneralModel>
            <PreLoader loading={loading}>
                <TableContainer component={Paper} className="bsn">
                    <Table size="small" aria-label="a dense table">
                        <TableHead >
                            <TableRow>
                                <TableCell sx={{ border: '1px solid black', backgroundColor: '#E9EDF1' }}> Item </TableCell>
                                <TableCell sx={{ border: '1px solid black', backgroundColor: '#E9EDF1' }}> BIN </TableCell>
                                <TableCell sx={{ border: '1px solid black', backgroundColor: '#E9EDF1' }} >LOT</TableCell>
                                <TableCell sx={{ border: '1px solid black', backgroundColor: '#E9EDF1' }} > Quantity </TableCell>
                                <TableCell sx={{ border: '1px solid black', backgroundColor: '#E9EDF1' }} > Action Type </TableCell>
                                <TableCell sx={{ borderBottom: 0, }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows && rows?.map((row, indx) => (
                                <TableRow key={indx} sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { backgroundColor: "rgb(233, 237, 241,.3)" },
                                    cursor: 'pointer',
                                    backgroundColor: row?.patched ?
                                        "rgb(73, 214, 104,.25)"
                                        :
                                        selected.id === row.id ? "rgb(233, 237, 241,.6)" : "none"
                                }}
                                    onClick={e => handleSelected(indx, row.id, row)}
                                >
                                    <TableCell> {row?.name} </TableCell>
                                    <TableCell> {row?.binCode} </TableCell>
                                    <TableCell >
                                        <Stack direction='row' alignItems={'center'} justifyContent={'space-between'}>
                                            <span>{row?.lotNo}</span> <MoreVert sx={{ '&:hover': { color: '#495BD6' } }} onClick={handleLots(row)} />
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{row?.quantityBase}</TableCell>
                                    <TableCell>{row?.actionType}</TableCell>

                                    <TableCell align='right'>
                                        <Button variant='contained' startIcon={<img style={{ width: '20px' }} alt='scissors' src={inspectionBtn} />} sx={{ backgroundColor: '#49D668', fontSize: '11px' }}
                                            onClick={() => handleClickINS_CUT_ITEM(row, '/inspection')}
                                        >Inspect</Button> &nbsp; &nbsp;
                                        <Button variant='contained' startIcon={<img style={{ width: '20px' }} alt='scissors' src={scissors} />} sx={{ backgroundColor: '#9747FF', fontSize: '11px' }}
                                            onClick={() => handleClickINS_CUT_ITEM(row, '/cutting')}
                                        >cut</Button>
                                    </TableCell>
                                </TableRow>
                            )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </PreLoader>
        </div>
    )
}

export default PickingTable