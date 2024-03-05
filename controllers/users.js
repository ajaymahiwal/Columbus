
const Listing = require("../Models/listing.js");
const User = require("../Models/user.js");
const Review = require("../Models/review.js");
const ExpressError = require("../utils/ExpressError.js")

module.exports.renderSignUp = (req, res) => {
    res.render("./user/signup.ejs");
}

module.exports.signUp = async (req, res) => {
    try {
        let { email, username, password } = req.body;
        let name = username.replace("@gmail.com","");
        const newUser = new User({ email, username, name });
        let registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            console.log(registeredUser);
            req.flash("success", "Welcome To Columbus :)");
            res.redirect("/listings");
        });

    }
    catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}


module.exports.renderLogin = (req, res) => {
    res.render("./user/login.ejs");
}


module.exports.login = async (req, res) => {
    req.flash("success", "Welcome To Columbus! You are logged in !");
    res.redirect(res.locals.redirectUrl);
}


module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "You Are Logged Out!");
        res.redirect("/listings");
    });
}

module.exports.userProfile = async (req, res,next) => {
    let userProfile = await User.findById(req.params.id);
    // console.log(userProfile)
    if (userProfile) {
        let reviews = await Review.find({ owner: req.params.id });
        let listings = await Listing.find({ owner: req.params.id });
        res.render("./user/profile.ejs", { userProfile, reviews, listings });
    } else {
        return next(new ExpressError(404, "User Acccount Does't Exist My Dear :)"));
    }

}
module.exports.editUserProfile = async (req, res,next) => {
    let userProfile = await User.findById(req.params.id);
    // console.log(userProfile)
    if (userProfile) {
        res.render("./user/editProfile.ejs", { userProfile });
    } else {
        return next(new ExpressError(404, "User Acccount Does't Exist My Dear :)"));
    }

}


module.exports.saveEditsOfUserProfile = async (req, res,next) => {
    let { user } = req.body;
    delete user.username; //it someone added i will not allow to change anybody
    user.name = user.name.toLowerCase(); //user have full choice to  decide name
    // let phone_no = user.contact_num;
    // console.log("ashgdfak")
    // console.log(phone_no)
    // if (phone_no.length < 10 || phone_no.length > 13) { //e.g. +91 81681-52757
    //     phone_no = null;
    //     req.flash("error", "Please Enter Vaild Phone Number :)");
    //     res.redirect(`/user/profile/${req.user._id}/edit`);
    // } else {
    //     if (phone_no.length == 10) {
    //         phone_no = "91" + phone_no;
    //     }

    //     user.contact_num = phone_no;
        let updatedUser = await User.findByIdAndUpdate(`${req.user._id}`, { ...user }, { new: true, runValidators: true });
        console.log(updatedUser);
        // let updatedUser = await User.findById(`${req.user._id}`);
        res.redirect(`/user/profile/${req.user._id}`);
    
}
