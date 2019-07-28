// import express from 'express';
const express = require('express')
const app = express()
const port = 4000
const fs = require('fs');
path = require('path');
var util = require('util');


app.get('/getEnvironment/:process', (req, res) => 
{
    if(req.params.process === "process1"){
        filePath = path.join(__dirname, 'process1env/.env');
    } else if(req.params.process === "process2"){
        filePath = path.join(__dirname, 'process2env/.env');
    } else{
        return res.send("Please enter the valid process name")
    }
    let data=fs.readFileSync(filePath,"utf8");
    var env = {}
    data.replace(/(\w+)=(.+)/g, function($0, $1, $2) { env[$1] = $2 });
    data.replace(/(\w+)=((\d+)|.+)/g, function($0, $1, $2, $3) {
        env[$1] = $3 ? Number($3) : $2;
    });
    return res.send(JSON.stringify(env)) 
}
)
app.get('/setEnvironment/:process/:key/:value', (req, res) => {
    if(req.params.process === "process1"){
        filePath = path.join(__dirname, 'process1env/.env');
    } else if(req.params.process === "process2"){
        filePath = path.join(__dirname, 'process2env/.env');
    } else{
        return res.send("Please enter the valid process name")
    }
    let data=fs.readFileSync(filePath,"utf8");
    var env = {}
    data.replace(/(\w+)=(.+)/g, function($0, $1, $2) { env[$1] = $2 });
    data.replace(/(\w+)=((\d+)|.+)/g, function($0, $1, $2, $3) {
        env[$1] = $3 ? Number($3) : $2;
    });

    if(env.hasOwnProperty(req.params.key)){
        env[req.params.key]=req.params.value
    }else{
        return res.send("Please enter the valid Key name")   
    }

    let myString = "";
    for(let str in env){
        if(env.hasOwnProperty(str)){
            myString=myString+`${str}=${env[str]}\n`
        }
    }
    try{
         fs.writeFileSync(filePath,myString , 'utf-8');
    }catch(err){
         console.error(err)    
    }
    
    res.send(JSON.stringify(env))
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

