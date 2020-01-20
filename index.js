var express = require('express');
var path = require('path')
var readline = require('n-readlines')
const app = express();
var fs = require('fs')
app.use('views',express.static('/views'))
app.set('view engine','ejs')



//Start of reading files in directory
var pathforspcc = __dirname+"\\experiments\\Experiments-SPCC"
var pathforcss = __dirname+"\\experiments\\Experiments-CSS"
var pathfordwm = __dirname+"\\experiments\\Experiments-DWM"
var pathforse = __dirname+"\\experiments\\Experiments-SE"
var arrayspcc=[];
fs.readdir(pathforspcc,function(err,files){
    if(err) throw err;
    /*
    //Iterating using forEach 
    files.forEach(function(data){
        console.log(data)
        array.push(data)
        console.log(array)
    })*/
    arrayspcc = files
    
})
var arraycss = [];
fs.readdir(pathforcss,function(err,files){
    if(err) throw err;
    /*
    //Iterating using forEach 
    files.forEach(function(data){
        console.log(data)
        array.push(data)
        console.log(array)
    })*/
    arraycss = files
    
})
var arraydwm = [];
fs.readdir(pathfordwm,function(err,files){
    if(err) throw err;
    /*
    //Iterating using forEach 
    files.forEach(function(data){
        console.log(data)
        array.push(data)
        console.log(array)
    })*/
    arraydwm = files
    
})
var arrayse = []
fs.readdir(pathforse,function(err,files){
    if(err) throw err;
    /*
    //Iterating using forEach 
    files.forEach(function(data){
        console.log(data)
        array.push(data)
        console.log(array)
    })*/
    arrayse = files
    
})
//End of reading of files in directory
// arrayspcc,arraydwm,arraycss,arrayse




app.get('/',(req,res)=>{
    console.log(arrayspcc,arraycss,arraydwm,arrayse)
        res.render('first',{spcc:arrayspcc,css:arraycss,dwm:arraydwm,se:arrayse})
    });
app.get('/showfile/:folder/:name',(req,res)=>{
    const liner = new readline(__dirname+"/experiments/"+req.params.folder+"/"+req.params.name)
    let line;
    var output = []
    while(line = liner.next()){
        output.push(line.toString('ascii'))
    }
    res.render('ouput',{arr:output})
})



app.listen(8091,()=>{console.log("@ 8091..");});