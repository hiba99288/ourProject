const express = require('express')
const app=express();
const cors = require('cors')
const mysql =require('mysql');
const path =require('path');
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname ,'..','client' , 'build')));
 
 app.use(express.urlencoded({extended:false}))
 app.set('view engine','ejs')
const db = mysql.createPool({
host:'localhost',
user:'root',
password:'az554455',
database:'fgp',


});

app.get('/',(req,res)=>{

res.send("hibahiba");


})



app.get('/subareas',(req , res)=>{
  db.query('SELECT * FROM subareas;',
  (err,result)=>{
    if(err){
 res.send({err:err}); }
 
if (result.length>0 ){
     console.log(result);
    res.send(result);  
}else{
res.send(false); 

}
});
    
})


app.get('/cases',(req , res)=>{
  db.query('SELECT * FROM cases;',
  (err,result)=>{
    if(err){
 res.send({err:err}); }
 
if (result.length>0 ){
     console.log(result);
    res.send(result);  
}else{
res.send(false); 

}
});
    
})



app.get('/api/hospitals',(req , res)=>{
  db.query('SELECT * FROM hospitals;',
  (err,result)=>{
    if(err){
 res.send({err:err}); }
 
if (result.length>0 ){
     console.log(result);
    res.send(result);  
}else{
res.send(false); 

}
});
    
})

app.get('/api/instructions',(req , res)=>{
  db.query('SELECT * FROM instructions;',
  (err,result)=>{
    if(err){
 res.send({err:err}); }
 
if (result.length>0 ){
     console.log(result);
    res.send(result);  
}else{
res.send(false); 

}
});
    
})




app.get('/user',(req , res)=>{
  db.query('SELECT * FROM users;',
  (err,result)=>{
    if(err){

    res.send({err:err});
    
} 



 
if (result.length>0 ){
     console.log(result);
    res.send(result);
     
    

    
  
}else{
res.send(false);



}
});
    
})





 

 //التحقق من اسم المستخدم و كلمة المرور
app.post('/login',(req,res)=>{

    const username =req.body.username;
    const password =req.body.password;

    
    db.query(
  "SELECT * FROM users WHERE username=? AND password=?",
  [username , password],
  (err,result)=>{
    if(err){

    res.send({err:err});
    
} 



 
if (result.length>0 ){
     console.log(result);
    res.send(result);
     
    

    
  
}else{
res.send(false);



}
});
    
    });


    app.get('/patient', (req, res) => {
      db.query('SELECT * FROM patient;',
      (err,result)=>{
        if(err){
        res.send({err:err});    
    } 
    
    if (result.length>0 ){
        res.send(result);
    }else{
    res.send({message:"wrong username/password"});
    }
    })  });
//اضافة مريض جديد
app.post("/create", (req, res) => {
    const name = req.body.values.name;
    const phonenum = parseInt( req.body.values.phonenum);
    const sex = req.body.values.sex;
    const address = req.body.values.address;
    const Checknumber = parseInt(req.body.values.Checknumber) ;
    const  Checkresualt = req.body.values.Checkresualt;
    const email = req.body.values.email;
    const DOB = req.body.values.DOB;
    console.log(req.body);
    db.query('INSERT INTO patient (  name, phonenum, sex, address,Checknumber,Checkresualt,email,DOB) VALUES (?,?,?,?,?,?,?,?)',
        [name, phonenum, sex, address,Checknumber,Checkresualt,email,DOB],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Values Inserted");
          }
        }
      );
    });
//اظهار نتيجة الفحص
    app.post('/chk',(req,res)=>{

      const idnumber =req.body.idnumber;
      const phonenum =req.body.phonenum;
      const name =req.body.neme;
      const Checknumber = req.body.Checknumber;
      const  Checkresualt = req.body.Checkresualt;
  
      
      db.query(
    "SELECT idnumber,phonenum ,name ,Checknumber,Checkresualt FROM patient WHERE idnumber=? AND phonenum=?   ",
    [idnumber , phonenum  ],
    (err,result)=>{
      if(err){
  
      res.send({err:err});
      
  } 
  
  
   
  if (result.length>0 ){
  
      res.send(result);
       
      
  
      
    
  }else{
  res.send({message:"wrong username/password"});
  
  
  
  }
  });
      
      });



      //المستشفى
      app.post('/hos',(req,res)=>{

        const id=req.body.id;
        const H_name =req.body.H_name;
        const H_place =req.body.H_place;
        const Number_of_beds = req.body.Number_of_beds;
        const Number_of_occupied_beds  = req.body.Number_of_occupied_beds ;
        const Number_of_devices = req.body.Number_of_devices ;
        const Number_of_occupied_devices  = req.body.Number_of_occupied_devices ;
        
       
        
        db.query(
      "SELECT id,H_name ,H_place,Number_of_beds ,Number_of_occupied_beds,Number_of_devices,Number_of_occupied_devices FROM hospitals WHERE  id=?,H_name=? ,H_place=?,Number_of_beds=? ,Number_of_occupied_beds=?,Number_of_devices=?,Number_of_occupied_devices=?   ",
      [id,H_name ,H_place,Number_of_beds ,Number_of_occupied_beds,Number_of_devices,Number_of_occupied_devices  ],
      (err,result)=>{
        if(err){
    
        res.send({err:err});
        
    } 
    
    
     
    if (result.length>0 ){
    
        res.send(result);
         
        
    
        
      
    }else{
    res.send({message:"wrong username/password"});
    
    
    
    }
    });
        
        });

        
//انشاء حساب مستخدم جديد
      app.post("/accounts", (req, res) => {
        const username = req.body.values.username;
        const password = req.body.values.password;
        const account_type = req.body.values.account_type;
        const name = req.body.values.name;
        const phonenum = parseInt(req.body.values.phonenum) ;
        const email = req.body.values.email;
        
        db.query('INSERT INTO users ( username, password, account_type, name,phonenum,email) VALUES (?,?,?,?,?,?)',
            [ username, password, account_type, name,phonenum,email],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send("Values Inserted");
              }
            }
          );
        });
    
   
  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','client','build','index.html'))
  })    
         

  // app.get('/subareas', (req, res) => {
  //   db.query('SELECT * FROM subareas;',
  //   (err,result)=>{
  //     if(err){
  //     res.send({err:err});    
  // } 
  
  // if (result.length>0 ){
  //     res.send(result);
  // }else{
  // res.send({message:"wrong username/password"});
  // }
  // })  });








app.listen(2000 ,()=>{

console.log("running in 2000");


})  


//الدوائر
app.post('/color',(req,res)=>{

  const Case_id =req.body.Case_id;
  const Case_type =req.body.Casep_type;
  const cases_num =req.body.cases_num;
  const case_color = req.body.case_color;
 

  
  db.query(
"SELECT Case_id,Case_type ,cases_num ,case_color FROM cases WHERE Case_id =? AND Casep_type=? AND cases_num=?  AND case_color=?   ",
[Case_id , Case_type,cases_num , case_color ],
(err,result)=>{
  if(err){

  res.send({err:err});
  
} 



if (result.length>0 ){

  res.send(result);
   
  

  

}else{
res.send({message:"wrong username/password"});



}
});
  














  });



  