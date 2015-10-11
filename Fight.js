function Fight(ennemiesArray, qstage, heroesArray, inventory){
    this.state = "new";
    this.onCreate = function(){};
    this.onResume = function(){};
    this.updateCollisions = function(){};
    this.onUpdate = function(){};
	var fightEnnemies = [];
	var stage = qstage;
    this.setStage = function(stage2){stage = stage2;};
	var hit = new createjs.Shape();
	var heroesArray = heroesArray;
	var inventory = inventory;
	
	var heroesActionList = [null,null,null];
	var ennemiesActionList = [];
	var state = 0;
	
	var numHeroAlive = 3;
	var numEnnemyAlive;
	
	var te = [];
	function init(){
		for(i=0;i < ennemiesArray.length;i++){
			fightEnnemies.push(createEnnemy(ennemiesArray[i]));
		}
		var fightMenu = new createjs.Bitmap(ImageManager.getImage("fightMenu"));
		fightMenu.y = 330;
		stage.addChild(new createjs.Bitmap(ImageManager.getImage("bg")), fightMenu);
		stage.update();
		
		numEnnemyAlive = fightEnnemies.length;
		
		for(i=0;i<heroesArray.length;i++){
			te.push(new createjs.Text(heroesArray[i].name, 'bold 20px Arial', '#FFF'));
				hit.graphics.beginFill("#000").drawRect(0, 0, te[i].getMeasuredWidth(), te[i].getMeasuredHeight());
				te[i].hitArea = hit;
			te[i].y = 350 + (i*30);
			te[i].x = 170;
			te[i].name = i;
			stage.addChild(te[i]);
			stage.update();
			te[i].addEventListener("click", handleClick);
		}
	}
	
	var ennemiesSprites = [];
	function placeEnnemies(){
		console.log("size fightEnnemies "+fightEnnemies.length);
		for(i=0;i<fightEnnemies.length;i++){
			stage.removeChild(ennemiesSprites[i]);
			if(fightEnnemies[i].hp > 0){
				ennemiesSprites.push(new createjs.Bitmap(ImageManager.getImage(fightEnnemies[i].spriteID)));
				ennemiesSprites[i].x = i===0||i===1?225:25;
				ennemiesSprites[i].y = i===0||i===2?50:175;
				ennemiesSprites[i].name = i;
				stage.addChild(ennemiesSprites[i]);
				stage.update();
			}else{
				var cpt = 0;
				for(i=0;i<fightEnnemies.length;i++){
					if(fightEnnemies[i].hp > 0)
						cpt++;
				}
				numEnnemyAlive = cpt;
			}
		}
	}
	
	function updateStats(){
		var stats = [];
		if(heroesArray[0].hp>0 && heroesArray[1].hp>0 && heroesArray[2].hp>0){
			numHeroAlive = 3;
		}else if(	heroesArray[0].hp>0 && heroesArray[1].hp>0 && heroesArray[2].hp<=0
				|| 	heroesArray[0].hp>0 && heroesArray[1].hp<=0 && heroesArray[2].hp>0
				||	heroesArray[0].hp<=0 && heroesArray[1].hp>0 && heroesArray[2].hp>0){
			numHeroAlive = 2;
		}else if(	heroesArray[0].hp>0 && heroesArray[1].hp<=0 && heroesArray[2].hp<=0
				|| 	heroesArray[0].hp<=0 && heroesArray[1].hp<=0 && heroesArray[2].hp>0
				||	heroesArray[0].hp<=0 && heroesArray[1].hp>0 && heroesArray[2].hp<=0){
			numHeroAlive = 1;
		}else{
			numHeroAlive = 0;
		}
		for(i=0; i<3; i++){
			stage.removeChild(stage.getChildByName('stats'+i));
			if(heroesArray[i].hp<=0){
				heroesArray[i].hp = 0;
				heroesArray[i].status = 'dead';
				te[i].removeAllEventListeners("click");
				te[i].color = '#AAA';
				heroesActionList[i] = -1;
			}
				
			stats.push(new createjs.Text('HP '+ heroesArray[i].hp + ' / ' + heroesArray[i].maxHP + '    -    SP ' + heroesArray[i].sp + ' / ' + heroesArray[i].maxSP,'bold 20px Arial', '#FFF'));
			stats[i].x = 320;
			stats[i].y = 350 + (i*30);
			stats[i].name = 'stats' + i;
			stage.addChild(stats[i]);
			stage.update();
		}
	}
	
	var p = [];
	function placePlayers(){
		for(i=0;i<3;i++){
			stage.removeChild(stage.getChildByName(heroesArray[i].name));
			if(heroesArray[i].status === 'alive'){
				p[i] = new createjs.Bitmap(ImageManager.getImage(heroesArray[i].spriteID));
				p[i].name = heroesArray[i].name;
				p[i].x = 550;
				p[i].y = 150 + (i*50);
				stage.addChild(p[i]);
				stage.update();
			}
		}
	}
	
	function handleClick(event){
		var heroIndex = event.currentTarget.name;
		var targ;
		if(targ = stage.getChildByName('attack'))
			targ.removeAllEventListeners("click");
		if(targ = stage.getChildByName('attackSpe'))
			targ.removeAllEventListeners("click");
		if(targ = stage.getChildByName('items'))
			targ.removeAllEventListeners("click");
		if(targ = stage.getChildByName('run'))
			targ.removeAllEventListeners("click");
		stage.removeChild(stage.getChildByName('attack'));
		stage.removeChild(stage.getChildByName('attackSpe'));
		stage.removeChild(stage.getChildByName('items'));
		stage.removeChild(stage.getChildByName('run'));
		te[0].color = (te[0].color==="#AAA")?"#AAA":"#FFF";
		te[1].color = (te[1].color==="#AAA")?"#AAA":"#FFF";
		te[2].color = (te[2].color==="#AAA")?"#AAA":"#FFF";
		event.currentTarget.color="#FF0000";
		stage.update();
		
		var attack = new createjs.Text('Attack','bold 20px Arial', '#FFF');
			hit.graphics.beginFill("#000").drawRect(0, 0, attack.getMeasuredWidth(), attack.getMeasuredHeight());
			attack.hitArea = hit;
		var attackSpe = new createjs.Text('Attack Spe','bold 20px Arial','#FFF');
			hit.graphics.beginFill("#000").drawRect(0, 0, attackSpe.getMeasuredWidth(), attackSpe.getMeasuredHeight());
			attackSpe.hitArea = hit;
		var items = new createjs.Text('Potion','bold 20px Arial','#FFF');
			hit.graphics.beginFill("#000").drawRect(0, 0, items.getMeasuredWidth(), items.getMeasuredHeight());
			items.hitArea = hit;
		var run = new createjs.Text('Run','bold 20px Arial','#FFF');
			hit.graphics.beginFill("#000").drawRect(0, 0, run.getMeasuredWidth(), run.getMeasuredHeight());
			run.hitArea = hit;
		attack.x = 20;
		attack.y = 350;
		attack.name = 'attack';
		attack.addEventListener("click", handleClick);
		attackSpe.x = 20;
		attackSpe.y = 380;
		attackSpe.name = 'attackSpe';
		if(heroesArray[heroIndex].sp >= 5){
			attackSpe.addEventListener("click", handleClick);
		}else{
			attackSpe.color = "#AAA";
		}
		items.x = 20;
		items.y = 410;
		items.name = 'items';
		if(inventory.potionHP > 0){
			items.addEventListener("click", handleClick);
		}else{
			items.color = "#AAA";
		}
		run.x = 20;
		run.y = 440;
		run.name = 'run';
		run.addEventListener("click", handleClick);
		stage.addChild(attack,attackSpe,items,run);
		stage.update();
		
		function handleClick(event){
			attack.color = "#FFF";
			attackSpe.color = attackSpe.color==="#AAA"?"#AAA":"#FFF";
			items.color = items.color==="#AAA"?"#AAA":"#FFF";
			run.color = "#FFF";
			event.currentTarget.color = "#FF0000";
			
			var actionName = event.currentTarget.name;
			//console.log(event.currentTarget);
			if(actionName === 'attack'){
				for(i=0;i<ennemiesSprites.length;i++){
					ennemiesSprites[i].addEventListener("click", handleClick);
				}
			}else if(actionName === 'attackSpe'){
				heroesActionList[heroIndex] = 5;
				if(targ = stage.getChildByName('attack'))
					targ.removeAllEventListeners("click");
				if(targ = stage.getChildByName('attackSpe'))
					targ.removeAllEventListeners("click");
				if(targ = stage.getChildByName('items'))
					targ.removeAllEventListeners("click");
				if(targ = stage.getChildByName('run'))
					targ.removeAllEventListeners("click");
				stage.removeChild(stage.getChildByName('attack'));
				stage.removeChild(stage.getChildByName('attackSpe'));
				stage.removeChild(stage.getChildByName('items'));
				stage.removeChild(stage.getChildByName('run'));
			}else if(actionName === 'items'){
				heroesActionList[heroIndex] = 6;
				if(targ = stage.getChildByName('attack'))
					targ.removeAllEventListeners("click");
				if(targ = stage.getChildByName('attackSpe'))
					targ.removeAllEventListeners("click");
				if(targ = stage.getChildByName('items'))
					targ.removeAllEventListeners("click");
				if(targ = stage.getChildByName('run'))
					targ.removeAllEventListeners("click");
				stage.removeChild(stage.getChildByName('attack'));
				stage.removeChild(stage.getChildByName('attackSpe'));
				stage.removeChild(stage.getChildByName('items'));
				stage.removeChild(stage.getChildByName('run'));
			}else if(actionName === 'run'){
				console.log("huhrun");
			}else{
				console.log("fail");
			}
			
			function handleClick(event){
				var ennemyIndex = event.currentTarget.name
				console.log(heroesArray[heroIndex].name + " attack " + fightEnnemies[ennemyIndex].name);
				var targ;
				if(targ = stage.getChildByName('attack'))
					targ.removeAllEventListeners("click");
				if(targ = stage.getChildByName('attackSpe'))
					targ.removeAllEventListeners("click");
				if(targ = stage.getChildByName('items'))
					targ.removeAllEventListeners("click");
				if(targ = stage.getChildByName('run'))
					targ.removeAllEventListeners("click");
				stage.removeChild(stage.getChildByName('attack'));
				stage.removeChild(stage.getChildByName('attackSpe'));
				stage.removeChild(stage.getChildByName('items'));
				stage.removeChild(stage.getChildByName('run'));
				for(i=0;i<ennemiesSprites.length;i++){
					ennemiesSprites[i].removeAllEventListeners();
				}
				stage.update();
				
				heroesActionList[heroIndex] = ennemyIndex;
				console.log(heroesActionList);
			}
		}
	}
	
	var atkOrderEnnemies;
	var atkOrderHeroes;
	function fightUpdate(event){
		
		switch(state){
			case 0: //init
				console.log("init");
				init();
				state++;
			break;
			case 1: //playerTurn
				console.log("playerTurn");
				updateStats();
				placeEnnemies();
				placePlayers();
				if(numHeroAlive === 0)
					state = 9;
				else if(/*heroesActionList.length === numHeroAlive && */heroesActionList[0] !== null && heroesActionList[1] !== null && heroesActionList[2] !== null)
					state++;
			break;
			case 2: //ennemyTurn
				console.log("ennemyTurn");
				for(i=0;i<ennemiesArray.length;i++){
					ennemiesActionList[i] = Math.floor(Math.random()*3);
					while(heroesArray[ennemiesActionList[i]].hp <= 0)
						ennemiesActionList[i] = Math.floor(Math.random()*3);
				}
				if(numEnnemyAlive === 0)
					state = 8;
				else
					state++;
			break;
			case 3: //PrepareAttack
				console.log("PrepareAttack");
				if(numEnnemyAlive === 1){
					for(j=0;j<fightEnnemies.length;j++){
						if(fightEnnemies[j].hp > 0)
							atkOrderEnnemies = [j];
					}
				}else if(fightEnnemies[0].hp <= 0){
					fightEnnemies[1].hp <= 0?atkOrderEnnemies = [2]:atkOrderEnnemies = [1];
					for(i=fightEnnemies[1].hp <= 0?3:2;i<fightEnnemies.length;i++){
						if(fightEnnemies[i].hp > 0){
							if(fightEnnemies[i].speed > fightEnnemies[i-1].speed)
								atkOrderEnnemies.unshift(i);
							else
								atkOrderEnnemies.push(i);
						}
					}
				}else{
					atkOrderEnnemies = [0];
					for(i=1;i<fightEnnemies.length;i++){
						if(fightEnnemies[i].hp > 0){
							if(fightEnnemies[i].speed > fightEnnemies[i-1].speed)
								atkOrderEnnemies.unshift(i);
							else
								atkOrderEnnemies.push(i);
						}
					}
				}
				
				console.log(atkOrderEnnemies);
				
				if(heroesArray[0].status !== 'alive'){
					atkOrderHeroes = [1];
					for(j=2;j<3;j++){
						if(heroesArray[j].status === 'alive'){
							if(heroesArray[j].speed > heroesArray[j-1].speed)
								atkOrderHeroes.unshift(j);
							else
								atkOrderHeroes.push(j);
						}
					}
				}else{
					atkOrderHeroes = [0];
					for(j=1;j<3;j++){
						if(heroesArray[j].status === 'alive'){
							if(heroesArray[j].speed > heroesArray[j-1].speed)
								atkOrderHeroes.unshift(j);
							else
								atkOrderHeroes.push(j);
						}
					}
				}
				if(numHeroAlive === 1){
					for(i=0;i<3;i++){
						if(heroesArray[i].hp > 0)
							atkOrderHeroes = [i];
					}
				}
				console.log(atkOrderHeroes);
				state++;
			break;
			case 4:
				var rect = new createjs.Shape();
				rect.graphics.beginFill("#FFF").drawRect(0, 0, 640, 480);
				rect.alpha = 0;
				stage.addChild(rect);
				stage.update();
				console.log("Attack");
				if(atkOrderEnnemies.length === 0 && atkOrderHeroes.length !== 0){
					if(heroesActionList[atkOrderHeroes[0]] === 5){
						console.log("Spe");
						heroesArray[atkOrderHeroes[0]].sp -= 5;
						for(i=0;i<fightEnnemies.length;i++){
							var damage = Math.floor(heroesArray[atkOrderHeroes[0]].atkSpe*1.6)-fightEnnemies[i].def;
							//console.log("ennemy damage: " + damage);
							fightEnnemies[i].hp -= damage;
						}
						createjs.Tween.get(rect).to({alpha:1}, 0).to({alpha:0}, 700).wait(500).call(onAnimationComplete);
						createjs.Ticker.removeEventListener("tick", fightUpdate);
					}else if(heroesActionList[atkOrderHeroes[0]] === 6){
						console.log("potion");
						heroesArray[atkOrderHeroes[0]].hp += 20;
						inventory.potionHP -= 1;
						if(heroesArray[atkOrderHeroes[0]].hp > heroesArray[atkOrderHeroes[0]].maxHP)
							heroesArray[atkOrderHeroes[0]].hp = heroesArray[atkOrderHeroes[0]].maxHP;
					}else{
						var damage = Math.floor(heroesArray[atkOrderHeroes[0]].atk*2)-fightEnnemies[heroesActionList[atkOrderHeroes[0]]].def;
						//console.log("ennemy damage: " + damage);
						fightEnnemies[heroesActionList[atkOrderHeroes[0]]].hp -= damage;
						createjs.Tween.get(p[atkOrderHeroes[0]]).to({x:200}, 500).to({x:525}, 500).call(onAnimationComplete);
						createjs.Ticker.removeEventListener("tick", fightUpdate);
					}
					atkOrderHeroes.reverse();
					atkOrderHeroes.pop();
					if(atkOrderHeroes.length !== 0)
						atkOrderHeroes.reverse();
				}else if(atkOrderHeroes.length === 0 && atkOrderEnnemies.length !== 0){
					var damage = Math.floor(fightEnnemies[atkOrderEnnemies[0]].atk*2)-heroesArray[ennemiesActionList[atkOrderEnnemies[0]]].def;
					//console.log("Hero damage: " + damage);
					heroesArray[ennemiesActionList[atkOrderEnnemies[0]]].hp -= damage;
					console.log(atkOrderEnnemies[0]);
					createjs.Tween.get(ennemiesSprites[atkOrderEnnemies[0]]).to({x:450}, 500).to({x:atkOrderEnnemies[0]===0||atkOrderEnnemies[0]===1?170:50}, 500).call(onAnimationComplete);
					createjs.Ticker.removeEventListener("tick", fightUpdate);
					atkOrderEnnemies.reverse();
					atkOrderEnnemies.pop();
					if(atkOrderEnnemies.length !== 0)
						atkOrderEnnemies.reverse();
				}else if(atkOrderEnnemies.length === 0 && atkOrderHeroes.length === 0){
					console.log("-----HP ennemies-------");
					for(i=0;i<4;i++){
						console.log(": "+fightEnnemies[i].hp);
					}
					console.log("-----------------------");
					heroesActionList = [null,null,null];
					te[0].color = "#FFF";
					te[1].color = "#FFF";
					te[2].color = "#FFF";
					state = 1;
				}else{
					if(fightEnnemies[atkOrderEnnemies[0]].speed > heroesArray[atkOrderHeroes[0]]){
						var damage = Math.floor(fightEnnemies[atkOrderEnnemies[0]].atk*2)-heroesArray[ennemiesActionList[atkOrderEnnemies[0]]].def;
						//console.log("Hero damage: " + damage);
						heroesArray[ennemiesActionList[atkOrderEnnemies[0]]].hp -= damage;
						console.log(atkOrderEnnemies[0]);
						createjs.Tween.get(ennemiesSprites[atkOrderEnnemies[0]]).to({x:450}, 500).to({x:atkOrderEnnemies[0]===0||atkOrderEnnemies[0]===1?170:50}, 500).call(onAnimationComplete);
						createjs.Ticker.removeEventListener("tick", fightUpdate);
						atkOrderEnnemies.reverse();
						atkOrderEnnemies.pop();
						if(atkOrderEnnemies.length !== 0)
							atkOrderEnnemies.reverse();
					}else{
						if(heroesActionList[atkOrderHeroes[0]] === 5){
							console.log("Spe");
							heroesArray[atkOrderHeroes[0]].sp -= 5;
							for(i=0;i<fightEnnemies.length;i++){
								var damage = Math.floor(heroesArray[atkOrderHeroes[0]].atkSpe*1.6)-fightEnnemies[i].def;
								//console.log("ennemy damage: " + damage);
								fightEnnemies[i].hp -= damage;
							}
							createjs.Tween.get(rect).to({alpha:1}, 0).to({alpha:0}, 700).wait(500).call(onAnimationComplete);
							createjs.Ticker.removeEventListener("tick", fightUpdate);
						}else if(heroesActionList[atkOrderHeroes[0]] === 6){
							console.log("potion");
							heroesArray[atkOrderHeroes[0]].hp += 20;
							inventory.potionHP -= 1;
							if(heroesArray[atkOrderHeroes[0]].hp > heroesArray[atkOrderHeroes[0]].maxHP)
								heroesArray[atkOrderHeroes[0]].hp = heroesArray[atkOrderHeroes[0]].maxHP;
						}else{
							var damage = Math.floor(heroesArray[atkOrderHeroes[0]].atk*2)-fightEnnemies[heroesActionList[atkOrderHeroes[0]]].def;
							//console.log("ennemy damage: " + damage);
							fightEnnemies[heroesActionList[atkOrderHeroes[0]]].hp -= damage;
							createjs.Tween.get(p[atkOrderHeroes[0]]).to({x:200}, 500).to({x:525}, 500).call(onAnimationComplete);
							createjs.Ticker.removeEventListener("tick", fightUpdate);
						}
						atkOrderHeroes.reverse();
						atkOrderHeroes.pop();
						if(atkOrderHeroes.length !== 0)
							atkOrderHeroes.reverse();
					}
				}		
			break;
			case 8: //won battle
			
			break;
			case 9: //gameOver
			
			break;
		}
		
		function onAnimationComplete(event){
			 createjs.Ticker.addEventListener("tick", fightUpdate);
		}
	}
	
	//fightUpdate();
	createjs.Ticker.addEventListener("tick", stage);
	createjs.Ticker.addEventListener("tick", fightUpdate);
}
