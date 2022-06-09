const express = require('express');
const res = require('express/lib/response');
const mysql = require('mysql');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodemysql'
})

//connect to the mysql

db.connect(err=>{
    if(err) {
        throw err;
    }
    console.log('MYSQL connected');
})

const app = express();

//create Database
app.get('/createdb',(req,res)=>{
    let sql = "CREATE DATABASE nodemysql";
    db.query(sql,(err)=>{
        if(err) {
            throw err;
        }
        res.send("Database Created");
    })
})
// Create Table

app.get('/createemployee',(req,res)=>{

    let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT,name VARCHAR(255),designation VARCHAR(255),PRIMARY KEY(id))';
    db.query(sql,(err)=>{
        if(err) {
            throw err;
        } 
        res.send('Employee table created');
    });

});

//insert records into employee
app.get('/employee1',(req,res)=>{
    let post = {name:'Jake Smith',designation:'Chief Executive Officer'};
    let sql = 'INSERT INTO employee SET ?';
    db.query(sql,post,(err)=>{
        if(err) {
            throw err;
        }
        res.send('Employee Added');
    })
})

// select all employees 
app.get('/getEmployee',(req,res)=>{
    let sql = "SELECT * FROM employee";
    let query = db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
});

// update employee

app.get('/updatEmployee/:id',(req,res)=>{
    let name = "Mohit Mishra";
    let sql = `UPDATE employee SET name='${name}' WHERE id =${req.params.id}`;
    let query = db.query(sql,(err)=>{
        if(err) {
            throw err;
        }
        res.send("Empoyee has been updated");
    })
})

// delete employee from the table
app.get('/deleteEmployee/:id',(req,res)=>{
    let sql = `DELETE FROM employee WHERE id=${req.params.id}`;
    let query = db.query(sql,(err)=>{
        if(err) {
            throw err;
        }
        res.send('DELETED');
    })
})



app.listen(3000,()=>{
    console.log('Server Started on the port 3000');
})