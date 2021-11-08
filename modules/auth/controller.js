
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {body, validationResult} = require('express-validator');
const {Users} = require("../../models");

require('dotenv').config();
exports.login = [
    body('email').withMessage('invalid email account'),
    body('password').trim().exists().withMessage('required password'),
    body('role').isIn(['admin', 'superAdmin']).withMessage('invalid role'),

    async function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array());
            return;
        }
        try {
            const {email, password, role} = req.body;
            let loadedUser = await Users(DB_CONNECTION).findOne({
                email: email,
                role: role,
            });
            console.log(loadedUser);

            if (loadedUser.status === 1) {
                console.log(await bcrypt.compare(password, loadedUser.password), password)
                if (await bcrypt.compare(password, loadedUser.password)) {
                    const access_token = jwt.sign({
                        email: loadedUser.email,
                        role: loadedUser.role,
                    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 60 * 15});
                    loadedUser.access_token = access_token;

                    const refresh_token = jwt.sign({
                        email: loadedUser.email,
                        role: loadedUser.role,
                    }, process.env.REFESH_TOKEN_SECRET);
                    loadedUser.refresh_token = refresh_token;

                    await Users(DB_CONNECTION).create(loadedUser);

                    return res.status(200).json({
                        access_token: access_token,
                        refresh_token: refresh_token,
                    });
                }
                return res.status(401).json({
                    message: "invalid credential",
                });
            } else {
                return res.status(401).json({
                    message: "invalid credential",
                });
            }
        } catch (err) {
            next(err);
        }
    }
]
exports.logout = async function (req, res, next) {
    try {
        let loadedUser = await Users(DB_CONNECTION).updateOne(
            {
                email: req.body.email,
                role: req.body.role,
            },
            {refresh_token: null});

        return res.status(200).json({
            user: loadedUser,
        });
    } catch (err) {
        return res.status(500).json('Unexpected error!');
    }
}
exports.refresh_token = async function(req, res, next) {
    let refresh_token = req.body.refresh_token ? req.body.refresh_token : '' ;

    try {
        let check_user = await Users(DB_CONNECTION).findOne({
            refresh_token: refresh_token,
        });

        if (!check_user) {
            return res.status(401).json({
                message: 'invalid refresh token',
            });
        }

        const access_token = jwt.sign({
            email: check_user.email,
            role: check_user.role,
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 60 * 15});
        check_user.access_token = access_token;

        await Users(DB_CONNECTION).create(check_user);
        return res.status(200).json({
            message: "refresh access token ok",
            access_token: access_token,
        });
    } catch (err) {
        return res.status(500).json('Unexpected error!');
    }
}