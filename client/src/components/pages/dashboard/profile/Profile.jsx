import { useMsal } from '@azure/msal-react'
import { Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Profile = () => {
    const { accounts } = useMsal();
    const client_Info = accounts[0];
    
    return (
        <div>
            <Typography variant='h4'>Profile Details</Typography>
            <Grid spacing={2} container alignItems={'center'} justifyContent='center'>
                <Grid item xs={12}>
                    <Divider>Basic Information</Divider>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Name : </Typography>
                    <Box sx={{ backgroundColor: '#D0D3D6' }} p={1}> {client_Info?.name} </Box>
                </Grid>

                <Grid item xs={6}>
                    <Typography>username : </Typography>
                    <Box sx={{ backgroundColor: '#D0D3D6' }} p={1}> {client_Info?.username} </Box>
                </Grid>

                <Grid item xs={6}>
                    <Typography>homeAccountId : </Typography>
                    <Box sx={{ backgroundColor: '#D0D3D6' }} p={1}> {client_Info?.homeAccountId} </Box>
                </Grid>

                <Grid item xs={6}>
                    <Typography>environment : </Typography>
                    <Box sx={{ backgroundColor: '#D0D3D6' }} p={1}> {client_Info?.environment} </Box>
                </Grid>

                <Grid item xs={6}>
                    <Typography>tenantId : </Typography>
                    <Box sx={{ backgroundColor: '#D0D3D6' }} p={1}> {client_Info?.tenantId} </Box>
                </Grid>


                <Grid item xs={6}>
                    <Typography>localAccountId : </Typography>
                    <Box sx={{ backgroundColor: '#D0D3D6' }} p={1}> {client_Info?.localAccountId} </Box>
                </Grid>










                <Grid item xs={12}>
                    <Divider>ID Token Claims</Divider>
                </Grid>

                {
                    ["aud",
                        "iss",
                        "iat",
                        "nbf",
                        "exp",
                        "name",
                        "nonce",
                        "oid",
                        "preferred_username",
                        "rh",
                        "sub",
                        "tid",
                        "uti",
                        "ver",
                    ].map((key, indx) => <Grid item xs={6} key={indx}>
                        <Typography>{key} : </Typography>
                        <Box sx={{ backgroundColor: '#D0D3D6' }} p={1} noWrap={true} > {client_Info.idTokenClaims[key]} </Box>
                    </Grid>)
                }

            </Grid>
        </div>
    )
}

export default Profile
