import React from 'react'
import'../CommunCss.css'
import { Button, Stack, TextField } from '@mui/material'
import { Link } from 'react-router-dom'



function LoginPage() {
  
  return (
    <div>
        <Stack
        className='section-container'
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={4}
        >
            <div>
                Login page
            </div>
            <Stack
            direction="column"
            justifyContent="space-evenly"
            alignItems="stretch"
            spacing={2}>
            <TextField id="outlined-basic" label="Username" variant="outlined" />
            <TextField id="outlined-basic" label="Password" variant="outlined" type={"password"} />
            
            <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={0.5}
            >
            <Link to={'/'}>
            <Button>Create account</Button>
            </Link>
            <Link to={'/login'}>
            <Button>Login page</Button>
            </Link>
            </Stack>
            

            </Stack>
            
        </Stack>
    </div>
  )
}

export default LoginPage