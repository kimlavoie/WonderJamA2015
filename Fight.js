var fightEnnemies = [];

function Fight(ennemiesArray){
	
	for(i=0;i < ennemiesArray.length;i++){
		fightEnnemies.push(createEnnemy(ennemiesArray[i]));
	}
	console.log("Fight created");
	var fightMenu = new createjs.Bitmap(ImageManager.getImage("fightMenu"));
	//fightMenu.y = 330;
	stage.addChild(fightMenu);
	var te = [];
	var baseX = 370;
	for(i=0;i<fightEnnemies/*herosArray*/.length;i++){
		//te.push(new Text(fightEnnemies/*herosArray*/[i].name, 'bold 20px Arial', '#FFFFFF'));
		//te[i].y = baseX + (i*40);
		//te[i].x = 10;
		//stage.addChild(te[i]);
	}
	//heroClick(null);
	//draw enenmies on map
	var ennemiesSprites = [];
	var baseEX = 200;
	var baseEY = 50;
	for(i=0;i<fightEnnemies.length;i++){
		//ennemiesSprites.push(fightEnnemies[i].spriteID);
		//ennemiesSprites[i].x = baseEX - ((i%2)*100);
		//ennemiesSprites[i].y = baseEY + ((i%2)*120);
		//stage.addChild(ennemiesSprites[i]);
		//console.log(fightEnnemies[i].spriteID);
		//console.log(document.getElementById('ennemySprite1'));
	}
}

function deleteFight(){
	fightEnnemies = [];
}

/*function heroClick(hero){
	var attack = new Text('Attack','bold 20px Arial', '#FFFFFF');
	var attackSpe = new Text('Attack Spe','bold 20px Arial','#FFFFFF');
	var items = new Text('Items','bold 20px Arial','#FFFFFF');
	var run = new Text('Run','bold 20px Arial','#FFFFFF');
	attack.x = 160;
	attack.y = 370;
	attackSpe.x = 160;
	attackSpe.y = 400;
	items.x = 160;
	items.y = 430;
	run.x = 160;
	run.y = 460;
	stage.addChild(attack,attackSpe,items,run);
}*/