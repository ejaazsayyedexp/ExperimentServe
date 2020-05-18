var express = require('express');
var path = require('path')
var { getpdf, showfile, showfile2,genpdf } = require('./getroutes.js')
var { uploadFile } = require('./postroutes.js')
var bodyParser = require('body-parser')
var multer = require('multer')
var fs = require('fs')
var { spawn } = require('child_process')


const app = express();

app.use('views', express.static('/views'))
app.set('view engine', 'ejs')



var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Start of reading files in directory
var pathforspcc = __dirname + "\\fetch\\Outputs\\Experiments-SPCC"
var pathforcss = __dirname + "\\fetch\\Outputs\\Experiments-CSS"
var pathfordwm = __dirname + "\\fetch\\Outputs\\Experiments-DWM"
var pathforse = __dirname + "\\fetch\\Outputs\\Experiments-SE"
var arrayspcc = [];
fs.readdir(pathforspcc, function (err, files) {
    if (err) throw err;
    arrayspcc = files
})

var arraycss = [];
fs.readdir(pathforcss, function (err, files) {
    if (err) throw err;
    arraycss = files
})

var arraydwm = [];
fs.readdir(pathfordwm, function (err, files) {
    if (err) throw err;
    arraydwm = files

})

var arrayse = []
fs.readdir(pathforse, function (err, files) {
    if (err) throw err;
    arrayse = files
})
//End of reading of files in directory
// arrayspcc,arraydwm,arraycss,arrayse
var subjects = ['SPCC', 'CSS', 'ML', 'DWM', 'SE']
var assignments = []
fs.readdir(__dirname + "\\fetch\\Assignments", (err, files) => {
    if (err) throw err;
    assignments = files
})
var reference = []
fs.readdir(__dirname + "\\fetch\\References", (err, files) => {
    if (err) throw err;
    reference = files
})



/*app.get('/',(req,res)=>{
    //console.log(arrayspcc,arraycss,arraydwm,arrayse)
        res.render('first',{spcc:arrayspcc,css:arraycss,dwm:arraydwm,se:arrayse,uploadResult:null})
    });*/
app.get('/showfile/:folder/:name', showfile)
app.get('/Manual/:filename', getpdf)
app.get('/getAssignment/:filename', showfile2)
app.get('/showref/:receivedfile',genpdf)
//Steps in comments
//First:Set storage for storing the uploaded files using multer.diskstorage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

//Second:Set upload to multer object with storage options
var upload = multer({ storage: storage })
app.post('/submittoserver', upload.single('uploadfile'), (req, res) => {
    var file = req.file
    var dest = req.body.what
    var pyprocess = spawn('python', ['script.py', file.originalname, dest])
    pyprocess.stdout.on('data', (data) => {
        console.log(data.toString())
    })
    pyprocess.stderr.on('err', (err) => {
        console.log("Error occurred!")
        console.log(err)
    })
    if(dest==="Assignments"){
        assignments.push(file.originalname)
        assignments.splice(0,assignments.length, ...(new Set(assignments)))
    }
    else if(dest==="References"){
        reference.push(file.originalname)
        reference.splice(0,assignments.length, ...(new Set(reference)))
    }
    if (!file) {
        //Think on logic so that the server doesn't crash
        console.log("Error!")
        res.render('second', {ref:reference,assg: assignments, spcc: arrayspcc, css: arraycss, dwm: arraydwm, se: arrayse, subs: subjects, uploadResult: false })
    }


    res.render('second', {ref:reference, assg: assignments, spcc: arrayspcc, css: arraycss, dwm: arraydwm, se: arrayse, subs: subjects, uploadResult: true })




})




app.get('/v2.0', (req, res) => {

    res.render('second', {ref:reference ,assg: assignments, spcc: arrayspcc, css: arraycss, dwm: arraydwm, se: arrayse, subs: subjects })
})



app.listen(process.env.PORT || 8091, () => {
    console.log("@ 8091..");

});