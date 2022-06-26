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
        this.layersList = layersList
        console.log(this.layersList)
        this.parseLstmLayers();
        this.inputShape = this.layersList[0].params.inputShape;
        // generate training data
        this.splitSequence(this.inputShape[0]);

        // construct tensor flow sequential model.
        this.model = tf.sequential()

        for (let layer of this.layersList){
            this.model.add(layerConstructor[layer.type](layer.params));
            
        }

        this.model.compile({optimizer: tf.train.adam(this.learningRate), loss:'meanSquaredError'});
    }
    

    async nnPipeline(layersList){
        this.variable = false;
    }

    parseLstmLayers(){
        // nn architecture requires a LSTM layer to have return_sequences = true if it will feed into
        // another LSTM layer.  Otherwise, it should be false. 
        // In addition, only the first LSTM layer should have an input shape, but we don't want the front end
        // to have to handle that logic
        const numLayers = this.layersList.length;
        for (let i = 0; i < numLayers - 1; i++){
            this.layersList[i].params.units = parseInt(this.layersList[i].params.units);
            if (this.layersList[i+1].type ==='lstm'){
                this.layersList[i].params['returnSequences'] = true;
            }
            if (i !== 0) {
                // overwrite anyincorrect input shapes.  This value is always determined by the first layer
                this.layersList[i].params['inputShape'] = this.inputShape;
            } else {
                this.layersList[i].params.inputShape = [parseInt(this.layersList[i].params.inputShape), 1]
            }
        }
    }
    generateSequence(){
        this.sequence = [];
        for (let i = 0; i < this.trainSize; i++){
            this.sequence.push(i * Math.sin(i) + i);
        }
    }

    async splitSequence(nSteps){
        // format the data correctly to work in the LSTM framework (i.e., convert to tensors)
        if (!this.sequence) this.generateSequence();
        this.features = [];
        this.target = [];
        let endIndex, tempFeatures, tempTarget;
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
        this.features = tf.tensor2d(this.features, [this.features.length, this.features[0].length]);
        this.target = tf.tensor2d(this.target, [this.target.length, 1])
    }


    async run(){
        let t = this;
        const hist = await t.model.fit(t.features.reshape([t.features.shape[0], t.features.shape[1], 1]), t.target,
            {epochs:t.epochs, callbacks: {onEpochEnd: async (epoch, log)=>{
                console.log(epoch, log);
            }}})
        return hist;
    }
}



// let layerList = [
//     {type:"lstm", params:{units:25, activation:'relu', inputShape:[3,1]}},
//     {type:"dense", params:{units:1}}
// ]

// let a = new NeuralNetwork(layerList, 0.01, 200, 100);
// a.splitSequence(3).then(()=>{
//     a.run().then(()=>{
//         console.log('finished');
//     });
// });
module.exports = NeuralNetwork;