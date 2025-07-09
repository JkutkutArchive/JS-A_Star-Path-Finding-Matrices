class Network {
    constructor(canvasWidth, canvasHeight) {
        this.size = {w: canvasWidth, h: canvasHeight};

        this.mapa; //with relations
        this.coordP = [];//with Point objects
        
        this.nodes = Math.floor(canvasWidth * canvasHeight * 0.00045); // Dinamically create the nodes
        this.resetMapa(); // Mapa is now a this.nodes x this.nodes matrix;

        this.createPoints();
        this.createCloseRelations();

        this.start;
        this.current;
        this.end;

        this.openSet = new Set();
        this.closedSet = new Set();
        this.path = [];// The road taken



        this.start = this.coordP[0];
        this.end = this.coordP[this.coordP.length - 1];
        this.openSet.add(this.start); //we start from the begining
    }

    show() {
        for(let i = 1, j = 1; i < this.nodes; i++, j++){
            push();
            strokeWeight(1.5);
            stroke(0);
            for(let k = 0; k < j; k++){
                if(this.mapa[i][k] == 1){
                   line(this.coordP[i].x, this.coordP[i].y, this.coordP[k].x, this.coordP[k].y);
                }
            }
            pop();
            this.coordP[i].show([0, 0, 0]);
        }

        for (let p of this.openSet) {
            p.show([255, 104, 3]);
        }
        for (let p of this.closedSet) {
            p.show([161, 161, 161]);
        }

        // Find the path by working backwards
        this.path = [];
        var temp = this.current;
        this.path.push(temp);
        while (temp != undefined && temp.previous != undefined) {
            this.path.push(temp.previous);
            temp = temp.previous;
        }
        for (let i = 1; i < this.path.length; i++) {
            this.path[i].show([0, 255, 255]);
            push();
                strokeWeight(2);
                stroke([0, 255, 255]);
                line(this.path[i].x, this.path[i].y, this.path[i - 1].x, this.path[i - 1].y);
            pop();
        }
        this.start.show([0, 0, 255]);
        this.end.show([255, 0, 0]);
    }


    *aStar() {
        this.networkReset();
        while (this.openSet.size > 0){ // While still searching
            let bestPoint;
            for (let p of this.openSet) {
                if (!bestPoint || p.f < bestPoint.f) {
                    bestPoint = p;
                }
            }
            this.current = bestPoint;
            
            if(this.current === this.end){//if current is the end => finish
                break;
            }
            
            this.openSet.delete(bestPoint);
            this.closedSet.add(this.current); //add it to the closed
            
            let neighbors = new Set();
            for(let i = 0; i < this.nodes; i++){
                if(this.mapa[this.current.index][i] == 1){
                    neighbors.add(this.coordP[i]);
                }
            }
            
            for (let neighbor of neighbors) {
                if(!this.closedSet.has(neighbor)){//if valid node
                    let tempG = this.current.g + neighbor.distTo(this.current);
            
                    let newPath = false;
                    if (this.openSet.has(neighbor)) { // if already on consideration
                        if (tempG < neighbor.g) { // if better way to go to this node
                            neighbor.g = tempG; // update cost to get to node
                            newPath = true;
                        }
                    } 
                    else {
                        neighbor.g = tempG;
                        newPath = true;
                        this.openSet.add(neighbor);
                    }
                    
                    if (newPath) {
                        neighbor.h = neighbor.distTo(this.end);
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.previous = this.current;
                    }
                }
            }
            yield;
        }
        
        if (this.openSet.size == 0) {//if no other way to go
            console.log("Ups, there is no way to go to the end");
            noLoop();
        }
        else {
            console.log("Done!, there is a way!");
            for(let p = this.path.length - 1, q = 1; p > 0; p--, q++){
                console.log(q + "º (" + this.path[p].x + ", " + this.path[p].y +") -> index: " + this.path[p].index);
            }
            noLoop();
        }
    }


    // VARIABLES CREATION and DESTRUCTION
    networkReset() {
        let startIndex = this.start.index;
        let endIndex = this.end.index;
        this.start = undefined;
        this.end = undefined;

        for (let i = 0; i < this.coordP.length; i++) {
            this.coordP[i] = new Point(this.coordP[i].x, this.coordP[i].y, this.coordP[i].index);
            if (startIndex == this.coordP[i].index) {
                this.start = this.coordP[i];
            }
            else if (endIndex == this.coordP[i].index) {
                this.end = this.coordP[i];
            }
        }

        this.start.g = 0;

        this.openSet.clear();
        this.closedSet.clear();

        this.current = undefined;
        
        this.openSet.add(this.start); //we start from the begining
    }

    resetMapa() {
        this.mapa = [];
        for(let i = 0; i < this.nodes; i++){
            this.mapa.push([]);
            for(let j = 0; j < this.nodes; j++){
                this.mapa[i][j] = 0;
            }
        }
    }

    createPoints() {
        this.coordP = [];
        let i, consecutiveInvalids;
        for(i = 0, consecutiveInvalids = 0; i < this.nodes && consecutiveInvalids < this.nodes;){ // Create points
            let x = Math.floor(random(this.size.w - 100)) + 50;
            let y = Math.floor(random(this.size.h - 100)) + 50;
            let p = new Point(x, y, i);
            let valid = true;
            for(let j = 0; j < this.coordP.length; j++){ // for each point already created
                if(p.distTo(this.coordP[j]) < this.size.w / 40){ // If new point too close
                    valid = false; // No valid anymore
                    break;
                }
            }
            if(valid){ // If valid location for a point
                this.coordP.push(p);
                i++;
                consecutiveInvalids = 0;
            }
            else {
              consecutiveInvalids++;
            }
          }
      this.coordP.splice(i, this.coordP.length - i - 1);
      this.nodes = this.coordP.length;
    }

    createCloseRelations() {
        for (let i = 0; i < this.nodes; i++) {
            for (let j = 0; j < this.nodes; j++) {
                if (this.coordP[i].distTo(this.coordP[j]) < 60) {
                    this.mapa[i][j] = 1;
                    this.mapa[j][i] = 1;
                }
            }
        }
    }

    
    // TOOLS

    static printM(matrix){
        let str = " * ";
        for(let i = 0; i < matrix.length; i++){
            str += "|_" + i + "_|";
        }
        console.log(str);
        for(let j = 0; j < matrix[0].length; j++){
            str = "_" + j + "_";
            for(let i = 0; i < matrix.length; i++){
            str += "| " + matrix[i][j] + " |";
            }
            console.log(str);
        }
    }
}