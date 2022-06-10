"use strict";

const tf = require('@tensorflow/tfjs-node');

const layerConstructor = require('../helpers/nn.js');
const db = require('../db');
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require('../expressError');
const { callbackify } = require('util');


/** Related functions for users.  */

class NeuralNetwork{

    /** accept neural network structure and perform machine learning pipeline
     * 
     * Returns 
     * 
     * Throws UnauthorizedError is user not found or wrong password.
     */
    constructor(layersList, learningRate, epochs, trainSize){

        this.learningRate = learningRate;
        this.epochs = epochs;
        this.trainSize = trainSize;

        // construct tensor flow sequential model.
        this.model = tf.sequential()

        for (let layer of layersList){
            console.log('layer', layer);
            console.log(layerConstructor[layer.type])
            console.log(layerConstructor[layer.type](layer.params))
            this.model.add(layerConstructor[layer.type](layer.params));
        }

        this.model.compile({optimizer: tf.train.adam(this.learningRate), loss:'meanSquaredError'});
    }
    

    async nnPipeline(layersList){
        this.variable = false;
    }

    generateSequence(){
        this.sequence = [];
        for (let i = 0; i < this.trainSize; i++){
            this.sequence.push(i * Math.sin(i) + i);
        }
    }

    async splitSequence(nSteps){
        if (!this.sequence) this.generateSequence();
        console.log(this.sequence);
        this.features = [];
        this.target = [];
        let endIndex, tempFeatures, tempTarget;
        console.log(this.sequence.length)
        for (let i = 0; i < this.sequence.length; i++){
            endIndex = i + nSteps;
            if (endIndex > this.sequence.length - 1){
                break
            }
            tempFeatures = this.sequence.slice(i,endIndex);
            tempTarget = this.sequence[endIndex];
            this.features.push(tempFeatures);
            this.target.push(tempTarget);
        }
        console.log(this.features);
        this.features = tf.tensor2d(this.features, [this.features.length, this.features[0].length]);
        this.target = tf.tensor2d(this.target, [this.target.length, 1])
    }


    async run(){
        let t = this;
        console.log(this.features)
        const hist = await t.model.fit(t.features.reshape([t.features.shape[0], t.features.shape[1], 1]), t.target,
            {epochs:200, callbacks: {onEpochEnd: async (epoch, log)=>{
                console.log(epoch, log);
            }}})
        console.log(t.model);
        console.log(hist);
    }
}



let layerList = [
    {type:"lstm", params:{units:25, activation:'relu', inputShape:[3,1]}},
    {type:"dense", params:{units:1}}
]

let a = new NeuralNetwork(layerList, 0.01, 200, 100);
a.splitSequence(3).then(()=>{
    a.run().then(()=>{
        console.log('finished');
    });
});
// module.exports = User;