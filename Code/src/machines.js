class Machine
{
	constructor(img, upgradeLVL)
	{
		this.img = img;
		this.occupiedSlots = 0;
		this.upgradeLVL = upgradeLVL;
	}	
}

class CoffeeMachine extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(img, upgradeLVL)
	{
		super(img, upgradeLVL);
		switch(upgradeLVL)
		{
			case 0:
				CoffeeMachine.slots.add(new Slot(img.x-config.width*0.001,img.y+config.height*0.08));
			break;

			case 1:
				CoffeeMachine.slots.add(new Slot(img.x-config.width*0.015,img.y+config.height*0.08));
				CoffeeMachine.slots.add(new Slot(img.x+config.width*0.015,img.y+config.height*0.08));
			break;
				
			case 2:
				CoffeeMachine.slots.add(new Slot(img.x-config.width*0.052,img.y+config.height*0.08));
				CoffeeMachine.slots.add(new Slot(img.x-config.width*0.028,img.y+config.height*0.08));
				CoffeeMachine.slots.add(new Slot(img.x+config.width*0.034,img.y+config.height*0.08));
			break;

			case 3:
				CoffeeMachine.slots.add(new Slot(img.x-config.width*0.052,img.y+config.height*0.08));
				CoffeeMachine.slots.add(new Slot(img.x-config.width*0.028,img.y+config.height*0.08));
				CoffeeMachine.slots.add(new Slot(img.x+config.width*0.028,img.y+config.height*0.08));
				CoffeeMachine.slots.add(new Slot(img.x+config.width*0.052,img.y+config.height*0.08));
			break;
		}	
			
		
	}
}

class TableclothsPancake extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(img, upgradeLVL)
	{
		super(img, upgradeLVL);
		for(var i=0; i<upgradeLVL+1; i++)
		{

			var _img = this.img.getAt(i);	
			TableclothsPancake.slots.add(new Slot(_img.x,_img.y));
		}
	}
}

class TableclothsNoodle extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(img, upgradeLVL)
	{
		super(img, upgradeLVL);
		var heightOffset=0.045;
		switch(upgradeLVL)
		{
			case 0:
				TableclothsNoodle.slots.add(new Slot(this.img.getAt(0).x,this.img.getAt(0).y-config.height*heightOffset));
			break;

			case 1:
				TableclothsNoodle.slots.add(new Slot(this.img.getAt(0).x,this.img.getAt(0).y-config.height*heightOffset));
				TableclothsNoodle.slots.add(new Slot(this.img.getAt(1).x,this.img.getAt(1).y-config.height*heightOffset));
			break;

			case 2:
				TableclothsNoodle.slots.add(new Slot(this.img.getAt(0).x,this.img.getAt(0).y-config.height*heightOffset));
				TableclothsNoodle.slots.add(new Slot(this.img.getAt(1).x,this.img.getAt(1).y-config.height*heightOffset));
				TableclothsNoodle.slots.add(new Slot(this.img.getAt(2).x,this.img.getAt(2).y-config.height*heightOffset));
			break;

			case 3:
				TableclothsNoodle.slots.add(new Slot(this.img.getAt(0).x,this.img.getAt(0).y-config.height*heightOffset));
				TableclothsNoodle.slots.add(new Slot(this.img.getAt(1).x,this.img.getAt(1).y-config.height*heightOffset));
				TableclothsNoodle.slots.add(new Slot(this.img.getAt(2).x,this.img.getAt(2).y-config.height*heightOffset));
				TableclothsNoodle.slots.add(new Slot(this.img.getAt(3).x,this.img.getAt(3).y-config.height*heightOffset));
			break;
		}
	}
}

class Griddle extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(img, upgradeLVL)
	{
		super(img, upgradeLVL);
		Griddle.slots.add(new Slot(config.width*0.51,config.height*0.537));
		Griddle.slots.add(new Slot(config.width*0.61,config.height*0.537));
		Griddle.slots.add(new Slot(config.width*0.495,config.height*0.66));
		Griddle.slots.add(new Slot(config.width*0.623,config.height*0.66));
	}
}


class Strainer extends Machine //arregla joselu
{
	static slots = new Phaser.Structs.List();
	constructor(img, upgradeLVL)
	{
		super(img, upgradeLVL);
		var offset = 15;
		Strainer.slots.add(new Slot(img.x-offset,img.y-offset));
		Strainer.slots.add(new Slot(img.x+offset,img.y-offset));
		Strainer.slots.add(new Slot(img.x-offset,img.y+offset));
		Strainer.slots.add(new Slot(img.x+offset,img.y+offset));
	}
}