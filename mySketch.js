let a, b, c, d;
let rotation;
let n = 180000;
let points = [];
let distances = [];
let targets = [];
let wh;
let wind;
let direction;
function setup() {
  wh = min(windowWidth, windowHeight) / 1.8;
  const canvas = createCanvas(wh, wh);
  canvas.parent('canvas-container');
  a = random(20, 50);
  b = random(0.01, 0.03);
  c = random(0, PI * 2);
  d = random(-0.1, 0.1);
  rotation = random(PI / 5, PI / 4);
  direction = rotation - PI*3 / 4;
  for (let i = 0; i < n; i++) {
    let p = createVector(random(0, wh * 1.4), random(-wh / 0.8, wh / 0.8));
    points.push(p);
    let result = findMinimumDistance(p.x, p.y, a, b, c, d);
    let randomRoot = random(1);
    let chance = 2.718 ** (-9.99*(result.distance / wh))
    if (randomRoot ** 1.3 > chance) {
      points.pop(p);
      // print(result.distance / wh)
    }
  }
  // console.log(points.length);
}

function draw() {
  wind=noise(frameCount*0.1);
  let windX=wind*cos(direction);
  let windY=wind*sin(direction);
  background(255);
  rotate(rotation);
  // for (let i = 0; i < wh * 1.5; i++) {
  //   point(i, a * sin(b * i + c) + d);
  // }
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    strokeWeight(3);
    let darkness=random(0.79,0.85)
		
    stroke(50*darkness, 45*darkness, 30*darkness);
    point(p.x, p.y);
    let result = findMinimumDistance(p.x, p.y, a, b, c, d);
    let factor = (result.distance / wh)
     d-=wind/100000
    p.x+=windX * factor;
    p.y+=windY * factor
    if (p.y<-wh*0.95){p.y=wh}
  }
  // console.log(points[1].y)
}

//Math Pack
function sineWave(x, A, B, C, D) {
  return A * Math.sin(B * x + C) + D;
}

function distanceSquared(x, x0, y0, A, B, C, D) {
  return (x - x0) ** 2 + (sineWave(x, A, B, C, D) - y0) ** 2;
}

function findMinimumDistance(x0, y0, A, B, C, D) {
  let minDistance = Infinity;
  let minX = x0;
  let minY = y0;
  let step = 5; // Step size for the x value iteration
  let tolerance = 1e-6; // Tolerance for change in distance for stopping the iteration

  for (let x = x0 - 100; x < x0 + 100; x += step) {
    let distSquared = distanceSquared(x, x0, y0, A, B, C, D);
    if (distSquared < minDistance) {
      minDistance = distSquared;
      minX = x;
      minY = sineWave(x, A, B, C, D);
    }
  }

  return { distance: Math.sqrt(minDistance), x: minX, y: minY };
}
function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas('Dune_Jiaqi_Yi', 'png');}
