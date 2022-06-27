"use strict";

/** Routes for training neural networks. */
const express = require("express");

const router = new express.Router();

const NeuralNetwork = require("../models/nn");


/** POST 
*/

router.post('/train', async function (req, res, next){
    try {
        let lstm_model = new NeuralNetwork(req.body, 0.01, 200, 100);
        let result = await lstm_model.run();
        return res.json(result);
    } catch (err){
        return next(err);
    }
});


module.exports = router;