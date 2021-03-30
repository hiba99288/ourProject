import React, { useEffect, useState   } from "react";
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
function UpdateResult() {


  const [values,setValues]= useState({
    CovidTestDate :null,
    covidTestResult:null,
    Idnumber:null,
    
  })
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });};
   const History=useHistory();
   const addTest =(e) => {
    e.preventDefault();
    Axios.post('http://localhost:2000/tests',{
            
      values
}).then(()=>{

console.log("success");
 
History.push('/adminPage2');
})
}; 


    return ( 
    <div>
      <form onSubmit={addTest}>
      <h2 className="name">رقم الهوية</h2><br></br><br></br>
      <input className="firstname" type="number"  onChange={handleChange('Idnumber')}  /> 

       <h2 className="name">نتيجة الفحص</h2><br></br><br></br>
  <select    className="option"  onChange={handleChange('covidTestResult')}>
  
              <option>P</option>
              <option>N</option>
        </select>
        
        <h2 className="name">تاريخ النتيجة</h2><br></br><br></br>
    <input className="firstname" type="date"  onChange={handleChange('CovidTestDate')} />
 <br></br>
      <button>تسجيل النتيجة </button>
      </form></div> )} 
      export default UpdateResult
