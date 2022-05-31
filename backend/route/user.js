const router = require("express").Router();
const User = require("../model/user");
const httpModule = require('../utils/http');
const http = httpModule('');
const jwt = require('jsonwebtoken');

router.post("/login", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const code = req.body.code;
  const provider = req.body.provider;

  if (!code || !provider) return res.sendStatus(400);
  if (!Object.keys(config).includes(provider)) return res.sendStatus(400);

  const response = await http.post(config[provider].tokenEndpoint, {
      "code": code,
      "client_id": config[provider].clientId,
      "client_secret": config[provider].clientSecret,
      "redirect_uri": config[provider].redirectUri,
      "grant_type": "authorization_code",
  });

  if (!response) return res.sendStatus(500);
  if (response.status !== 200) return res.sendStatus(401);

  const decoded = jwt.decode(response.data.id_token);
  if (!decoded) return res.sendStatus(500);

  let user = await User.findOne({[`providers.${provider}`]: decoded.sub})
  if (!user) {
    user = new User ({
      username: req.body.username,
      providers: {
          [`${provider}`]: decoded.sub,
      },
    });

    user.save((err) => {
      if (err) return res.status(500).send("User not saved.");
    });
  };

  const token = jwt.sign({_id: user._id, username: user.username}, process.env.TOKEN_SECRET, {expiresIn:'1h'})
  res.json(token);
});

module.exports = router;
