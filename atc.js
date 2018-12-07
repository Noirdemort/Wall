const play = require('play')
function addClientDetails() {
    var cName = document.getElementById('cName').value
    var fileNo = document.getElementById('fileno').value
    var pan = document.getElementById('pan').value
    pan = pan.toUpperCase()
    var remarks = document.getElementById('remarks').value

    var pcheck = new RegExp("[A-Z]{5}[0-9]{4}[A-Z]")
    if(pcheck.test(pan)){
    const msql = require('mysql');
    const cnx = msql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'client'
})
    sql =  `insert into clients(c_name, file_no,pan_card,remarks) values ("${cName}","${fileNo}","${pan}","${remarks}");`


    cnx.connect((err)=>{
        if(err){
            alert(err)
        }
    })
    cnx.query(sql , (err,rows)=>{
        if(!err){
            alert('Client Added!')
            // play.sound('../../jarvis/core.mp3')
        }else{
            alert(err)
        }
    }) }else{
        alert('Pan card format is wrong, check it again!')
    }
    cnx.end()
}

