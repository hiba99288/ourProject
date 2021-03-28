import React from 'react';
import {useState} from "react";
 import Axios from 'axios';
 import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
 import TextField from "@material-ui/core/TextField";
 import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import './styles.css'
const theme = createMuiTheme({
  direction: "rtl" // Both here and <body dir="rtl">
});
function Result(){
  const [idnumber , setIdnumber ]=useState("");
  const [phonenum , setPhonenum ]=useState("");
  const [pname , setPname ]=useState("");
  const [chknum , setChknum ]=useState("");
  const [chkresualt , setchkresualt ]=useState("");
  const login = () => {
  Axios.post("http://localhost:2000/chk",{
    idnumber:idnumber,
    phonenum:phonenum,
   }).then((response)=>{
       
    if(response.data.message)
    {
      setPname("غير موجود");
      setChknum(null );
      setchkresualt(null);
    }
     else{
       setPname(response.data[0].name  );
       setChknum(  response.data[0].Checknumber );
       setchkresualt(response.data[0].Checkresualt );
        
     } });
  };
    return <div className="ss"  > 
 <div className="ff">
<div>
  <ThemeProvider theme={theme}>
       <Grid style={{direction:"rtl"}} item xs={12} sm={6}>
         </Grid>
        <TextField id="outlined-secondary"
        label="رقم الهوية"
        variant="outlined"
        color="blue"  onChange={(e)=>{
        setIdnumber(e.target.value);}} />
        <br></br>
        <br></br>
        <br></br>
        <TextField id="outlined-secondary "
        label="رقم الهاتف"
        variant="outlined"
        color="blue"
           onChange={(e)=>{
    setPhonenum(e.target.value);} }  /> </ThemeProvider>
    <br></br> </div>
 <div className="btn"> <Button variant="contained" color="primary"onClick={login} >
    الحصول على النتيحة </Button>
 </div>
<div className="app-text">
<h1>{pname}</h1> 

<h1>{chkresualt=="positive"? <h1 style={{background:"red"}} >{chkresualt}</h1>:<h1 style={{background:"green"}} >{chkresualt}</h1>}


</h1> 
 
<h1>{chknum}</h1>
    </div> </div> </div> }
export default Result ;