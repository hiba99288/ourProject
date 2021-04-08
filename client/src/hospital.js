import Axios from "axios";
import { useEffect, useState } from "react";
import './Table.css';
import { useHistory } from "react-router-dom";


const Hospitals = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [hospitalList, setHospitalList] = useState([]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };


  const getHospitals = () => {
    Axios.get("http://localhost:2000/api/hospitals").then((response) => {
      setHospitalList(response.data);
    });
  };

  const updateHospital = (Idnumber) => {
    console.log(Idnumber);
    // return;
    const result = hospitalList.filter(pat => {
      return pat.Idnumber == Idnumber;
    });
    console.log(result[0]);

    Axios.post("http://localhost:2000/updatehospital", result[0]).then((response) => {
      if((response.status == 200) && response.data == "success"){
        console.log('Record Updated');
        alert('تم التعديل');
      } else {
        console.log('Update failed');
        alert('فشل التعديل. حاول مرة أخرى.');
      }
      console.log(response.data);
    });
  };

  const deleteHospital = (Idnumber) => {
    /* eslint-disable no-restricted-globals */
    if (confirm('هل تريد حذف هذا السجل نهائياً؟')){
    /* eslint-enable no-restricted-globals */
      Axios.delete(`http://localhost:2000/deletehospital/${Idnumber}`).then(
        (response) => {
          if (response.status == 200) {
            setHospitalList(
              hospitalList.filter((val) => {
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


  const [show, setShow] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [edit, setEdit] = useState(false);

  const [edity, setEdity] = useState({

  });

  useEffect(() => {
    getHospitals();
  }, []);

  const [values, setValues] = useState({
    H_name: null,
    H_place: null,
    Number_of_occupied_beds: null,
    Number_of_beds: null
  });

  const emptyHospitalData = {
    H_name: null,
    H_place: null,
    Number_of_occupied_beds: null,
    Number_of_beds: null
  }

  const History = useHistory();
  const addHospital = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:2000/createhospital", {
      values,
    }).then(() => {
      console.log("success");
      setValues(emptyHospitalData);
      History.push("/adminPage2");
    });
  };

  return (
    <div className="main">
      <h2 className="main-title">المستشفيات</h2>
      {showAdd ? (
        <form onSubmit={addHospital}>
          <div className="button back-button"  onClick={() => setShowAdd(!showAdd)}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z"/></svg> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"/></svg>
            {/* <p>رجوع</p> */}
          </div>
          <h3 className="sub-title">إضافة مستشفى</h3>
          <hr className=".back-button-hr" />
          <br/>
          <div className="addPat-add-card">
            <label className="name">اسم المستشفى</label>
            <input
              className="firstname"
              type="text"
              onChange={handleChange("H_name")}
            />
          </div>
          <div className="addPat-add-card">
            <label className="name">العنوان</label>
            <input
              className="firstname"
              type="text"
              onChange={handleChange("H_place")}
            />
          </div>
          <div className="addPat-add-card">
            <label className="name">عدد الأسرّة المستخدمة</label>
            <input
              className="firstname"
              type="text"
              onChange={handleChange("Number_of_occupied_beds")}
            />
          </div>
          <div className="addPat-add-card">
            <label className="name">عدد الأسرّة الكلّيّ</label>
            <input
              className="firstname"
              type="text"
              onChange={handleChange("Number_of_beds")}
            />
          </div>
          <br/>
          <div className="button addbtn" onClick={addHospital}>
            اضافة
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
          <p>إضافة مستشفى</p>
        </div>
        {show ? (
            <div className="button edit-button" onClick={() => setShow(!show)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/></svg>
              <p>تفعيل وضع التعديل</p>
            </div>
          ) : (
            <div className="button edit-button edit-button-disable" onClick={() => setShow(!show)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/></svg>
              <p>تعطيل وضع التعديل</p>
            </div>
          )}
      <table>
        <thead>
          <tr>
            <th>العنوان</th>
            <th>اسم المستشفى</th>
            <th>عدد الأسرة المستخدمة</th>
            <th>عدد الأسرة الكلي</th>
            <th>عدد الأسرة المتبقية</th>
          </tr>
        </thead>
        <tbody>
          {hospitalList 
            .filter((item) => {
              if (search == "") {
                return item;
              } else if (
                item.H_name.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item) => {
              return (
                <>
                  {show ? (
                    <tr key={item.id}>
                      <td component="th" scope="row">
                        {item.H_name}
                      </td>
                      <td>
                        {item.H_place}
                      </td>
                      <td>
                        {item.Number_of_occupied_beds}
                      </td>
                      <td>
                        {item.Number_of_beds}
                      </td>
                      <td>
                        {item.Number_of_beds - item.Number_of_occupied_beds}
                      </td>
                    </tr>
                  ) : (
                    <tr key={item.id}>
                      <td>
                        <input
                          defaultValue={item.H_place}
                          onChange={(event) => {
                            setHospitalList(hospitalList
                              .filter((item) => {
                                if (search == "") {
                                  return item;
                                } else if (
                                  item.H_place.toLowerCase().includes(search.toLowerCase())
                                ) {
                                  return item;
                                }
                              }).map((item2,index) => {
                              if (item2.H_place == item.H_place) {
                                item2.H_place = event.target.value;
                              }
                              return item;
                            }));
                          }}
                        ></input>
                      </td>
                      <td>
                        <input
                          defaultValue={item.H_name}
                          onChange={(event) => {
                            setHospitalList(hospitalList
                              .filter((item) => {
                                if (search == "") {
                                  return item;
                                } else if (
                                  item.H_name.toLowerCase().includes(search.toLowerCase())
                                ) {
                                  return item;
                                }
                              }).map((item2,index) => {
                              if (item2.H_name == item.H_name) {
                                item2.H_name = event.target.value;
                              }
                              return item;
                            }));
                          }}
                        ></input>
                      </td>
                      <td>
                        <input
                          defaultValue={item.Number_of_occupied_beds}
                          onChange={(event) => {
                            setHospitalList(hospitalList
                              .filter((item) => {
                                if (search == "") {
                                  return item;
                                } else if (
                                  item.Number_of_occupied_beds.toLowerCase().includes(search.toLowerCase())
                                ) {
                                  return item;
                                }
                              }).map((item2,index) => {
                              if (item2.Number_of_occupied_beds == item.Number_of_occupied_beds) {
                                item2.Number_of_occupied_beds = event.target.value;
                              }
                              return item;
                            }));
                          }}
                        ></input>
                      </td>
                      <td>
                        <input
                          defaultValue={item.Number_of_beds}
                          onChange={(event) => {
                            setHospitalList(hospitalList
                              .filter((item) => {
                                if (search == "") {
                                  return item;
                                } else if (
                                  item.Number_of_beds.toLowerCase().includes(search.toLowerCase())
                                ) {
                                  return item;
                                }
                              }).map((item2,index) => {
                              if (item2.Number_of_beds == item.Number_of_beds) {
                                item2.Number_of_beds = event.target.value;
                              }
                              return item;
                            }));
                          }}
                        ></input>
                      </td>
                      {/* <td>
                        {item.Number_of_beds - item.Number_of_occupied_beds}
                      </td> */}
                    </tr>
                  )}
                </>
              );
            })}
        </tbody>
      </table>
    </div>
      )}
    </div>
  );
};

export default Hospitals;