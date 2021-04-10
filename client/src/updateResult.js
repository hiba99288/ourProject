import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import './Table.css';

function UpdateResult() {
  const [values, setValues] = useState({
    CovidTestDate: null,
    covidTestResult: null,
    Idnumber: null,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const History = useHistory();
  const addTest = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:2000/tests", {
      values,
    }).then(() => {
      console.log("success");

      History.push("/adminPage2");
    });
  };

  return (
    <div>
      <form onSubmit={addTest}>
        <h3 class="sub-title">تعديل نتيجة فحص</h3>
        <hr class=".back-button-hr"></hr>
        <br/>

        <div class="addPat-add-card">
          <label class="name">رقم الهوية </label>
          <input
            className="firstname"
            type="number"
            onChange={handleChange("Idnumber")}
          />
        </div>

        <div class="addPat-add-card">
          <label class="name">نتيجة الفحص </label>
          <input
            className="firstname"
            type="number"
            onChange={handleChange("Idnumber")}
          />
        </div>

        <div class="addPat-add-card">
          <label class="name">نتيجة الفحص</label>
          <select class="option" onChange={handleChange("covidTestResult")}>
            <option>P</option>
            <option>N</option>
          </select>
        </div>

        <div class="addPat-add-card">
          <label class="name">تاريخ النتيجة</label>
          <input class="firstname" type="date" onChange={handleChange("CovidTestDate")} />
        </div>

        <br/>
        <div class="button addbtn">اضافة</div>
      </form>
    </div>
  );
}
export default UpdateResult;
