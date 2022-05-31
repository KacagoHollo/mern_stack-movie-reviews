const router = require("express").Router();
const User = require("../model/user");

router.get("/"); // reviews
// token or NOT token
// queried both by movie and by user
// return all review [] if NOT logged in
// to "public"
//
// return [all review] of the user if logged in
// to "dashboard, profile page, private"

router.post("/"); // add new review by userId
// header: token
// body: review
// return the new review only

router.patch("/:reviewId"); // update review by mongoId

router.delete("/:reviewId"); // delete review by mongoId
