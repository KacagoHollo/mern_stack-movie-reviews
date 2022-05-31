const router = require("express").Router();
const User = require("../model/user");
const auth = require("./middleware/auth");

router.get("/"); // reviews
// token or NOT token
// queried both by movie and by user
// return all review [] if NOT logged in
// to "public"
//
// return [all review] of the user if logged in
// to "dashboard, profile page, private"

router.post("/", auth({block: true}), async (req, res) => {
    // header: token
    //payload validation
    if (!req.body.movieId || !req.body.content || !req.body.rating) return res.status(400).send('Body must contain movieId, content and rating.');

    // add new review by userId
    const user = await User.findById(res.locals.userId);
    if (!user) return res.status(404).send('user not found.');

    // body: review
    const newReview = {
        movieId: req.body.movieId,
        content: req.body.content,
        rating: req.body.rating,
    }

    user.reviews.push(newReview);

    // return the new review only
    user.save((err) => {
        if (err) return res.status(500).send(err);
        res.json(newReview);
    });
});

router.patch("/:reviewId"); // update review by mongoId

router.delete("/:reviewId"); // delete review by mongoId
