const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  username: { type: String },
  userId: { type: String, required: true },
  movieId: { type: String, required: true , unique: false},
  movieTitle: { type: String },
  title: { type: String },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  timeStamp: { type: Date, default: Date.now() },
});

const userSchema = new mongoose.Schema({
  username: { type: String},
  providers: {
    google: { type: String, required: true, unique: true },
  },
  reviews: [reviewSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
