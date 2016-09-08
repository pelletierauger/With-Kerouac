var textInput;
var textOutput;

function setup() {
    noCanvas();
    // createP("Sounds in the Woods");
    // createP("Computational poetry with Jack Kerouac");
    // createP("Just a test");
    textInput = select("#editableP");

    textOutput = select("#output");
    textInput.input(function() {
        textOutput.html(textInput.html());
    });
}

function draw() {

}
