import React, { useEffect, useState   } from "react";
import "./Home.css"; 
 import {  MenuItem,FormControl,  Select, CardContent, Card } from "@material-ui/core";
import InfoBox from "./InfoBox";
import {sortData} from "./Util"
import Axios from 'axios';
import Chart from './chart'
import Instruction from './instruction'

function  Home() {
  const [cities ,setCities] = useState([]) ;
  const [name, setName] = useState([]);
  const [Idnumber, setIdnumber] = useState([]);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState("");
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
    
    // const [date, setDate] = useState([])
    // const columns = [
    //   { title: "ID", field: "id" },
    //   { title: "Username", field: "areaname" }

    // ]
    // useEffect(() => {
    //   fetch("http://localhost:2000/subareas")
    //     .then(resp => resp.json())
    //     .then(resp => {
    //       setDate(resp)
    //     })
    // }, [])

  useEffect(() => {
    fetch("http://localhost:2000/subareas")
      .then((response) => response.json())
      .then((data) => {
      //  setCountryInfo(data);
      });
  }, []);

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
         const sortedData = sortData(data);
          setTableData(sortedData);
           setCountries(countries);  });
    };
    getCountriesData();
  }, []);
 
  const onCountryChange=  async(event)=>{
    const countryCode=event.target.value;
    console.log(cities);
    setCountry(countryCode);
    console.log(countryCode);
    let  countryData = cities.filter((country)=>{return country.id==countryCode});
    console.log(countryData);
    setCountryInfo(countryData);  
  }; 

  return (
    <div className="app">
      {/* <div>
    <MaterialTable ptions={{
                            rowStyle: x => {
                                if ( x.id % 2 ) {
                                return { backgroundColor: "#f2f2f2" }
                                }
                            },
                            'headerStyle' : {
                                backgroundColor: 'red',
                                color: theme.palette.common.white
                            }
                            }}
    style={{width:"90px"}}
            title="Employee Data"
            data={date}
            columns={columns}
          />
    </div> */}
      <Instruction></Instruction>
      <div className="leftright">
        <div className="app_left">
          <iframe
            src="/map/map.html"
            title="map"
            id="map"
            height="100%"
            width="100%"
          ></iframe>
        </div>

        <div className="app_right">
          <div>
            {" "}
            <FormControl className="app__dropdown">
              {/* اللي بنختار منها المنطقة */}
              <Select variant="outlined" onChange={onCountryChange} value={country}>
                <MenuItem value="worldwide">worldwide</MenuItem>
                {countries.map((subareas) => (
                  <MenuItem value={subareas.value}>{subareas.name}</MenuItem>
                ))}
              </Select>
            </FormControl>{" "}
          </div>
          {countryInfo ? (
            <div className="app_stats">
              {/*     
          <div class="card">
          <div class="circle">
          <h2> 02</h2>
          </div>
          <div class="content">
            <p> hhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
            <a href="#">  Read More </a>
          </div>
          </div>
          <div class="card">
            <div class="circle">
            <h2> 03</h2>
            </div>
            <div class="content">
                <p> hhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
                <a href="#">  Read More </a>
            </div>
            </div> */}

              <div class="container">
                <div class="card">
                  <div class="circle">
                    <h3>الحالات</h3>
                  </div>
                  <div class="content">
                    <InfoBox
                      className="InfoBox"
                      title="حالات الشفاء "
                      value={countryInfo[0].recovered}
                      total={countryInfo[0].radius}
                    ></InfoBox>
                  </div>
                </div>

                <div class="card">
                  <div class="circle">
                    <h3>الحالات</h3>
                  </div>
                  <div class="content">
                    <InfoBox
                      title="حالات الوفاة"
                      value={countryInfo[0].recovered}
                      total={countryInfo.deaths}
                    ></InfoBox>
                  </div>
                </div>

                <div class="card">
                  <div class="circle">
                    <h3>الحالات</h3>
                  </div>
                  <div class="content">
                    <InfoBox
                      title="الحالات المسجلة"
                      value={countryInfo[0].recovered}
                      total={countryInfo.cases}
                    ></InfoBox>
                  </div>
                </div>
              </div>
            </div>
          ) : null}{" "}
        </div>
      </div>

      <Chart></Chart>
    </div>
  );
}

export default Home;