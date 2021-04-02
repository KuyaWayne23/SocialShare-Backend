const jwt = require('jsonwebtoken');

module.exports.createAccessKey = (user) => {
    return jwt.sign(user, process.env.ACCESS_KEY);
};

module.exports.validate = (request, response, next) => {
    let token = request.headers.authorization;

    if (!token) {
        response.send('Unauthorized');
    } else {
        token = token.slice(7, token.length);

        jwt.verify(token, process.env.ACCESS_KEY, (error, decoded) => {
            if (error) {
                response.send('Invalid Access Token');
            } else {
                request.token = decoded;
                next();
            }
        });
    }
};