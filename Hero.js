function Hero(name, spriteID, lvl, maxHP, hp, maxSP, sp, atk, atkSpe, speed, def, status){
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
	this.status = status;
	console.log("Hero created");
}