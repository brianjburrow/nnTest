const tf = require('@tensorflow/tfjs-node');

/** Functions for helping format neural network information */

function generateLSTM(params){
/** Generate an LSTM layer for a RNN model from a set of parameters
 * params is an object with optional fields {units, returnSequences, inputShape,}
 */
    console.log("PARAMS", params)
    params.inputShape = [parseInt(params.inputShape), 1]
    return tf.layers.lstm(params)
}

/** Generate a dropout layer for a RNN model from a set of parameters
 * params is an object with required fields {dropoutRate}
 */
function generateDropout(params){
    return tf.layers.dropout(params);
}

/** Generate a dense layer for a RNN model from a set of parameters
 * params is an object with required fields {units}
*/
function generateDense(params){
    return tf.layers.dense(params);
}

/** Create a convenience object containing callable functions
 * 
 * interface will be layers[layerType](params)
 * 
 * used loop over a list of layers in the following format:
 * e.g., [{layerType: 'dense', params: {...}}, {layerType:'lstm', params:{...}}]
 */

const layerConstructor = {
    "lstm" : generateLSTM,
    "dropout" : generateDropout,
    "dense": generateDense,
}

module.exports = layerConstructor;