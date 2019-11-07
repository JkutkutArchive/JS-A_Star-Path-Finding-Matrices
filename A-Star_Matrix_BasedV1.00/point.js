function Point(x, y, index){
  this.x = x;
  this.y = y;
  this.index = index;//to search in matrix
  
  //A*
  this.h;
  this.g;
  this.f;
  this.previous = undefined;
  
  this.show = function(color){
    stroke(color);
    strokeWeight(10);
    point(this.x, this.y);
  }
  this.getNeighbors = function(){
    let neighbors = [];
    for(let i = index, j = 0; j < nodes; j++){
      if(mapa[i][j] == 1){//if conected
        neighbors.push(coordP[j]);//add it
      }
    }
    return neighbors;
  }
}