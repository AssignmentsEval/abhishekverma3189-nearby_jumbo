const saltRounds = 10;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../conf/configuration');
const { User } = require("../models/user");
const { validations } = require("../helpers");
const { createTokenSchema } = validations;

const fetchToken = async (params) => {
    try {
        const value = await createTokenSchema.validateAsync(params);
        const user = await User.findOne({ email: value.email});
        if (!user) {
            throw new Error("user does not exists");
        }
        const passwordValid = await bcrypt.compare(value.password, user.password);
        if (!passwordValid) {
            throw new Error("Invalid password");
        }
        return generateToken(user);
    } catch (error) {
        throw new Error(error);
    }
}

const createToken = async (params) => {
    try {
        const value = await createTokenSchema.validateAsync(params);
        const hash = await bcrypt.hash(value.password, saltRounds);
        const newUser = User({ email: value.email, password: hash });
        return newUser.save().then(user => {
            return generateToken(user);
        });
    } catch (error) {
        throw new Error(error);
    }
}

const generateToken = (params) => jwt.sign({ data: params }, jwtSecret, { expiresIn: "24h"});

exports.fetchToken = fetchToken;
exports.createToken = createToken;