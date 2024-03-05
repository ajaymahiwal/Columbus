const express = require("express");
const router = express.Router();
// const Listing = require("../Models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../Models/user.js");
const passport = require("passport");
const {isLoggedIn,saveRedirectUrl, isOwner,isProfileOwner} = require("../middlewares/middleW.js");
const isVaildID = require("../middlewares/isValidID.js");


const userController = require("../controllers/users.js");


router
    .route("/signup")
    .get(userController.renderSignUp)
    .post(wrapAsync(userController.signUp))

 

router
    .route("/login")
    .get(userController.renderLogin)
    .post(
    saveRedirectUrl, 
    passport.authenticate("local",{failureRedirect: "/login",failureFlash: true}),userController.login)



router.delete("/logout",userController.logout);
 
router.get("/user/profile/:id",isVaildID,userController.userProfile);
router.get("/user/profile/:id/edit",isVaildID,isProfileOwner,userController.editUserProfile);
router.put("/user/profile/:id/edit",isVaildID,isProfileOwner,userController.saveEditsOfUserProfile);


router.get("/user-is-not-login",userController.userIsNotLogin);

router
    .route("/user/follow-unfollow")
    .post(userController.addNewUser)
    .delete(userController.removeUser)


router.get("/user/profile/:id/followers",userController.showFollowers);
router.get("/user/profile/:id/followings",userController.showFollowings);

module.exports = router;
