const router = require("express").Router();
const User = require("../model/user");
const auth = require("../middleware/auth");

router.get("/", auth({ block: false }), async (req, res) => {
  // NO QUERRIES YET
  // token or NOT token
  if (res.locals.userId) {
    const user = await User.findById(res.locals.userId);
    if (!user) return res.status(404).send("User not found.");

    // return [all review] of the user if logged in
    // to "dashboard, profile page, private"
    return res.json(user.reviews);
  }
  // return all review [] if NOT logged in
  // to "public"
  // queried both by movie and by user
  const users = req.query.reviewerId ? await User.find({_id: req.query.reviewerId}) : await User.find();

  const reviews = [];
  users.map((user) => {
    reviews.push(...user.reviews);
  });

  if (req.query.movieId) {
    const review = reviews.filter(review => review.movieId === req.query.movieId);
    return res.json(review);
  };
  
  return res.json(reviews);
});

router.post("/", auth({ block: true }), async (req, res) => {
  // header: token
  // payload validation
  if (
    !req.body.movieId ||
    !req.body.content ||
    !req.body.rating ||
    !req.body.movieTitle ||
    !req.body.title
  )
    return res
      .status(400)
      .send(
        "Body must contain movieId, movieTitle, title, content and rating."
      );

  console.log(res.locals.userId); // add new review by userId
  const user = await User.findById(res.locals.userId);
  if (!user) return res.status(404).send("User not found.");

  // body: review
  user.reviews.push({
    userId: res.locals.userId,
    username: req.body.username,
    movieId: req.body.movieId,
    movieTitle: req.body.movieTitle,
    title: req.body.title,
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
  if (!req.params.reviewId)
    return res.status(400).send("No reviewId parameter found.");

  // payload validation
  if (
    !req.body.movieId &&
    !req.body.content &&
    !req.body.rating &&
    !req.body.movieTitle &&
    !req.body.title &&
    !req.body.username
  )
    return res
      .status(400)
      .send("Body must contain movieId, movieTitle, title, content or rating.");

  const user = await User.findById(res.locals.userId);
  if (!user) return res.status(404).send("User not found.");

  // update review
  const review = user.reviews.id(req.params.reviewId);
  if (!review) return res.status(404).send("Review not found.");

  if (req.body.username) {
    review.username = req.body.username;
  }
  if (req.body.movieId) {
    review.movieId = req.body.movieId;
  }
  if (req.body.movieTitle) {
    review.movieTitle = req.body.movieTitle;
  }
  if (req.body.title) {
    review.title = req.body.title;
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
  if (!req.params.reviewId)
    return res.status(400).send("No reviewId parameter found.");

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
