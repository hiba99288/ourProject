const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");
app.use(cors());

var bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

function makeToken(length) {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const db = mysql.createPool({
  host: "localhost",
  // user:'root',
  user: "fgp",
  // password:'az554455',
  password: "fgp",
  database: "fgp",
});

app.get("/", (req, res) => {
  res.send("hibahiba");
});

app.get("/subareas", (req, res) => {
  db.query("SELECT * FROM subareas;", (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      console.log(result);
      res.send(result);
    } else {
      res.send(false);
    }
  });
});

app.get("/cases", (req, res) => {
  db.query("SELECT * FROM cases;", (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      console.log(result);
      res.send(result);
    } else {
      res.send(false);
    }
  });
});

app.get("/api/hospitals", (req, res) => {
  const token = req.get("token");
  console.log(token);
  db.query(
    "SELECT * FROM  users WHERE token =? and account_type = 'admin' limit 1",
    [token],
    (err, result) => {
      if (err) {
        res.send("error777");
        console.log(err);
      } else if (result.length > 0) {
        db.query("SELECT * FROM hospitals;", (err, result) => {
          if (err) {
            res.send({ err: err });
          }

          if (result.length > 0) {
            console.log(result);
            res.send(result);
          } else {
            res.send(false);
          }
        });
      }
    }
  );
});

app.get("/api/instructions", (req, res) => {
  db.query("SELECT * FROM instructions;", (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      console.log(result);
      res.send(result);
    } else {
      res.send(false);
    }
  });
});

app.get("/user", (req, res) => {
  db.query("SELECT * FROM users;", (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      console.log(result);
      res.send(result);
    } else {
      res.send(false);
    }
  });
});

app.post("/logout", (req, res) => {
  const username = req.body.username;
  const token = req.body.password;
  db.query(
    'update users set token = "" WHERE username = ? AND token = ?',
    [username, token],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});
//التحقق من اسم المستخدم و كلمة المرور
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        console.log(result);
        newToken = makeToken(25);
        db.query(
          "UPDATE users SET token = ? WHERE username = ?",
          [newToken, username],
          (err, result) => {
            if (err) {
              res.send({ err: err });
            }
            db.query(
              "select * from users where username = ?",
              [username],
              (err, result) => {
                res.send(result);
              }
            );
          }
        );
      } else {
        res.send(false);
      }
    }
  );
});

app.get("/patient", (req, res) => {
  const token = req.get("token");
  console.log(token);
  db.query(
    "SELECT * FROM  users WHERE token =? limit 1",
    [token],
    (err, result) => {
      if (err) {
        res.send("error777");
        console.log(err);
      } else if (result.length > 0) {
        db.query("SELECT * FROM patient;", (err, result) => {
          if (err) {
            res.send({ err: err });
          }
          if (result.length > 0) {
            res.send(result);
          } else {
            res.send("error999");
          }
        });
      } else {
        res.send("error888");
      }
    }
  );
});
//اضافة مريض جديد
app.post("/create", (req, res) => {
  const token = req.get("token");
  console.log(token);
  db.query(
    "SELECT * FROM  users WHERE token =? limit 1",
    [token],
    (err, result) => {
      if (err) {
        res.send("error777");
        console.log(err);
      } else if (result.length > 0) {
        const name = req.body.values.name;
        const Idnumber = req.body.values.Idnumber;
        const phonenum = parseInt(req.body.values.phonenum);
        const sex = req.body.values.sex;
        const address = req.body.values.address;
        const email = req.body.values.email;
        const DOB = req.body.values.DOB;
        const chk_date = req.body.values.chk_date;
        const reason = req.body.values.reason;
        console.log(req.body);
        db.query(
          "INSERT INTO patient (  name,Idnumber, phonenum, sex, address,email,DOB,chk_date,reason) VALUES (?,?,?,?,?,?,?,?,?)",
          [
            name,
            Idnumber,
            phonenum,
            sex,
            address,
            email,
            DOB,
            chk_date,
            reason,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("Values Inserted");
            }
          }
        );
      }
    }
  );
});
//اظهار نتيجة الفحص
app.post("/chk", (req, res) => {
  const idnumber = req.body.idnumber;
  const phonenum = req.body.phonenum;
  const name = req.body.neme;
  const covidTestResult = req.body.covidTestResult;

  db.query(
    "SELECT * FROM patient NATURAL JOIN covidtest WHERE idnumber=? AND phonenum=?   ",
    [idnumber, phonenum],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "wrong username/password" });
      }
    }
  );
});

// اضافة نتيجة

app.post("/tests", (req, res) => {
  const covidTestResult = req.body.values.covidTestResult;
  const CovidTestDate = req.body.values.CovidTestDate;
  const Idnumber = req.body.values.Idnumber;

  console.log(req.body);
  db.query(
    "INSERT INTO covidtest ( covidTestResult ,CovidTestDate, Idnumber ) VALUES (?,?,? )",
    [covidTestResult, CovidTestDate, Idnumber],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/update", (req, res) => {
  const token = req.get("token");
  console.log(token);
  db.query(
    "SELECT * FROM  users WHERE token =? and account_type = 'admin' limit 1",
    [token],
    (err, result) => {
      if (err) {
        res.send("error777");
        console.log(err);
      } else if (result.length > 0) {
        let {
          name,
          Idnumber,
          phonenum,
          sex,
          address,
          email,
          DOB,
          chk_date,
          reason,
        } = req.body;
        console.log('req-body', req.body);
        db.query(
          "UPDATE patient SET DOB = ?, name = ?,phonenum = ?,sex = ?,address = ? ,email = ? ,reason = ? WHERE Idnumber = ?",
          [DOB, name, phonenum, sex, address, email, reason, Idnumber],
          (err, result) => {
            if (err) {
              console.log(err);
            } else if (result.affectedRaws == 0) {
              // res.send(result);
              res.send(result);
            } else {
              res.send('success');
            }
          }
        );
      }
    }
  );
});
app.delete("/delete/:Idnumber", (req, res) => {
  const token = req.get("token");
  console.log(token);
  db.query(
    "SELECT * FROM  users WHERE token =? and account_type = 'admin' limit 1",
    [token],
    (err, result) => {
      if (err) {
        res.send("error777");
        console.log(err);
      } else if (result.length > 0) {
        const Idnumber = req.params.Idnumber;
        db.query(
          "DELETE FROM patient WHERE Idnumber = ?",
          Idnumber,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          }
        );
      }
    }
  );
});

//انشاء حساب مستخدم جديد
app.post("/accounts", (req, res) => {
  const username = req.body.values.username;
  const password = req.body.values.password;
  const account_type = req.body.values.account_type;
  const name = req.body.values.name;
  const phonenum = parseInt(req.body.values.phonenum);
  const email = req.body.values.email;

  db.query(
    "INSERT INTO users ( username, password, account_type, name,phonenum,email) VALUES (?,?,?,?,?,?)",
    [username, password, account_type, name, phonenum, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(2000, () => {
  console.log("running in 2000");
});
