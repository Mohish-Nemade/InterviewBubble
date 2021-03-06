const express = require('express');
const router = express.Router();
const app= express();
const tradeController = require("../controllers/tradeController");
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");
jsonUtils = require("../config/json_utils");


app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "html");
app.engine('html', require('hbs').__express);

app.use(express.static(path.join(__dirname, "public")));

router.post('/add', tradeController.addTrades);

router.put('/update', tradeController.updateTrade)

router.delete('/delete', tradeController.deleteTrade);

router.get('/getPortfolio',  tradeController.getPortfolioTradeData);

router.get('/getHoldings', tradeController.getHoldings);

router.get('/getReturns', tradeController.getPortfolioReturns);


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day,"0000"].join('');
}

function getStates(ts) {
    //  "date": 'Thu, 26 Nov 2020',
   // let ts = Date.now();
    var d = new Date();
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];


    var n = month[d.getMonth()];

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let mon = month[date_ob.getMonth()];
    let year = date_ob.getFullYear();
    let day = days[date_ob.getDay()];
    
    // prints date & time in YYYY-MM-DD format
    const out= day+", "+date+" "+mon+" "+year;
    console.log("Here"+year + "-" + mon + "-" + date);
    console.log("Here"+out);

         return out.toString();

    //const datee;

    
    //timeslots.push(res[0])

return d;

}


function getPropOld(res) {
    
    const timeslots=[];

    var arrayLength = res.length;
    for (var i = 0; i < arrayLength; i++) {

        var temp=res[i].toString()
        temp= temp.substring(8,10)+":"+temp.substring(10,12)
        console.log("temp"+temp)
        timeslots.push(temp)        //Do something
    }
    //timeslots.push(res[0])

return timeslots;

}

function getProp(res) {
  
  var time = new Array();
 


    const timeslots=[];

    var arrayLength = res.length;
    for (var i = 0; i < arrayLength; i++) {

      var temp=res[i].toString()
      time.push(parseInt(temp.substring(8,10)+temp.substring(10,12)));
    }
    time.sort(function(a, b){return a - b});
    console.log("time"+time)

    for (var i = 0; i < time.length; i++) {

        var temp=time[i].toString()
        var len=temp.length
        console.log("here"+len)
        if(len==3)
        {
             temp= temp.substring(0,1)+":"+temp.substring(1,3)+" am"
             console.log("here")
        }
        else 
        {    
          if(parseInt(temp.substring(0,2))>12)
            temp= (parseInt(temp.substring(0,2))-12).toString()+":"+temp.substring(2,4)+" pm"
          else  
            temp= temp.substring(0,2)+":"+temp.substring(2,4)+" am"
        }
        console.log("temp"+temp)
        timeslots.push(temp)        //Do something
    }
    //timeslots.push(res[0])

return timeslots;

}


function getFormatDate(temp)
{
  var result=''
  var month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";

  var mon='';
  if (temp.substring(0,1)=='0')
      mon=temp.substring(1,2);
  else
      mon=temp.substring(0,2);

  mon=month[mon-1];
  result=mon+" "+temp.substring(3,5)+", "+temp.substring(6,10)+" 23:15:20";

  return result;

}


app.get("/getTimeSlots", async (req, res) => {
  var dayId = req.query.dayId;
//December 25, 1995
//02/15/2021
  var temp=getFormatDate(dayId);
  console.log(temp)

  var dt = new Date(temp);
  dt=dt.getTime();

  let ts = Date.now();

  const url="https://www.picktime.com/book/slots?_="+ts+"&dateAndTime="+formatDate(dt)+"&locationId=478b9f23-567c-4172-a196-6d1a9f9dbd41&duration=45&slot=45&offBooking=false&eventType=appointment&serviceClassId=b735bbf2-5860-4c10-9fab-4916e879df84&accountId=fbe37d3f-f29a-4c86-a144-b5bb131e1b56"

  console.log(url)
  const result = await axios.get(
    url      );
    console.log(result.data.data)

    
    return res.json(getProp(result.data.data));

});


app.get("/repos", async (req, res) => {
   // const username = req.query.username || "myogeshchavan97";
    try {
        let ts = Date.now();
        console.log(ts)
        var datetime = new Date();
       // console.log(datetime)
        console.log(formatDate(ts))
/*
        //const url="https://www.picktime.com/book/slots?_="+ts+"&dateAndTime="+formatDate(ts)+"&locationId=478b9f23-567c-4172-a196-6d1a9f9dbd41&duration=45&slot=45&offBooking=false&eventType=appointment&serviceClassId=b735bbf2-5860-4c10-9fab-4916e879df84&accountId=fbe37d3f-f29a-4c86-a144-b5bb131e1b56"
        const url="https://www.picktime.com/book/slots?_="+ts+"&dateAndTime="+formatDate(ts)+"&locationId=478b9f23-567c-4172-a196-6d1a9f9dbd41&duration=45&slot=45&offBooking=false&eventType=appointment&serviceClassId=b735bbf2-5860-4c10-9fab-4916e879df84&accountId=fbe37d3f-f29a-4c86-a144-b5bb131e1b56"


        
        let ts1 = Date.now()+24*60*60 * 1000;
      //  console.log(getStates(ts1))
        console.log(ts1)
        console.log(formatDate(ts1))

        var datetime = new Date();
        const url1="https://www.picktime.com/book/slots?_="+ts1+"&dateAndTime="+formatDate(ts1)+"&locationId=478b9f23-567c-4172-a196-6d1a9f9dbd41&duration=45&slot=45&offBooking=false&eventType=appointment&serviceClassId=b735bbf2-5860-4c10-9fab-4916e879df84&accountId=fbe37d3f-f29a-4c86-a144-b5bb131e1b56"

        let ts2 = Date.now()+2*24*60*60 * 1000;
        console.log(ts2)
        console.log(formatDate(ts2))

        var datetime = new Date();
        const url2="https://www.picktime.com/book/slots?_="+ts2+"&dateAndTime="+formatDate(ts2)+"&locationId=478b9f23-567c-4172-a196-6d1a9f9dbd41&duration=45&slot=45&offBooking=false&eventType=appointment&serviceClassId=b735bbf2-5860-4c10-9fab-4916e879df84&accountId=fbe37d3f-f29a-4c86-a144-b5bb131e1b56"

        let ts3 = Date.now()+3*24*60*60 * 1000;
        console.log("----------------"+ts3)
        console.log(formatDate(ts3))

        var datetime = new Date();
        const url3="https://www.picktime.com/book/slots?_="+ts3+"&dateAndTime="+formatDate(ts3)+"&locationId=478b9f23-567c-4172-a196-6d1a9f9dbd41&duration=45&slot=45&offBooking=false&eventType=appointment&serviceClassId=b735bbf2-5860-4c10-9fab-4916e879df84&accountId=fbe37d3f-f29a-4c86-a144-b5bb131e1b56"

        let ts4 = Date.now()+4*24*60*60 * 1000;
        console.log(ts4)
        console.log(formatDate(ts4))

        var datetime = new Date();
        const url4="https://www.picktime.com/book/slots?_="+ts4+"&dateAndTime="+formatDate(ts4)+"&locationId=478b9f23-567c-4172-a196-6d1a9f9dbd41&duration=45&slot=45&offBooking=false&eventType=appointment&serviceClassId=b735bbf2-5860-4c10-9fab-4916e879df84&accountId=fbe37d3f-f29a-4c86-a144-b5bb131e1b56"

        let ts5 = Date.now()+5*24*60*60 * 1000;
        console.log(ts5)
        console.log(formatDate(ts5))

        var datetime = new Date();
        const url5="https://www.picktime.com/book/slots?_="+ts5+"&dateAndTime="+formatDate(ts5)+"&locationId=478b9f23-567c-4172-a196-6d1a9f9dbd41&duration=45&slot=45&offBooking=false&eventType=appointment&serviceClassId=b735bbf2-5860-4c10-9fab-4916e879df84&accountId=fbe37d3f-f29a-4c86-a144-b5bb131e1b56"

        let ts6 = Date.now()+6*24*60*60 * 1000;
        console.log(ts6)
        console.log(formatDate(ts6))

        var datetime = new Date();
        const url6="https://www.picktime.com/book/slots?_="+ts6+"&dateAndTime="+formatDate(ts6)+"&locationId=478b9f23-567c-4172-a196-6d1a9f9dbd41&duration=45&slot=45&offBooking=false&eventType=appointment&serviceClassId=b735bbf2-5860-4c10-9fab-4916e879df84&accountId=fbe37d3f-f29a-4c86-a144-b5bb131e1b56"



      const result = await axios.get(
url      );
const result1 = await axios.get(
    url1      );
    const result2 = await axios.get(
        url2      );
        const result3 = await axios.get(
            url3      );
            const result4 = await axios.get(
                url4     );
                const result5 = await axios.get(
                    url5      );
                    const result6= await axios.get(
                        url6     );
                       


      console.log("Hi"+getProp(result.data.data))

      const repos = result.data
      const tp= [{
        "date": getStates(ts),
        "timeSlots":getProp(result.data.data)
      },
      {
        "date": getStates(ts1),
        "timeSlots": getProp(result1.data.data)
      },
      {
        "date": getStates(ts2),
        "timeSlots": getProp(result2.data.data)
      },
      {
        "date": getStates(ts3),
        "timeSlots": getProp(result3.data.data)
      },
      {
        "date": getStates(ts4),
        "timeSlots": getProp(result4.data.data)
      },
      {
        "date": getStates(ts5),
        "timeSlots": getProp(result5.data.data)
      },
      {
        "date": getStates(ts6),
        "timeSlots": getProp(result6.data.data)
      }]
*/
     
      res.render("widget", {
        "res" : "jsonUtils.encodeJSON(tp)"
      });
    } catch (error) {
      console.log(error);
      res.status(400).send("Error while getting list of repositories");
    }
  });

module.exports = app;

