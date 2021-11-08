const jwt = require('jsonwebtoken');
const path = require('path');
const {Users} = require("../models");

require('dotenv').config({path: path.resolve(__dirname, '../.env')});

exports.authToken =  async function (req, res, next) {
    //Authorization header
    const access_token = req.get('Authorization') ? req.get('Authorization').split(' ')[1] : '';

    if(!access_token) {
        return res.status(401).json({
            message: "invalid access token",
        });
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
    }
    catch (err) {
        return res.status(401).json({
            message: "invalid access token",
        });
    }
    if(decodedToken === undefined) {
        return res.status(401).json({
            message: "invalid access token",
        });
    } else {
        try {
            req.user = await Users(DB_CONNECTION).findOne({
                email: decodedToken.email,
                role: decodedToken.role,
            });
            next();

        } catch (err) {
            next(err);
        }
    }
}

exports.authAdmin = async function (req, res, next) {
    if (!req.user) {
        try {
            let user = await Users(DB_CONNECTION).findOne({
                email: req.body.email,
                role: req.body.role,
            });

            if (!user || user.status !== 1 || user.role !== 'admin') {
                return res.status(401).json({
                    message: "invalid credential",
                });
            } else {
                next();
            }
        } catch (err) {
            next(err);
        }
    } else {
        if (req.user.role !== 'admin' || req.user.status !== 1) {
            return res.status(401).json({
                message: "invalid credential",
            });
        }
        else next();
    }
}

exports.authSuperAdmin = async function (req, res, next) {
    if (!req.user) {
        try {
            let user = await Users(DB_CONNECTION).findOne({
                email: req.body.email,
                role: req.body.role,
            });

            if (!user || user.status !== 1 || user.role !== 'superAdmin') {
                return res.status(401).json({
                    message: "invalid credential",
                });
            } else {
                next();
            }
        } catch (err) {
            next(err);
        }
    } else {
        if (req.user.role !== 'superAdmin' || req.user.status !== 1) {
            return res.status(401).json({
                message: "invalid credential",
            });
        }
        else next();
    }
}