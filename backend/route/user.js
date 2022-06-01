require("dotenv").config();
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
    tokenEndpoint: process.env.GOOGLE_TOKEN_URI,
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
    //"scope": "openid"
  });

  if (!response) return res.sendStatus(500);
  console.log(response);
  if (response.status !== 200) return res.status(401).send("google error");

  const decoded = jwt.decode(response.data.id_token);
  if (!decoded) return res.sendStatus(500);

  /*   const user = await User.findOneAndUpdate({[`providers.${provider}`]: decoded.sub}, {
    providers: {
        [provider]: decoded.sub,
    }
  }, {new: true} , (err, doc) => {
    if (err) return res.status(500).json({error: err});
    console.log(doc);
  }); */

  let user = await User.findOne({ [`providers.${provider}`]: decoded.sub });
  if (!user) {
    user = new User({
      providers: {
        [provider]: decoded.sub,
      },
    });
    await user.save((error, user) => {
      if (error) return res.status(500).json({ error });
    });
  }

  const token = jwt.sign({ userId: user._id, username: user.username }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
  res.json(token);
});

// router.patch("/", auth({ block: true }), (req, res) => {
//   const userId = res.locals.userId;
// });

module.exports = router;

/*
https://accounts.google.com/o/oauth2/v2/auth
			?response_type=code
			&client_id=49752783666-472eikn6usgtfi93ka8mt93qjpdbfd52.apps.googleusercontent.com
			&scope=openid%20email
			&redirect_uri=http://localhost:3000/redirect
*/
