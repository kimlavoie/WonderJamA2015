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
		case 1:
			return new Ennemy('Un Nom','ennemySprite1',50,5,3,3,4);
		break;
		case 2:
			return new Ennemy('Un Autre','ennemySprite2',40,6,4,4,2);
		break;
		case 3:
			return new Ennemy('Un Hahahaha','ennemySprite3',40,6,4,4,2);
		break;
		case 4:
			return new Ennemy('Un Trololol','ennemySprite4',40,6,4,4,2);
		break;
		
	}
}