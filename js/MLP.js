//file to create a multi layer perception layer

//mlp properties
const PLANE_MARGIN = .1;
const SPACE_BETWEEN_PLANES = 2;
const ARROW_MARGIN = .3;

const ARROW_COLOR = 0x0000ff
const LINE_COLOR = 0xff0000
const LINE_OPACITY = 0.1

/* constructor for the multi layer perception layer
 * creates the nodes and the layer plane encompassing them
 * @param numNodes: the number of nodes in the layer
 * @param listIndex: the index of this layer in the collection
 * @param previousLayer: the last mlp layer (null if first)
 * @param activationType: the activation type (list tbd)
 * @return: list of objects to add to scene
 * */
function MultiLayerPerception (numNodes, listIndex, previousLayer, activationType='RELU') {
    this.zIndex = -1*(listIndex * SPACE_BETWEEN_PLANES);
    //the 3d objects to add to the scene
    this.objs = [];
    
    //create the embodying plane layer and weight nodes       
    this.nodesObjs = this.setUpNodes (numNodes, this.zIndex);
    this.objs = this.objs.concat(this.nodesObjs);

    //calculate the height and width of the plane (based on the last weight node )
    const planeHeight = 2*PLANE_MARGIN+2*this.objs[this.objs.length-1].position['y'];
    const planeWidth = RADIUS*2+PLANE_MARGIN;
    var layerPlane = new LayerPlane ([planeWidth,planeHeight],[0,0,this.zIndex]);
    //add layer plane to objs to daw
    this.objs.push(layerPlane.obj);
    
    //get arrow and lines and add it to the scene
    if (previousLayer != undefined) {
        //arrow
        var connectingArrow = this.drawArrow (previousLayer);
        this.objs.push(connectingArrow);
        //lines
        var lineObjs = this.drawLines(previousLayer);
        this.objs = this.objs.concat(lineObjs);
    }
}

/* function to set up the nodes with their positions 
 * @param numNodes: the number of nodes in the layer
 * @return: array of nodes
 * */
MultiLayerPerception.prototype.setUpNodes = function (numNodes) {
    //the list of nodes
    var nodes = [];
    //the x coordinate
    const xCoord = 0;
    //iterate through num nodes to get each node
    for (var index = 0; index < numNodes; index++) {
        //the y coord of the node
        const yCoord =  index*2*RADIUS;
        //create and add node
        var node = new WeightNode ([xCoord, yCoord, this.zIndex]);
        nodes.push (node.obj);
    }
    //subtract half the height of each node
    for (var index = 0; index < numNodes; index++) {
        var halfHeight = nodes[nodes.length-1].position['y']/2
        nodes[index].translateY(-halfHeight);
    }

    return nodes;
}

/* function to draw an arrow to the previous layer
 * @param previousLayer: the last mlp layer object
 * @return: the arrow object to add to scene 
 * */
MultiLayerPerception.prototype.drawArrow = function (previousLayer) {
    //get the z position to start and end with
    var beginningZ = previousLayer.zIndex;

    var from = new THREE.Vector3(0, ARROW_MARGIN/2, beginningZ - ARROW_MARGIN);
    var to = new THREE.Vector3(0, 0, this.zIndex + ARROW_MARGIN );
    var direction = to.clone().sub(from);
    var length = direction.length();
    var arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, ARROW_COLOR);
    arrowHelper.line.material.lineWidth = 5;
    return arrowHelper;
}

/* function to draw a line to every node simulating the weights
 * @param previousLayer: the last mlp layer object
 * @return: the line objects to add to the scene
 * */
MultiLayerPerception.prototype.drawLines = function (previousLayer) {
    //the list of line objects
    var lineObjs = [];
    /* iterate through every weight node to attach to previous layer's */
    for (var currentLayerIndex = 0; currentLayerIndex < this.nodesObjs.length; currentLayerIndex++) {
        //the coordinates of the current node
        const currentNodePos = this.nodesObjs[currentLayerIndex].position;
        /* iterate through every weight node in the previous layer */ 
        for (var prevLayerIndex = 0; prevLayerIndex < previousLayer.nodesObjs.length; prevLayerIndex++) {
            //the coordinates of the previous layer node
            const prevNodePos = previousLayer.nodesObjs[prevLayerIndex].position;
            /* draw the line from current layer node to previous layer node */
            var lineGeometry = new THREE.Geometry();
            var lineMaterial = new THREE.LineBasicMaterial({color: LINE_COLOR, transparent: true, opacity: LINE_OPACITY});
            lineGeometry.vertices.push(new THREE.Vector3(prevNodePos['x'],prevNodePos['y'],prevNodePos['z']));
            lineGeometry.vertices.push(new THREE.Vector3(currentNodePos['x'],currentNodePos['y'],currentNodePos['z']));
            var line = new THREE.Line(lineGeometry, lineMaterial);
            lineObjs.push(line);
        }
    }
    return lineObjs;
}
