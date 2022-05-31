const router = require("express").Router();
const User = require("../model/user");
const httpModule = require("../utils/http");
const http = httpModule("");
const jwt = require("jsonwebtoken");

const config = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
    tokenEndpoint: process.env.TOKEN_ENDPOINT,
  },
};

router.post("/login", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const code = req.body.code;
  const provider = req.body.provider;

  if (!code || !provider) return res.sendStatus(400);
  if (!Object.keys(config).includes(provider)) return res.sendStatus(400);

  const response = await http.post(config[provider].tokenEndpoint, {
    code: code,
    client_id: config[provider].clientId,
    client_secret: config[provider].clientSecret,
    redirect_uri: config[provider].redirectUri,
    grant_type: "authorization_code",
  });

  if (!response) return res.sendStatus(500);
  if (response.status !== 200) return res.sendStatus(401);

  const decoded = jwt.decode(response.data.id_token);
  if (!decoded) return res.sendStatus(500);

  let user = await User.findOne({ [`providers.${provider}`]: decoded.sub });
  if (!user) {
    user = new User({
      username: req.body.username, // jon-e FE-rol username ezen a ponton?
      providers: {
        [`${provider}`]: decoded.sub,
      },
    });

    user.save().catch((err) => {
      return res.status(500).json("User not saved");
    });
  }

  const token = jwt.sign({ _id: user._id, username: user.username }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
  res.status(200).json(token);
});

module.exports = router;
