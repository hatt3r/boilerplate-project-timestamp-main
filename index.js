// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", (req, res) => {

  //dateParam variable will contain request paramters date that is provided in the path
  const dateParam = req.params.date; 
  //we initialize the dateObject 
  let dateObject;
  
  //if dateParam variable is null or is does not contain anything 
  // then we provide the dateObject with new Date()
  if(!dateParam)
  {
    dateObject = new Date()
  }
  //else if contains a date it must be in unix time format(5 or more digits)
  //hence we check for only the digits
  //we parse those digits as new date and convert to dateObject
  else if(/\d{5,}/.test(dateParam))
  {
    dateObject = new Date(parseInt(dateParam))
  }
  //if dateParams contain normal date integers then just use new Date() function
  // to give dateObject the date
  else 
  {
    dateObject = new Date(dateParam)
  }


  //if the time in the dateObject is not a number or integer
  //then response json will have error: "Invalid Date"
  if (isNaN(dateObject.getTime())) {
    return res.json({ error : "Invalid Date" }); 
  }
  //else the response json will have
  //unix as key and value as dateObject.getTime() time in unix format
  //utc as key and value as dateObject.toUTCSting() convert it to UTC
  else {
    res.json({unix:dateObject.getTime(),utc:dateObject.toUTCString()})
  }
}); 

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
