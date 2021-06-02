
var mapa = [];//with relations
var coordP = [];//with Point objects
var nodes = 100;
var start, end;

var openSet = [];
var closedSet = [];
var path = [];// The road taken



//matrix functions
function oldRelations(){
  for(let i = 0; i < nodes;){//create random conections
    let r2 = Math.floor(random(nodes));
    if(i != r2){
      mapa[i][r2] = 1;
      mapa[r2][i] = 1;
      i++;
    }
  }
  for(let i = 0; i < nodes/5;){//create random conections
    let r1 = Math.floor(random(nodes));
    let r2 = Math.floor(random(nodes));
    if(r1 != r2 && mapa[r1][r2] == 0){
      mapa[r1][r2] = 1;
      mapa[r2][r1] = 1;
      i++;
    }
  }
  start = coordP[0];
  end = coordP[coordP.length - 1];
}
function newRelations(){
  for(let i = 0; i < nodes; i++){
    //let bestN = [];
    //for(let k = 0; k < 3; k++){
      let h = Math.pow(10, 1000);
      let index = i;
      for(let j = 0; j < nodes; j++){
        let he = heuristics(coordP[i], coordP[j]);
        //console.log(he < h);
        if(he < h && i != j){
          h = he;
          index = j;
        }
      }
    //}
    //if(bestN.length > 3){
      
    //}
    mapa[i][index] = 1;
    mapa[index][i] = 1;
  }
  
  for(let i = 0; i < nodes * 0.8;){//create random conections
    let r1 = Math.floor(random(nodes));
    let r2 = Math.floor(random(nodes));
    if(r1 != r2 && mapa[r1][r2] == 0){
      mapa[r1][r2] = 1;
      mapa[r2][r1] = 1;
      i++;
    }
  }
  
  
  
  start = coordP[0];
  end = coordP[coordP.length - 1];
}

function makeMatrix(w, h){
  let matrix = [];
  for(let i = 0; i < w; i++){
    matrix.push([]);
    for(let j = 0; j < h; j++){
      matrix[i][j] = 0;
    }
  }
  return matrix;
}
function printM(matrix){
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

//point functions
function heuristics(a, b){//dist a to b (heuristitcs)
  return dist(a.x, a.y, b.x, b.y);
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  nodes = Math.floor(windowWidth * windowHeight * 0.0002); // Dinamically create the 

  background(255);
  
  mapa = makeMatrix(nodes, nodes);

  
  for(let i = 0; i < nodes;){//create coord and draw  
    let x = Math.floor(random(width)) % (width - 100) + 50;
    let y = Math.floor(random(height)) % (height - 100) + 50;
    let valid = true;
    for(let j = 0; j < coordP.length; j++){
      if(heuristics({x:x, y:y}, coordP[j]) < width / (nodes*0.4)){
        valid = false;
        break;
      }
    }
    if(valid){
      coordP.push(new Point(x, y, i));
      i++;//noFill();
      //circle(coordP[i].x, coordP[i].y, 300);
      //circle(coordP[i].x, coordP[i].y, 50);
    }
  }
  //oldRelations();
  newRelations();
  
  //printM(mapa);
  
  openSet.push(start);//we start from the begining
}

function draw() {
  background(255);
  
  if(openSet.length > 0){//if still searching
    var indexBestSpot = 0;//search only best spot
    for(let i = 0; i < openSet.length; i++){//get best index
      indexBestSpot = (openSet[i].f < openSet[indexBestSpot].f)? i : indexBestSpot;
    }
    var current = openSet[indexBestSpot];
    if(current === end){//if current is the end => finish
      console.log("Done!, there is a way!");
      for(let p = path.length - 1, q = 1; p > 0; p--, q++){
        console.log(q + "º (" + path[p].x + ", " + path[p].y +") -> index: " + path[p].index);
      }
      noLoop();
    }
    
    openSet.splice(indexBestSpot, 1);//remove the best from openSet
    closedSet.push(current);//add it to the closed
    
    var neighbors = [];
    for(let i = 0; i < nodes; i++){
      if(mapa[current.index][i] == 1){
        neighbors.push(coordP[i]);
      }
    }
    
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if(!closedSet.includes(neighbor)){//if valid node
        var tempG = current.g + heuristics(neighbor, current);

        // Is this a better path than before?
        var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } 
        else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }
        
        // Yes, it's a better path
        if (newPath) {
          neighbor.h = heuristics(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  }
  else{//if no other way to go
    console.log("Ups, there is no way to go to the end");
    noLoop();
    return;
  }
  
  //draw it
  for(let i = 1, j = 1; i < nodes; i++, j++){
    strokeWeight(1.5);
    stroke(color(0));
    for(let k = 0; k < j; k++){
      if(mapa[i][k] == 1){
        line(coordP[i].x, coordP[i].y, coordP[k].x, coordP[k].y);
      }
    }
    coordP[i].show(color(0));
  }
  
  // Find the path by working backwards
  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }
   for (let i = 1; i < path.length; i++) {
     path[i].show(color(0, 255, 255));
     strokeWeight(4);
     stroke(color(0, 255, 255));
     line(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
   }
  start.show(color(0, 0, 255));
  end.show(color(255, 0, 0));
}