const jwt = require('jsonwebtoken')

const auth = ({block}) => (req, res, next) => {
        const token = req.headers.authorization;
        if (!token && block) return res.sendStatus(401);

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                if (block) return res.sendStatus(401);
            } else {
                res.locals.userId = user._id;
            };
        });
        next();
    };

module.exports = auth;