var textInput;
var textOutput;
var mashed;
var textSplit;
var canvas;
var currentMash = "";
var mashIndex = 0;
var mashDrawn = true;
var chunkArray = ["test", "test"];
var ctx;

function setup() {
    canvas = createCanvas(800, 600);
    ctx = canvas.drawingContext;
    canvas.parent("#tree");
    // background(150, 70, 70);
    background(50);
    noStroke();
    fill(235, 235, 150);
    textFont("'Sorts Mill Goudy', 'Baskerville', Georgia, serif");
    textSize(25);
    loadStrings('sounds-in-the-woods.txt', pickString);
    var mashButton = select('#mashButton')
    mashButton.mouseClicked(mash);
    textOutput = select("#output");
}

function pickString(text) {
    text = join(text, ' ');
    var delimiters = " —";
    textSplit = splitTokens(text, delimiters);
    mash();
}

function mash() {
    var chunks = "";
    chunkArray = [];
    for (var i = 0; i < 25; i++) {
        var chunk = textSplit[floor(random(textSplit.length))];
        chunks += " " + chunk;
        chunkArray.push(chunk);
    }
    textOutput.html(chunks);
    currentMash = chunks;
    mashDrawn = false;
    console.log("mashDrawn is now false!");
}

function draw() {
    translate(width / 2, height);
    if (!mashDrawn) {
        console.log("Drawing the mash!");
        // var gradient = ctx.createLinearGradient(0, -height, 0, 0);
        // gradient.addColorStop(0, "rgba(180,80,30,255)");
        // gradient.addColorStop(1, "rgba(130,0,30,255)");
        // ctx.fillStyle = gradient;
        // rect(-width / 2, -height, width, height);
        // fill(235, 235, 150);
        // background(30, 60, 90);
        background(50);
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
    // ellipse(0, 0, 5, 5);
    // text(branch.text.length, 0, 0);
    rotate(branch.angle);
    textSize(branch.hyp / 2);
    fill(235, 235, 150);
    if (branch.hyp < 20) {
        fill(floor(random(200, 255)), floor(random(0, 255)), 0);
    }
    if (branch.text[0]) {
        text(branch.text[0], 0, 0);
    }
    pop();
    // var newX = branch.pos.x + cos(branch.angle) * branch.hyp;
    // var newY = branch.pos.y + sin(branch.angle) * branch.hyp;
    var newX = branch.pos.x + cos(branch.angle) * branch.text[0].length * branch.hyp * 0.25;
    var newY = branch.pos.y + sin(branch.angle) * branch.text[0].length * branch.hyp * 0.25;
    var newAngle = branch.angle;
    var newText = branch.text.slice();

    newText.shift();

    if (branch.hyp > 15) {
        recursiveTree({
            pos: createVector(newX, newY),
            angle: newAngle,
            hyp: branch.hyp * 0.9,
            text: newText
        });
    }
    if (branch.hyp > 15 && random(0, 1) < 0.7) {
        newText.shift();
        recursiveTree({
            pos: createVector(newX, newY),
            angle: newAngle + random(-0.6, 0.6),
            hyp: branch.hyp * 0.9,
            text: newText
        });
    }
}

function gotFile(file) {
    if (file.type === 'text') {
        console.log(file);
        // var formattedText = join(file.data, ' ');
        // textInput.html(formattedText);
        textOutput.html(file.data);
    }
}
