//this file is to export import and manipulate the layers data

/* function to get import the layers data 
 * @param path: the path to the data
 * @return: the layers array
 * */
function importData (path) {
    //for now just fake data
    var importedDataDense = [{className:'Dense',units: 15, activation: "Sigmoid"},{className:'Dense',units: 10, activation: "Sigmoid"}, {className:'Dense',units: 15, activation:"relu"}, {units: 3, activation:"Sigmoid"}];
    //var importedDataCnn = [{className:'Conv2D', kernelSize: 9, strideLength: 2, activation: "relu"},{className:'Conv2D', kernelSize: 10, strideLength: 1, activation: "relu"}];
    return importedDataDense;
}

/* function to manipulate the data (change layer stuff)
 * @param layerIndex: the index of the layer
 * @param valueName: the name of the value to manipulate
 * @param newValue: the value to replace the old value
 * */
function manipulateLayerAttributes (layerIndex, valueName, newValue) {
    //change the data in the respective layer
    importedData [layerIndex][valueName] = newValue;
    //restart
    restart();
}
//restart the scene
function restart () {
    clearAllNodes ();
    StartNodes (scene, importedData);
}
