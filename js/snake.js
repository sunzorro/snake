	 	$(function(){
	 	var home = $('#home');
	 	var main = $('#main');
	 	var snakeArr = [];
	 	var direction = "l";
	 	var rows = 32;
	 	var cols = 32;
	 	var timer = "";
	 	var food = [];
	 	var die = false;
	 	var score = 0;
	 	var speed = 200;
	 	var stop = false;
	 	var snakeWidth = parseInt(document.body.offsetWidth /32);
	 	var snakeScreenWidth = parseInt(window.screen.width /32);
	 	
	 	home.css({"height":snakeWidth * 32 +"px","width":snakeWidth * 32+"px"});
	 	main.css({"height":snakeWidth * 32+"px","width":snakeWidth * 32+"px"});	 	
	 	//创造蛇 
	 	for (var i = 0; i <  4; i++) {
	 		var snakeDiv =$('<div class="snakeDiv" style="background:url(./images/snake'+ i +'.png) no-repeat; z-index:99;background-size:100% 100%;"></div>');

	 		home.append(snakeDiv);
	 		snakeArr[i] = {r : 14,c : 13 + i,div : snakeDiv,d : direction};
	 		setPostion(snakeArr[i]);
	 	}
	 	$('#res').click(function(){
	 		location.reload();
	 	})
	 	$('#start').click(function(){
	 		if (die) {
	 			alert('请点击重玩');
	 		};
	 		clearInterval(timer);
	 		move();

	 		pause();
	 	})
	 	function pause(){
	 		$('#stops').click(function(){
		 		if(!stop){
		 			clearInterval(timer);
		 			stop = true;
		 		}else{
		 			move();
		 			stop = false; 
		 		}
		 	})
		 }



	 	$("#lowSpeed").click(function() {
	 		speed  += 10;
	 		clearInterval(timer);
	 		
	 		if (speed > 500) {
	 			speed = 500;

	 		};
	 		move(speed);
	 		console.log(speed)

	 	});
	 	$("#addSpeed").click(function() {
	 		speed -= 10;
	 		clearInterval(timer);
	 		if (speed < 100) {
	 			speed = 100; 
	 		}
	 		move(speed);
	 		console.log(speed);
	 	});
	 	//蛇移动
	 	function move(){
			timer = setInterval(function(){
	 			for (var i = snakeArr.length-1; i > 0;i--) {
	 				snakeArr[i].r = snakeArr[i-1].r;
	 				snakeArr[i].c = snakeArr[i-1].c;
	 				snakeArr[i].d = snakeArr[i-1].d;
	 			}
	 			switch(direction){
	 				case "l" : snakeArr[0].c--;snakeArr[0].d = 'l';break;
	 				case "t" : snakeArr[0].r--;snakeArr[0].d = 't';break;
	 				case "r" : snakeArr[0].c++;snakeArr[0].d = 'r';break;
	 				case "b" : snakeArr[0].r++;snakeArr[0].d = 'b';break;
	 			}
	 			$(window).keydown(function(event){
	 				switch(event.keyCode){
	 					case 37 : direction = "l";break;
	 					case 38 : direction = "t";break;
	 					case 39 : direction = "r";break;
	 					case 40 : direction = "b";break;

	 				}

	 			})
	 			 $('#top').on('click',function(){
			    	direction = "t";
			    })
			    $('#left').on('click',function(){
			    	direction = "l";
			    })
			    $('#right').on('click',function(){
			    	direction = "r";
			    })                         
			    $('#bottom').on('click',function(){
			    	direction = "b";
			    })
	 			for (var i = 0; i < snakeArr.length; i++) {
	 				setPostion(snakeArr[i]);
	 			}
	 			//蛇撞墙
	 			if (snakeArr[0].c < 0 || snakeArr[0].r < 0 || snakeArr[0].c >= cols || snakeArr[0].r >= rows) {
	 					clearInterval(timer);
	 				die = true;
	 				alert("请点击“重玩”,失败的原因是您撞墙了...");
	 			}
	 			//撞自己
	 			for (var i = 1; i < snakeArr.length; i++) {
	 				if (snakeArr[0].c == snakeArr[i].c && snakeArr[0].r == snakeArr[i].r) {
	 					
	 				
	 				clearInterval(timer);
	 				die = true;
	 				alert("请点击“重玩”,失败的原因是您撞到自己了...");
	 				// $('#start').off("click")
	 				}
	 			}
	 			//蛇吃食物
	 			if(snakeArr[0].r == food[0].r && snakeArr[0].c == food[0].c){
	 				food[0].div.css({background : 'url("./images/snake2.png") 0% 0% / 100% 100% no-repeat'});
	 				snakeArr.splice(snakeArr.length-1,0,food[0]);
	 				food.shift();
	 				score += 10;
	 				$('#score').html('<span>得分:</span>' + score)
	 	
	 				if (score >= 100){
	 					clearInterval(timer);
	 					//遍历数组
	 					for (var i = 0; i < snakeArr.length; i++) {
	 						$('#snakeOver').show();
	 						$('#snakeOver').append(snakeArr[i].div);
	 						//把吃掉食物后的位置以及div传入给snakeArr数组
	 						snakeArr[i] = {r : 12,c : 0+i, div : snakeArr[i].div}
	 						restPostion(snakeArr[i]);
	 					};

	 				}

	 			}
	 			if(food.length == 0 && score < 100){
	 				createFood();
	 			}
	 			
	 		},speed)
	 	}

	 	//创造食物
	 	function createFood(){
	 		var r = parseInt(Math.random()*rows)
	 		var c = parseInt(Math.random()*cols)
	 		var crash = false;
	 		while(food.length == 0){
	 			for (var i = 0; i < snakeArr.length; i++) {
		 			if (c == snakeArr[i].c &&  r == snakeArr[i].r) {
		 				crash = true;
		 			}
	 			}
		 		if(!crash){
		 			var i = parseInt(4 * Math.random());
		 			var foodDiv = $('<div style="background:url(./images/coins' + i + '.png) no-repeat; z-index:999;background-size:100% 100%;" id="xx'+i+'"></div>')
		 			
		 			home.append(foodDiv);
		 			food.push({r : r, c : c, div : foodDiv})
		 			setPostion(food[0])
		 		}
	 		}
	 		
	 	}
		
	 	//设置初始位置
	 	function setPostion(obj){
	 		obj.div.css({left : obj.c * snakeWidth ,top : obj.r *snakeWidth ,width : snakeWidth,height :  snakeWidth });
	 		obj.div.removeClass().addClass(obj.d)
	 	}
	 		//设置蛇吃完的位置
	 	function restPostion(obj){
	 		obj.div.css({left : obj.c * snakeWidth ,top :0});
	 	}
	 	createFood();
	})
