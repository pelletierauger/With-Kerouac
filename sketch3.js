var textOutput, textSplit;
var canvas, ctx, canvasContainer;
var cutupDrawn = true;
var chunkArray = ["test", "test"];

function setup() {
    canvasContainer = select("#tree");
    if (windowWidth < 1000) {
        canvas = createCanvas(canvasContainer.width, windowHeight * 0.85);
    } else {
        canvas = createCanvas(canvasContainer.width - 351, windowHeight * 0.85);
    }
    ctx = canvas.drawingContext;
    canvas.parent("#tree");
    background(50, 30, 0);
    noStroke();
    fill(235, 235, 150);
    textFont("'Sorts Mill Goudy', 'Baskerville', Georgia, serif");
    textSize(25);
    loadStrings('sounds-in-the-woods.txt', pickString);
    var cutupButton = select('#cutupButton');
    cutupButton.mouseClicked(cutup);
    textOutput = select("#output");
}

function windowResized() {
    canvasContainer = select("#tree");
    if (windowWidth < 1000) {
        canvas = resizeCanvas(canvasContainer.width, windowHeight * 0.85);
    } else {
        canvas = resizeCanvas(canvasContainer.width - 351, windowHeight * 0.85);
    }
    cutupDrawn = false;
}

function pickString(text) {
    text = join(text, ' ');
    var delimiters = " —";
    textSplit = splitTokens(text, delimiters);
    cutup();
}

function cutup() {
    var chunks = "";
    chunkArray = [];
    for (var i = 0; i < 25; i++) {
        var chunk = textSplit[floor(random(textSplit.length))];
        chunks += " " + chunk;
        chunkArray.push(chunk);
    }
    textOutput.html(chunks);
    cutupDrawn = false;
}

function draw() {
    if (!cutupDrawn) {
        translate(width / 2, height);
        var gradient = ctx.createLinearGradient(0, -height, 0, 0);
        gradient.addColorStop(0, "rgba(70,60,30,255)");
        gradient.addColorStop(1, "rgba(50,30,0,255)");
        ctx.fillStyle = gradient;
        rect(-width / 2, -height, width, height);
        if (windowWidth < 1000) {
            scale(width / 900 * 2, width / 900 * 2);
        } else {
            scale(width / 900, width / 900);
        }

        recursiveTree({
            pos: createVector(0, 0),
            angle: PI / 2 * 3,
            hyp: 50,
            text: chunkArray
        });
        cutupDrawn = true;
    }
}

function recursiveTree(branch) {
    push();
    translate(branch.pos.x, branch.pos.y);
    rotate(branch.angle);
    textSize(branch.hyp / 2);
    if (branch.hyp < 20) {
        fill(floor(random(200, 255)), floor(random(0, 255)), 0);
    } else {
        fill(235, 235, 150);
    }
    if (branch.text[0]) {
        text(branch.text[0], 0, 0);
    }
    pop();
    var newX = branch.pos.x + cos(branch.angle) * branch.text[0].length * branch.hyp * 0.25;
    var newY = branch.pos.y + sin(branch.angle) * branch.text[0].length * branch.hyp * 0.25;
    var newText = branch.text.slice();
    newText.shift();

    if (branch.hyp > 15) {
        recursiveTree({
            pos: createVector(newX, newY),
            angle: branch.angle + random(-0.2, 0.2),
            hyp: branch.hyp * 0.9,
            text: newText
        });
    }
    if (branch.hyp > 15 && random(0, 1) < 0.7) {
        newText.shift();
        recursiveTree({
            pos: createVector(newX, newY),
            angle: branch.angle + random(-0.9, 0.9),
            hyp: branch.hyp * 0.9,
            text: newText
        });
    }
}
