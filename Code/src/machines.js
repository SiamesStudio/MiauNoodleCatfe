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
		for(var i=0; i<upgradeLVL+1; i++)
		{
			CoffeeMachine.slots.add(new Slot(img.x+(i*8),img.y));
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
		for(var i=0; i<this.upgradeLVL+1; i++)
		{
			var _img = this.img.getAt(i);	
			TableclothsNoodle.slots.add(new Slot(_img.x,_img.y));
		}
	}
}

class Griddle extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(img, upgradeLVL)
	{
		super(img, upgradeLVL);
		var offset = 15;
		Griddle.slots.add(new Slot(img.x-offset,img.y-offset));
		Griddle.slots.add(new Slot(img.x+offset,img.y-offset));
		Griddle.slots.add(new Slot(img.x-offset,img.y+offset));
		Griddle.slots.add(new Slot(img.x+offset,img.y+offset));
	}
}


class Strainer extends Machine
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