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
import { useMsal } from '@azure/msal-react';
import { pickingPageDealer, request_AccessToken_MICROSOFT } from '../../../../utils/API_HELPERS';
import PreLoader from '../../HOC/Loading';
import { INS_CUT_ITEM } from '../../../../RTK/Reducers/Reducers';

const PickingTable = () => {
    const { successPickData0, successPickData1 } = useSelector(store => store.mainReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const { instance, accounts } = useMsal();

    React.useEffect(() => {
        setLoading(true);
        request_AccessToken_MICROSOFT(instance, accounts)
            .then(token => {
                pickingPageDealer({
                    token: token,
                    picks: successPickData1,
                }).then(res => {
                    if (!(res.error)) {
                        setRows(res.data);
                        setLoading(false);
                    }
                })

            })
        //eslint-disable-next-line
    }, [successPickData0])


    const handleClick = (item, NTO) => {
        dispatch(INS_CUT_ITEM(item));
        navigate(NTO);
    }






    return (
        <div>
            <PreLoader loading={loading}>
                <TableContainer component={Paper} className="bsn">
                    <Table size="small" aria-label="a dense table">
                        <TableHead >
                            <TableRow>
                                <TableCell sx={{ border: '1px solid black', backgroundColor: '#E9EDF1' }}> BIN </TableCell>
                                <TableCell sx={{ border: '1px solid black', backgroundColor: '#E9EDF1' }} >LOT</TableCell>
                                <TableCell sx={{ border: '1px solid black', backgroundColor: '#E9EDF1' }} > Quantity </TableCell>
                                <TableCell sx={{ borderBottom: 0, }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, indx) => (
                                <TableRow key={indx} sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                // onClick={e => handleSelect(row)}
                                >
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
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </PreLoader>
        </div>
    )
}

export default PickingTable