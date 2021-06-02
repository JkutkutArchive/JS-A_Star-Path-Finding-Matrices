var network;

var aStarIterator;

window.addEventListener("contextmenu", e => e.preventDefault());

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(0);

  network = new Network(windowWidth, windowHeight);
  aStarIterator = network.aStar();
}

function draw() {
  background(255);

  aStarIterator.next();
  
  network.show(); // draw it
}

function mousePressed(event) { // if mouse clicked
  let mousePos = new Point(mouseX, mouseY, -1);

  for (let p of network.coordP) { // for each node of the network
    if (mousePos.distTo(p) <= 10) { // If mouse inside the node
      if (event.button === 2 && network.start.index != p.index) { // If right click
        network.end = p; // Selected is now the end
      }
      else if (network.end.index != p.index) { // If left click
        network.start = p; // Selected is now the start
      }
      aStarIterator = network.aStar(); // Restart the algo
      loop(); // update the screen      
      return;
    }
  }
}