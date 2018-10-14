//file to create the geometry layer that will be overlayed through the node layer

//constants of a plane
const PLANE_THICKNESS = .1
const PLANE_OPACITY = .1
const PLANE_HEX_COLOR = 0xbfbfbf

/* constructor for the plane 
 * @param size: the size tupe of [x,y]
 * @param position: the list of [x,y,z]
 * @return: the plane
 * */
function LayerPlane (size, position) {
    //define the material and geometry for the mesh
    var geometry = new THREE.BoxGeometry( size[0], size[1], PLANE_THICKNESS);
    var material = new THREE.MeshBasicMaterial( {color: PLANE_HEX_COLOR} );
        material.opacity = 0.5;
        material.transparent = true;
    //create the plane obj and set its position
    this.obj = new THREE.Mesh( geometry, material );
    this.obj.position.set(position[0],position[1],position[2]);
    this.obj.index = 4;
    //add to clickable list
    clickableObjects.push(this.obj);
}

