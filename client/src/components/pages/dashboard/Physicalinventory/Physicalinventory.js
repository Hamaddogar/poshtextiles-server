import { Box, Button } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import './inventory.css'
import PhysicalInventoryTable from './PhysicalInventoryTable'

const Physicalinventory = () => {
    const {  inventoryAdjustment, perPage } = useSelector(store => store.mainReducer);
    return (
        <div>
            <Box sx={{ border: "1px solid black", padding: "24px 12px 8px 30px" }}>
                <Box sx={{ width: "60%", margin: "auto" }}>
                    <Stack direction={"row"} spacing={2} justifyContent={"space-around"}>
                        <Button sx={{ background: "#FFFFFF", border: "1px solid #7F7F7F", padding: "20px 40px", borderRadius:0, color:'#B6B6B6', minWidth:'250px' }} size='large'>Scan Bin</Button>
                        <Button sx={{ background: "#FFFFFF", border: "1px solid #7F7F7F", padding: "20px 40px", borderRadius:0, color:'#B6B6B6', minWidth:'250px' }} size='large'>Scan LOT</Button>
                        <Button sx={{ background: "#FFFFFF", border: "1px solid #7F7F7F", padding: "20px 40px", borderRadius:0, color:'#B6B6B6', minWidth:'250px' }} size='large'>Physical Qty</Button>
                    </Stack>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                    <Button variant="contained" sx={{ background: "#495BD6", color: "white" }}>OK</Button>
                </Box>
            </Box>
            <Box>
                <PhysicalInventoryTable perPage={perPage} data={inventoryAdjustment} />
            </Box>
        </div>
    )
}

export default Physicalinventory