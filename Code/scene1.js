class scene1 extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}
	
	preload()
	{
		this.load.image('spr_trashCan','assets/spr_trashCan.jpg');
		this.load.image('spr_coffeeMachine_1','assets/spr_coffeeMachine_1.png');
		// this.load.image('spr_coffeeMachine_2','assets/spr_coffeeMachine_2.png');
		// this.load.image('spr_coffeeMachine_3','assets/spr_coffeeMachine_3.png');
		// this.load.image('spr_coffeeMachine_4','assets/spr_coffeeMachine_4.png');
		this.load.image('spr_glasses','assets/spr_glasses.jpg');
		this.load.image('spr_dishes','assets/spr_dishes.jpg');
		this.load.image('spr_glass_filled','assets/spr_glass_filled.png');
		this.load.image('spr_glass_empty','assets/spr_glass_empty.jpg');
		this.load.image('spr_dish','assets/spr_dish.jpg');
		this.load.image('spr_tablecloth','assets/spr_tablecloth.jpg');
		// Animación de la cafetera dispensando el café (individual por cada dispensador): nombrado dependiente de la implementación.
		this.load.image('spr_pancake_bottle','assets/spr_pancake_bottle.jpg');
		// Botes de siropes: spr_syrup_tipoDeSirope.
		this.load.image('spr_pancake_cooking','assets/spr_pancake_cooking.jpg');
		// Animación masa haciéndose por una cara: nombrado dependiente de la implementación.
		// Animación de masa haciéndose por la otra cara: nombrado dependiente de la implementación
		this.load.image('spr_griddle','assets/spr_griddle.jpg');
		this.load.image('spr_pancake_cooked','assets/spr_pancake_cooked.png');
		this.load.image('spr_pancake_burnt','assets/spr_pancake_burnt.png');
		// this.load.image('spr_topDown_pancake', 'assets/spr_topDown_pancake.png');
		// cada sirope visto desde arriba (pantalla de echar sirope) spr_topDown_syrup_tipoDeSirope.
		// Máscaras de sirope (tantas como personajes): spr_syrup_mask_idDeLaMascara
		// Toppings (4): spr_topping_tipoDeTopping.
		/* Todas las combinaciones de tortitas posibles teniendo en cuenta las máscaras (diferentes
			formas de sirope): spr_pancake_TipoDeSirope_idDeLaMascara_Topping1.. */
		// this.load.image('spr_Catfe_background','assets/spr_Catfe_background.png');
		// this.load.image('spr_radio','assets/spr_radio.png');
		// this.load.image('spr_radio_zoomed','spr_radio_zoomed.png');
		this.load.image('client','assets/client.jpg');
	}

	create(){
		var gm = new GameManager(this);
        this.coffeeSetting();
        this.dishesSetting();
        this.pancakesSetting();
	}

	coffeeSetting()
	{
		var coffeeMachineImg = this.add.image(100, 550, 'spr_coffeeMachine_1'); coffeeMachineImg.setScale(0.2);
		var coffeeSpawnerImg = this.add.image(250, 560, 'spr_glasses'); coffeeSpawnerImg.setScale(0.15);
		var clientImg = this.physics.add.sprite(100,100, 'client'); clientImg.setScale(0.2);

		var coffeeMachine = new CoffeeMachine(4, coffeeMachineImg);
		GameManager.coffeeMachine = coffeeMachine;
		coffeeSpawnerImg.setInteractive();
        coffeeSpawnerImg.on('pointerdown', function(pointer){
        	if(Coffee.coffeeList.length < coffeeMachine.maxSlots)
        	{	
        		var slotId = findFreeSlot(coffeeMachine, CoffeeMachine.slots);
        		var pos = CoffeeMachine.slots.getAt(slotId);
        		var coffee = new Coffee(slotId);
        		changePosition(coffee, pos.x, pos.y);
        	} 
        })
	}

	dishesSetting()
	{
		var numTablecloth = 4;
		var tableclothImgList = new Phaser.Structs.List();
        for(var i=0; i<numTablecloth; i++)
        {
        	var tableclothImg = this.add.image(50 + (i*80), 450, 'spr_tablecloth'); tableclothImg.setScale(0.1);
        	tableclothImgList.add(tableclothImg);
        }
        var tableclothManager = new TableclothManager(numTablecloth, tableclothImgList);
        var dishPileImg = this.add.image(700,500,'spr_dishes'); dishPileImg.setScale(0.12);

        dishPileImg.setInteractive();
        dishPileImg.on('pointerdown', function(pointer){
        	if(GameManager.numDishes < numTablecloth)
        	{	
        		GameManager.numDishes++;
        		var slotId = findFreeSlot(tableclothManager, TableclothManager.slots);
        		var pos = TableclothManager.slots.getAt(slotId);
        		var dishImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'spr_dish'); dishImg.setScale(0.075);
        		GameManager.dishesImgs.add(dishImg);
        	} 
        })


	}

	pancakesSetting()
	{
		var pancakeSpawnerImg = this.add.image(700, 350, 'spr_pancake_bottle'); pancakeSpawnerImg.setScale(0.1);
        var griddleImg = this.add.image(480,450,'spr_griddle'); griddleImg.setScale(0.6);
        var griddle = new Griddle(4, griddleImg, 0);
        GameManager.griddle = griddle;
       	var trashCanImg = this.physics.add.sprite(600,100,'spr_trashCan'); trashCanImg.setScale(0.2);
       	GameManager.trashCanImg = trashCanImg;
        pancakeSpawnerImg.setInteractive();
        pancakeSpawnerImg.on('pointerdown', function(pointer){
        	if(griddle.occupiedSlots < griddle.maxSlots)
        	{	
        		var slotId = findFreeSlot(griddle, Griddle.slots);
        		var pos = Griddle.slots.getAt(slotId);
        		var pancake = new Pancake(trashCanImg, slotId);
      			changePosition(pancake, pos.x,pos.y);
        	} 
        })
	}

	update(time, delta)
	{
		if(Coffee.coffeeList.length > 0) 
		{
			for (var i = 0; i<Coffee.coffeeList.length; i++) 
			{
				var coffee = Coffee.coffeeList.getAt(i);
				if(coffee.countdown > 0)coffee.update(time, delta);
			}
		}

		/* Here check if the current grabbed item is colliding with something */
		if(!GameManager.grabbedItemImg) return;
		
		/* Depending on the class of the grabbed item, there should be a different behaviour */
		switch(GameManager.grabbedItemClass)
		{
			case "pancake":
				/* HOVER WITH TRASH AND DISHES */
				console.log("Pancake grabbed");
				if(checkHoverWithTrashCan()) return;

				checkHoverWithDishes();

			break;

			case "noodle":
				/* HOVER WITH TRASH AND DISHES */
				console.log("noodle grabbed");
			break;

			case "coffee":
				/* HOVER WITH CLIENTS */
				console.log("coffee grabbed");
			break;

			case  "topping":
				/* HOVER WITH ORDERS */
				console.log("Topping grabbed");
			break;

			case "syrup":
				/* HOVER WITH ORDERS */
				console.log("Syrup grabbed");
			break;

			case "dish":
				/* HOVER WITH CLIENTS */
				console.log("Dish grabbed");
			break;

			default:
				console.log("Item grabbed with no class");
			break;
		}
		

	}

	

	

}

class GameManager
{
	static scene;
	static numDishes=0;
	static coffeeMachine;
	static griddle;
	static dishesImgs = new Phaser.Structs.List();
	static clients = new Phaser.Structs.List();

	static grabbedItemImg; //pancake
	static grabbedItem; //
	static grabbedItemClass;
	static trashCanImg;

	static collidingObjectImg;
	static collidingObjectClass;

	constructor(scene)
	{
		GameManager.scene = scene;
	}

}



class Coffee
{
	static coffeeList = new Phaser.Structs.List();
	static coffeeTime = 5;
	constructor(assignedSlot)
	{
		this.img = GameManager.scene.physics.add.sprite(0,0,'spr_glass_empty');
		this.img.setScale(0.05);
		this.countdown = Coffee.coffeeTime;
		this.progress = 0;
		this.assignedSlot = assignedSlot;
		Coffee.coffeeList.add(this);
	}

	update(time, delta)
	{
		delta = delta/1000;
		this.countdown -= delta;
		
		var cookingProgress = this.countdown/Coffee.coffeeTime;
		if(cookingProgress < 1 && cookingProgress > 0.66)
		{
			this.img.angle += 1;
		}
		else if(cookingProgress < 0.66 && cookingProgress > 0.33)
		{
			this.img.angle += 3;
			this.progress = 1;
		}
		else if(cookingProgress < 0.33 && cookingProgress > 0)
		{
			this.img.angle += 10;
			this.progress = 2;
		}
		else if(cookingProgress <= 0)
		{
			this.img.angle = 0;
			this.progress = 3;
			this.img.setTexture('spr_glass_filled');
			var coffee = this;
			this.img.setInteractive({ draggable: true })
        		.on('dragstart', function(pointer, dragX, dragY){
        	})

        	this.img.on('drag', function(pointer, dragX, dragY){
        		this.setPosition(dragX, dragY);
        		grabItem("coffee", this, coffee);
        	})

        	this.img.on('dragend',() => {
				grabItem("", null, null);
				var pos = CoffeeMachine.slots.getAt(this.assignedSlot);
            	this.img.setPosition(pos.x, pos.y);
       		})
		}
	}

	deliverCoffee(clientImg, img)
	{
		img.disableBody(true,true);
		Coffee.coffeeList.remove(this);
		GameManager.coffeMachine.occupiedSlots--;
		//free the coffee slot from the coffeeMachine
		CoffeeMachine.slots.getAt(this.assignedSlot).occupied = false;
	}
	
}


class Slot
{
	constructor(x, y, occupied)
	{
		this.x = x;
		this.y = y;
		this.occupied = false;
	}	
}

class Machine
{
	constructor(maxSlots, img)
	{
		this.maxSlots = maxSlots;
		this.img = img;
		this.occupiedSlots = 0;
	}	
}

class TableclothManager extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(maxSlots, img)
	{
		super(maxSlots, img);
		for(var i=0; i<this.maxSlots; i++)
		{
			var _img = this.img.getAt(i);	
			TableclothManager.slots.add(new Slot(_img.x,_img.y,false));
		}
	}
}

class CoffeeMachine extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(maxSlots, img)
	{
		super(maxSlots, img);
		for(var i=0; i<this.maxSlots; i++)
		{
			CoffeeMachine.slots.add(new Slot(img.x+(i*20),img.y,false));
		}
	}

}

class Griddle extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(maxSlots, img)
	{
		super(maxSlots, img);
		var offset = 55;
		Griddle.slots.add(new Slot(img.x-offset,img.y-offset,false));
		Griddle.slots.add(new Slot(img.x+offset,img.y-offset,false));
		Griddle.slots.add(new Slot(img.x-offset,img.y+offset,false));
		Griddle.slots.add(new Slot(img.x+offset,img.y+offset,false));
	}
}

class Pancake
{
	static pancakeList = new Phaser.Structs.List();
	static pancakeTime = 1.5;
	constructor(trashCanImg, assignedSlot)
	{
		this.side1Done = false;
		this.side2Done = false;
		this.flipped = false;
		this.burned = false;
		this.assignedSlot = assignedSlot;
		this.img = GameManager.scene.physics.add.sprite(0,0,'spr_pancake_cooking'); this.img.setScale(0.25);

		this.collidingObject;
		this.selfRef = this;
		var pancake = this;
		this.trashCanImg = trashCanImg;
		this.sideTimer;
		this.burnTimer;

        this.originalPos;

        this.img.setInteractive();
        this.img.on('pointerdown', function(pointer){
        	pancake.flipPancake();
        });

        this.sideTimer = GameManager.scene.time.addEvent({ delay: Pancake.pancakeTime*1000, callback: this.sideDone, callbackScope: this });
        this.burnTimer = GameManager.scene.time.addEvent({ delay: Pancake.pancakeTime*2*1000, callback: this.burnPancake, callbackScope: this });
	}

	/* Called when the current side of the pancake is done */
	sideDone()
	{
		var pancake = this.selfRef;
		if(!this.side1Done)
		{
			this.side1Done = true;
		} 
		else if(this.side1Done) // The pancake is finally done
		{
			this.side2Done = true;
			
			GameManager.scene.input.setDraggable(this.img);

			this.img.on('dragstart', function(pointer,dragX,dragY){
				pancake.sideTimer.paused = true;
        		pancake.burnTimer.paused = true;	
			})

        	this.img.on('drag', function(pointer, dragX, dragY){
        		this.setPosition(dragX, dragY);
        		grabItem("pancake", this, pancake);
        	})	
			
			this.img.on('dragend',() => {
				grabItem("", null, null);				
				/* Collide with trash or dish */
				if(this.hovering)
				{
					GameManager.scene.physics.add.overlap(this.img, this.trashCanImg, this.throwFood, null, this);
					GameManager.scene.physics.add.overlap(this.img, GameManager.collidingObjectImg, this.dragToDish, null, this);
					this.hovering = false;
				}
				else
				{
					this.sideTimer.paused = false;
					this.burnTimer.paused = false;
				}			
       		})
       		
		}
		this.img.setTexture('spr_pancake_cooked');
	}

	/* Called when the user clicks on the pancake */
	flipPancake()
	{	
		if(!this.side1Done || this.flipped || this.burned) return;
	
		this.flipped = true;
		this.img.setTexture('spr_pancake_cooking');
		// reset timers
		this.sideTimer.remove(false);
        this.burnTimer.remove(false);
		this.sideTimer = GameManager.scene.time.addEvent({ delay: Pancake.pancakeTime*1000, callback: this.sideDone, callbackScope: this });
        this.burnTimer = GameManager.scene.time.addEvent({ delay: Pancake.pancakeTime*2*1000, callback: this.burnPancake, callbackScope: this });
	}

	burnPancake()
	{
		this.sideTimer.remove(false);
		this.burnTimer.remove(false);
		this.burned = true;
		var pancake = this;
		this.img.setTexture('spr_pancake_burnt');

		/* Adding interactivity events again seems to cause problems */
		if(this.side2Done) return;

		GameManager.scene.input.setDraggable(this.img);

		this.img.on('dragstart', function(pointer,dragX,dragY){
		})

        this.img.on('drag', function(pointer, dragX, dragY){
        	this.setPosition(dragX, dragY);
        	grabItem("pancake", this, pancake);
        })	
		
		this.img.on('dragend',() => {
			if(this.hovering)
			{
				GameManager.scene.physics.add.overlap(this.img, GameManager.trashCanImg, this.throwFood, null, this);
				this.hovering = false;
			} 
			else
			{
				var pos = Griddle.slots.getAt(this.assignedSlot);
           		this.img.setPosition(pos.x, pos.y); 
			}
			grabItem("", null, null);
       	})
		
	}

	dragToDish(food, dish)
	{
		dish.setAlpha(1);
		food.setPosition(dish.x,dish.y);
		food.removeInteractive();
		food.disableBody(true,true);
		/* Update order and change sprite */
		this.freeGriddle();
	}

	throwFood(food, trashCan)
	{
		trashCan.setAlpha(1);
		food.disableBody(true,true);
		this.freeGriddle();		
	}

	freeGriddle()
	{
		this.sideTimer.remove(false);
        this.burnTimer.remove(false);
		GameManager.griddle.occupiedSlots--;
		Griddle.slots.getAt(this.assignedSlot).occupied = false;
	}
}


class Topping
{
	constructor(type)
	{
		this.type = type;
		this.img;
		switch(this.type)
		{
			case 0:
				this.img = GameManager.scene.add.image(100, 550, 'spr_topping_tipoDeTopping');
			break;

			case 1:
				this.img = GameManager.scene.add.image(100, 550, 'spr_topping_tipoDeTopping');
			break;

			case 2:
				this.img = GameManager.scene.add.image(100, 550, 'spr_topping_tipoDeTopping');
			break;

			case 3:
				this.img = GameManager.scene.add.image(100, 550, 'spr_topping_tipoDeTopping');
			break;
		}
	}
}

class Syrup
{
	constructor(mask)
	{
		this.mask = mask;
	}
}

class Dish
{
	constructor()
	{
		this.occupied;
	}
}

function findFreeSlot(machine, slots)
{
	var i=0;
	var slotId = -1;
	var slot;
	var found = false;
	while(i<machine.maxSlots && !found)
	{
		slot = slots.getAt(i);
		if(!slot.occupied)
		{	
			machine.occupiedSlots++;
			slot.occupied = true;
			slotId = i;
			found = true;
		}
		i++;
	} 
	return slotId;
}

function changePosition(object, x, y)
{
	object.img.setPosition(x,y);
}

function grabItem(type, img, item)
{
	GameManager.grabbedItem = item;
	GameManager.grabbedItemImg = img;
	GameManager.grabbedItemClass = type;
}

class Fryer extends Machine
{

}

class Noodle
{

}

function checkHoverWithTrashCan()
{
	if(checkOverlap(GameManager.grabbedItemImg, GameManager.trashCanImg))
	{
		GameManager.grabbedItem.hovering = true;
		GameManager.trashCanImg.setAlpha(0.5);
		return true;
	}
	else
	{
		GameManager.trashCanImg.setAlpha(1);
	}
	return false;
}

function checkHoverWithDishes()
{
	if(GameManager.grabbedItem.burned) return;
	/* var collision is needed so that the food can only collide with one dish at a time */
	var collision = false;
	for(var i=0; i<GameManager.dishesImgs.length; i++)
	{
		if(checkOverlap(GameManager.grabbedItemImg, GameManager.dishesImgs.getAt(i)) && !collision)
		{
			collision = true;
			GameManager.collidingObjectImg = GameManager.dishesImgs.getAt(i);
			GameManager.grabbedItem.hovering = true;
			GameManager.dishesImgs.getAt(i).setAlpha(0.5);
		}
		else
		{
			GameManager.dishesImgs.getAt(i).setAlpha(1);
		}
	}
}

function checkOverlap(spriteA, spriteB)
{
	var boundsA = spriteA.getBounds();
	var boundsB = spriteB.getBounds();
	var recACenterX = boundsA.centerX;
	var recACenterY = boundsA.centerY;
	var recBCenterX = boundsB.centerX;
	var recBCenterY = boundsB.centerY;

	var decrease = 0.75;
	boundsA.height *= decrease;
	boundsB.height *= decrease;
	boundsA.width *= decrease;
	boundsB.width *= decrease;

	Phaser.Geom.Rectangle.CenterOn(boundsA, recACenterX, recACenterY);
	Phaser.Geom.Rectangle.CenterOn(boundsB, recBCenterX, recBCenterY);
	return Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB);
}

function checkHoverWithClient()
{

}

function checkHoverWithOrder()
{

}