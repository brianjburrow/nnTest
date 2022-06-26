import React, {useState, useEffect} from "react";
import Layer from "./Layer";
import LoadingSpinner from "../common/LoadingSpinner";
import NeuralNetworkApi from "../api/api";
import NewLayerForm from "./NewLayerForm";
import uuid from "react-uuid";
import NeuralNeworkApi from "../api/api";
import Plot from 'react-plotly.js';


function getDefaultStructure(units = 25, activation = 'relu', numTimeSteps = 3){
    return { type: "lstm", params: { units: units, activation: activation, inputShape: `${numTimeSteps}` } }
}
function NeuralNetworkCard({ layerList }) {
    let [displayState, setDisplayState] = useState("card"); // Set("card", "training", "analysis")
    let [nnResult, setNnResult] = useState(null);
    let [newLayerFormIndex, setNewLayerFormIndex] = useState(null);
    let [errorMessage, setErrorMessage] = useState("");

    // keep track of the neural network structure
    let [structure, setStructure] = useState(layerList);

    // genericDeletion
    function genericDeletion(index){
        structure.splice(index, 1);
        setStructure(()=>[...structure]);
    }

    function handleNewLayer(index, newLayer){
        // insert a new layer based on form input
        structure.splice(index, 0, newLayer);
        setStructure(...[structure]);
        setNewLayerFormIndex(null);
    }

    function resetNeuralNet(){
        setNnResult(null);
        setDisplayState('card');
        setStructure(layerList);
        setErrorMessage("");
    }
    // handle submitting the form
    async function handleSubmit(){
        setDisplayState("training");
        // fire off the neural network api call
        try{
            const result = await NeuralNetworkApi.postNeuralNetworkStructure(structure);
            setNnResult(result);
        } catch (err){
            console.log(err)
            setErrorMessage(err)
            setDisplayState("error")
        }
    }

    // handle display information
    function chooseButton(){
        if (displayState == 'training'){
            return <div>Please wait for your network to train</div>
        }
        if (newLayerFormIndex !== null){
            return null
        }
        if (displayState == 'result' || displayState == 'error'){
            return <button onClick={resetNeuralNet} className="btn btn-primary float-right">Reset Neural Network</button>
        }
        return <button onClick={handleSubmit} className="btn btn-primary">Train Neural Network</button>
    }

    function chooseDisplay(){
        if (displayState == 'error'){
            return <div>{errorMessage}</div>
        }
        if (displayState == 'training'){
            return <LoadingSpinner/>
        }

        if (newLayerFormIndex !== null){
            return <NewLayerForm layerIndex={newLayerFormIndex} handleNewLayer={(data)=>handleNewLayer(newLayerFormIndex, data)}/>
        }

        if (displayState == 'result'){
            return (
                    <Plot
                            data={[
                                {
                                    x: nnResult.epochs,
                                    y: nnResult.history.loss,
                                    type: 'scatter',
                                    mode: 'lines+markers',
                                    marker: {color: 'red'},
                                },
                                ]}
                                layout={ { title: 'Loss vs Epochs'} }
                                useResizeHandler= {true}
                                style= {{width: "100%", height: "50vh"}}
                        />
            )
        }
        return (structure.map((l, idx) => {
                return (
                <div key={uuid()}>
                    <Layer insertLayer={()=>setNewLayerFormIndex(idx)}
                           deleteLayer={()=>genericDeletion(idx)}
                           type={l.type} 
                           params={l.params}
                           layerIndex={idx}
                    />
                </div>
                )})
            )
    }

    useEffect(()=>{
        if (nnResult != null){
            setDisplayState("result")
        }
    }, nnResult)
    // if the neural network is in the process of being trained, show a loading screen

    return (
        <div className="NeuralNetworkCard card col-6 ">
            <div className="card-body">
                {chooseDisplay()}
            </div>
            {chooseButton()}
        </div>
    )
}

export default NeuralNetworkCard;