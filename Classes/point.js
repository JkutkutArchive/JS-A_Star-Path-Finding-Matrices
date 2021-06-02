class Point {
    constructor (x, y, index) {
        this._x = x;
        this._y = y;
        this.index = index;

        // A* variables
        this.h;
        this.g;
        this.f;
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
        stroke(...color);
        strokeWeight(10);
        point(this.x, this.y);
    }

    getNeighbors() {
        let neighbors = [];
        for(let i = this.index, j = 0; j < nodes; j++){
            if(mapa[i][j] == 1){ // if connected
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