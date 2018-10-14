let files;
let fr = new FileReader();
let data;

function readFile() {
console.log("Reading");
files = document.getElementById("file-button").files;
console.log(files.length);
// fr = new FileReader();
fr.readAsText(files[0]);
setTimeout(() => {
console.log(fr.result);
data = JSON.parse(fr.result);
console.log(data);
handleData(data['config'])
}, 50)
}

//to be used throughout
var importedData = [];

function handleData(data) {
    for (var i=0; i < data.length; i++) {
        importedData.push(data[i]['config'])
    }
    //call the remove file html
    $("#choose-file").remove();
    //do the three js shit
    setUpThree();
}
