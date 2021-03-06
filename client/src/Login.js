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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props){
  const classes = useStyles();
  const [username , setUsername ]=useState("");
  const [password , setPassword ]=useState("");
  const history = useHistory(); 
  const {updateForcer, ...other} = props;

  console.log(props);

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:2000/login",{
      username:username,
      password:password,
    })
      .then((response)=>{
        console.log(response);
        if (response.data==false){
            history.push('./Login');
        } else {
          if(response.data[0].account_type=="admin"){
            localStorage.setItem("account_type", "admin");
            localStorage.setItem('token', response.data[0].token);
            localStorage.setItem('username', response.data[0].username);
            history.push('./adminPage2');
          } else  if(response.data[0].account_type=="dr") {
            localStorage.setItem("account_type", "dr");
            localStorage.setItem('token', response.data[0].token);
            localStorage.setItem('username', response.data[0].username);
            history.push('./doctorpage');
          }
          updateForcer();
        }
      }
    );
  }

  return (
    <div className="Login" dir="ltr">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            ?????????? ????????????
          </Typography>
          <form class="login-form" method="POST" onSubmit={login}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="?????? ????????????????"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="???????? ??????????"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              ?????????? ????????????
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
