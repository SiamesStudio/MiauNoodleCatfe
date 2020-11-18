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
	static animTime;
	static slots = new Phaser.Structs.List();
	static animImgs = new Phaser.Structs.List();
	static anims = new Phaser.Structs.List();
	constructor(img, upgradeLVL, tutorial)
	{
		super(img, upgradeLVL);
		this.resetVars();
		console.log("animImgs.LENGTH: " + CoffeeMachine.animImgs.length);
		console.log("COFFEE MACHINE CREATED: " + upgradeLVL);
		if(!tutorial)CoffeeMachine.animTime = Math.abs(GameManager.scene.playerSettings.upgrades.coffeeTime - Coffee.coffeeTime);
		else {CoffeeMachine.animTime = Coffee.coffeeTime;}

		switch(upgradeLVL)
		{
			case 0:
				CoffeeMachine.slots.add(new Slot(img.x-config.width*0.001,img.y+config.height*0.08));
				
				CoffeeMachine.animImgs.add(GameManager.scene.physics.add.sprite(
				CoffeeMachine.slots.getAt(0).x,CoffeeMachine.slots.getAt(0).y-config.height*0.07,'anim_coffeeMachine'));
			break;

			case 1:
				CoffeeMachine.slots.add(new Slot(img.x-config.width*0.011,img.y+config.height*0.08));
				CoffeeMachine.slots.add(new Slot(img.x+config.width*0.007,img.y+config.height*0.08));
				
				CoffeeMachine.animImgs.add(GameManager.scene.physics.add.sprite(
				CoffeeMachine.slots.getAt(0).x,CoffeeMachine.slots.getAt(0).y-config.height*0.05,'anim_coffeeMachine'));
				CoffeeMachine.animImgs.add(GameManager.scene.physics.add.sprite(
				CoffeeMachine.slots.getAt(1).x,CoffeeMachine.slots.getAt(1).y-config.height*0.05,'anim_coffeeMachine'));
			break;
				
			case 2:
				CoffeeMachine.slots.add(new Slot(img.x-config.width*0.05,img.y+config.height*0.08));
				CoffeeMachine.slots.add(new Slot(img.x-config.width*0.029,img.y+config.height*0.08));
				CoffeeMachine.slots.add(new Slot(img.x+config.width*0.034,img.y+config.height*0.08));
			
				CoffeeMachine.animImgs.add(GameManager.scene.physics.add.sprite(
				CoffeeMachine.slots.getAt(0).x,CoffeeMachine.slots.getAt(0).y-config.height*0.05,'anim_coffeeMachine'));
				CoffeeMachine.animImgs.add(GameManager.scene.physics.add.sprite(
				CoffeeMachine.slots.getAt(1).x,CoffeeMachine.slots.getAt(1).y-config.height*0.05,'anim_coffeeMachine'));
				CoffeeMachine.animImgs.add(GameManager.scene.physics.add.sprite(
				CoffeeMachine.slots.getAt(2).x,CoffeeMachine.slots.getAt(2).y-config.height*0.07,'anim_coffeeMachine'));
			break;

			case 3:

				CoffeeMachine.slots.add(new Slot(img.x-config.width*0.05,img.y+config.height*0.08));
				CoffeeMachine.slots.add(new Slot(img.x-config.width*0.029,img.y+config.height*0.08));
				CoffeeMachine.slots.add(new Slot(img.x+config.width*0.0267,img.y+config.height*0.08));
				CoffeeMachine.slots.add(new Slot(img.x+config.width*0.046,img.y+config.height*0.08));

				CoffeeMachine.animImgs.add(GameManager.scene.physics.add.sprite(
				CoffeeMachine.slots.getAt(0).x,CoffeeMachine.slots.getAt(0).y-config.height*0.05,'anim_coffeeMachine'));
				CoffeeMachine.animImgs.add(GameManager.scene.physics.add.sprite(
				CoffeeMachine.slots.getAt(1).x,CoffeeMachine.slots.getAt(1).y-config.height*0.05,'anim_coffeeMachine'));
				CoffeeMachine.animImgs.add(GameManager.scene.physics.add.sprite(
				CoffeeMachine.slots.getAt(2).x,CoffeeMachine.slots.getAt(2).y-config.height*0.05,'anim_coffeeMachine'));
				CoffeeMachine.animImgs.add(GameManager.scene.physics.add.sprite(
				CoffeeMachine.slots.getAt(3).x,CoffeeMachine.slots.getAt(3).y-config.height*0.05,'anim_coffeeMachine'));
			break;
		}	
		
		for(var i=0; i<CoffeeMachine.slots.length; i++)
		{
			var animationKey = 'coffeeStream_' + i;
			var animation = GameManager.scene.anims.create({
    			key: animationKey,
    			frames: GameManager.scene.anims.generateFrameNumbers('anim_coffeeMachine', { start: 0, end: 19}),
    			duration: 1000*CoffeeMachine.animTime,
    			//frameRate: 10,
    			repeat: -1
			});

			var animIdleKey = 'coffeeStreamIdle_' + i;
			GameManager.scene.anims.create({
    			key: animIdleKey,
    			frames: [ { key: 'anim_coffeeMachine', frame: 0 } ],
    			frameRate: 20
			});

			CoffeeMachine.animImgs.getAt(i).setAlpha(0);
		}
		
	}

	resetVars()
	{
		CoffeeMachine.slots.removeAll();
		CoffeeMachine.animImgs.removeAll();
		CoffeeMachine.anims.removeAll();
	}

	static playAnim(coffeeId)
	{
		var animKey = 'coffeeStream_' + coffeeId;
		CoffeeMachine.animImgs.getAt(coffeeId).setAlpha(1);
		CoffeeMachine.animImgs.getAt(coffeeId).anims.play(animKey); 
	}

	static stopAnim(coffeeId)
	{
		var animKey = 'coffeeStreamIdle_' + coffeeId;
		CoffeeMachine.animImgs.getAt(coffeeId).setAlpha(0);
		CoffeeMachine.animImgs.getAt(coffeeId).anims.play(animKey); 
	}
}

class TableclothsPancake extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(img, upgradeLVL)
	{
		super(img, upgradeLVL);
		this.resetVars();
		for(var i=0; i<upgradeLVL+1; i++)
		{
			var _img = this.img.getAt(i);	
			TableclothsPancake.slots.add(new Slot(_img.x,_img.y));
		}
	}

	resetVars()
	{
		TableclothsPancake.slots.removeAll();
	}
}

class TableclothsNoodle extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(img, upgradeLVL)
	{
		super(img, upgradeLVL);
		this.resetVars();
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

	resetVars()
	{
		TableclothsNoodle.slots.removeAll();
	}
}

class Griddle extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(img, upgradeLVL)
	{
		super(img, upgradeLVL);
		this.resetVars();
		Griddle.slots.add(new Slot(config.width*0.51,config.height*0.537));
		Griddle.slots.add(new Slot(config.width*0.61,config.height*0.537));
		Griddle.slots.add(new Slot(config.width*0.495,config.height*0.66));
		Griddle.slots.add(new Slot(config.width*0.623,config.height*0.66));
	}

	resetVars()
	{
		Griddle.slots.removeAll();
	}
}


class Strainer extends Machine //arregla joselu
{
	static slots = new Phaser.Structs.List();
	constructor(img, upgradeLVL)
	{
		super(img, upgradeLVL);
		this.resetVars();
		Strainer.slots.add(new Slot(img.x-config.width*0.06,img.y-config.height*0.11));
		Strainer.slots.add(new Slot(img.x+config.width*0.027,img.y-config.height*0.11));
		Strainer.slots.add(new Slot(img.x-config.width*0.04,img.y-config.height*0.055));
		Strainer.slots.add(new Slot(img.x+config.width*0.04,img.y-config.height*0.055));
	}

	resetVars()
	{
		Strainer.slots.removeAll();
	}
}