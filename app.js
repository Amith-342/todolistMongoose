const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
var job1 = "";
var jobs  = [];

var length = 0;

app.set('view engine','ejs');
app.use(express.static(__dirname+"/public"));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jobsDB');

const jobSchema = new mongoose.Schema({
   
    job:String
})

const Job = new mongoose.model("Job",jobSchema);

// const firstJob = new Job({
//     _id:length+1,
//     job:"Learn Web dev Completely."
// },()=>{
 //   length+=1;
//})

//firstJob.save();




app.listen(3000,function(){
    console.log("App running on 3000.");
});

var today = new Date();

app.use(bodyParser.urlencoded({extended:true}));

app.post("/",function(request,response){
    job1 = request.body.joba;
    //jobs.push(job1);
   // console.log(jobs[0]);
   
  var newJob = new Job({
    
    job:job1
    
  },(error1,result1)=>{
length = length+1;
  })
  newJob.save()
    response.redirect("/");

    
});



app.get("/",function(req,res){
    
    var day = 5;
// if(today.getDay() === 0||today.getDay() === 6){
//     day = "Weekend";
// }
// else{
//     day = "Weekday";
// }
day = today.getDay();
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var day1 = "";
for(var i=0;i<7;i++){
    if(i === day){
day1 = days[i];
    }
}





Job.find({},(err,result)=>{
   
    
    res.render("list",{kindofDay:day1,j:result});
})



});




app.post("/delete",(req,res)=>{
    var delId = req.body.checkBox;
   console.log(delId);
Job.deleteOne({_id:delId},(err,result)=>{
   if(err){
    console.log(err)
   }else{
    console.log("deleted")
   }
})

res.redirect('/');

})
