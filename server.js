'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer  = require('multer')
var upload = multer({ dest: 'uploads' })

var app = express();
// SET STORAGE
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
 
// var upload = multer({ storage: storage })

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});
// upload
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  const file = req.file;
  if (!file) {
    res.send('Please add file to upload');
  }else res.json({name: req.file.originalname, size: req.file.size});
  // {"name":"test","type":"application/octet-stream","size":8}
})


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
