/* function to delete all of the nodes from the scene */
function clearAllNodes () {
    /* iterate through all nodes to delete */
    while (scene.children.length > 1) {
        //disposeHierarchy (scene.children[0], disposeNode);    
        if (! (scene.children[1] instanceof THREE.GridHelper )) {
            scene.remove(scene.children[1]);
        }
    }
    /* clear clickable objects */
    clickableObjects = [];
}
