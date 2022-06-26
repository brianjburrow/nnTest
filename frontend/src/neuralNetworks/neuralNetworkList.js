import React, { useState, useEffect } from "react";
import NeuralNetworkCard from "./neuralNetworkCard";
import LoadingSpinner from "../common/LoadingSpinner";
import uuid from 'react-uuid';


/** Get base neural network to display on card */

function getBaseNeuralNetwork(units = 25, activation = 'relu', numTimeSteps = 3) {
    return {
        key: uuid(),
        layerList: [
            { type: "lstm", params: { units: units, activation: activation, inputShape: `${numTimeSteps}` } },
            { type: "dense", params: { units: 1 } }
        ]
    }
}

function NeuralNetworkList() {
    // need to get all neuralNetwork information
    // loop over neuralNetworks to add neuralNetworkCard
    const [neuralNetworks, setNeuralNetworks] = useState(null);

    useEffect(function setNeuralNetworksOnMount() {
        setNeuralNetworks([getBaseNeuralNetwork(), getBaseNeuralNetwork()])
    }, [])

    if (!neuralNetworks) return <LoadingSpinner />;
    return (
        <div className="NeuralNetworkList col-md-8 offset-md-2">
            <div className="NeuralNetworkList-list row">
                {neuralNetworks.map(nn => (
                    <NeuralNetworkCard
                        key={nn.key}
                        layerList={nn.layerList}
                    />
                ))}
            </div>
        </div>
    );
}

export default NeuralNetworkList;