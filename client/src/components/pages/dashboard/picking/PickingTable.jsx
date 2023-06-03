import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import scissors from '../../../assets/icons/scissors.png';
import inspectionBtn from '../../../assets/icons/inspectionbtn.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pickingPageDealer, request_AccessToken_MICROSOFT } from '../../../../utils/API_HELPERS';
import PreLoader from '../../HOC/Loading';
import { INS_CUT_ITEM } from '../../../../RTK/Reducers/Reducers';

const PickingTable = ({ searchToBL, searchIt }) => {
    const {  WH_SHIP_DETAILS } = useSelector(store => store.mainReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [rows, setRows] = React.useState([]);

    const [selected, setSelected] = React.useState({ id: "", item: {} })


    // console.log("successPickData0", successPickData0);
    React.useEffect(() => {
        setLoading(true);


        if (WH_SHIP_DETAILS?.shipItems?.length) {
            request_AccessToken_MICROSOFT()
                .then(decide => {
                    if (decide.success) {
                        pickingPageDealer({
                            token: decide.token,
                            picks: WH_SHIP_DETAILS?.shipItems,
                        }).then(res => {
                            console.log("---------pickingPageDealer---", res);
                            if (!(res.error)) {
                                setData(res.data);
                                setRows(res.data);
                                setLoading(false);
                            }
                        })
                    }
                })
        }


        //eslint-disable-next-line
    }, [WH_SHIP_DETAILS?.shipItems])

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


    const handleClick = (item, NTO) => {
        dispatch(INS_CUT_ITEM(item));
        navigate(NTO);
    }

    const handleSelected = (id, item) => {
        // console.log(id, item);
        setSelected({ id, item });
    }


    return (
        <div>
            <PreLoader loading={loading}>
                <TableContainer component={Paper} className="bsn">
                    <Table size="small" aria-label="a dense table">
                        <TableHead >
                            <TableRow>
                                <TableCell sx={{ border: '1px solid black', backgroundColor: '#E9EDF1' }}> Item </TableCell>
                                <TableCell sx={{ border: '1px solid black', backgroundColor: '#E9EDF1' }}> BIN </TableCell>
                                <TableCell sx={{ border: '1px solid black', backgroundColor: '#E9EDF1' }} >LOT</TableCell>
                                <TableCell sx={{ border: '1px solid black', backgroundColor: '#E9EDF1' }} > Quantity </TableCell>
                                <TableCell sx={{ borderBottom: 0, }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, indx) => {
                                const uid = `${row.name}-${indx}`;
                                return (
                                    <TableRow key={indx} sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': { backgroundColor: "rgb(233, 237, 241,.3)" },
                                        cursor: 'pointer',
                                        backgroundColor : selected.id === uid ? "rgb(233, 237, 241,.4)":"none"
                                    }}
                                        onClick={e => handleSelected(uid, row)}
                                    >
                                        <TableCell> {row.name} </TableCell>
                                        <TableCell> {row.binCode} </TableCell>
                                        <TableCell>{row.lotNo}</TableCell>
                                        <TableCell>{row.quantityBase}</TableCell>
                                        <TableCell align='right'>
                                            <Button variant='contained' startIcon={<img style={{ width: '20px' }} alt='scissors' src={inspectionBtn} />} sx={{ backgroundColor: '#49D668', fontSize: '11px' }}
                                                onClick={() => handleClick(row, '/inspection')}
                                            >Inspect</Button> &nbsp; &nbsp;
                                            <Button variant='contained' startIcon={<img style={{ width: '20px' }} alt='scissors' src={scissors} />} sx={{ backgroundColor: '#9747FF', fontSize: '11px' }}
                                                onClick={() => handleClick(row, '/cutting')}
                                            >cut</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </PreLoader>
        </div>
    )
}

export default PickingTable