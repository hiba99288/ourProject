import React from 'react';
import "./Login.css";
import {useState} from "react";
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'; 
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor:'white',
      marginTop : "-21px",
      alignItems: "center",
    
      width: "613px",
      height: "479px",
      paddingTop: "60px",
      padding: "55px",
      borderRadius: "30px"
    },
  
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function Login(){
    const classes = useStyles();
const [username , setUsername ]=useState("");
const [password , setPassword ]=useState("");
 const history = useHistory(); 
const login = (e) => {
e.preventDefault();
Axios.post("http://localhost:2000/login",{
username:username,
password:password,
 }).then((response)=>{
    if (response.data==false){
      // sweetalert
        history.push('./Login');}
    else{
        if(response.data[0].account_type=="admin")
 history.push('./adminPage2');
 else  if(response.data[0].account_type=="dr")
 history.push('./doctorpage'); }  
 console.log(response);}); };

return ( 
<div className="Login">
  <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        
          <Typography component="h1" variant="h5">
            تسجيل الدخول
          </Typography> 
          <form method="POST"
    onSubmit={login} >
      <TextField variant="outlined"  margin="normal"  required   fullWidth id="email" label="username"  name="email"autoComplete="email" autoFocus onChange={(e)=>{setUsername(e.target.value);}}/>
       <TextField  variant="outlined"  margin="normal" required fullWidth name="password"  label="Password"type="password" id="password" autoComplete="current-password" onChange={(e)=>{setPassword(e.target.value);} } />
         
 
 <Button  type="submit"  fullWidth variant="contained"  color="primary"  className={classes.submit}>Login</Button></form></div></Container></div>
)}
export default Login ;

