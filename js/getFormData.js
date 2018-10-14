//file to get the data from the popup forms


/* function to set the initial form data 
 * @param importedData
 * */
function setFormData (importedData) {
    
}

/* function to get the form data
 * @return: json of update form data
 * */
function getFormData () {
    var unitVal = $("#units").val();
    var activationVal = $("#activation").val();
    return {"units":unitVal,"activation":activationVal};
}

/* set up form data to correspond to mlps data */
function setUpForm (index) {
    $("#layerIndex").text(index);
    $("#units").val(importedData[index]['units']); 
}
/* set up functions for the form buttons */
function closeForm () {
    $("#overlay").css("display","none")
}
function updateNet () {
    //get form data and update it
    updatedData = getFormData(); 
    //get index
    var index = $("#layerIndex").text();
    for (var attribute in updatedData) {
        if (updatedData.hasOwnProperty(attribute)) {
            manipulateLayerAttributes(index,attribute,updatedData[attribute]);
        }
    }
}
function deleteLayer () {
    //get index
    var index = $("#layerIndex").text();
    importedData.splice(index,1);
    restart();
}
