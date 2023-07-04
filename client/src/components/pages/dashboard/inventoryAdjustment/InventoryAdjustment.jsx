import { Box } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_NEW_INVENTORY_PRODUCT } from '../../../../RTK/Reducers/Reducers';
import { handleNoAction } from '../reUseAbles/ReuseAbles'
import InventoryAdjustmentTable from './InventoryAdjustmentTable';
import CreateNewLineItem from '../reUseAbles/CreateNewLineItem';


const InventoryAdjustment = () => {
    const { inventoryAdjustment, perPage } = useSelector(store => store.mainReducer);
    const dispatch = useDispatch();
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(ADD_NEW_INVENTORY_PRODUCT({
            lotNo: 'LOT221839', itemName: 'TITAN-101', description: '100% Silk White', remainingQty: 70, adjQty: 100, price: 70
        }));
        document.getElementById('new_data').reset();
    }

    return (
        <div>
            <Box mb={1}>
                <CreateNewLineItem readOnly={true} handleSubmitLineItem={handleSubmit} handleCancel={handleNoAction} />
                {/* table */}
                <Box>
                    <InventoryAdjustmentTable perPage={perPage} data={inventoryAdjustment} />
                </Box>

            </Box>
        </div>
    )
}

export default InventoryAdjustment;