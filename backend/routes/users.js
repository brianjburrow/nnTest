"use strict";

/** Routes for handling users. */

const jsonschema = require("jsonschema");

const User = require("../models/user");
const express = require("express");

const router = new express.Router();

const {createToken} = require('../helpers/tokens');

const userAuthSchema = require('../schemas/userAuth.json');
const userRegisterSchema = require('../schemas/userRegister.json');
const {BadRequestError} = require('../expressError');

/** POST 
*/


router.post('/token', async function (req, res, next){
    try{
        return res.json({ test: "welcome"});
    } catch (err){
        return next(err);
    }
});


module.exports = router;