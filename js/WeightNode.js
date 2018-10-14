//file to create a weight node in the MLP

//the constants for the node properties
const RADIUS = .1;
const SEGMENTS = 50;
const RINGS = 30;
const WIREFRAME = false;
const NODE_HEX_COLOR = 0x000000

/* function to create the node
 * @param position: the list of [x,y,z]
 * @return: the node object
 * */
function WeightNode (position) {

    //define the material and geometry for the mesh
    var geometry = new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS);
    var material = new THREE.MeshBasicMaterial({
        color: 0xF3A2B0,
        wireframe: WIREFRAME
    });
    
    //create the plane obj and set its position
    this.obj = new THREE.Mesh(geometry, material);
    this.obj.position.set(position[0],position[1],position[2]);
}
