var textInput;
var textOutput;
var mashed;
var textSplit;
var canvas;
var currentMash = "";
var mashIndex = 0;
var mashDrawn = true;
var chunkArray = ["test", "test"];

function setup() {
    // noCanvas();
    canvas = createCanvas(500, 500);
    canvas.parent("#tree");
    background(150, 70, 70);
    noStroke();
    fill(235, 235, 150);
    textFont("Sorts Mill Goudy");
    textSize(25);
    // var fileSelect = createFileInput(gotFile);
    // fileSelect.parent(select("#fileBox"));
    loadStrings('sounds-in-the-woods.txt', pickString);
    var mashButton = select('#mashButton')
    mashButton.mouseClicked(mash2);

    // createP("Sounds in the Woods");
    // createP("Computational poetry with Jack Kerouac");
    // createP("Just a test");

    // textInput = select("#editableP");

    textOutput = select("#output");
    // textInput.input(function() {
    //     mashed = mash(textInput.html());
    //     textOutput.html(mashed);
    // });

}

function pickString(text) {
    // text = join(text, '</br>');
    text = join(text, ' ');
    var delimiters = " —";
    textSplit = splitTokens(text, delimiters);
    mash2();
}

function mash2() {
    var chunks = "";
    chunkArray = [];
    for (var i = 0; i < 50; i++) {
        var chunk = textSplit[floor(random(textSplit.length))];
        chunks += " " + chunk;
        chunkArray.push(chunk);
    }
    textOutput.html(chunks);
    currentMash = chunks;
    mashDrawn = false;
    console.log("mashDrawn is now false!");
}

function gotFile(file) {
    if (file.type === 'text') {
        console.log(file);
        // var formattedText = join(file.data, ' ');
        // textInput.html(formattedText);
        textOutput.html(file.data);
    }

}

function mash(text) {
    // console.log(text);
    var textOut = "";
    // console.log(text.length);
    for (var i = 0; i < text.length; i++) {
        var currentIndex = floor(random(text.length - 2));
        textOut += text.substring(currentIndex, currentIndex + 2);
        // console
        // console.log(text.substring(currentIndex, currentIndex + 1));
    }


    // console.log("textOut : " + textOut);
    return textOut;
}

function draw() {
    translate(width / 2, height);
    text(currentMash, 0, 0);
    if (!mashDrawn) {
        console.log("Drawing the mash!");
        background(150, 70, 70);
        recursiveTree({
            pos: createVector(0, 0),
            angle: PI / 2 * 3,
            hyp: 50,
            text: chunkArray
        });
        mashDrawn = true;
    }
}

function recursiveTree(branch) {
    push();
    translate(branch.pos.x, branch.pos.y);
    ellipse(0, 0, 5, 5);
    text(branch.text[0], 0, 0);
    pop();
    var newX = branch.pos.x + cos(branch.angle) * branch.hyp;
    var newY = branch.pos.y + sin(branch.angle) * branch.hyp;
    var newAngle = branch.angle;
    var newText = branch.text;
    newText.shift();

    if (branch.hyp > 1) {
        recursiveTree({
            pos: createVector(newX, newY),
            angle: newAngle,
            hyp: branch.hyp * 0.9,
            text: newText
        });
    }
    if (branch.hyp > 1 && random(0, 1) < 0.2) {
        recursiveTree({
            pos: createVector(newX, newY),
            angle: newAngle + random(-0.6, 0.6),
            hyp: branch.hyp * 0.9,
            text: newText
        });
    }
}

function seed(x, y, a, h, g) {
    var s = createVector(x, y);
    var angle = a + random(-0.17 + -h / 100, 0.17);

    var hyp = h * 0.9;
    var newX = s.x + cos(a) * h;
    var newY = s.y + sin(a) * h;
    var blue = map(h, 4, -1, 0, 255);
    var red = map(h, 4, -1, 250, 0);

    var alpha = map(h, 9, 0, 10, 150);
    stroke(red, g, blue, alpha);
    strokeWeight(1);
    line(s.x, s.y, newX, newY);
    if (hyp > 1) {
        setTimeout(function() {
            seed(newX, newY, angle, hyp, g);
        }, 1);
    }
    if (hyp > 1 && random(0, 1) < 0.02) {
        setTimeout(function() {
            seed(newX, newY, angle + random(-0.6, 0.6), hyp, g);
        }, 1);
    }
}
