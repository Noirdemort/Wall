// var app = angular.module("pathway",[]);
// var popups = require('electron').remote;
// var dialog = popups.dialog;

// app.controller("redSky",[ $scope, ($scope) => {
//     $scope.demo = "Sample Code"
// }])

// const play = require('play');
// play.sound('../../jarvis/jarvis_uploaded.wav')
const mysql = require('mysql');
cnxn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'client'
    })


function search() {
   var keyword = document.getElementById('field').value 
    cnxn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'client'
    })

   cnxn.connect((err)=> {
       if(err){
           alert("Connection can't be established")
       }
   })

   sql = `select c_name, file_no from clients where c_name Like "%${keyword}%" ;`

   cnxn.query( sql , (err,rows,fields)=>{
       if(!err){
           for (var i in rows){
            document.getElementById('setter').innerHTML += `${i} ${rows[i].c_name}  ${rows[i].file_no} <button onclick="details(${rows[i].file_no})">Show</button><br>`
           }
       }else{
           alert('An error occured!')
           alert(err)
           cnxn.end()
       }
   })
   
}

function details(id){
    
    asql = `select filing_id,asmt_year, dof, return_income, tax, filen,total_fee, fee_recieved, dor from clients inner join filings on filings.filen = clients.file_no where clients.file_no=${id};`

    bsql = `select * from clients where file_no=${id}`
   
     cnxn = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'client'
        })
    
       cnxn.connect((err)=> {
           if(err){
               alert(`Connection can't be established ${err}`)
           }
       })

    cnxn.query(bsql, (err,rows,fields)=>{
        if(!err){
            row = rows[0]
            document.getElementById('name').innerHTML += `<br> <td>${row.c_name} <button onclick="upgrade('c_name',${id})">Update</button> </td>`
            document.getElementById('file').innerHTML += `<br> <td>${row.file_no}</td>`
            document.getElementById('pan').innerHTML += `<br> <td>${row.pan_card} <button onclick="upgrade('pan_card',${id})">Update</button></td>`
            document.getElementById('remarks').innerHTML += `<br> <td>${row.remarks} <button onclick="upgrade('remarks',${id})">Update</button></td>`
        }else{
            alert('An error occured!')
            alert(err)
        }
    })

    
    cnxn.query(asql, (err,rows,fields)=>{
            if(!err){
                for(var i in rows){
                    row = rows[i]
                    balance = row.total_fee - row.fee_recieved
                    table = `<tr> 
                            <td>${row.asmt_year}</td>
                            <td>${row.dof}</td> 
                            <td>${row.return_income}</td>
                            <td>${row.tax}</td>
                            <td> ${row.total_fee}</td>
                            <td>${row.fee_recieved}</td>
                            <td> ${balance}</td> 
                            <td> ${row.dor}</td>
                            <td> <button onclick="editR(${row.filing_id},${id})">Edit</button></td>
                            </tr>`
                    document.getElementById('record').innerHTML += table
                }
            }else{
                alert('An error occured!')
                alert(err)
            }
        })

    document.getElementById('transit').style.display = 'none'
    document.getElementById('detainer').style.display = 'block'

    cnxn.end()
}
function retval(field,id) {
    injection = `Enter ${field} in textbox <input type="text" id="irever"> <button onclick='upgrade2(${field},${id})'>Submit</button>`
    document.getElementById('rever').innerHTML += injection
    document.getElementById('rever').style.display = 'block'
}


function upgrade(field,id){
        retval(field,id)
    }

function upgrade2(field,id){
        document.getElementById('rever').style.display = 'none';
        var nVal = document.getElementById('irever').value
        if (nVal == -1){
            console.log("Passed")
        }else{
             sql = `update clients set ${field}=${nVal} where file_no=${id}`
     cnxn = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'client'
        })
    
       cnxn.connect((err)=> {
           if(err){
               alert(`Connection can't be established ${err}`)
           }
       })

    cnxn.query(sql, (err,rows)=>{
        if(!err){
            alert('Info Updated')
            detDefault(id)
        }else{
            alert('An error occured!')
            alert(err)
        }
    })
        }
        
}

function editR(transId,id)  {
    rg = `<select id='recordName'>
  <option value="asmt_year">Assessment year</option>
  <option value="dof">Date of filing</option>
  <option value="return_income">Return Income</option>
  <option value="tax">Tax</option>
    <option value="total_fee">Total fee</option>
<option value="fee_recieved">Fee recieved</option>
<option value='dor'> Date of recieving </option>
</select>   <input id='recValue' type="text"> <button onclick="pacman(${transId},${id})">Update</button> <button onclick="default(${id})"> Cancel</button>`
    document.getElementById('distro').innerHTML += rg
}

function detDefault(id){
    document.getElementById('recValue').value = ''
    document.getElementById('distro').innerHTML = ''
    document.getElementById('name').innerHTML = '<td>Name: </td>'
    document.getElementById('file').innerHTML = `<td>File no.:</td>`
    document.getElementById('pan').innerHTML = `<td>PAN ID:</td>`
    document.getElementById('remarks').innerHTML = `<td> Remarks: </td>`
    document.getElementById('record').innerHTML = `<caption>Client filing and Balance details</caption>
    <tr>
        <td> Assessment Year</td>
        <td>Date of Filing</td> 
        <td>Return Income</td>
        <td>Tax</td>
        <td> Total Fee</td>
        <td>Fee recd.</td>
        <td>Balance due</td> 
        <td> Date of recv. </td>
    </tr>`
    details(id)
}

function pacman(transId,id){
    rField = document.getElementById('recordName').value
    rVal = document.getElementById('recValue').value
    if((!rField)||(!rVal)){
        alert("Please enter value to required fields")
        editR(transId)
    }else{
        
        sql = `update filings set ${rField}=${rVal} where filing_id=${transId}`
        
        
     cnxn = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'client'
        })
    
       cnxn.connect((err)=> {
           if(err){
               alert(`Connection can't be established ${err}`)
           }
       })

    cnxn.query(sql, (err,rows)=>{
        if(!err){
            alert('Info Updated')
            detDefault(id)
        }else{
            alert('An error occured!')
            alert(err)
            document.getElementById('distro').innerHTML = ''
        }
    })
   
    }

}


function goBack() {
    cnxn.end()
    document.getElementById('name').innerHTML = '<td>Name: </td>'
            document.getElementById('file').innerHTML = `<td>File no.:</td>`
            document.getElementById('pan').innerHTML = `<td>PAN ID:</td>`
            document.getElementById('remarks').innerHTML = `<td> Remarks: </td>`
            document.getElementById('record').innerHTML = `<caption>Client filing and Balance details</caption>
            <tr>
                <td> Assessment Year</td>
                <td>Date of Filing</td> 
                <td>Return Income</td>
                <td>Tax</td>
                <td> Total Fee</td>
                <td>Fee recd.</td>
                <td>Balance due</td> 
                <td> Date of recv. </td>
            </tr>`
    document.getElementById('transit').style.display ='block'
    document.getElementById('detainer').style.display = 'none'
    document.getElementById('field').value = ''
    document.getElementById('setter').innerHTML = 'Search results: <br>'
}


function hellFire(){
    alert("proceeding to delete")
    id = document.getElementById('file').value
    var apoc = confirm("Are you sure you want to delete it?")
    if (apoc){
        cnxn = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'',
            database:'client'
            })
        
           cnxn.connect((err)=> {
               if(err){
                   alert(`Connection can't be established ${err}`)
               }
           })
           sql = `delete from clients where file_no=${id}`
        cnxn.query(sql, (err,rows)=>{
            if(!err){
                alert('client deleted')
                goBack()
            }else{
                alert('An error occured!')
                alert(err)
            }
        })
       
    }else{
        alert('Deletion cancelled')
    }
}

function addNewRec(){
    document.getElementById('enroll').style.display = 'block'
}

function adder(){
    var file = document.getElementById('file').value
    var asmt = document.getElementById('asmt').value
    var dof = document.getElementById('dof').value
    var return_income = document.getElementById('rc').value
    var tax = document.getElementById('tax').value
    var tFee = document.getElementById('tFee').value
    var fRecv = document.getElementById('fRecv').value
    var dor = document.getElementById('dor').value

    cnxn = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'client'
        })
    
       cnxn.connect((err)=> {
           if(err){
               alert(`Connection can't be established ${err}`)
           }
       })

       sql = `insert into filings(asmt_year,dof,return_income,tax,filen,total_fee,fee_recieved,dor) values(${asmt},${dof},${return_income},${tax},${file},${tFee},${fRecv},${dor});`
    cnxn.query(sql, (err,rows)=>{
        if(!err){
            alert('Record Added')
            document.getElementById('enroll').style.display = 'none'
            detDefault(file)
        }else{
            alert('An error occured!')
            alert(err)
        }
    })
}
