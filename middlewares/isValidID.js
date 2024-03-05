const { default: mongoose } = require("mongoose");
const ExpressError = require("../utils/ExpressError.js");

const ObjectId = mongoose.Types.ObjectId;

module.exports = function(req,res,next){
    let id = req.params.id;
    // console.log("id checking middleware:",id);
    if (id) {
        // Validate the length and format of the ID
        if (!ObjectId.isValid(id)) {
            return next(new ExpressError(404, "Id is not vaild !"));
        }
    }
        return next();
    
}