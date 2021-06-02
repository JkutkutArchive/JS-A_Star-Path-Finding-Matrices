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

  // network.nextStepA_Star();  
  aStarIterator.next()
  console.log("Ready to show the network")
  //draw it
  network.show();
  console.log("Show")
}

function mouseClicked() { // if mouse clicked
  let mousePos = new Point(mouseX, mouseY, -1);

  for (let p of network.coordP) { // for each node of the network
    if (mousePos.distTo(p) <= 10) { // If mouse inside the node
      noLoop();
      network.start = p;
      console.log("preIterator");
      aStarIterator = network.aStar();
      console.log("postIterator");
      draw();
      break;
    }
  }
  loop(); // update the screen
}