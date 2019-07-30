'use strict'

const args = require('yargs').argv;
const express = require('express');
const app = express();
const mysql = require('mysql') ;

const password = require('./password');


let connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : password,
  database : 'classicmodels'
});

connection.connect();

app.get('/employees', (req, res) => {
  connection.query(`SELECT * FROM employees` , function (error, results, fields) {
    if (error) throw error;
    // console.log(results[0].firstName);
    // for(let item in results) {
     // 'Employees name: ' + results[item].firstName  + ' ' + results[item].lastName +  ' Title: ' + results[item].jobTitle;
    // }
    res.send(results)
  })
})

// app.get('/add', (req, res) => {
//   connection.query(`INSERT INTO employees (employeeNumber, lastName, firstName, extension, email, officeCode, reportsTo, jobTitle) VALUES (001, 'Daughterty', 'James', 'x420', 'jamesbluffin86@gmail.com', 5, 1002, 'CTO')`, function (error, results, fields) {
//     if (error) throw error;
//
//     res.send(results);
//   });
// });

app.get('/add/:employeeNumber/:lastName/:firstName/:extension/:email/:officeCode/:reportsTo/:jobTitle', (req, res) => {
  connection.query(`INSERT INTO employees (employeeNumber, lastName, firstName, extension, email, officeCode, reportsTo, jobTitle)
  VALUES (${Number(req.params.employeeNumber)}, '${req.params.lastName}', '${req.params.firstName}', '${req.params.extension}', '${req.params.email}', ${Number(req.params.officeCode)}, ${Number(req.params.reportsTo)}, '${req.params.jobTitle}')`, function (error, results, fields) {
    if(error) throw error;

    res.send(results)
  });
});
app.get('/delete/:employeeNumber', (req, res) => {
  connection.query(`DELETE FROM employees WHERE employeeNumber = ${Number(req.params.employeeNumber)}`, function (error, results, fields) {
    if (error) throw error;

    res.send('successfully Deleted Employee')
  })
})

app.get('/update/:employeeNumber/:lastName/:firstName/:extension/:email/:officeCode/:reportsTo/:jobTitle', (req, res) => {
  let updateList = '';
  // let newList = '';
  if(req.params.lastName != 'null') {
    updateList += " lastName" + " = " + `"${req.params.lastName}"` + ",";
  }
  if(req.params.firstName != 'null') {
    updateList += " firstName" + " = " + `"${req.params.firstName}"` + "," ;
  }
  if(req.params.extension != 'null') {
    updateList += " extension" + " = " + `"${req.params.extension}"` + ",";
  }
  if(req.params.email != 'null') {
    updateList +=  " email" + " = " + `"${req.params.email}"` + ",";
  }
  if(req.params.officeCode != 'null') {
    updateList += " officeCode" + " = " + `"${req.params.officeCode}"` + ",";
  }
  if(req.params.reportsTo != 'null') {
    updateList += " reportsTo" + " = " + `"${req.params.reportsTo}"` + ",";
  }
  if(req.params.jobTitle != 'null') {
    updateList += " jobTitle" + " = " + `"${req.params.jobTitle}"` + ",";
  }
  updateList = updateList.slice(0, -1);
  // res.send(updateList);
  connection.query(`UPDATE employees SET ${updateList} WHERE employeeNumber = ${Number(req.params.employeeNumber)} ` , function (error, results, fields) {

    if (error) throw error;

    res.send(results)
  })
})

app.listen(3000)

// app.get('/delete/:param1', (req, res) => {
//   connection.query()
// })

// connection.query(`SELECT * FROM employees` , function (error, results, fields) {
//   if (error) throw error;
//   console.log(results[0].firstName);
//   for(let item in results) {
//     // console.log(results[item].firstName);
//     console.log('Employees name: ' + results[item].firstName  + ' ' + results[item].lastName +  ' Title: ' + results[item].jobTitle);
//   }
// });

// connection.end();
