const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  movieId: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  timeStamp: { type: Date, default: Date.now() },
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  providers: {
    google: { type: String, required: true, unique: true },
  },
  reviews: [reviewSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
