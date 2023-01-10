import { Button, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import'../CommunCss.css'
import axios from 'axios';

function SignupPage() {
  const baseURL = "http://localhost:8080/user/create";
  const goHome = useNavigate()
    
    const [firstName,setFirstName]= useState("")
    const [lastName,setLastName]= useState("")
    const [username,setUsername]= useState("")
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [passwordConf,setPasswordConf]= useState("")
    const [DOB,setDOB]= useState("")
    const [firstNameErr,setFirstNameErr]= useState("")
    const [lastNameErr,setLastNameErr]= useState("")
    const [usernameErr,setUsernameErr]= useState("")
    const [emailErr,setEmailErr]= useState("")
    const [passwordErr,setPasswordErr]= useState("")
   

      

    const createUser = async()=>{
      setFirstNameErr("");
      setLastNameErr("")
      setUsernameErr("")
      setEmailErr("")
      setPasswordErr("")
      await axios.post(baseURL,{
        firstName:firstName,
        lastName:lastName,
        username:username,
        password:password,
        email:email,
        DOB:DOB
      }).then(function (response) {
        console.log(response)
        console.log(response.data)
        setFirstName("")
        setLastName("")
        setUsername("")
        setPassword("")
        setPasswordConf("")
        setEmail("")
        setDOB("")
      })
      .catch(error => {
        setFirstNameErr(error.response.data.firstName);
        setLastNameErr(error.response.data.lastName)
        setUsernameErr(error.response.data.username)
        setEmailErr(error.response.data.email)
        setPasswordErr(error.response.data.password)
        setTimeout(()=>{
          // goHome("/")
        },2000)
      })
    }
  return (
    <div>
        <Stack
        className='section-container'
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={4}
        >
            <div>
                The signup page
            </div>
            <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            spacing={2}>
            <TextField id="outlined-basic" label="First name" variant="outlined" onChange={(event)=>{setFirstName(event.target.value)}} value={firstName} />
            <TextField id="outlined-basic" label="Last name" variant="outlined"  onChange={(event)=>{setLastName(event.target.value)}} value={lastName}/>
            <TextField id="outlined-basic" label="Username" variant="outlined"onChange={(event)=>{setUsername(event.target.value)}} value={username} />
            <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(event)=>{setEmail(event.target.value)}} value={email}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" type={"password"} onChange={(event)=>{setPassword(event.target.value)}} value={password}/>
            <TextField id="outlined-basic" label="Confirm Password" variant="outlined" type={"password"} onChange={(event)=>{setPasswordConf(event.target.value)}} value={passwordConf}/>
            <TextField id="outlined-basic" helperText="select your date of birth" variant="outlined"  onChange={(event)=>{setDOB(event.target.value)}} value={DOB} />
            <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={0.5}
            >
            {/* <Link to={'/'}> */}
            <Button onClick={createUser}>Create account</Button>
            {/* </Link> */}
            <Link to={'/login'}>
            <Button>Login page</Button>
            </Link>
            </Stack>
            <Stack>
              <div>{firstNameErr}</div>
              <div>{lastNameErr}</div>
              <div>{usernameErr}</div>
              <div>{emailErr}</div>
              <div>{passwordErr}</div>
            </Stack>
            

            </Stack>
            
        </Stack>
    </div>
  )
}

export default SignupPage