const router = require("express").Router();
const User = require("../model/user");
const auth = require("../middleware/auth");

router.get("/"); // reviews
// token or NOT token
// queried both by movie and by user
// return all review [] if NOT logged in
// to "public"
//
// return [all review] of the user if logged in
// to "dashboard, profile page, private"

router.post("/", auth({ block: true }), async (req, res) => {
  // header: token
  // payload validation
  if (!req.body.movieId || !req.body.content || !req.body.rating)
    return res.status(400).send("Body must contain movieId, content and rating.");

  // add new review by userId
  const user = await User.findById(res.locals.userId);
  if (!user) return res.status(404).send("User not found.");

  // body: review
  user.reviews.push({
    movieId: req.body.movieId,
    content: req.body.content,
    rating: req.body.rating,
  });

  // return the new review only
  user.save((err) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(user.reviews[user.reviews.length - 1]);
  });
});

router.patch("/:reviewId", auth({ block: true }), async (req, res) => {
  // update review by mongoId
  // header: token

  //request validation
  if (!req.params.reviewId) return res.status(400).send("No reviewId parameter found.");

  // payload validation
  if (!req.body.movieId && !req.body.content && !req.body.rating)
    return res.status(400).send("Body must contain movieId, content or rating.");

  // find user by userId and find review by reviewId
  const user = await User.findById(res.locals.userId);
  if (!user) return res.status(404).send("User not found.");

  // update review
  const review = user.reviews.id(req.params.reviewId);
  if (req.body.movieId) {
    review.movieId = req.body.movieId;
  }
  if (req.body.content) {
    review.content = req.body.content;
  }
  if (req.body.rating) {
    review.rating = req.body.rating;
  }

  // save and return review
  user.save((err) => {
    if (err) return res.status(500).send(err);
    res.json(review);
  });
});

router.delete("/:reviewId", auth({ block: true }), async (req, res) => {
  // delete review by mongoId
  // header: token

  //request validation
  if (!req.params.reviewId) return res.status(400).send("No reviewId parameter found.");

  // find user by userId and find review by reviewId
  const user = await User.findById(res.locals.userId);
  if (!user) return res.status(404).send("User not found.");

  // delete review
  user.reviews.pull(req.params.reviewId);

  // save and respond
  user.save((err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

module.exports = router;
