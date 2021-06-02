var network;

var aStarIterator;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(0);

  network = new Network(windowWidth, windowHeight);
  aStarIterator = network.aStar();
}

function draw() {
  background(255);

  aStarIterator.next();
  //draw it
  network.show();
}

function mouseClicked() { // if mouse clicked
  let mousePos = new Point(mouseX, mouseY, -1);

  for (let p of network.coordP) { // for each node of the network
    if (mousePos.distTo(p) <= 10) { // If mouse inside the node
      noLoop();
      network.start = p;
      aStarIterator = network.aStar(); // Restart the algo
      loop(); // update the screen      
      return;
    }
  }
}