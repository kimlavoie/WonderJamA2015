function Hero(name, spriteID, lvl, maxHP, hp, maxSP, sp, atk, atkSpe, speed, def, xp, status){
	this.name = name;
	this.spriteID = spriteID;
	this.lvl = lvl;
	this.maxHP = maxHP;
	this.hp = hp;
	this.maxSP = maxSP;
	this.sp = sp;
	this.atk = atk;
	this.atkSpe = atkSpe;
	this.speed = speed;
	this.def = def;
	this.xp = xp;
	this.status = status;
	console.log("Hero created");
}

var heroes = (function(){
	var heroesArray = [];
	heroesArray.push(new Hero("Jordan", "battleJordan", 1, 30, 30, 10, 10, 10, 5, 5, 6, 0, 'alive'));
	heroesArray.push(new Hero("Vero", "battleVero", 1, 25, 25, 15, 15, 7, 8, 4, 7, 0, 'alive'));
	heroesArray.push(new Hero("Kim", "battleKim", 1, 35, 35, 11, 11, 8, 5, 4, 8, 0, 'alive'));
	
	return heroesArray;
})();

function giveExp(exp){
	for(i=0;i<3;i++){
		heroes[i].exp += exp;
	}
	checkLvlup();
}

function checkLvlup(){
	switch(heroes[0].lvl){
		case 1:
			if(heroes[0] >= 10)
				lvlup();
		break;
		case 2:
			if(heroes[0] >= 15)
				lvlup();
		break;
		case 3:
			if(heroes[0] >= 25)
				lvlup();
		break;
		case 4:
			if(heroes[0] >= 50)
				lvlup();
		break;
		case 5:
			if(heroes[0] >= 100)
				lvlup();
		break;
		case 6:
			if(heroes[0] >= 175)
				lvlup();
		break;
	}
	
	function lvlup(){
		for(i=0;i<3;i++){
			heroes[i].lvl ++;
			heroes[i].maxHP += 5;
			heroes[i].hp = heroesArray[i].maxHP;
			heroes[i].maxSP += 2;
			heroes[i].sp = heroesArray[i].maxSP;
			heroes[i].atk += 2;
			heroes[i].atkSpe += 2;
			heroes[i].speed += 1;
			heroes[i].def += 1;
			heroes[i].xp = 0;
		}
	}
}