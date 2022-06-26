import React from 'react';
import uuid from 'react-uuid';
import NewLayerForm from "./NewLayerForm";


function formatParams(params){
    let paramList = []
    for (const [key, value] of Object.entries(params)){
        paramList.push(<li key = {uuid()}>{key}:{value}</li>)
    }
    return <ul>{paramList}</ul>
}

function Layer({ type, params, layerIndex, insertLayer, deleteLayer }) {
    const tempParams = {...params}
    // Only the first LSTM layer can have a custom shape, so we only want
    // to show the first layer's input shape.  However, we don't want to
    // delete it from the data structure in case the user deletes the 
    // layer that is currently first.
    if (type === 'lstm' && layerIndex != 0){
        delete tempParams.inputShape
    }
    return (
        <div>
            Layer #{layerIndex}
            <p>{type}</p>
            {formatParams(tempParams)}
            <button onClick={insertLayer}>Insert Layer</button>
            <button onClick={deleteLayer}>Delete Layer</button>
        </div>
    )
}

export default Layer;