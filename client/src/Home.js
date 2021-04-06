import React, { useEffect, useState   } from "react";
import "./Home.css"; 
import {  MenuItem,FormControl,  Select, CardContent, Card } from "@material-ui/core";
import {sortData} from "./Util"
import Axios from 'axios';

function  Home() {
  const [cities ,setCities] = useState([]) ;
  const [name, setName] = useState([]);
  const [Idnumber, setIdnumber] = useState([]);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState("");
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");

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
      <iframe id="map-iframe"
        src="/map/map.html"
        title="map"
        id="map"
        height="100%"
        width="100%"
      >
      </iframe>
    </div>
  );
}

export default Home;