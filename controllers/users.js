const saltRounds = 10;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../conf/configuration');
const { User } = require("../models/user");

const create = async (params) => {
    try {
        const hash = await bcrypt.hash(params.password, saltRounds);
        const newUser = User({ email: params.email, password: hash });
        return newUser.save().then(user => {
            return generateToken(user);
        });
    } catch (error) {
        throw new Error(error);
    }
}

const generateToken = (params) => jwt.sign({ data: params }, jwtSecret, { expiresIn: "24h"});

exports.create = create;