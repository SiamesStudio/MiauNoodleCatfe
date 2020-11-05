class scene1 extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}
	
	preload()
	{
		this.loadCoffeeScreen();
		this.loadNoodleScreen();
	}

	loadCoffeeScreen()
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
		this.load.image('spr_topping_galleta','assets/spr_topping_galleta.png');
		this.load.image('spr_topping_oreo','assets/spr_topping_oreo.png');
		this.load.image('spr_topping_fresa','assets/spr_topping_fresa.png');
		this.load.image('spr_topping_platano','assets/spr_topping_platano.png');
		this.load.image('spr_syrup_caramel','assets/spr_syrup_caramel.jpg');
		this.load.image('spr_syrup_chocolate','assets/spr_syrup_chocolate.jpg');
		this.load.image('spr_syrup_maple','assets/spr_syrup_maple.jpg');
		/* Todas las combinaciones de tortitas posibles teniendo en cuenta las máscaras (diferentes
			formas de sirope): spr_pancake_TipoDeSirope_idDeLaMascara_Topping1.. */
		// this.load.image('spr_Catfe_background','assets/spr_Catfe_background.png');
		// this.load.image('spr_radio','assets/spr_radio.png');
		// this.load.image('spr_radio_zoomed','spr_radio_zoomed.png');
		this.load.image('client','assets/client.jpg');
	}

	loadNoodleScreen()
	{
		this.load.image('spr_noodles','assets/spr_noodles.jpg');
		this.load.image('spr_noodles_cooking','assets/spr_noodles_cooking.png');
		this.load.image('spr_strainer','assets/spr_strainer.jpg');
		// Animación de hervir: nombrado dependiente de la implementación.
		this.load.image('spr_noodles_cooked','assets/spr_noodles_cooked.png');
		this.load.image('spr_noodles_burnt','assets/spr_noodles_burnt.png');
		// REPEATED?¿ this.load.image('spr_tableCloth','assets/spr_tableCloth.png');
		this.load.image('spr_bowl','assets/spr_bowl.jpg');
		this.load.image('spr_bowls','assets/spr_bowls.jpg');
		this.load.image('spr_sauce_bbq','assets/spr_sauce_bbq.jpg');
		this.load.image('spr_sauce_mustard','assets/spr_sauce_mustard.jpg');
		this.load.image('spr_sauce_algerienne','assets/spr_sauce_algerienne.jpg');
		this.load.image('spr_ladre','assets/spr_ladre.jpg');
		// Animación del cucharón echando cada salsa. (3 en total): nombrado dependiente de la implementación
		//this.load.image('spr_topping_platano','assets/spr_topping_platano.png');
		//this.load.image('spr_topping_fresa','assets/spr_topping_fresa.png');
		//this.load.image('spr_topping_oreo','assets/spr_topping_oreo.png');
		//this.load.image('spr_topping_galleta','assets/spr_topping_galleta.png');
		/* 
		Todas las combinaciones de noodles posibles ya cocinados: spr_noodles_Salsa_Topping1..
		Fondo animado de calle: animación de gente caminando por la calle: nombrado dependiente de la implementación.
		Fondo animado de calle: animación de la iluminación desde la mañana hasta la noche:
		nombrado dependiente de la implementación.
		Animación de parpadeo del cartel de open neón: nombrado dependiente de la implementación
		*/
	}

	create(){
		var gm = new GameManager(this);
        this.coffeeSetting();
        this.pancakesSetting();
        this.noodlesSetting();
        //var clientImg = this.physics.add.sprite(100,100, 'client'); clientImg.setScale(0.2);
        //GameManager.clients.add(clientImg);
        this.cursors = this.input.keyboard.createCursorKeys();
	}

	coffeeSetting()
	{
		this.cameras.main.on('camerafadeoutcomplete', function (camera) {
            camera.fadeIn(100);
        });

		var coffeeMachineImg = this.add.image(config.width*0.05, config.height*0.92, 'spr_coffeeMachine_1'); coffeeMachineImg.setScale(0.05);

		var coffeeSpawnerImg = this.add.image(config.width*0.05, config.height*0.8, 'spr_glasses'); coffeeSpawnerImg.setScale(0.03);
		//var test = this.add.image(config.width/2 + config.width, config.height/2 , 'spr_glasses'); test.setScale(0.15);

		var coffeeMachine = new CoffeeMachine(4, coffeeMachineImg);
		GameManager.coffeeMachine = coffeeMachine;
		coffeeSpawnerImg.setInteractive();
        coffeeSpawnerImg.on('pointerdown', function(pointer){
        	if(coffeeMachine.occupiedSlots < coffeeMachine.maxSlots)
        	{	
        		var slotId = findFreeSlot(coffeeMachine, CoffeeMachine.slots);
        		var pos = CoffeeMachine.slots.getAt(slotId);
        		var coffee = new Coffee(slotId);
        		changePosition(coffee, pos.x, pos.y);
        	} 
        })
	}

	pancakesSetting()
	{
		var numTablecloth = 4;
		var tableclothImgList = new Phaser.Structs.List();
        for(var i=0; i<numTablecloth; i++)
        {
        	var tableclothImg = this.add.image(config.width*0.075 + (i*42), config.height*0.65, 'spr_tablecloth'); tableclothImg.setScale(0.047);
        	tableclothImgList.add(tableclothImg);
        }
        var tableclothCoffee = new TableclothsCoffee(numTablecloth, tableclothImgList);
        var dishPileImg = this.add.image(config.width*0.95, config.height*0.6,'spr_dishes'); dishPileImg.setScale(0.03);

        dishPileImg.setInteractive();
        dishPileImg.on('pointerdown', function(pointer){
        	if(GameManager.dishImgContainerCoffee.length < numTablecloth)
        	{	
        		var slotId = findFreeSlot(tableclothCoffee, TableclothsCoffee.slots);
        		var pos = TableclothsCoffee.slots.getAt(slotId);
        		var dishImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'spr_dish'); dishImg.setScale(0.04);
        		GameManager.dishImgContainerCoffee.add(new DishImgContainer(dishImg));
        	} 
        })

		var pancakeSpawnerImg = this.add.image(config.width*0.935, config.height*0.8, 'spr_pancake_bottle'); pancakeSpawnerImg.setScale(0.03);
        var griddleImg = this.add.image(config.width*0.65, config.height*0.6,'spr_griddle'); griddleImg.setScale(0.15);
        var griddle = new Griddle(4, griddleImg, 0);
        GameManager.griddle = griddle;
       	var trashCanImg = this.physics.add.sprite(config.width*0.94, config.height*0.12,'spr_trashCan'); trashCanImg.setScale(0.043);
       	GameManager.trashCanImgPancake = trashCanImg;
        pancakeSpawnerImg.setInteractive();
        pancakeSpawnerImg.on('pointerdown', function(pointer){
        	if(griddle.occupiedSlots < griddle.maxSlots)
        	{	
        		var slotId = findFreeSlot(griddle, Griddle.slots);
        		var pos = Griddle.slots.getAt(slotId);
        		var pancake = new Pancake(slotId);
      			changePosition(pancake, pos.x,pos.y);
        	} 
        })
        
        for(var i = 0; i<4; i++)
		{
			var topping = new Topping(i, 0);
		}
		
		for(var i=0; i<3; i++)
		{
			var syrup = new Syrup(i);
		}
	}

	noodlesSetting()
	{
		var noodleSpawnerImg = this.add.image(config.width*0.935 + config.width, config.height*0.8, 'spr_noodles'); noodleSpawnerImg.setScale(0.02);
        var strainerImg = this.add.image(config.width*0.7 + config.width, config.height*0.6,'spr_strainer'); strainerImg.setScale(0.2);
        var strainer = new Strainer(4, strainerImg, 0);
        GameManager.strainer = strainer;
       	var trashCanImgNoodles = this.physics.add.sprite(config.width*0.94 + config.width, config.height*0.12,'spr_trashCan'); trashCanImgNoodles.setScale(0.043);
       	
       	GameManager.trashCanImgNoodles = trashCanImgNoodles;
        noodleSpawnerImg.setInteractive();
        noodleSpawnerImg.on('pointerdown', function(pointer){
        	if(strainer.occupiedSlots < strainer.maxSlots)
        	{	
        		var slotId = findFreeSlot(strainer, Strainer.slots);
        		var pos = Strainer.slots.getAt(slotId);
        		var noodles = new Noodles(slotId);
      			changePosition(noodles, pos.x,pos.y);
        	} 
        })

        var numTablecloth = 4;
		var tableclothImgList = new Phaser.Structs.List();
        for(var i=0; i<numTablecloth; i++)
        {
        	var tableclothImg = this.add.image(config.width*0.075 + config.width + (i*42), config.height*0.65, 'spr_tablecloth'); tableclothImg.setScale(0.047);
        	tableclothImgList.add(tableclothImg);
        }
        var tableclothCoffee = new TableclothsNoodle(numTablecloth, tableclothImgList);
        var dishPileImg = this.add.image(config.width*0.95 + config.width, config.height*0.6,'spr_dishes'); dishPileImg.setScale(0.03);
        
        dishPileImg.setInteractive();
        dishPileImg.on('pointerdown', function(pointer){
        	if(GameManager.dishImgContainerNoodles.length < numTablecloth)
        	{	
        		var slotId = findFreeSlot(tableclothCoffee, TableclothsNoodle.slots);
        		var pos = TableclothsNoodle.slots.getAt(slotId);
        		var dishImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'spr_dish'); dishImg.setScale(0.04);
        		GameManager.dishImgContainerNoodles.add(new DishImgContainer(dishImg));
        	} 
        })

        for(var i = 0; i<4; i++)
		{
			var topping = new Topping(i, config.width);
		}

		for(var i=0; i<3; i++)
		{
			var sauce = new Sauce(i, config.width);
		}   
	}

	update(time, delta)
	{
		var cam = this.cameras.main;
	
    	if (Phaser.Input.Keyboard.JustDown(this.cursors.left))
    	{
    	    cam.centerOnX(config.width/2);
            GameManager.scene.cameras.main.fadeOut(25);

    	}
    	else if (Phaser.Input.Keyboard.JustDown(this.cursors.right))
    	{
    	    cam.centerOnX(config.width + config.width/2);
    	    GameManager.scene.cameras.main.fadeOut(25);
    	}

		if(!GameManager.grabbedItemImg) return;
		
		/* Here check if the current grabbed item is colliding with something 
		Depending on the class of the grabbed item, there should be a different behaviour */
		switch(GameManager.grabbedItemClass)
		{
			case "pancake":
				console.log("Pancake grabbed");
				if(checkHoverWithTrashCan()) return;
				checkHoverWithDishes();
			break;

			case "noodles":
				console.log("Noodles grabbed");
				if(checkHoverWithTrashCan()) return;
				checkHoverWithDishes();
			break;

			case "coffee":
				//Pienso que este caso va a desaparecer y ser fusionado con dish
				console.log("Coffee grabbed");
				//checkHoverWithClient();
			break;

			case "topping":
				console.log("Topping grabbed");
				checkToppingHoverWithDish();
			break;

			case "syrup":
				console.log("Syrup grabbed");
				checkSauceAndSyrupHover();
			break;

			case "dish":
				console.log("Dish grabbed");
				checkHoverWithClient();
			break;

			case "sauce":
				console.log("Sauce grabbed");
				checkSauceAndSyrupHover();
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
	static maxUpgrades=4;
	static coffeeMachine;
	static griddle;
	static strainer;
	static dishImgContainerCoffee = new Phaser.Structs.List();
	static dishImgContainerNoodles = new Phaser.Structs.List();
	static clients = new Phaser.Structs.List();

	static grabbedItemImg; //pancake
	static grabbedItem; //
	static grabbedItemClass;
	static trashCanImgPancake;
	static trashCanImgNoodles;

	static collidingObjectImg;
	static collidingObject;

	constructor(scene)
	{
		GameManager.scene = scene;
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

class CoffeeMachine extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(maxSlots, img)
	{
		super(maxSlots, img);
		for(var i=0; i<this.maxSlots; i++)
		{
			CoffeeMachine.slots.add(new Slot(img.x+(i*8),img.y,false));
		}
	}

}

class TableclothsCoffee extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(maxSlots, img)
	{
		super(maxSlots, img);
		for(var i=0; i<this.maxSlots; i++)
		{
			var _img = this.img.getAt(i);	
			TableclothsCoffee.slots.add(new Slot(_img.x,_img.y,false));
		}
	}
}

class TableclothsNoodle extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(maxSlots, img)
	{
		super(maxSlots, img);
		for(var i=0; i<this.maxSlots; i++)
		{
			var _img = this.img.getAt(i);	
			TableclothsNoodle.slots.add(new Slot(_img.x,_img.y,false));
		}
	}
}

class Griddle extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(maxSlots, img)
	{
		super(maxSlots, img);
		var offset = 15;
		Griddle.slots.add(new Slot(img.x-offset,img.y-offset,false));
		Griddle.slots.add(new Slot(img.x+offset,img.y-offset,false));
		Griddle.slots.add(new Slot(img.x-offset,img.y+offset,false));
		Griddle.slots.add(new Slot(img.x+offset,img.y+offset,false));
	}
}

class Coffee
{
	static coffeeTime = 1;
	constructor(assignedSlot)
	{
		this.index = 0;
		this.img = GameManager.scene.physics.add.sprite(0,0,'spr_glass_empty');
		this.img.setScale(0.015);
		this.assignedSlot = assignedSlot;
		this.hovering = false;
		this.done = false;
		this.timer = GameManager.scene.time.addEvent({ delay: Coffee.coffeeTime*1000, callback: this.coffeeDone, callbackScope: this });
	}

	coffeeDone()
	{
		this.done = true;
		makeImgInteractive("coffee",this.img, this);
		this.img.setTexture('spr_glass_filled');
	}

	dragEndBehaviour()
	{
		var pos = CoffeeMachine.slots.getAt(this.assignedSlot);
        this.img.setPosition(pos.x, pos.y);
        grabItem("",null,null);
	}

	deliverCoffee(clientImg, img)
	{
		img.disableBody(true,true);
		Coffee.coffeeList.remove(this);
		GameManager.coffeeMachine.occupiedSlots--;
		//free the coffee slot from the coffeeMachine
		CoffeeMachine.slots.getAt(this.assignedSlot).occupied = false;
	}
}

class Pancake
{
	static pancakeTime = 0.5;
	constructor(assignedSlot)
	{
		this.index = 1;
		this.side1Done = false;
		this.side2Done = false;
		this.flipped = false;
		this.burnt = false;
		this.hovering = false;
		this.assignedSlot = assignedSlot;
		this.img = GameManager.scene.physics.add.sprite(0,0,'spr_pancake_cooking'); this.img.setScale(0.08);
		this.trashCollider;
		this.dishCollider;
		var pancake = this;

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
		var pancake = this;
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
				pancake.dragEndBehaviour();		
       		})
       		
		}
		this.img.setTexture('spr_pancake_cooked');
	}

	/* Called when the user clicks on the pancake */
	flipPancake()
	{	
		if(!this.side1Done || this.flipped || this.burnt) return;
	
		this.flipped = true;
		this.img.setTexture('spr_pancake_cooking');
		// reset timers
		this.sideTimer.remove(false);
        this.burnTimer.remove(false);
		this.sideTimer = GameManager.scene.time.addEvent({ delay: Pancake.pancakeTime*1000, callback: this.sideDone, callbackScope: this });
        this.burnTimer = GameManager.scene.time.addEvent({ delay: Pancake.pancakeTime*2*1000, callback: this.burnPancake, callbackScope: this });
	}

	/* Method called when the pancake has spent too much time in the griddle */
	burnPancake()
	{
		this.sideTimer.remove(false);
		this.burnTimer.remove(false);
		this.burnt = true;
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
			pancake.dragEndBehaviour();	
       	})
		
	}

	/* Method called when the pancake img has been dropped by the user */
	dragEndBehaviour()
	{
		if(this.hovering)
		{
			this.trashCollider = GameManager.scene.physics.add.overlap(this.img, GameManager.trashCanImgPancake, this.throwFood, null, this);
			this.hovering = false;
			if(!this.burnt) this.dishCollider = GameManager.scene.physics.add.overlap(this.img, GameManager.collidingObjectImg, this.dragToDish, null, this);
		}
		else
		{
			var pos = Griddle.slots.getAt(this.assignedSlot);
           	this.img.setPosition(pos.x, pos.y); 
           	if(!this.burnt)
           	{
           		this.sideTimer.paused = false;
				this.burnTimer.paused = false;
           	}
		}
		grabItem("", null, null);
	}

	dragToDish(food, dishImg)
	{
		GameManager.scene.physics.world.removeCollider(this.trashCollider);
		GameManager.scene.physics.world.removeCollider(this.dishCollider);
		var container = GameManager.collidingObject;
		container.dishContainer.iterate(function(child){
			child.setAlpha(1);
		});
		//dishImg.setAlpha(1);
		food.setPosition(0,0);
		food.removeInteractive();
		//food.disableBody(true,true);
		this.freeGriddle();
		// If the dish already is created the is no need to create another dish, just add the pancake and update the dish
		if(container.dish == null)
		{
			container.dish = new Dish(this.index);
			makeDishInteractive(container);	
		}
		else
		{
			dish.addPancake();
		}
		container.dishContainer.add(food);	
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
	// Type 0: Banana - Type 1: Oreo - Type 2: Strawberry - Type 3: Cookie
	constructor(index, offset)
	{
		this.index = index;
		this.img;
		this.staticImg;
		this.hovering=false;
		this.posx;
		this.posy;
		this.collider;
		switch(this.index)
		{
			case 0:
				this.img = GameManager.scene.physics.add.sprite(config.width*0.5 + offset,config.height*0.9,'spr_topping_platano'); this.img.setScale(0.04);
				this.staticImg = GameManager.scene.add.image(config.width*0.5+ offset,config.height*0.9,'spr_topping_platano'); this.staticImg.setScale(0.04);
			break;

			case 1:
				this.img = GameManager.scene.physics.add.sprite(config.width*0.4 + offset,config.height*0.9,'spr_topping_oreo'); this.img.setScale(0.1);
				this.staticImg = GameManager.scene.add.image(config.width*0.4 + offset,config.height*0.9,'spr_topping_oreo'); this.staticImg.setScale(0.1);
			break;

			case 2:
				this.img = GameManager.scene.physics.add.sprite(config.width*0.3 + offset,config.height*0.9,'spr_topping_fresa'); this.img.setScale(0.03);
				this.staticImg = GameManager.scene.add.image(config.width*0.3 + offset,config.height*0.9,'spr_topping_fresa'); this.staticImg.setScale(0.03);
			break;

			case 3:
				this.img = GameManager.scene.physics.add.sprite(config.width*0.2 + offset,config.height*0.9,'spr_topping_galleta'); this.img.setScale(0.015);
				this.staticImg = GameManager.scene.add.image(config.width*0.2 + offset,config.height*0.9,'spr_topping_galleta'); this.staticImg.setScale(0.015);
			break;

			default:
				console.log("No img assigned");
			break;
		}
		makeImgInteractive("topping", this.img, this);
	}

	dragEndBehaviour()
	{
		if(this.hovering)
		{
			this.collider = GameManager.scene.physics.add.overlap(this.img, GameManager.collidingObjectImg, this.dragToDish, null, this);
			this.hovering = false;
		}
		else
		{
			this.img.setPosition(this.posx, this.posy);
		}
		grabItem("", null, null);	
	}

	dragToDish(toppingImg, dishImg)
	{
		this.collider.destroy();
		var container = GameManager.collidingObject;
		container.dishContainer.iterate(function(child){
			child.setAlpha(1);
		});
		toppingImg.setPosition(this.posx,this.posy);

		var dish = container.dish;

		if(dish.addTopping(this.index))
		{
			var clonedImg = GameManager.scene.add.sprite(0, 0, toppingImg.texture);
			clonedImg.setScale(0.009);
			container.dishContainer.add(clonedImg);
		}	
	}
}

class Syrup
{
	constructor(index, offset)
	{
		this.index = index;
		this.img;
		this.hovering=false;
		this.posx;
		this.posy;
		this.collider;
		this.servingTimer;

		this.dishContainer;
		switch(this.index)
		{
			case 0:
				this.img = GameManager.scene.physics.add.sprite(config.width * 0.7 + offset,config.height * 0.9,'spr_syrup_maple'); this.img.setScale(0.05);
			break;

			case 1:
				this.img = GameManager.scene.physics.add.sprite(config.width * 0.75 + offset,config.height * 0.9,'spr_syrup_chocolate'); this.img.setScale(0.05);
			break;

			case 2:
				this.img = GameManager.scene.physics.add.sprite(config.width * 0.8 + offset,config.height * 0.9,'spr_syrup_caramel'); this.img.setScale(0.08);
			break;

			default:
				console.log("No img assigned");
			break;
		}
		makeImgInteractive("syrup", this.img, this);
	}

	dragEndBehaviour()
	{
		if(this.hovering)
		{
			this.hovering = false;
			this.collider = GameManager.scene.physics.add.overlap(this.img, GameManager.collidingObjectImg, this.serveSauce, null, this);
		}
		else
		{
           	this.img.setPosition(this.posx, this.posy); 
		}
		grabItem("", null, null); 
	}

	serveSauce(sauceImg, dishImg)
	{
		var container = GameManager.collidingObject;
		container.dishContainer.iterate(function(child){
			child.setAlpha(1);
		});
		//dishImg.setAlpha(1);
		this.collider.destroy();
		this.servingTimer = GameManager.scene.time.addEvent({ delay: Sauce.servingTime*1000, callback: this.sauceServed, callbackScope: this });
		this.img.removeInteractive();
		console.log("serving syrup");

		console.log("syrup: " + container.dish.sauce);
		container.dish.sauce = this.index;
		console.log("this.index: " + this.index);
		console.log("syrup: " + container.dish.sauce);
		this.dishContainer = container;
		container.img.removeInteractive();
		//container.dishContainer.add(food); add sauce sprite to noodle
	}

	sauceServed()
	{
		this.img.setPosition(this.posx,this.posy);
		makeImgInteractive("syrup", this.img, this);
		makeDishInteractive(this.dishContainer);
		console.log("syrup served");
	}
}

class Sauce
{
	static servingTime = 3; //4
	constructor(index, offset)
	{
		this.index = index;
		this.img;
		this.hovering=false;
		this.posx;
		this.posy;
		this.collider;
		this.servingTimer;

		this.dishContainer;
		switch(this.index)
		{
			case 0:
				this.img = GameManager.scene.physics.add.sprite(config.width + config.width*0.65,config.height*0.9,'spr_sauce_algerienne'); this.img.setScale(0.07);
			break;

			case 1:
				this.img = GameManager.scene.physics.add.sprite(config.width + config.width*0.72,config.height*0.9,'spr_sauce_mustard'); this.img.setScale(0.06);
			break;

			case 2:
				this.img = GameManager.scene.physics.add.sprite(config.width + config.width*0.8, config.height*0.9,'spr_sauce_bbq'); this.img.setScale(0.05);
			break;

			default:
				console.log("No img assigned");
			break;
		}
		makeImgInteractive("sauce", this.img, this);
	}

	dragEndBehaviour()
	{
		if(this.hovering)
		{
			this.hovering = false;
			this.collider = GameManager.scene.physics.add.overlap(this.img, GameManager.collidingObjectImg, this.serveSauce, null, this);
		}
		else
		{
           	this.img.setPosition(this.posx, this.posy); 
		}
		grabItem("", null, null); 
	}

	serveSauce(sauceImg, dishImg)
	{
		var container = GameManager.collidingObject;
		container.dishContainer.iterate(function(child){
			child.setAlpha(1);
		});
		//dishImg.setAlpha(1);
		this.collider.destroy();
		this.servingTimer = GameManager.scene.time.addEvent({ delay: Sauce.servingTime*1000, callback: this.sauceServed, callbackScope: this });
		this.img.removeInteractive();
		console.log("serving sauce");

		container.dish.sauce = this.index;
		this.dishContainer = container;
		container.img.removeInteractive();
		//container.dishContainer.add(food); add sauce sprite to noodle
	}

	sauceServed()
	{
		this.img.setPosition(this.posx,this.posy);
		makeImgInteractive("sauce", this.img, this);
		makeDishInteractive(this.dishContainer);
		console.log("sauce served");
	}
}

class Strainer extends Machine
{
	static slots = new Phaser.Structs.List();
	constructor(maxSlots, img)
	{
		super(maxSlots, img);
		var offset = 15;
		Strainer.slots.add(new Slot(img.x-offset,img.y-offset,false));
		Strainer.slots.add(new Slot(img.x+offset,img.y-offset,false));
		Strainer.slots.add(new Slot(img.x-offset,img.y+offset,false));
		Strainer.slots.add(new Slot(img.x+offset,img.y+offset,false));
	}
}

class Noodles
{
	static noodleTime = 0.5; //10
	static burnTime = 5; //17
	constructor(assignedSlot)
	{
		this.index = 2;
		this.assignedSlot = assignedSlot;
		this.img = GameManager.scene.physics.add.sprite(0,0,'spr_noodles_cooking'); this.img.setScale(0.055);
		this.burnt = false;
		this.trashCollider;
		this.dishCollider;

		this.doneTimer = GameManager.scene.time.addEvent({ delay: Noodles.noodleTime*1000, callback: this.noodlesDone, callbackScope: this });
        this.burnTimer = GameManager.scene.time.addEvent({ delay: Noodles.burnTime*1000, callback: this.noodlesBurnt, callbackScope: this });
	}

	noodlesDone()
	{
		var noodles = this;
		makeImgInteractive("noodles",this.img, this);

		this.img.on('dragstart', function(pointer,dragX,dragY){
			noodles.doneTimer.paused = true;
        	noodles.burnTimer.paused = true;	
		})    

		this.img.setTexture('spr_noodles_cooked');
	}

	noodlesBurnt()
	{
		this.img.setTexture('spr_noodles_burnt');
		this.img.setScale(0.05);
		this.burnt = true;
	}

	dragEndBehaviour()
	{
		if(this.hovering)
		{
			this.trashCollider = GameManager.scene.physics.add.overlap(this.img, GameManager.trashCanImgNoodles, this.throwFood, null, this);
			this.hovering = false;
			if(!this.burnt) this.dishCollider = GameManager.scene.physics.add.overlap(this.img, GameManager.collidingObjectImg, this.dragToDish, null, this);
		}
		else
		{
			var pos = Strainer.slots.getAt(this.assignedSlot);
           	this.img.setPosition(pos.x, pos.y); 
           	if(!this.burnt)
           	{
           		this.doneTimer.paused = false;
				this.burnTimer.paused = false;
           	}
		}
		grabItem("", null, null); 
	}

	throwFood(food, trashCan)
	{
		console.log("noodle to trash");
		trashCan.setAlpha(1);
		food.disableBody(true,true);
		this.freeStrainer();		
	}

	freeStrainer()
	{
		this.doneTimer.remove(false);
        this.burnTimer.remove(false);
		GameManager.strainer.occupiedSlots--;
		Strainer.slots.getAt(this.assignedSlot).occupied = false;
	}

	dragToDish(food, dishImg)
	{
		GameManager.scene.physics.world.removeCollider(this.trashCollider);
		GameManager.scene.physics.world.removeCollider(this.dishCollider);

		console.log("NOODLE DRAGGED");
		var container = GameManager.collidingObject;
		container.dishContainer.iterate(function(child){
			child.setAlpha(1);
		});
		food.setPosition(dishImg.x,dishImg.y);
		food.removeInteractive();
		food.setScale(0.1);
		//food.disableBody(true,true);
		this.freeStrainer();
		/* Update dish and create sprite according to the dish */
		if(container.dish == null)
		{
			container.dish = new Dish(this.index);
			container.dishContainer.add(food);
			makeDishInteractive(container);
		}	
	}
}

/* This class is needed so that there is a relation between the dishImg and the object from the class Dish represented in the dishImg. Otherwise we could not know 
what order is in the dish we are colliding with. */
class DishImgContainer
{
	constructor(dishImg)
	{
		this.img = dishImg; //Img of the dish
		this.dish; //Object from the class Dish
		this.dishContainer = GameManager.scene.add.container(dishImg.x, dishImg.y); // Container of all the images that belong to the dish
		this.img.setPosition(0,0); //If this is not done, then the image would not appear in the scene
		this.dishContainer.add(this.img);
	}
}

class Client{
	static clientList = new Phaser.Structs.List();
	static clientSlots = new Phaser.Structs.List();
	static maxClients= 3;
	constructor(scene){
		this.clientImg = scene.physics.add.sprite(100,100, 'client');
		this.clientImg.setScale(0.2);
		this.order=0;//this.generateOrder()
		this.happiness=90;
		Client.clientList.add(this);
	}
	changePosition(x, y)
	{
		this.clientImg.setPosition(x, y);
	}
	generateOrder(){
		//generar un pedido
	}
}

class Order{
	constructor(numDishes, scene){
		this.scene=scene;
		this.dishes = new Phaser.Structs.List();
		this.receivedDishes=0;
		this.numDishes=numDishes;
	}

	addDishToOrder(dish){
		this.dish.add(dish);
	}

	compareDish(dish){
		for (var i=0; i< this.numDishes-this.receivedDishes;i++){
			if(dish.index==this.dishes.getAt(i).index){
				return true;
			}
			//comparar toppings
		}
	}
}

class Dish{
  constructor(index){
    this.index=index; //0 coffee, 1 pancakes, 2 noodles
    this.toppings = new Phaser.Structs.List();
    this.sauce = -1;
    this.numPancakes=-1;
    if(index==1 || index==2){   
      for (var i=0; i<4; i++)
      { 
        this.toppings.add(-100+i); //Initialize with negative values
      }
      if(index==1){
        this.numPancakes=1;
      }
    }
  }

  addTopping(toppingType)
  {
  	for(var i=0; i<this.toppings.length; i++)
  	{
  		var topping = this.toppings.getAt(i);
  		if(topping < 0)
  		{
  			this.toppings.replace(topping, toppingType);
  			return true;
  		}
  	}
  	return false;
  }

  addPancake()
    {
    	this.numPancakes++;
    	console.log("numPancakes: " + this.numPancakes);
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

function checkHoverWithTrashCan()
{
	var trashCanImg;
	if(GameManager.grabbedItemClass == "pancake") trashCanImg = GameManager.trashCanImgPancake;
	else { trashCanImg = GameManager.trashCanImgNoodles ;}

	if(checkOverlap(GameManager.grabbedItemImg, trashCanImg))
	{
		GameManager.grabbedItem.hovering = true;
		GameManager.collidingObjectImg = trashCanImg;
		trashCanImg.setAlpha(0.5);
		return true;
	}
	else 
	{
		trashCanImg.setAlpha(1);
	}

	return false;
}

// This function works for pancakes and noodles
function checkHoverWithDishes()
{
	if(GameManager.grabbedItem.burnt) return;
	/* var collision is needed so that the food can only collide with one dish at a time */
	var container;
	if(GameManager.grabbedItemClass == "pancake") container = GameManager.dishImgContainerCoffee;
	else{ container = GameManager.dishImgContainerNoodles;}

	var collision = false;
	for(var i=0; i<container.length; i++)
	{
		var dishContainer = container.getAt(i);
		var dish = dishContainer.dish;

		if(dish)
		{
			if(GameManager.grabbedItemClass == "pancake")
			{
				// Can't add a pancake to the dish if there are already 3, or a topping or syrup has been added
				if(dish.numPancakes >= 3 || !toppingsEmpty(dish) || dish.sauce != -1) continue;
			}
			else
			{ // If the dish has already been created, that means that there is noodles
				continue;
			}		
		}
		collision = overlappingLogic(dishContainer, collision);
	}
}

function checkToppingHoverWithDish()
{
	var container;
	/*
	if(GameManager.coffeeScreen == true)  container = GameManager.dishImgContainerCoffee;
	else{ container = GameManager.dishImgContainerNoodles;}
	*/
	if(GameManager.grabbedItemImg.x >= 800){ container = GameManager.dishImgContainerNoodles;} // Esto es un apaño
	else{ container = GameManager.dishImgContainerCoffee;}

	var collision = false;
	for(var i=0; i < container.length; i++)
	{
		var dishContainer = container.getAt(i);
		var dish = dishContainer.dish;

		if(dish)
		{
			if(containsTopping(GameManager.grabbedItem, dish) || dish.sauce != -1) continue;
			collision = overlappingLogic(dishContainer, collision);
		}
	}
}

// This function checks if a dish contains the received topping
function containsTopping(topping,dish)
{
	for(var i=0; i<dish.toppings.length; i++)
	{
		if(dish.toppings.getAt(i) == topping.index) return true;
	}
	return false;
}

// This function checks if a dish has no toppings, if the index is 0 or greater there is a topping assigned, if it is negative then there is no topping
function toppingsEmpty(dish)
{
	for(var i=0; i<dish.toppings.length; i++)
	{
		if(dish.toppings.getAt(i) >= 0) return false;
	}
	return true;
}

function checkHoverWithClient()
{
	if(GameManager.grabbedItemClass == "coffee")
	{

	}
	else
	{

	}

	var dish = GameManager.grabbedItem;
	for(var i=0; i< GameManager.clients; i++)
	{	
		var client = GameManager.clients.getAt(i);
		if(checkOverlap(GameManager.grabbedItemImg, client) && !collision)
		{
			collision = true;
			//dish.hovering = true;
			GameManager.collidingObjectImg = client;
			client.setAlpha(0.5);
		}
		else
		{
			client.setAlpha(1);
		}
	}
}

function checkSauceAndSyrupHover()
{
	var container;

	if(GameManager.grabbedItemClass == "sauce"){ container = GameManager.dishImgContainerNoodles;}
	else{ container = GameManager.dishImgContainerCoffee;}

	var collision = false;
	for(var i=0; i < container.length; i++)
	{
		var dishContainer = container.getAt(i);
		var dish = dishContainer.dish;

		if(dish)
		{
			if(dish.sauce != -1) continue;
			collision = overlappingLogic(dishContainer, collision);
		}
	}
}

// function created to avoid the code repetition
function overlappingLogic(container, collision)
{
	var dishImg = container.img;
	if(checkOverlap(GameManager.grabbedItemImg, dishImg) && !collision)
	{
		GameManager.collidingObjectImg = dishImg;
		GameManager.collidingObject = container;
		GameManager.grabbedItem.hovering = true;
		//apply the alpha to all the items in the container
		//dishImg.setAlpha(0.5);
		container.dishContainer.iterate(function(child){
			child.setAlpha(0.5);
		});
		return true;
	}
	else
	{
		//dishImg.setAlpha(1);
		container.dishContainer.iterate(function(child){
			child.setAlpha(1);
		});
		return false;
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

	var decrease = 0.7;
	boundsA.height *= decrease;
	boundsB.height *= decrease;
	boundsA.width *= decrease;
	boundsB.width *= decrease;

	Phaser.Geom.Rectangle.CenterOn(boundsA, recACenterX, recACenterY);
	Phaser.Geom.Rectangle.CenterOn(boundsB, recBCenterX, recBCenterY);
	return Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB);
}

function makeDishInteractive(container)
{
	dishImg = container.img;
	dish = container.dish;
	dishContainer = container.dishContainer;

	var contPosx, contPosy;

	dishImg.setInteractive({ draggable: true });

	dishImg.on('dragstart', function(pointer,dragX,dragY){
		contPosx = dishContainer.x;
		contPosy = dishContainer.y;
	})

    dishImg.on('drag', function(pointer, dragX, dragY){
     	dishContainer.setPosition(dragX+contPosx, dragY+contPosy);
     	grabItem("dish", this, dish);
    })	
		
	dishImg.on('dragend',() => {
		grabItem("", null, null);
		dishContainer.setPosition(contPosx,contPosy);
    })
}

function makeImgInteractive(itemClass, itemImg, item)
{
    itemImg.setInteractive({ draggable: true });

	itemImg.on('dragstart', function(pointer,dragX,dragY){
		item.posx = this.x;
		item.posy = this.y;	
	})

    itemImg.on('drag', function(pointer, dragX, dragY){
    	this.setPosition(dragX, dragY);
    	grabItem(itemClass, this, item);
    })	
		
	itemImg.on('dragend',() => {
		item.dragEndBehaviour();
    })
}