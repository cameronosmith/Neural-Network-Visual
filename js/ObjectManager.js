//file to manage all of the scene nodes and create them

/* function to start the neural net program 
 * @param scene: the scene to add objects to
 * @param importedData: the data used to draw the models
 * @return: none
 * */
function StartNodes (scene, importedData) {
    startNodesSequential (scene, importedData);
}

/* function to start the nodes for a sequential multilayer model
 * @param scene: the scene to add objects to
 * @param importedData: the data used to draw the models
 * @return: none
 * */
function startNodesSequential (scene, importedData) {
    //the list of mlp's
    var mlps = [];
    //iterate through fake data to make mlps
    for (var index = 0; index < importedData.length; index++) {
        //the current mlp
        var mlp = new MultiLayerPerception(importedData[index]['units'],index, mlps[index-1],importedData[index]['activation'])
        mlps.push(mlp);
        //add all the objects to the scene
        for (var index2 = 0; index2 < mlp.objs.length; index2++) {
            scene.add(mlp.objs[index2]);
        }
    }
}
//var importedDataDense = [{className:'Conv2D', kernelSize: 9, strideLength: 2, activation: "relu"},{className:'Conv2D', kernelSize: 10, strideLength: 1, activation: "relu"}];
/* function to start the nodes for a cnn model
 * @param scene: the scene to add objects to
 * @param importedData: the data used to draw the models
 * @return: none
 * */
function startNodesCNN (scene, importedData) {
    //the list of conv layers
    var convs = [];
    //create the first fake image with three rgb
    var beginningImageStack = new ConvLayer (3, 3, 2, undefined);  
    convs = convs.concat(beginningImageStack);
    //iterate through conv layers to make convs
    for (var index = 0; index < importedData.length; index++) {
    }
    //add all the objects to the scene
    for (var index = 0; index < convs.length; index++) {
        console.log(convs[index])
        scene.add(convs[index]);
    }
}
 
