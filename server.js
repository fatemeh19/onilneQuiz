var express = require('express');
var app = express();
const path = require('path')
const cors = require('cors')
const http = require('http');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// mongoose.connect('mongodb://localhost:27017/quizDB')
mongoose.connect("mongodb://localhost:27017/quizDB", {useNewUrlParser: true}, (err) => {
    if (err)
        console.error(err);
    else
        console.log("Connected to the mongodb"); 
});


// //   if (app.get('env') === 'production') {
// //     app.set('trust proxy', 1) // trust first proxy
// //   }
  



var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// Then pass them to cors:
app.use(cors(corsOptions));

app.use((req, res, next) => {
  
  res.header('Access-Control-Allow-Origin', '*')
  next()
});

app.use((req, res, next) => {
  
  console.log(req.body.name)
  next()
 });
app.use('/', require("./routes/remoteRoute"));








// //setup load image from direction public
app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

//setup Localization
// require("./components/lang/index");
// const localizify = require("localizify")
// app.use((req, res, next) => {
//   const lang = localizify.default.detectLocale(req.headers['accept-language']) || "tr";
//   localizify.default.setLocale(lang);
//   res.t = localizify.t
//   next();
// });

// app.use('/', require("./routes/index"));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });


// let PORT = process.env.PORT
let PORT = 3000

app.listen(PORT,()=>{console.log(`REST server started on ${PORT}`);})

module.exports = {app}