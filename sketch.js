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