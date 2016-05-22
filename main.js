
$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
    
	
	var cw = 10;
	var d;
	var food;
	var bait;
	var trap2;
	var score;
	var trap;
	var hiScore = 0;
	
	var snakeArray;
	
	function init()
	{
		d = "right"; 
		createSnake();
		createFood();
		score = 0;
		hiScore = hiScore;
		if(typeof game_loop != "undefined") 
		clearInterval(game_loop);
		
		game_loop = setInterval(paint, 60);
	}	
	init();
	
	function createSnake(){
		var length = 3;
		snakeArray = [];
		for(var i = length-1; i>=0; i--)
		{
			snakeArray.push({x:i, y:0});
		}
	}
	
	
	function createFood()
	{
		food = {
			x: Math.round(Math.random()*(w-cw)/cw), 
			y: Math.round(Math.random()*(h-cw)/cw), 
		};
		placeTrap();
		placeBait();
		placeTrap2();

	}
	
	function placeTrap()
	{
		trap = {
			x: Math.round(Math.random()*(w-cw)/cw), 
			y: Math.round(Math.random()*(h-cw)/cw), 
		};
		
		if(trap.x == food.x && trap.y == food.y)
		{
		trap.x += 2;
		trap.y += 2;
		}
	}
	
	function placeBait()
	{
	 var k = Math.round(Math.random()*3);
	 var c = true;
	 while (c == true)
	 {
	 if(k == 0)
	 {
	   bait = { x: trap.x + 1,
	   			y: trap.y,
	   			};
	   			c = false;
	   	// this is supposed to switch the bait around so it's on screen if it's
	   	// ever off screen not 100% sure it works though.
	   	// what with the placement being random its hard to test it.
	   	if(bait.x < 0 || bait.y < 0 || bait.x > h || bait.y > w)
	   	{
	   	k++;
	   	c = true;
	   	}
	 }
	  if(k == 1)
	 {
	   bait = { x: trap.x - 1,
	   			y: trap.y,
	   			};
	   			c = false;
	   	if(bait.x < 0 || bait.y < 0 || bait.x > 350 || bait.y > 350)
	   	{
	   	k++;
	   	c = true;
	   	}
	 }
	  if(k == 2)
	 {
	   bait = { x: trap.x ,
	   			y: trap.y + 1,
	   			};
	   			c = false;
	   	if(bait.x < 0 || bait.y < 0 || bait.x > 350 || bait.y > 350)
	   	{
	   	k++;
	   	c = true;
	   	}
	 }
	  if(k == 3)
	 {
	   bait = { x: trap.x ,
	   			y: trap.y - 1,
	   			};
	   			c = false;
	   	if(bait.x < 0 || bait.y < 0 || bait.x > 350 || bait.y > 350)
	   	{
	   	k = 0;
	   	c = true;
	   	}
	 }
	 }
	
	}
	function placeTrap2()
	{
	 var k = Math.round(Math.random()*3);
	 p = true;
	 while(p == true)
	 {
	 if(k == 0)
	 {
	   trap2 = { x: bait.x + 1,
	   			y: bait.y,
	   			};
	   			p = false;
	   	if(trap2.x == bait.x && trap2.y == bait.y)
	   	{
	   	k++;
	   	p = true;
	   	}
	 }
	  if(k == 1)
	 {
	   trap2 = { x: bait.x - 1,
	   			y: bait.y,
	   			};
	   			p = false;
	   	if(trap2.x == bait.x && trap2.y == bait.y)
	   	{
	   	k++;
	   	p = true;
	   	}
	 }
	if(k == 2)
	 {
	   trap2 = { x: bait.x ,
	   			y: bait.y + 1,
	   			};
	   			p = false;
	   	if(trap2.x == bait.x && trap2.y == bait.y)
	   	{
	   	k++;
	   	p = true;
	   	}
	 }
	  if(k == 3)
	 {
	   trap2 = { x: bait.x ,
	   			y: bait.y - 1,
	   			};
	   			p = false;
	   	if(trap2.x == bait.x && trap2.y == bait.y)
	   	{
	   	k = 0;
	   	p = true;
	   	}
	 }
	}
	}
	
	function paint()
	{
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		var nx = snakeArray[0].x;
		var ny = snakeArray[0].y;
		
		if(d == "right")
		 nx++;
		 
		else if(d == "left")
		 nx--;
		 
		else if(d == "up")
		 ny--;
		 
		else if(d == "down") 
		ny++;
		
		if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw ||
		 checkCollision(nx,ny,snakeArray) || (nx == trap.x && ny == trap.y) ||
		 (nx == trap2.x && ny == trap2.y))
		{
		if(hiScore < score)
		{
		hiScore = score;
		}
		init();
		return;
		}
		
		if(nx == food.x && ny == food.y)
		{
			var tail = {x: nx, y: ny};
			score += 5;
			createFood();
		}
		else if(nx == bait.x && ny == bait.y)
		{
			var tail = {x: nx, y: ny};
			score += 15;
			bait.x = -5;
			bait.y = -5;
		}
		else
		{
			var tail = snakeArray.pop(); 
			tail.x = nx; tail.y = ny;
		}
		
		snakeArray.unshift(tail); 
		for(var i = 0; i < snakeArray.length; i++)
		{
			var c = snakeArray[i];
			paintCell(c.x,c.y);
			
		}
		
		    paintCell(food.x,food.y);
		    paintCell(bait.x,bait.y);
		    paintCell3(trap2.x,trap2.y);
		    paintCell3(trap.x,trap.y);
			var scoreText = "Score: " + score;
			var hiScoreText = "HiScore: " + hiScore;
			ctx.fillText(scoreText,5,h-5);
			ctx.fillText(hiScoreText, 155, h - 340);		
		
	}
	
	function paintCell(x, y)
	{
		ctx.fillStyle = "yellow";
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle = "black";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}
	
	function paintCell2(x, y)
	{
		ctx.fillStyle = "red";
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle = "black";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}
	
	function paintCell3(x, y)
	{
		ctx.fillStyle = "green";
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle = "yellow";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}
	
	
	function checkCollision(x, y, array)
	{
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}
	
	
	$(document).keydown(function(e){
		var key = e.which;
		if(key == "37" && d !="right")
		 d = "left";
		 
		else if(key == "38" && d !="down") 
		 d ="up";
		 
		else if(key == "39" && d !="left")
		 d ="right";
		 
		else if(key == "40" && d !="up")
		 d ="down";
		})
		
	
	})