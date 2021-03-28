 //اضافة مريض
import './addPat.css';
import {useState} from "react";
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
function AddPat() {
 const [values,setValues]= useState({
  name : null,
  phonenum: null,
  sex: null,
  address: null,
  Checknumber: null,
  Checknumber: null,
  Checkresualt: null,
  email: null,
})
const emptyCustomerData={
  name : null,
  phonenum:  null,
  sex: null,
  address: null,
  Checknumber: null,
  Checknumber: null,
  Checkresualt: null,
  email: null,
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
 return (
  <div className="main">
  <form onSubmit={addPatiant}>
  <div id="name">
  <h1 className="name">الاسم </h1>
        <input className="firstname" type="text" onChange={handleChange('name')}/></div>
  <h2 className="name">المنطقة</h2>
  <select className="option"  onChange={handleChange('address')}>
     <option disabled="disabled" selected="selected"  >اختر المدينة</option>
     <option value="hebron">الخليل</option>
     <option value="dura">دورا</option>
   </select>
  <h2 className="name">الايميل</h2>
        <input className="firstname" />
  <h2 className="name">رقم الهاتف</h2>
        <input className="firstname"  type="number" onChange={handleChange('phonenum')}/>
   <h2 className="name">  الجنس</h2>
   <label className="radio">  ذكر
   <input className="radio-one" type="radio"  value="ذكر"  onChange={handleChange('sex')} />
        <span className="checkmark"></span>
        </label>
    <label className="radio">  انثى
    <input className="radio-two"  className="radio" type="radio"  value="انثى" onChange={handleChange('sex')} />
          <span className="checkmark"></span>
        </label>
    <h2 className="name">رقم الفحص</h2>
    <input className="firstname" type="text"  onChange={handleChange('Checknumber')} />
    <h2 className="name">نتيجة الفحص</h2>
    <select className="option"   onChange={handleChange('Checkresualt')}>
          <option disabled="disabled" selected="selected"  >اختر النتيجة</option>
          <option value="positive">ايجابي</option>
          <option value="negative">سلبي</option>
    </select>
     <br></br> 
     <input type="date" style={{direction:"rtl"}}></input>
     <button className='addbtn' onClick={addPatiant}> اضافة </button>
          {/* {message ?
          <h6>You have to fill all fields</h6>:null} */} </form> </div>
          );}

export default AddPat;
