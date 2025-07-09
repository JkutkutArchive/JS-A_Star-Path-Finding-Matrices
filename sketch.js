var network;

var aStarIterator;

window.addEventListener("contextmenu", (e) => e.preventDefault());

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

function mousePressed(event) {
  const RIGHT_CLICK = 2;
  let mousePos = new Point(mouseX, mouseY, -1);

  for (let p of network.coordP) {
    if (mousePos.distTo(p) <= 10) {
      if (event.button === RIGHT_CLICK && network.start.index != p.index) {
        network.end = p;
      } else if (network.end.index != p.index) {
        network.start = p;
      }
      aStarIterator = network.aStar();
      loop();
      return;
    }
  }
}
