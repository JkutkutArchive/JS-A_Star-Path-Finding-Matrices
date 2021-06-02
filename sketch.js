var network;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(0);

  network = new Network(windowWidth, windowHeight);
}

function draw() {
  background(255);
  
  network.nextStepA_Star();  
  
  //draw it
  network.show();
}

function mouseClicked() { // if mouse clicked
  let mousePos = new Point(mouseX, mouseY, -1);

  for (let p of network.coordP) { // for each node of the network
      if (mousePos.distTo(p) <= 10) { // If mouse inside the node
          noLoop();
          network.start = p;
          network.networkReset();
          loop(); // update the screen
          break;
      }
  }
}