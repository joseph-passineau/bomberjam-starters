const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

const { ACTION_SIZE } = require("../../src/game-constants");
const { DATA_SHAPE } = require("./data");

/*
*   Your model name. Saves and loads will use this.
*/
const modelName = "cnn-3x3-2d-all-1000";

/*
*   Define and compile your neural network.
*   The neural net provided below works... relatively well, but you'll need to improve it.
*/
function buildModel() {
    const model = tf.sequential();

    // Convolutions
    model.add(tf.layers.conv2d({ inputShape: DATA_SHAPE, dataFormat: "channelsFirst", filters: 32, kernelSize: 3, activation: "relu" }));
    model.add(tf.layers.dropout({ rate : 0.15 }));

    model.add(tf.layers.conv2d({ filters: 64, kernelSize: 3, activation: "relu" }));
    model.add(tf.layers.dropout({ rate : 0.15 }));
    
    model.add(tf.layers.conv2d({ filters: 128, kernelSize: 3, activation: "relu" }));
    model.add(tf.layers.dropout({ rate : 0.15 }));

    // Classification
    model.add(tf.layers.flatten());
    model.add(tf.layers.dense({ units: 64, activation: "relu" }));
    model.add(tf.layers.dense({ units: 32, activation: "relu" }));
    model.add(tf.layers.dense({ units: ACTION_SIZE, activation: "softmax" }));

    /*
    *   If you do not know what this is, you don't need to change it or know what it does.
    *   It's going to be pretty good for this kind of machine learning.
    */
    model.compile({
        optimizer: "adam",
        loss: "categoricalCrossentropy",
        metrics: ["accuracy"]
    });

    return model;
}

module.exports = {
    modelName,
    buildModel
};