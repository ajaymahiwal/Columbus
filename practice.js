

const express = require("express");
const app = express();
const wrapAsync = require("./utils/wrapAsync.js");

function Ajay(){
    
    return {
        name:"Ajay",
        course:"BCA",
        TodayDate:"12-12-2023"
    }
}
Ajay.smile = function(){
    console.log("Ajay is very happy for everyone and you.");
}
console.log(Ajay);
console.log(Ajay.smile);
console.log(Ajay());
console.log(Ajay.smile());
// console.log(express);
// console.log(express());
// console.log(express.Router);
// console.log(express.Router());
app.get("/",(req,res)=>{
    res.send("home");
})

app.get("/home",wrapAsync(async (req,res,next)=>{
    console.log("I'm 1st /home Error");
    if(false){
        res.redirect("/");
    }
    return next();
}));

app.get("/home1",async (req,res,next)=>{
    try{
        console.log("i'm 2nd")
        throw new Error("I'm a Error From Home1");
        res.send("Ajay");
    }
    catch(err){
        next(err);
    }
});

app.all("*",(req,res,next)=>{
    return next("Page Not Found 404");
})

app.use((err,req,res,next)=>{
    res.send(`error ye hai ${err}`);
});

app.listen(3000);