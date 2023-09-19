const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

module.exports= (req,res,next)=>{
    const header =req.headers.authorization;
    if (!header) return res.status(401).send({ error: 'No token provided' });
    const parts = header.split(' ')
    if (!parts.length === 2) return res.status(401).send({ error: 'Token error' });
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Token malformatted' });
    jwt.verify(token, secret.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalid' });
        req.user = jwt.decode(token, secret.secret);
        return next();
    });
}