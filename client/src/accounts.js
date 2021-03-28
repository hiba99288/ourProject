// صفحة انشاء الحسابات
import React from 'react'
import { useState } from "react";
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import './addPat.css';
function Accounts() {
  const [values, setValues] = useState({
    username: null,
    password: null,
    account_type: null,
    name: null,
    phonenum: null,
    email: null,
  })
  const emptyCustomerData = {
    username: null,
    password: null,
    account_type: null,
    name: null,
    phonenum: null,
    email: null,
  }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const History = useHistory();
  const addAccount = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:2000/accounts', {
      values
    }).then((response) => {
      console.log("success");
      setValues(emptyCustomerData);
      History.push('/accounts');
    });
  };
  return (
    <div className="add">
      <div className="main">
        <form onSubmit={addAccount}>
          <div id="name">
            <h1 className="name">اسم المستخدم </h1>
            <input className="firstname" type="text" onChange={handleChange('username')} /></div>
          <h2 className="name">كلمة المرور</h2>
          <input className="firstname" type="text" onChange={handleChange('password')} />
          <h2 className="name">نوع الحساب</h2>
          <select className="option" onChange={handleChange('account_type')}>
            <option disabled="disabled" selected="selected"  >اختر  </option>
            <option value="admin">مسؤول</option>
            <option value="dr">طبيب</option>
          </select>
          <div id="name">
            <h1 className="name">الاسم   </h1>
            <input className="firstname" type="text" onChange={handleChange('name')} />
          </div>
          <h2 className="name">رقم الهاتف</h2>
          <input className="firstname" type="number" onChange={handleChange('phonenum')} />
          <h2 className="name">الايميل</h2>
          <input className="firstname" type="email" onChange={handleChange('email')} />
          <button className="addbtn" >انشاء الحساب </button>
        </form>
      </div>
    </div>
  )
}

export default Accounts;
