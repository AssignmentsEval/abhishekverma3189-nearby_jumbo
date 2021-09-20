const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const { jwtSecret, saltRounds, expiry } = require('../conf/configuration');
const { User } = require("../models/user");
const { validations } = require("../helpers");
const { createTokenSchema } = validations;

/**
 * Validates the user email and password
 * and returns the JWT token
 * @param {string} params.email
 * @param {string} params.password
 * @returns {string} JWT token
 */
const fetchToken = async (params) => {
    try {
        const value = await createTokenSchema.validateAsync(params);
        const user = await User.findOne({ email: value.email});
        if (!user) {
            throw new Error("User does not exists");
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

/**
 * Registers the User in DB and returns
 * the JWT token
 * @param {string} params.email
 * @param {string} params.password
 * @returns {string} JWT token
 */
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

/**
 *
 * @param {object} params returns the encrypted JWT token
 * @returns {string} encrypted token
 */
const generateToken = (params) => jwt.sign({ data: params }, jwtSecret, { expiresIn: expiry});

exports.fetchToken = fetchToken;
exports.createToken = createToken;