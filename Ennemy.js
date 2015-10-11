function Ennemy(name, spriteID, hp, atk, atkSpe, speed, def, exp){
	this.name = name;
	this.spriteID = spriteID;
	this.hp = hp;
	this.atk = atk;
	this.atkSpe = atkSpe;
	this.speed = speed;
	this.def = def;
	this.exp = exp;
	console.log("Ennemy created");
}

function createEnnemy(id){
	switch(id){
		case 0:
			return new Ennemy('SlimeV1','slimeV1',30,3,1,3,2,2);
		break;
		case 1:
			return new Ennemy('SlimeV2','slimeV2',35,4,1,4,3,3);
		break;
		case 2:
			return new Ennemy('SlimeV3','slimeV3',40,6,4,2,3,4);
		break;
		case 3:
			return new Ennemy('SlimeV4','slimeV4',50,6,4,4,4,5);
		break;
		case 4:
			return new Ennemy('SlimeP1','slimeP1',60,6,3,4,5,7);
		break;
		case 5:
			return new Ennemy('SlimeP2','slimeP2',70,7,4,4,2,8);
		break;
		case 6:
			return new Ennemy('SlimeP3','slimeP3',80,8,4,5,6,9);
		break;
		case 7:
			return new Ennemy('SlimeP4','slimeP4',90,9,4,5,7,10);
		break;
		case 8:
			return new Ennemy('Boss1','boss1',80,8,4,4,5,20);
		break;
		case 9:
			return new Ennemy('Boss2','boss1',150,13,4,7,10,35);
		break;
	}
}
