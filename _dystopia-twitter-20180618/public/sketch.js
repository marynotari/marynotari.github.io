let mapImg;
let lat, lon, x, y;

let socket = io.connect(window.location.origin);
// let currentText = null;
// let p = [];

//arrays for storing
//the x,y of the center
//booleans if they are over or not
let ellipsesX = [];
let ellipsesY = [];
// let ellipsesD = [];
let ellipsesOver = [];

let dys = 0;
// let uto = 0;
let dystopiaText;
// let utopiaText;
let dystopiaArray = [];
// let utopiaArray = [];
let currentDystopia = null;
// let currentUtopia = null;
let d = [];
// let u = [];
let skulls = [];
// let doves = [];

let idD;
// let idU;

// Futurism
// let crystalBalls = [];

socket.on('mysocket', function(data) {
    console.log(data.text);
    dystopiaText = data.text
    idD = data.id_str
    dystopiaArray.push(dystopiaText);
  },
  // function(dataUtopia) {
  //   console.log(dataUtopia.text);
  //   utopiaText = dataUtopia.text
  //   idU = dataDystopia.id_str
  //   utopiaArray.push(dystopiaText);
  // }
);


//---P5.JS STUFF---//
function preload() {
  mapImg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/10.11416,25.95442,0.5,0,0/1280x720?access_token=pk.eyJ1IjoibWFyeW5vdGFyaSIsImEiOiJjamYwYTRpMjIwbHVzMnlubjF4cmtsY3hlIn0.78W4e4tnr0HjFBA8jxUqgA');

}

function Dystopia() {

      this.x = random(width/8, width-width/3);
      this.y = random(height/6, height-height/5);

      ellipsesX.push(this.x);
      ellipsesY.push(this.y);
      // ellipsesD.push(d);
      ellipsesOver.push(false);

      // Create a paragraph with the text
      // Push each new paragraph into currentText array to access later
      currentDystopia = createA('https://twitter.com/statuses/' + idD, dystopiaText, this.x, this.y, width/3, width/3);
      // currentText = createP(tweetText, this.x, this.y,width/1.2, width/1.2);
      // p.push(currentText);
      // // Position currentText at the center of each ellipse
      // currentText.style('position','absolute');
      // // currentText.style('color', '#404040');
      // currentText.style('color', '#f2f2f2');
      // currentText.style('font-family', 'Helvetica Neue');
      // currentText.id('hiddenText');
      // currentText.style('left', this.x + 'px');
      // currentText.style('top',  this.y + 'px');
      // currentText.style('opacity', 0);

      d.push(currentDystopia);
      // Position currentText at the center of each ellipse
      currentDystopia.style('position','absolute');
      currentDystopia.style('color', '#f2f2f2');
      currentDystopia.style('font-family', 'Helvetica Neue');
      currentDystopia.id('hiddenText');
      currentDystopia.style('left', this.x + 'px');
      currentDystopia.style('top',  this.y + 'px');
      currentDystopia.style('opacity', 0);

}

// function Utopia() {
//
//       this.xPos = random(width/8, width-width/3);
//       this.yPos = random(height/6, height-height/3);
//
//       ellipsesX.push(this.xPos);
//       ellipsesY.push(this.yPos);
//       // ellipsesD.push(d);
//       ellipsesOver.push(false);
//
//       // Create a paragraph with the text
//       // Push each new paragraph into currentText array to access later
//       currentUtopia = createA('https://twitter.com/statuses/' + idU, utopiaText, this.xPos, this.yPos, width/3, width/3);
//       // currentText = createP(tweetText, this.x, this.y,width/1.2, width/1.2);
//       // p.push(currentText);
//       // // Position currentText at the center of each ellipse
//       // currentText.style('position','absolute');
//       // // currentText.style('color', '#404040');
//       // currentText.style('color', '#f2f2f2');
//       // currentText.style('font-family', 'Helvetica Neue');
//       // currentText.id('hiddenText');
//       // currentText.style('left', this.xPos + 'px');
//       // currentText.style('top',  this.yPos + 'px');
//       // currentText.style('opacity', 0);
//
//       u.push(currentUtopia);
//       // Position currentText at the center of each ellipse
//       currentUtopia.style('position','absolute');
//       currentUtopia.style('color', '#f2f2f2');
//       currentUtopia.style('font-family', 'Helvetica Neue');
//       currentUtopia.id('hiddenText');
//       currentUtopia.style('left', this.xPos + 'px');
//       currentUtopia.style('top',  this.yPos + 'px');
//       currentUtopia.style('opacity', 0);
//
// }

// function Futurism() {
//
//       this.x = random(width/8, width-width/3);
//       this.y = random(height/6, height-height/3);
//
//       ellipsesX.push(this.x);
//       ellipsesY.push(this.y);
//       // ellipsesD.push(d);
//       ellipsesOver.push(false);
//
//       // Create a paragraph with the text
//       // Push each new paragraph into currentText array to access later
//       currentText = createA('https://twitter.com/statuses/' + id, tweetText, this.x, this.y, width/3, width/3);
//       // currentText = createP(tweetText, this.x, this.y,width/1.2, width/1.2);
//       p.push(currentText);
//       // Position currentText at the center of each ellipse
//       currentText.style('position','absolute');
//       // currentText.style('color', '#404040');
//       currentText.style('color', '#f2f2f2');
//       currentText.style('font-family', 'Helvetica Neue');
//       currentText.id('hiddenText');
//       currentText.style('left', this.x + 'px');
//       currentText.style('top',  this.y + 'px');
//       currentText.style('opacity', 0);
//
// }


Dystopia.prototype.display = function(){
  text('☠️', this.x, this.y);
}

// Utopia.prototype.display = function(){
//   text('🕊️', this.xPos, this.yPos);
// }

// Futurism.prototype.display = function(){
//   text('🔮', this.x, this.y);
// }


function setup(){
  //1280 is pixel limit of mapbox static maps: https://www.mapbox.com/api-documentation/#retrieve-a-static-map-from-a-style
  createCanvas(1280, 720);

}

function draw(){
  background(mapImg);
  dysShow();
  // utoShow();
  for (let i = 0; i < skulls.length; i++) {
    skulls[i].display();
  }
  // for (let i = 0; i < doves.length; i++) {
  //   doves[i].display();
  // }
  welcome();
  checkHoverOverEllipses();
  displayTextIfHover();

}

// Info in upper lefthand corner
function welcome(){
  fill(255);
  textFont('Helvetica Neue');
  textSize(14);
  textStyle(ITALIC);
  let startY = 18
  text('WHAT DO WE THINK ABOUT WHEN WE THINK ABOUT THE FUTURE?', 10, startY);
  text('a live twitter visualization by Mary Notari', 10, startY+18)
  text('based on a sketch by Alden Jones', 10, startY+18+18)
  textStyle(NORMAL);
  text("one ☠️ =  one tweet containing \"dystopia\"", 10, startY+18+18 + 20);
  // text("one 🕊️ =  one tweet containing \"utopia\"", 10, startY+18+18 + 20 + 18);
  // text("one 🔮 =  one tweet containing \"futurism\"", 10, startY+18+18 + 20 + 18+ 18);
  text("# of Dystopia Tweets: " + dystopiaArray.length, 10, startY+18+18 + 20 + 18);
  // text("# of Utopia Tweets: " + dystopiaArray.length, 10, startY+18+18 + 20 + 18+ 18+ 18+ 18);
  text("seconds: " + Math.floor(millis()/1000), 10, startY+18+18 + 20 + 18 + 18);
  text("Dystopia tweets per second: " + dystopiaArray.length/Math.floor(millis()/1000), 10, startY+18+18 + 20 + 18 + 18 + 18);
}


// Draw a skull on the map
function dysShow(){
  if(dystopiaArray.length>dys){
      skulls.push(new Dystopia);
  }
  dys = dystopiaArray.length;
}

// Draw a dove on the map
// function utoShow(){
//   if(utopiaArray.length>uto){
//       doves.push(new Utopia);
//   }
//   uto = utopiaArray.length;
// }

function checkHoverOverEllipses() {
  for (let i = 0; i < ellipsesX.length; i++) {
    let distance = dist(mouseX, mouseY, ellipsesX[i], ellipsesY[i]);
    if (distance < 10) {
      ellipsesOver[i] = true;
      // console.log("ellipse over: " + i);
    } else {
      ellipsesOver[i] = false;
    }
  }
}

// function displayTextIfHover() {
//   for (let i = 0; i < ellipsesX.length; i++) {
//     if (ellipsesOver[i]) {
//       //display it
//       p[i].style('opacity', 1);
//     } else {
//       //hide it
//       p[i].style('opacity', 0);
//     }
//   }
// }

function displayTextIfHover() {
  for (let i = 0; i < ellipsesX.length; i++) {
    if (ellipsesOver[i]) {
      //display it
      d[i].style('opacity', 1);
      // u[i].style('opacity', 1);
    } else {
      //hide it
      d[i].style('opacity', 0);
      // u[i].style('opacity', 0);
    }
  }
}
