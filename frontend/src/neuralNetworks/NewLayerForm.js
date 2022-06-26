import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import Alert from "../common/Alert";

import "./NewLayerForm.css";

const formOptions = {
    "dense":{units:1},
    "lstm":{units:25, activation:"relu", inputShape:"3"},
}



function getLstmJSX({units, activation, inputShape}){
    return <div>Form State Stand In</div>
}

function NewLayerform({handleNewLayer, layerIndex}){
    console.log(handleNewLayer, layerIndex)
    const history = useHistory();

    const [formState, setFormState] = useState("lstm");

    const changeFormState = (event)=>{
        setFormState(event.target.value);

    }

    function handleChange(evt){
        const {name, value} = evt.target;
        setFormData(l => ({...l, [name]: value}));
    }

    const [formData, setFormData] = useState(formOptions[formState])


    function getJSK_InitialLSTM({units, activation, inputShape}){
        return (
            <div className="newLstmForm">
                <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <h3 className="mb-3">New LSTM Layer</h3>
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={(event)=>{
                                event.preventDefault();
                                handleNewLayer({"params":formData, "type":"lstm"})
                            }}>
                                <div className="form-group">
                                    <label>Num Units</label>
                                    <input
                                        name="units"
                                        className="form-control"
                                        value={formData.units}
                                        onChange={handleChange}
                                        required
                                        />
                                </div>
                                <div className="form-group">
                                    <label>Activation Function</label>
                                    <input 
                                        name="activation"
                                        className="form-control"
                                        value={formData.activation}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className={`form-group ${layerIndex === 0 ? "show" : "hide" }`}>
                                    <label>Input Shape</label>
                                    <input 
                                        name="inputShape"
                                        className="form-control"
                                        value={`${formData.inputShape}`}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
        

                                <button>Add Layer</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (formState == 'lstm') return getJSK_InitialLSTM(formState, layerIndex)
}

export default NewLayerform;