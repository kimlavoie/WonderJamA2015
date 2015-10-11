function Ennemy(name, spriteID, hp, atk, atkSpe, speed, def){
	this.name = name;
	this.spriteID = spriteID;
	this.hp = hp;
	this.atk = atk;
	this.atkSpe = atkSpe;
	this.speed = speed;
	this.def = def;
	console.log("Ennemy created");
}

function createEnnemy(id){
	switch(id){
		case 0:
			return new Ennemy('Un Nom','slimeV1',40,5,3,3,4);
		break;
		case 1:
			return new Ennemy('Un Autre','slimeV1',40,6,4,4,2);
		break;
		case 2:
			return new Ennemy('Un Hahahaha','slimeV1',40,6,4,4,2);
		break;
		case 3:
			return new Ennemy('Un Trololol','slimeV1',40,6,4,4,2);
		break;
		
	}
}
