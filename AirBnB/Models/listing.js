

const mongoose = require("mongoose");

const listingSchema = mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
        min:0,
    },
    location:{
        type:String,
        require:true,
    },
    country:{
        type:String,
        require:true,
    },
    image:{
        url:{
            type:String,
            set: (v) =>
            v === ""
        ? "https://marketingweek.imgix.net/content/uploads/2020/03/29120928/shutterstock_1149823916.jpg?auto=compress,format&q=60&w=736&h=429"
        : v,
        },
        image_name:{
            type:String,
            default:"Image Of Listing",
        },
    },
    usertags:String,
    tags:{
        type:[String],   
    },
    category:{
        type:String,
        default:"Not Yet Selected",
        // Options defined in app.js and in new route
    }
});


listingSchema.pre('save',function(next){
    this.tags = this.usertags.replaceAll(","," ").split(" ");
    console.log(this.usertags);
    next();
});


const Listing = mongoose.model("listing",listingSchema);

const enumValues = ['Apartment','House','Condo','Vila','Cottage','Bungalow','Loft','Tiny House','Treehouse','Cabin','Mansion','Castle','Tent','Houseboat','Yurt','Camper'];
// console.log(enumValues)


module.exports = {Listing,enumValues};