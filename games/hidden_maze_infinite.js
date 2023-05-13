/*
Welcome to Hidden Maze Infinite (or Hidden Maze 2 if you will), the 2nd game in the planned trilogoy of my Hidden Maze games here one sprig, 
I would recomend playing the 1st game, its a short introductory for what is to come.
Controls are the same WASD, don't bother with worrying about getting to the end in this one, there is none, 
I have carefully constructed a maze generation that will allow you to play for as long as you like.
Remember, have fun!
*/


class Cell{
  constructor(isWall){
    this.isWall = isWall; 
    this.isEnd = false;
    this.visited = false;
  }
}
class XYPos{
  constructor(xx,yy){
    this.x = xx;
    this.y = yy;
  }
    
}
//makes myMap
let myMap;
myMap = new Array(10);
for (let a = 0; a < myMap.length; a++) {
  myMap[a] = new Array(8);
  for (let b = 0; b < myMap[a].length; b++) {
    myMap[a][b] = new Cell(true);
  }
}


function nextToVisited(x,y){
   for (var i = -1; i <= 1; i++){
     for(var j = -1; j <=1; j++){
      if(x+i >= 0 && x+i < myMap.length &&
         y+j >= 0 && y+j < myMap[0].length && 
         !(i == 0 && j == 0) &&
         !(myMap[x+i][y+j] == null || myMap[x+i][y+j] == undefined) &&
         (myMap[x+i][y+j]).visited == true){
          return false;
        
      }
     }
   }
  return true;
}

function moveNext(x,y,k,t){//x & y are current position, k & t are previous position
  let arr= new Array;
  let count = 0;
  for (let i = -1; i <= 1; i++){
    for(let j = -1; j <=1; j++){
      if(x+i >= 0 && x+i < myMap.length && //checks if x+i is in the array
       y+j >= 0 && y+j < myMap[0].length && //checks if y+j is in the array
        (i==0 || j ==0) && i != j && //this should see if the area's to move to are next(up,down,left,or right) to [x][y] but not [x][y]
        nextToVisited(x+i, y+j) && //checks if [x+i][y+j] is next to a visited Cell
        !(myMap[x+i][y+j] == null || myMap[x+i][y+j] == undefined) && //checks if [x+i][y+j] containes nothing
       myMap[x+i][y+j].visited == false && //checks if is a visited cell
        !(x+i == k && y+j == t)){ //check if [x+i][y+j] equals [k][t]
       arr[count++] = new XYPos(x+i,y+j); //XYPos is a simple object that cotains an x and y cordinate so I can return one thing
      }
    }
  }
  if(k >= 0 && t >= 0){
    myMap[k][t].visited = true;
  }
  myMap[x][y].isWall = false;
  return arr[Math.floor(Math.random() * arr.length)]
}

//makes a radomized maze
function changeWalls(){
  let prePos = new XYPos(-1,-1);
  let nextPos = new XYPos(0,0);
  //makes main path
  while(!(nextPos == null || nextPos == undefined)){
    let temp =nextPos;
    nextPos = moveNext(nextPos.x,nextPos.y,prePos.x,prePos.y);
    prePos = temp;
  }
  myMap[prePos.x][prePos.y].isEnd = true;
  myMap[prePos.x][prePos.y].visited = true;

  //makes other paths
  let go = 0
  for(let a = 0; a< myMap.length;a++){
    for(let b = 0; b < myMap[a].length;b++){
      nextPos=new XYPos(a,b);
      prePos=new XYPos(a,b);
      if(myMap[a][b].isWall == false){

        //changes adjasent path squares to not visited
        for (let i = -1; i <= 1; i++){
          for(let j = -1; j <=1; j++){
            if(a+i >= 0 && a+i < myMap.length && //checks if a+i is in the array
             b+j >= 0 && b+j < myMap[0].length && //checks if b+j is in the array
              (i==0 || j ==0) &&//this should see if the area's to move to are next(up,down,left,or right) to [a][b]
              myMap[a+i][b+j].isWall == false){ //checks if is wall
              
              myMap[a+i][b+j].visited = false;
              
            }
          }
        }
        nextPos = new XYPos(a,b)
  
        let temp =nextPos;
        nextPos = moveNext(nextPos.x,nextPos.y,prePos.x,prePos.y);
        prePos = temp;

        myMap[prePos.x][prePos.y].visited = true;
  
        //sets changed paths back to visited
        for (let i = -1; i <= 1; i++){
          for(let j = -1; j <=1; j++){
            if(a+i >= 0 && a+i < myMap.length && //checks if a+i is in the array
             b+j >= 0 && b+j < myMap[0].length && //checks if b+j is in the array
              //(i==0 || j ==0) &&//this should see if the area's to move to are next(up,down,left,or right) to [a][b]
              myMap[a+i][b+j].isWall == false){ //checks if is wall
              
              myMap[a+i][b+j].visited = true;
              
            }
          }
        }

        while(!(nextPos == null || nextPos == undefined)){
          temp =nextPos;
          nextPos = moveNext(nextPos.x,nextPos.y,prePos.x,prePos.y);
          prePos = temp;
        }
        myMap[prePos.x][prePos.y].visited = true;
        

      }
    }
  }

}

function updateMap(){
  for(let a = 0; a < myMap.length; a++){
    for(let b = 0; b < myMap[a].length; b++){
      if (myMap[a][b].isWall == true){
        addSprite(a,b,wall2);
      } 
      if (myMap[a][b].isEnd == true){
        addSprite(a,b,goal);
      }
    }
  }
}



const player = "p"
const wall = "w"
const wall2 = "c"
const goal = "g"

setLegend(
  [ player, bitmap`
................
......22222.....
......2FFF2.....
.....22F6F2.....
.....2F66F2222..
...222F666F202..
...200F060F202..
...202F666F002..
...202F660F222..
...222F006F2....
....2F6666F2....
....2F666F22....
....22FFF22.....
....2202022.....
....2002002.....
....2222222.....` ],
  [ goal, bitmap`
................
.22222222222222.
2266666666666622
26266F666F666262
26266F6F6F666262
226666FFF6666622
.22266666666222.
...2266666622...
....22266222....
......2662......
......2662......
.....226622.....
....22666622....
...2266666622...
...2666666662...
...2222222222...` ],
  [ wall, bitmap`
0000000000000000
0CCCCCCC0LLLLLLL
0CCCCCCC0LLLLLLL
0CCCCCCC0LLLLLLL
0CCCCCCC0LLLLLLL
0CCCCCCC0LLLLLLL
0CCCCCCC0LLLLLLL
0CCCCCCC0LLLLLLL
0000000000000000
0FFFFFFF0DDDDDDD
0FFFFFFF0DDDDDDD
0FFFFFFF0DDDDDDD
0FFFFFFF0DDDDDDD
0FFFFFFF0DDDDDDD
0FFFFFFF0DDDDDDD
0FFFFFFF0DDDDDDD` ],
  [ wall2, bitmap`
0000000000000000
0CCCCCCC0LLLLLLL
0CCCCCCC0LLLLLLL
0CCCCCCC0LLLLLLL
0CCCCCCC0LLLLLLL
0CCCCCCC0LLLLLLL
0CCCCCCC0LLLLLLL
0CCCCCCC0LLLLLLL
00000000L0000000
0FFFFFFF0DDDDDDD
0FFFFFFF0DDDDDDD
0FFFFFFF0DDDDDDD
0FFFFFFF0DDDDDDD
0FFFFFFF0DDDDDDD
0FFFFFFF0DDDDDDD
0FFFFFFF0DDDDDDD` ]
)

setBackground(wall)

setSolids([ player, wall2 ])

setMap(map`
p.........
..........
..........
..........
..........
..........
..........
..........`)
//changes map

changeWalls();
updateMap();



onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})


onInput("a", () => {
  getFirst(player).x -= 1
})


onInput("d", () => {
    getFirst(player).x += 1
})

afterInput(() => {
  if (getFirst(goal).y == getFirst(player).y &&
      getFirst(goal).x == getFirst(player).x) {
    setMap(map`
p.........
..........
..........
..........
..........
..........
..........
..........`)
    myMap = new Array(10);
    for (let a = 0; a < myMap.length; a++) {
      myMap[a] = new Array(8);
      for (let b = 0; b < myMap[a].length; b++) {
        myMap[a][b] = new Cell(true);
      }
    }
    changeWalls()
    updateMap()
    
    
  }
})
