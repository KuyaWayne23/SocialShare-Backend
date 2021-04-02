const bcrypt = require('bcrypt');
const User = require('../models/Users');
const TokenChecker = require('../authorization');

const checkUsername = (username) => {
    return new Promise((resolve, reject) => {
        User.findOne({username})
        .then((result) => {
            if (!result) {
                resolve(`Username Valid`);
            } else {
                reject(`Username Already in Use`);
            }
        }).catch(error => error);
    });
};

const checkEmail = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({email})
        .then((result) => {
            if (!result) {
                resolve(`Email Valid`);
            } else {
                reject(`Email Already in Use`);
            }
        }).catch(error => error);
    });
};

module.exports.getUser = (request, response, next) => {
    const username = request.body.username;

    User.findOne({username: username}, {password: 0})
    .then((result) => {
        response.send(result);
    }).catch(next);
};

module.exports.login = (request, response, next) => {
    const { username, password } = request.body;
    
    User.findOne({username: username})
    .then((result) => {
        if (result === null) {
            response.status(400).send({message: `User Not Found`});
        } else {
            if (bcrypt.compareSync(password, result.password)) {
                const AccessToken = TokenChecker.createAccessKey(result.username);
                
                response.send({ token: AccessToken });
            } else {
                response.status(400).send({message: `Invalid Password`});
            }
        }
    }).catch((error) => {
        response.status(400).send(error)
    });
};

module.exports.register = (request, response, next) => {
    const {firstname, middlename, lastname, email, username, password, age, birthday, sex} = request.body;

    checkUsername(username).then((result) => {
        checkEmail(email).then((result) => {
            User.create({
                firstname,
                middlename,
                lastname,
                email,
                username,
                password: bcrypt.hashSync(password, 10),
                age,
                birthday,
                sex
            }).then((result) => {
                response.send({message: `Account Created`});
            })
        })
    }).catch(next);
};