var robin,robinrun,robinjump;
var bg,bgimg,ground;
var rb,score,time,lives=5;
var inst,instbg,go,goimg,go2,go2img;
var laser1,laser1img,laser2,laser2img,lasers=10;
var obstacle,ob1,ob2,ob3;
var monster,monster1,monster2;
var coin,coinimg,coincount=0;
var coingroup,enemygroup,obsgroup,lasergroup;
var start=1,play=2,end=3,gamestate=start;

var hi=localStorage["HighestScore"] = 0;

function preload()
{
robinrun=loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png");
  robinjump=loadAnimation("6.png")
  bgimg=loadImage("bg.jpg");
  
  instbg=loadImage("neon2.jpg")
  
  laser1img=loadImage("laser4.png")
  laser2img=loadImage("laser5.png")
  
  ob1=loadImage("obs1.png");
  ob2=loadImage("obs3.png");
  ob3=loadImage("obs4.png");
  
  monster1=loadImage("monster1.png");
  monster2=loadImage("monster2.png");
  
  coinimg=loadImage("coin.png")
  
  goimg=loadImage("neon.jpg")
  go2img=loadImage("gameover.png")
}

function setup() 
{
  createCanvas(1050,735)
  
  bg=createSprite(525,367.5)
  bg.addImage("background",bgimg)
  bg.scale=1.5;
  
   robin=createSprite(150,500,20,20);
  robin.addAnimation("run",robinrun)
  robin.scale=0.7;
  
  ground=createSprite(525,620,1050,3);
  ground.visible=false;
  
      inst=createSprite(525,367.5,1050,735);
      inst.addImage(instbg)
      inst.scale=2.1

  
  
  coingroup= new Group();
  enemygroup= new Group();
  obsgroup= new Group();
  lasergroup= new Group();

}

function draw() {
  background("white");
  
        inst.visible=false;
  if(gamestate===start)
    {
        inst.visible=true
      if(keyDown("ENTER")&&gamestate===start)
        {
          gamestate=play;
        }
      if(touches.length>0 &&gamestate===start)
        {
          gamestate=play;
          touches=[]
        }
    }
  
    if(gamestate===play)
      {
         
      
  bg.velocityX=-6-time/10;
  if(bg.x<525)
    {
      bg=createSprite(bg.x+1030,367.5)
      bg.addImage("background",bgimg)
      bg.scale=1.5;
      bg.depth=robin.depth-1;
      bg.lifetime=500;
    }
        
    if(keyDown("SPACE") && robin.collide(ground))
      {
        robin.velocityY=-20;

      }
    if(touches.length>0 && robin.collide(ground))
      {
        robin.velocityY=-20;
        touches=[]
      }
          robin.velocityY=robin.velocityY+0.8;
        
        
            obs();
            coins();
            monsters();
        
        if(keyWentDown("s") && lasers>0)
          {
              laserbeam();
            lasers=lasers-1;
          }
        
        if(lasergroup.isTouching(enemygroup))
          {
            enemygroup.destroyEach();
          }
        
        if(robin.isTouching(coingroup))
          {
            coincount=coincount+5;
            coingroup.destroyEach();
          }
        
        if(robin.isTouching(enemygroup) || robin.isTouching(obsgroup))
          {
            lives=lives-1
            enemygroup.destroyEach();
            obsgroup.destroyEach();
            
          }
        
       if(lives<1)
           {
             gamestate=end ;
             go=createSprite(525,367.5);
             go.addImage("game over",goimg)
             go.scale=2.1
             go2=createSprite(545,200);
             go2.addImage("gameover",go2img)
             go2.scale=0.7
             
          if(hi<score)
          {
            hi = score;
          }


           }
      
      }
      

  robin.collide(ground);
  
     if(keyDown("space")&&gamestate===end)
       {
         go.destroy();
         go2.destroy();
         time=0;
        lives=5;
          lasers=10;
            score=0
        gamestate=start
         }
     if(touches.length>0 && gamestate===end)
       {
         go.destroy();
         go2.destroy();
         time=0;
        lives=5;
          lasers=10;
            score=0
        gamestate=start;
         touches=[]
         }

  
 drawSprites();
  
      time=Math.ceil(frameCount/frameRate());

  
  if(gamestate===play)
    {
    score=Math.round((coincount+time)/2)
      fill("yellow");
      textSize(40)
       rb=text("Survival Time : " + time,650,50)
        text("Lasers : "+ lasers,70,650)
      text("Health : "+ lives,650,650)
      text("Score : "+score, 100,100)
    }
  if(gamestate===end)
    {textAlign(CENTER)
      fill("yellow");
      textSize(30)
      text("Well Played !",525,400)
      text("You score was : "+ score,525,450)
       text("Highest Score : "+ hi,525,500)
     text("Press 'Space' to restart.",525,550)
    }


}

function laserbeam()
{
    laser1=createSprite(500,robin.y-23);
  laser1.addImage("laserbegin",laser1img);
  laser1.scale=0.2
 // laser1.depth=robin.depth-1;


  laser2=createSprite(310,robin.y-20);
  laser2.addImage("laserbegin",laser2img);
  laser2.scale=0.5;
 // laser2.depth=robin.depth-1;

  
    laser1.velocityX=40
    laser2.velocityX=40
  
     laser1.lifetime=200;    
     laser1.lifetime=200;
  
      lasergroup.add(laser1,laser2)
}

function obs()
{

  
  if(frameCount%150===0)
    {
        var rand = Math.round(random(1,3));
      
        obstacle=createSprite(1060,600)

        obstacle.velocityX=-6-time/10;

        obstacle.lifetime=500
      
      switch (rand)
        {
          case 1 :    obstacle.addImage("obs",ob1);
                      obstacle.scale=0.07;
                      break;
          case 2 :    obstacle.addImage("obs",ob2);
                      obstacle.scale=0.25;
                      obstacle.y=580
                      break;
          case 3 :    obstacle.addImage("obs",ob3);
                      obstacle.scale=0.5;
                      obstacle.y=580;
                      break;
        }
      obsgroup.add(obstacle);
    }

}

function coins()
{
    if(frameCount%100===0)
    {
      coin=createSprite(1050,Math.round(random(200,500)))
      coin.addImage("coins",coinimg);
      coin.scale=0.1;
      coin.velocityX=-6-time/10
      coin.lifetime=500;
      coingroup.add(coin);
    }
      
}

function monsters()
{
  if(frameCount%400===0)
    {
      monster=createSprite(1060,500)
      monster.velocityX=-6-time/10
      monster.lifetime=500;
      
      var rand=Math.round(random(1,2))
      
      switch (rand)
        {
          case 1: monster.addImage("monsters",monster1)
                  monster.scale=0.3
                  monster.y=520
                  break;
          case 2: monster.addImage("monsters",monster2)
                  monster.scale=0.2
                  monster.y=520
                  break;
        }
      enemygroup.add(monster);
    }
          
}