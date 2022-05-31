const jwt = require('jsonwebtoken')

const auth = ({block}) => (req, res, next) => {
        // console.log('Authenticating...');
        const token = req.headers.authorization;
        if (!token) return res.sendStatus(401);

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                if (block) return res.sendStatus(401);
            } else {
                console.log(`User id: ${user._id}`);
                res.locals.userId = user._id;
            };
        });

        next();
    };

module.exports = auth;