var readline = require('n-readlines')
var path = require('path')

exports.showfile = (req,res)=>{
    const liner = new readline(__dirname+"/fetch/Outputs/"+req.params.folder+"/"+req.params.name)
    let line;
    var output = []
    while(line = liner.next()){
        output.push(line.toString('ascii'))
    }
    res.render('ouput',{arr:output})
}
exports.showfile2 = (req,res)=>{
    var fileName= req.params.filename
    //fileName+=".pdf"
    res.sendFile(fileName,{root:path.join(__dirname,"//fetch//Assignments//")},(err)=>{
        if(err){
            res.send("<h2>Sorry! File not found")
        }
    })
}
exports.getpdf = (req,res)=>{
    //req.params.pdf_name
    var name = req.params.filename
    name+=".pdf"
    res.sendFile(name,{root:path.join(__dirname,"//fetch//Manuals//")},(err)=>{
        if(err){
            res.send("<h1>Sorry! File Not found. Try using different name</h1>")
        }
    })    
}
exports.genpdf = (req,res)=>{
    var name = req.params.receivedfile
    console.log(name)
    //name+=".pdf"
    res.sendFile(name,{root:path.join(__dirname,"//fetch//References//")},(err)=>{
        if(err){
            res.send("<h1>Sorry! File Not found. Try using different name</h1>")
        }
    })
}