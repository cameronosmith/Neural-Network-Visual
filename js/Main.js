var camera, scene, renderer, control, orbit;
var raycaster, mouse;
//holds all clickable objects
var clickableObjects = [];

//to be called when everything loaded
function setUpThree(){
    //environment setup
    init();
    render();
    update();
    //get data 
    importedData = importData ("fakePath");
    //start the nodes and objects
    StartNodes(scene, importedData);
    //load the camera a lil more centered
    camera.translateX( 1 );
    camera.translateZ( -1 );
    //hidden overlay
    $('#overlay').load('htmlForms/mlpForm.html');
    $("#overlay").hide();
}


/* function to init the base variables at the top of the file, set everything up */
function init() {

    //create the renderer obj
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //create the scene obj (where objs go)
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xeeeeee );
    scene.add( new THREE.GridHelper( 200, 200, 0xf8f8f8, 0xf8f8f8) );
    
    //create the camera (pov)
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000000 );
    camera.position.set( 5, 2, 1 );

    //the raycaster
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    document.addEventListener("mousedown",onMouseDown);

    //control over the scene (pan, zoom)
    orbit = new THREE.OrbitControls( camera, renderer.domElement );
    orbit.update();
    orbit.addEventListener( 'change', render );
    control = new THREE.TransformControls( camera, renderer.domElement );
    control.addEventListener( 'change', render );
    scene.add( control );

    //listener for the resize function
    window.addEventListener( 'resize', onWindowResize, false );
}

/* function to keep the window occupying the whole frame */
function onWindowResize() {
    //fix aspect ratios to take up whole frame and refresh
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}
/* function that is called at every frame to update the scene */
function update(){ 
    //render(); //needed?
    requestAnimationFrame(update);
    //to enable control panning at every frame
    control.update();
    //actually render
    render();
};
/* reference to re render the project */
function render () {
    renderer.render( scene, camera );
}

/* function to handle clickable objects */
function onMouseDown (event) {
    //event.preventDefault();
    mouse.x = (event.clientX/renderer.domElement.clientWidth)*2 - 1;
    mouse.y = -(event.clientY/renderer.domElement.clientHeight)*2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(clickableObjects);
    if (intersects.length > 0) 
        handleObjectClicked(intersects[0]);
}

/* function to handle clickable objects */
function handleObjectClicked (object) {
    /* load the html form */ //testing with mlp form first
    $("#overlay").show();
    //get the index of the object
    for (var index = 0; index < clickableObjects.length; index++) {
        if (object.object.position['z'] == clickableObjects[index].position['z'])  {
            setUpForm(index)
        }
    }
}

