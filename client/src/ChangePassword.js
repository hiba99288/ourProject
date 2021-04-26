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

function ChangePassword(props){
  const classes = useStyles();

  const info = {
    oldpass: '',
    newpass: '',
    confirmpass: ''
  }

  const history = useHistory(); 
  // const {updateForcer, ...other} = props;

  console.log(props);

  const changePassword = (e) => {
    e.preventDefault();

    if( (info.newpass === info.confirmpass) && 
        (info.newpass !== info.oldpass) &&
        (info.oldpass.length > 0) &&
        (info.newpass.length > 0) &&
        (info.confirmpass.length > 0)        
      ){
      Axios.post("http://localhost:2000/api/changepass",{
        oldpass: info.oldpass,
        newpass: info.newpass,
        username: localStorage.getItem('username'),
        token: localStorage.getItem('token')
      })
        .then((response)=>{
          console.log(response);
          if (response.data=='success'){
            alert('نجح تغيير كلمة المرور')
            history.goBack();
          } else {
            alert('فشل تغيير كلمة المرور')
          }
        })
        .catch(err=>console.error(err));
    } else if (info.newpass !== info.confirmpass) {
      alert('كلمة المرور الجديدة وتأكيد كلمة المرور غير متطابقتين')
    } else if (info.newpass === info.oldpass) {
      alert('لا يمكن أن تكون كلمة المرور الجديدة نفس القديمة');
    } else if (
      !(info.oldpass.length > 0) ||
      !(info.newpass.length > 0) ||
      !(info.confirmpass.length > 0)  
    ){
      alert('يرجى إدخال جميع البيانات المطلوبة');
    } else {
      alert('حدث خطأ غير معروف');
    }
    info.oldpass = '';
    info.newpass = '';
    info.confirmpass = '';
    document.getElementById('oldpass').value = '';
    document.getElementById('newpass').value = '';
    document.getElementById('confirmpass').value = '';
  }

  return (
    <div className="Login" dir="ltr" style={{paddingBottom: '40px'}}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            تغيير كلمة المرور
          </Typography>
          <form class="login-form" method="POST" onSubmit={changePassword}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="oldpass"
              label="كلمة المرور القديمة"
              name="oldpass"
              autoFocus
              type="password"
              onChange={(e) => {
                info.oldpass = e.target.value;
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="newpass"
              label="كلمة المرور الجديدة"
              type="password"
              id="newpass"
              autoComplete="current-password"
              onChange={(e) => {
                info.newpass = e.target.value;
              }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmpass"
              label="تأكيد كلمة المرور"
              type="password"
              id="confirmpass"
              onChange={(e) => {
                info.confirmpass = e.target.value;
              }}
            />
  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              تغيير كلمة المرور
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default ChangePassword;
