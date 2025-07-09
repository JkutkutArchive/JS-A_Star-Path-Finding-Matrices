class Point {
  constructor(x, y, index) {
    this._x = x;
    this._y = y;
    this.index = index;

    // A* variables
    this.h; // distance to end node
    this.g; // cost from start to this point
    this.f; // final cost to the end
    this.previous = undefined;
  }

  // Getters and setters
  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get index() {
    return this._index;
  }

  set index(newIndex) {
    this._index = newIndex;
  }

  show(color) {
    push();
    fill(...color);
    translate(this.x, this.y);
    circle(0, 0, 10);
    pop();
  }

  getNeighbors() {
    let neighbors = [];
    for (let i = this.index, j = 0; j < nodes; j++) {
      if (mapa[i][j] == 1) { // if connected
        neighbors.push(coordP[j]); // add it
      }
    }
    return neighbors;
  }

  distTo(otherPoint) {
    if (!otherPoint instanceof Point) {
      throw new Error("The input must be a Point instance.");
    }
    let x = this.x - otherPoint.x;
    let y = this.y - otherPoint.y;
    return Math.sqrt(x * x + y * y);
  }
}
