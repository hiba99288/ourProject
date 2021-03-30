 //اضافة مريض
import './addPat.css';
import React, { useEffect, useState   } from "react";

import {  MenuItem,FormControl,  Select } from "@material-ui/core";

import Axios from 'axios';
import {useHistory} from 'react-router-dom';
function AddPat() {
 const [values,setValues]= useState({
  name : null,
  Idnumber:null,
  phonenum: null,
  sex: null,
  address: null, 
  email: null,
  DOB: null,
  reason: null,
  chk_date:null,
})
const emptyCustomerData={
  name : null,
  Idnumber:null,
  phonenum: null,
  sex: null,
  address: null, 
  email: null,
  DOB: null,
  chk_date:null,
  reason: null,
}
const handleChange = (prop) => (event) => {
  setValues({ ...values, [prop]: event.target.value });};
 const History=useHistory();
  //  const [message, setMessage] = useState(false);
const addPatiant =(e) => {
  e.preventDefault();
//   if(!values.name || !values.phonenum || !values.sex|| !values.address || !values.Checknumber || !values.Checkresualt || !values.email || !values.DOB){
//     return setMessage(true)
//   }
//  else
 Axios.post('http://localhost:2000/create',{
            
          values
    }).then(()=>{

console.log("success");
setValues(emptyCustomerData);
History.push('/adminPage2');
    })
}; 
const [countries, setCountries] = useState([]);
  
 
const [cities ,setCities] = useState([]) ;
useEffect(() => {
  const getCountriesData = async () => {
  await fetch("http://localhost:2000/subareas")
      .then((response) => response.json())
      .then((data) => {
     setCities(data);
       const countries = data
        .map((subareas) => ({
          name: subareas.areaname,
          value:subareas.id,
        }));
      
       
         setCountries(countries);  });
  };
  getCountriesData();
}, []);


 return (
  <div className="main">
  <form onSubmit={addPatiant}>
  <div id="name">
  <h1 className="name">الاسم </h1>
        <input className="firstname" type="text" onChange={handleChange('name')}/></div>
  
        <h2 className="name">رقم الهوية</h2>
        <input className="firstname" onChange={handleChange('Idnumber')} />

        <h2 className="name">رقم الهاتف</h2>
        <input className="firstname"  type="number" onChange={handleChange('phonenum')}/>
  

        <h2 className="name">الايميل</h2>
        <input className="firstname"  onChange={handleChange('email')}/>
 
       
  <h2 className="name">  الجنس</h2>
   <label className="radio">  ذكر
   <input className="radio-one" type="radio"  value="ذكر"  onChange={handleChange('sex')} />
        <span className="checkmark"></span>
        </label>
    <label className="radio">  انثى
    <input className="radio-two"  className="radio" type="radio"  value="انثى" onChange={handleChange('sex')} />
          <span className="checkmark"></span>
        </label>

        <h2 className="name">   سنة الميلاد</h2>
    <input className="firstname" type="text"  onChange={handleChange('DOB')} />
 
    <h2 className="name">تاريخ الفحص</h2>
    <input className="firstname" type="date"  onChange={handleChange('chk_date')} />
 
  <h2 className="name">المنطقة</h2>
  <select    className="option"  onChange={handleChange('address')}>
  { countries.map((subareas) => (
              <option value={subareas.value}>{subareas.name}</option>))}

   </select>
   <h2 className="name">سبب الفحص</h2>
  <select    className="option"  onChange={handleChange('reason')}>
  
              <option > مخالط</option>
              <option> سفر</option>
              <option> ظهور اعراض المرض</option>
              <option> سبب اخر</option>
            

   </select>
   
     <br></br> 
     <button className='addbtn' onClick={addPatiant}> اضافة </button> 
     <button className='addbtn' onClick={addPatiant}> اضافة </button>
          {/* {message ?
          <h6>You have to fill all fields</h6>:null} */} </form> </div>
          );}

export default AddPat;
