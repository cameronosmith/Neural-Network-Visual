//file to create a cnn layer

//cnn properties
const FIRST_LAYER_SIZE = [10,10]
const CONV_MARGIN = 0.2
const CONV_THICKNESS = 0.1
const CONV_OPACITY = 0.2
const CONV_HEX_COLOR = 0xbfbfbf

/* constructor for the cnn layer
 * @param numStack: the number of compressed images in the stack
 * @param kernelSize: the kernel size
 * @param strideLength: the stride length
 * @param previousLayerStack: the list of filters in the last layer
 * @return: list of objects to add to scene
 * */
function ConvLayer (numStack, kernelSize, strideLength, previousStackLayer) {
    //the stack of convs
    var convStack = [];
    /* iterate through each plane to draw in the stack */
    for (var paneIndex = 0; paneIndex < numStack; paneIndex++) {
        //calculate the position of the conv
        var position = [-paneIndex/10,0, paneIndex * (CONV_MARGIN+CONV_THICKNESS)];
        console.log(position);

        var individualConv = new IndividualConvPane (FIRST_LAYER_SIZE, position, CONV_HEX_COLOR);
        convStack.push(individualConv.obj);
    }
    
    return convStack;
}

/* function to create an indivual conv pane
 * @param position: the position of this pane
 * @param color: the hex color of this image
 * @return the conv shape
 * */
function IndividualConvPane (size, position, color) {
    //define the material and geometry for the mesh
    var geometry = new THREE.BoxGeometry( FIRST_LAYER_SIZE[0], FIRST_LAYER_SIZE[1], CONV_THICKNESS);
    var material = new THREE.MeshBasicMaterial( {color: CONV_HEX_COLOR} );
        material.opacity = CONV_OPACITY;
        material.transparent = true;
    //create the plane obj and set its position
    this.obj = new THREE.Mesh( geometry, material );
    this.obj.position.set(position[0],position[1],position[2]); 
}

