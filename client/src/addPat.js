 //اضافة مريض
 import './addPat.css';
 import React, { useEffect, useState   } from "react";
 
 import {  MenuItem,FormControl,  Select } from "@material-ui/core";
 
 import Axios from 'axios';
 import {useHistory} from 'react-router-dom';
 import { keys } from '@material-ui/core/styles/createBreakpoints';
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
 
 
 const getEmployees = () => {
   Axios.get("http://localhost:2000/patient").then((response) => {
     setPatientList(response.data);
   });
 };
 const [newDOB, setNewDOB] = useState(0);
  const [newName , setNewName]=useState("");
 
 const updateEmployeeWage = (Idnumber) => {
   Axios.put("http://localhost:2000/update", { DOB: newDOB,name:newName, Idnumber: Idnumber  }).then(
     (response) => {
       setPatientList(
         patientList.map((val) => {
           
           return val.Idnumber == Idnumber
             ? {
               Idnumber: val.Idnumber,
                 name:newName, 
                 DOB: newDOB,
                 sex:val.sex,
                 address:val.address,

               }
             : val;
         })
       );
     }
   );
 };
 
 const deleteEmployee = (Idnumber) => {
   Axios.delete(`http://localhost:2000/delete/${Idnumber}`).then((response) => {
  alert("are  you sure?")
   setPatientList(
       patientList.filter((val) => {
         return val.Idnumber != Idnumber;
       })
     );
   });
 };
 
 const [countries, setCountries] = useState([]);
 const [patientList , setPatientList] = useState([]);
 
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
 
 const [show , setShow]=useState(true);
 const [showAdd , setShowAdd]=useState(false);
 const [showPat , setShowPat]=useState(false);
  return (
   <div className="main">
            {showAdd? 
            <form onSubmit={addPatiant}>
            <button onClick={()=>setShowAdd(!showAdd)} > اضافة مريض جديد</button>
       
   <div id="name">
     <button  onClick={()=>setShowPat(!showPat)}>back</button>
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
          {/* {message ?
           <h6>You have to fill all fields</h6>:null} */} 
       </form>: 




      <div>
   <button onClick={()=>setShowAdd(!showAdd) } > اضافة مريض جديد</button>
       
        <button className='addbtn' onClick={getEmployees}> عرض سجل المرضى </button>
        <table  >
            <tr>
            <th>الاسم</th>
               <th>  رقم الهوية</th>
               <th>الحنس</th>
               <th>تاريخ الميلاد</th>
               <th>مكان السكن</th>
            </tr>
   
            </table>
           
                  <table  > 
            
           {patientList.map((val,key)=>{
             
             return ( 
               <tr  >
            
            
              
              
              
                
             
   
               
          
            
            {show?  <tr style={{direction:"rtl" ,border: "1px solid #ddd"}}>
               <td> <h3>{val.name}</h3> </td>
               <td> <h3>{val.Idnumber}</h3></td>
               <td> <h3>{val.sex}</h3></td>
               <td> <h3>{val.DOB}</h3></td>
               <td> <h3>{val.address}</h3></td>
               
                
             </tr>:
             <tr>
               <td><input defaultValue={val.name} 
                 ref={this.input}
                onChange={(event) => {
                     setNewName(event.target.value);
                   }}></input></td>
               <td><input placeholder={val.Idnumber}></input></td>
               <td><input defaultValue={val.sex}></input></td>
               <td><input defaultValue={val.DOB}  value={this.target.defaultValue} onChange={(event) => {
                     setNewDOB(event.target.value);
                   }}></input></td>
               <td><input placeholder={val.address}></input></td>
             <td>  <button
                   onClick={() => {
                     
                     updateEmployeeWage(val.Idnumber);
                   }}
                 >
                   {" "}
                   Update
                 </button></td>
 
                 <td>  <button
                   onClick={() => {
                     deleteEmployee(val.Idnumber);
                   }}
                 >
                   Delete
                 </button></td> 
                 </tr>
           
                  
  }
             
             
                    
           
             
                 
                 
            
               
                
                
              
               
             
             
     
              
              
               </tr>
              
              
             );
 
      
 
            
           })  }
            </table>
        
           <button onClick={()=>setShow(!show)}>edit</button>
           </div> }  
           
           
           
            </div>
           );}
 
 export default AddPat;
 