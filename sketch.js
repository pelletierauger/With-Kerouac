var textInput;
var textOutput;
var mashed;

function setup() {
    noCanvas();
    // createP("Sounds in the Woods");
    // createP("Computational poetry with Jack Kerouac");
    // createP("Just a test");
    textInput = select("#editableP");

    textOutput = select("#output");
    textInput.input(function() {
        mashed = mash(textInput.html());
        textOutput.html(mashed);
    });
}

function mash(text) {
    // console.log(text);
    var textOut = "";
    // console.log(text.length);
    for (var i = 0; i < text.length; i++) {
        var currentIndex = random(text.length - 2);
        textOut += text.substring(currentIndex, currentIndex + 2);
        // console
        // console.log(text.substring(currentIndex, currentIndex + 1));
    }


    // console.log("textOut : " + textOut);
    return textOut;
}
