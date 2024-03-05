
const Review = require("../Models/review.js");
const Listing = require("../Models/listing.js");
const ExpressError = require("../utils/ExpressError.js")


module.exports.addNewReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.owner = req.user._id;
    newReview.postId = req.params.id;

    listing.avgRating = (newReview.rating + listing.avgRating);
    listing.reviews.push(newReview);

    let res1 = await newReview.save();
    let res2 = await listing.save();
    // console.log(res1,res2);

    console.log("New Review Saved.");
    req.flash("success","New Review Added !");

    res.redirect(`/listings/${listing._id}`);
}


module.exports.destroyReview = async(req,res)=>{
    let {id,reviewId} = req.params;
    console.log("i am at review route and delete method.And Review Deleted.");
    

    let listing = await Listing.findById(id);
    let currReview = await Review.findById(reviewId);

    listing.avgRating = (listing.avgRating - currReview.rating);

    let res2 = await listing.save();

    
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success","Review Deleted !");

    res.redirect(`/listings/${id}`);
}

module.exports.allReviewsOfListing = async(req,res,next)=>{
    let {id} = req.params;
    let item = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "owner",
        },
    })
        .populate("owner");

    if(item){
        res.render("./list/allReviewsOfListing.ejs",{item});
    }else{
        return next(new ExpressError("Listing Does't Exist my dear :)"));
    }
}