import axios from "axios";
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
 
import {
    PieChart,Pie,Tooltip,BarChart,XAxis,YAxis,Legend,CartesianGrid,Bar,
  } from "recharts";
 

 

  
    const data = [
      { name: "Facebook", users: 2000000000 },
      { name: "Instagram", users: 1500000000 },
      { name: "Twiter", users: 1000000000 },
      { name: "Telegram", users: 500000000 },
    ];

 

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Hospitals = () => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  const getProductData = async () => {
    try {
      const data = await axios.get( "http://localhost:2000/api/hospitals" );
     
      console.log(data.data);
      setProduct(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);



 
  return (
    <div className="App">
      <h1>Lets code tamil</h1>
      <input
        type="text"
        placeholder="Search here"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      {/* {product
        .filter((item) => {
          if (search == "") {
            return item;
          } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
            return item;
          }
        })
        .map((item) => {
          return (
            <p>
              {item.name} - {item.price}
            </p>
          );
        })} */}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>العنوان</StyledTableCell>
              <StyledTableCell align="right">اسم المستشفى</StyledTableCell>
              <StyledTableCell align="right">سعة المستشفى</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product
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
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      {item.H_name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.H_place}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {(item.Number_of_occupied_beds/item.Number_of_beds)*100}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>


      <div style={{ textAlign: "center" }}>
      <h1>Socail Media Users</h1>
      <div className="Chart">
        <PieChart width={400} height={400}>
          <Pie  dataKey="users" isAnimationActive={false} data={data}  cx={200} cy={200} outerRadius={80} fill="#8884d8"/>
          <Tooltip />
        </PieChart>

        {product
              .map((item) => {
                  console.log(item.H_name+"hiba");
                return (
                    <BarChart  width={500}  height={300} data={data} margin={{ top: 5, right: 30, left: 80, bottom: 5, }}  barSize={20}>
                    <XAxis  dataKey={"name"} scale="point"  padding={{ left: 10, right: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
                  </BarChart>    );
              })}
      </div>
    </div>
    </div>
  );
};

export default Hospitals;