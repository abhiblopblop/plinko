var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = null;
var partdisp = [];
var plinkos = [];
var divisions =[];
var divisionHeight=300;
var score =0;
var turn = 0;
var gamestate = "play";

function setup() {
  createCanvas(480, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
       divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 40; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 15; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 40; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 15; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    

    
}
 


function draw() {
  background("green");
  textSize(20)
  text("Score : "+score,20,30);
  text("500",20,height-divisionHeight+15);
  text("500",100,height-divisionHeight+15);
  text("100",180,height-divisionHeight+15);
  text("100",260,height-divisionHeight+15);
  text("200",340,height-divisionHeight+15);
  text("250",420,height-divisionHeight+15);

  Engine.update(engine);
  ground.display();
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   if(particles!== null){
      particles.display();
      if (particles.body.position.y > height-divisionHeight-15){

         if(particles.body.position.x < 160){

            score = score+500;
         }
         if(particles.body.position.x >= 160 && particles.body.position.x < 320){

            score = score+100;
         }
         if(particles.body.position.x >= 320 && particles.body.position.x < 400){

            score = score+200;
         }
         if(particles.body.position.x >= 400 && particles.body.position.x < 480){

            score = score+250;
         }
         partdisp.push(particles);
         particles = null
         turn ++
      }

     
   }
   //game allows 20 turns
   if(turn >= 20){
      gamestate = "end";
   }
  if (partdisp.length>0){
   for (var j = 0; j < partdisp.length; j++) {
      fill(partdisp[j].color)
      ellipse(partdisp[j].body.position.x,partdisp[j].body.position.y, 10,10);
    } }
   
   for (var k = 0; k < divisions.length; k++) {
       divisions[k].display();
   }
   if(gamestate === "end"){
      textSize(30);
      fill("blue");
      text("Game over",200,300)
   }
}
function mousePressed(){
   if (gamestate !== "end" && particles === null){
   particles = new Particle(random(width/2-80, width/2+60), 10,10);
   }
}