//اضافة مريض
import './Table.css';

import React, { useEffect, useState } from "react";

import { MenuItem, FormControl, Select } from "@material-ui/core";

import Axios from "axios";
import { useHistory } from "react-router-dom";
import { keys } from "@material-ui/core/styles/createBreakpoints";
import SelectInput from '@material-ui/core/Select/SelectInput';

function AddPat() {
  const [values, setValues] = useState({
    name: null,
    Idnumber: null,
    phonenum: null,
    sex: null,
    address: null,
    email: null,
    DOB: null,
    reason: null,
    chk_date: null,
  });
  const emptyCustomerData = {
    name: null,
    Idnumber: null,
    phonenum: null,
    sex: null,
    address: null,
    email: null,
    DOB: null,
    chk_date: null,
    reason: null,
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const History = useHistory();
  const addPatient = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:2000/create", {
      values,
    }).then(() => {
      console.log("success");
      setValues(emptyCustomerData);
      History.push("/adminPage2");
    });
  };

  const getPatients = () => {
    Axios.get("http://localhost:2000/patient", {headers: {token: localStorage.getItem('token')}}).then((response) => {
      console.log(response);
      if( response.data == 'error'){
        console.log('error');
        window.alert('Error');
      } else if(response.status == 200){
        try {
          setPatientList([...response.data]);
        } finally {

        }
      } else {
        console.log('error');
      }
    });
  };

  const updatePatient2 = function () {
    
    setPatientList(patientList.map(item =>{
      console.log((item.Idnumber == edity.Idnumber) ? edity : item);
      return ((item.Idnumber == edity.Idnumber) ? edity : item);
    }));
    console.log(patientList);
  }

  const updatePatient = (edity) => {
    Axios.post("http://localhost:2000/update", edity).then((response) => {
      if((response.status == 200) && response.data == "success"){
        console.log('Record Updated');
        updatePatient2();
        alert('تم التعديل');
        setShowEdit(!showEdit);
      } else {
        console.log('Update failed');
        alert('فشل التعديل. حاول مرة أخرى.');
      }
      console.log(response.data);
    });
  };

  const deletePatient = (Idnumber) => {
    /* eslint-disable no-restricted-globals */
    if (confirm('هل تريد حذف هذا السجل نهائياً؟')){
    /* eslint-enable no-restricted-globals */
      Axios.delete(`http://localhost:2000/delete/${Idnumber}`).then(
        (response) => {
          if (response.status == 200) {
            setPatientList(
              patientList.filter((val) => {
                return val.Idnumber != Idnumber;
              })
            );
            alert('تم الحذف بنجاح');
          } else {
            alert('فشل الحذف');
          }
        }
      );
    }

  };

  const [countries, setCountries] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [search, setSearch] = useState("");

  const [edity, setEdity] = useState({
    name: "",
    Idnumber: '',
    sex: '',
    address: '',
    DOB: '',
  });

  function closeForm(e, theType){
    e.preventDefault();
    if (theType === 'add'){
      setShowAdd(!showAdd)
    } else if(theType === 'edit') {
      if(window.confirm('جميع التعديلات غير المحفوظة ستُحذف ولا يمكن استعادتها. هل أنت متأكد؟')){
        setShowEdit(false);
      }
    }
  }

  const [showEdit, setShowEdit] = useState(false);
  
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("http://localhost:2000/subareas")
        .then((response) => response.json())
        .then((data) => {
          setCities(data);
          const countries = data.map((subareas) => ({
            name: subareas.areaname,
            value: subareas.id,
          }));
          //  .catch(err=>console.log(err));

          setCountries(countries);
        });
    };
    getCountriesData();
    getPatients();
  }, []);

  const [show, setShow] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showPat, setShowPat] = useState(false);

  return (
    <div className="main">
      <h2 className="main-title">المرضى</h2>
      { (localStorage.getItem('token') && showAdd) ? (
        <form onSubmit={addPatient}>
          <div className="button back-button"  onClick={(e) => closeForm(e, 'add')}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z"/></svg> */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"/></svg> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3.222 18.917c5.666-5.905-.629-10.828-5.011-7.706l1.789 1.789h-6v-6l1.832 1.832c7.846-6.07 16.212 4.479 7.39 10.085z"/></svg>
            {/* <p>رجوع</p> */}
          </div>
          <h3 className="sub-title">إضافة مريض</h3>
          <hr className=".back-button-hr" />
          <br/>
          <div className="addPat-add-card">
            <label className="name">الاسم </label>
            <input
              className="firstname"
              type="text"
              onChange={handleChange("name")}
            />
          </div>
          
          <div className="addPat-add-card">
            <label className="name">رقم الهوية</label>
            <input className="firstname" onChange={handleChange("Idnumber")} />
          </div>
          
          <div className="addPat-add-card">
            <label className="name">رقم الهاتف</label>
            <input
              className="firstname"
              type="number"
              onChange={handleChange("phonenum")}
            />
          </div>
          
          <div className="addPat-add-card">
            <label className="name">الايميل</label>
            <input className="firstname" onChange={handleChange("email")} />
          </div>
          
          <div className="addPat-add-card sex">
            <label className="name"> الجنس</label>
            <label className="radio">
              ذكر
              <input
                className="radio-one"
                type="radio"
                name="sex"
                value="ذكر"
                onChange={handleChange("sex")}
              />
            </label>
            <label className="radio">
              انثى
              <input
                className="radio-two"
                className="radio"
                type="radio"
                name="sex"
                value="انثى"
                onChange={handleChange("sex")}
              />
            </label>
          </div>
          
          <div className="addPat-add-card">
            <label className="name"> سنة الميلاد</label>
            <input
              className="firstname"
              type="text"
              onChange={handleChange("DOB")}
            />
          </div>
          
          <div className="addPat-add-card">
            <label className="name">تاريخ الفحص</label>
            <input
              className="firstname"
              type="date"
              onChange={handleChange("chk_date")}
            />
          </div>
          
          <div className="addPat-add-card">
            <label className="name">المنطقة</label>
            <select className="option" onChange={handleChange("address")}>
              {countries.map((subareas, index) => (
                <option key={index} value={subareas.value}>{subareas.name}</option>
              ))}
            </select>
          </div>
          
          <div className="addPat-add-card">
            <label className="name">سبب الفحص</label>
            <select className="option" onChange={handleChange("reason")}>
              <option> مخالط</option>
              <option> سفر</option>
              <option> ظهور اعراض المرض</option>
              <option> سبب اخر</option>
            </select>
          </div>
          
          <br/>
          <div className="button addbtn" onClick={addPatient}>
            اضافة
          </div>
        </form>
      ) : (localStorage.getItem('token') && showEdit) ? (      
        <form onSubmit={e=>updatePatient(edity)}>
          <div className="button back-button"  onClick={(e) => closeForm(e, 'edit')}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z"/></svg> */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"/></svg> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3.222 18.917c5.666-5.905-.629-10.828-5.011-7.706l1.789 1.789h-6v-6l1.832 1.832c7.846-6.07 16.212 4.479 7.39 10.085z"/></svg>
            {/* <p>رجوع</p> */}
          </div>
          <h3 className="sub-title">تعديل معلومات مريض</h3>
          <hr className=".back-button-hr" />
          <br/>
          <div className="addPat-add-card">
            <label className="name">الاسم </label>
            <input
              className="firstname"
              type="text"
              value={edity.name}
              onChange={(e)=>{
                e.preventDefault();
                setEdity({name: e.target.value});
              }}
            />
          </div>
          
          <div className="addPat-add-card">
            <label className="name">رقم الهوية</label>
            <input className="firstname" value={edity.Idnumber} 
              disabled
            />
          </div>
          
          {/* <div className="addPat-add-card">
            <label className="name">رقم الهاتف</label>
            <input
              className="firstname"
              type="number"
              // value={edity.}
              onChange={(e)=>{
                e.preventDefault();
                edity.name = e.target.value;
              }}
            />
          </div> */}
          
          {/* <div className="addPat-add-card">
            <label className="name">الايميل</label>
            <input className="firstname" onChange={handleChange("email")} />
          </div> */}
          
          {/* <div className="addPat-add-card sex">
            <label className="name"> الجنس</label>
            <label className="radio">
              ذكر
              <input
                className="radio-one"
                type="radio"
                name="sex"
                value="ذكر"
                onChange={handleChange("sex")}
              />
            </label>
            <label className="radio">
              انثى
              <input
                className="radio-two"
                className="radio"
                type="radio"
                name="sex"
                value="انثى"
                onChange={handleChange("sex")}
              />
            </label>
          </div> */}
          
          <div className="addPat-add-card">
            <label className="name"> سنة الميلاد</label>
            <input
              className="firstname"
              type="text"
              value={edity.DOB}
              disabled
            />
          </div>
          
          <div className="addPat-add-card">
            <label className="name">تاريخ الفحص</label>
            <input
              className="firstname"
              type="date"
              onChange={handleChange("chk_date")}
            />
          </div>
          
          <div className="addPat-add-card">
            <label className="name">المنطقة</label>
            <select className="option" onChange={handleChange("address")}>
              {countries.map((subareas, index) => (
                <option key={index} value={subareas.value}>{subareas.name}</option>
              ))}
            </select>
          </div>
          
          <div className="addPat-add-card">
            <label className="name">سبب الفحص</label>
            <select className="option" onChange={handleChange("reason")}>
              <option> مخالط</option>
              <option> سفر</option>
              <option> ظهور اعراض المرض</option>
              <option> سبب اخر</option>
            </select>
          </div>
          
          <br/>
          <div className="button addbtn" onClick={e=>updatePatient()}>
            حفظ
          </div>
        </form>
      ) : (
        <div>
          <input className="table-search-input"
            type="text"
            placeholder="ابحث هنا"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <div className="button add-button" onClick={() => setShowAdd(!showAdd)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-5v5h-4v-5h-5v-4h5v-5h4v5h5v4z"/></svg>
            <p>إضافة مريض</p>
          </div>
          {/* {show ? (
              <div className="button edit-button" onClick={() => setShow(!show)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/></svg>
                <p>تفعيل وضع التعديل</p>
              </div>
            ) : (
              <div className="button edit-button edit-button-disable" onClick={() => setShow(!show)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/></svg>
                <p>تعطيل وضع التعديل</p>
              </div>
          )} */}
          <table>
            <thead>
              <tr>
                <th>الاسم</th>
                <th> رقم الهوية</th>
                <th>الحنس</th>
                <th>تاريخ الميلاد</th>
                <th>مكان السكن</th>
                {localStorage.getItem('token') ? <th>إجراءات</th>: ''}
              </tr>
            </thead>
            <tbody>
              {patientList
              .filter((item) => {
                if (search == "") {
                  return item;
                } else if (
                  item.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
              }).map((val, index) => {
                return (
                  <>
                    {/* {show ? ( */}
                      <tr key={index}>
                        <td>
                          {val.name}
                        </td>
                        <td>
                          {val.Idnumber}
                        </td>
                        <td>
                          {val.sex}
                        </td>
                        <td>
                          {val.DOB}
                        </td>
                        <td>
                          {val.address}
                        </td>
                        {localStorage.getItem('token') ? 
                          <td>
                            <div className="button update"
                              onClick={(e) => {
                                e.preventDefault();
                                setEdity(val);
                                setShowEdit(true);
                              }}
                            >
                              {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24zm-5.541 8.409l-1.422-1.409-7.021 7.183-3.08-2.937-1.395 1.435 4.5 4.319 8.418-8.591z"/></svg> */}
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z"/></svg>
                            </div>
                            <div className="button delete"
                              onClick={() => {
                                deletePatient(val.Idnumber);
                              }}
                            >
                              {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24zm-6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"/></svg> */}
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z"/></svg>
                            </div>
                          </td> : ''
                        }
                      </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AddPat;
