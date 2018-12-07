// var app = angular.module("pathway",[]);
// var popups = require('electron').remote;
// var dialog = popups.dialog;

// app.controller("redSky",[ $scope, ($scope) => {
//     $scope.demo = "Sample Code"
// }])

const mysql = require('mysql');
const cnxn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'client'
    })

function search() {
//    var keyword = document.getElementById('field').value 
    
  

   cnxn.connect((err)=> {
       if(err){
           console.log(err)
        //    alert("Connection can't be established")
       }
   })

   

   sql = `select * from clients inner join filings on filings.filen = clients.file_no where clients.file_no=234;` 

//    alert(sql)

   cnxn.query(sql , (err,rows,fields)=>{
       if(!err){
           for (var i in rows){
           console.log(rows[i])}
            // document.getElementById('setter').innerText += rows
       }else{
           console.log(err)
        //    alert('An error occured!')
        //    alert(err)
       }
   })
   cnxn.end()
   
}
search()
