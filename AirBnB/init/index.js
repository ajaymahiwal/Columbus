

const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../Models/listing");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");
}

main()
.then(()=>{
    console.log("Connected With DB.");
})
.catch((err)=>{
    console.log("Can't Connnect with DB, Something Went Wrong.");
});


const initDB = async ()=>{
    let data = initData.data;
    await Listing.insertMany(data);
    console.log("Data Initialized !");
}

initDB();