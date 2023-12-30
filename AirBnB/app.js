const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const {Listing,enumValues} = require("./Models/listing");
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");
}

main()
.then(()=>{
    console.log("Connected With DB.");
})
.catch(()=>{
    console.log("Can't Connect With DB, Something Went Wrong.");
});

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true})); // ?
app.use(methodOverride("_method"));

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");




app.get("/",async(req,res)=>{
    let listings = await Listing.find();
    // console.log(listings);
    res.render("./listing/home.ejs",{listings});
});

app.get("/listings/new",(req,res)=>{
    let category = ['Apartment','House','Condo','Vila','Cottage','Bungalow','Loft','Tiny House','Treehouse','Cabin','Mansion','Castle','Tent','Houseboat','Yurt','Camper'];

    res.render("./listing/new.ejs",{category});
});
app.post("/listings/new",async(req,res)=>{
    let {listing} = req.body;
    let newItem = new Listing(listing);
    console.log(newItem);
    let id = newItem._id;
    console.log(id);
    await newItem.save();



    res.redirect(`/listings/${id}`);
});

app.get("/listings/:id",async(req,res)=>{
    let id = req.params.id;
    let item = await Listing.findById(id);
    console.log(item);
    if(item){
        res.render("./listing/show.ejs",{item});
    }
    else{
        res.render("./basic/error.ejs");
    }
});


app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let item = await Listing.findById(id);
    console.log(enumValues)
    res.render("./listing/edit.ejs",{item,enumValues});
});

app.patch("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let {listing} = req.body;
    let updatedItem = await Listing.findByIdAndUpdate(id,{...listing},{runValidators:true,new:true});

    console.log(updatedItem);
    console.log("Updated !!");

    await updatedItem.save();

    res.redirect(`/listings/${id}`);
});


app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let deleted = await Listing.findByIdAndDelete(id);
    // console.log(deleted);
    console.log("deleted !!!!");

    res.redirect("/");
});


app.use((err,req,res,next)=>{
    console.log(err.message);
    res.send("Error Handeled By Our Middleware.");
});


app.all("*",(req,res)=>{
    res.send("<h1>Page Not Found !!!</h1>");
});


app.listen(3000,()=>{
    console.log("Server is running on port 3000.");
});