class Coffee
{
	static coffeeTime = 0.3; //8 
	constructor(assignedSlot, fillingSound, readySound)
	{
		this.index = 0;
		this.img = GameManager.scene.physics.add.sprite(0,0,'spr_glass_empty');
		this.posx;
		this.posy;
		GameManager.coffeeContainer;
		this.imgContainer;
		this.assignedSlot = assignedSlot;
		this.hovering = false;
		this.done = false;
		this.doneTime = Math.abs(GameManager.scene.playerSettings.upgrades.cofeeTime - Coffee.coffeeTime);
		this.timer = GameManager.scene.time.addEvent({ delay: this.doneTime*1000, callback: this.coffeeDone, callbackScope: this });
		this.clientCollider;
		this.dish;
		this.fillingSound = fillingSound;
		this.readySound = readySound;
		this.fillingSound.play();
	}

	coffeeDone()
	{
		this.readySound.play();
		this.fillingSound.stop();
		this.done = true;
		this.img.setTexture('spr_glass_filled'); 

		this.dish = new Dish([this.index]);
		GameManager.coffeeDishes.add(this);
		makeImgInteractive("coffeeDish", this.img, this)
	}

	dragEndBehaviour()
	{
		if(this.hovering)
		{
			this.hovering = false;
			this.clientCollider = GameManager.scene.physics.add.overlap(this.img, GameManager.collidingObjectImg, this.deliverCoffee, null, this);
		}
		else
		{
			this.img.setPosition(this.posx,this.posy);
		}
		grabItem("", null, null);
		
	}

	/* Here implement the dish comparison with the client */
	deliverCoffee(coffeeImg, clientImg)
	{
		console.log("coffee dragged to client");

		GameManager.scene.physics.world.removeCollider(this.clientCollider);
		coffeeImg.disableBody(true,true);
		clientImg.setAlpha(1);
		GameManager.coffeeDishes.remove(this);
		GameManager.coffeeMachine.occupiedSlots--;
		CoffeeMachine.slots.getAt(this.assignedSlot).occupied = false;
		
		var dish = this.dish; 
		var client = GameManager.collidingObject; //El cliente con el que ha colisionado, objeto de la clase Client
		client.compareOrderWithDish(dish);
		grabItem("", null, null);
	}
}

class Pancake
{
	static time = 1;
	constructor(assignedSlot, trashSound, cookingSound, burntSound, readySound)
	{
		this.index = 1;
		this.side1Done = false;
		this.side2Done = false;
		this.flipped = false;
		this.burnt = false;
		this.hovering = false;
		this.assignedSlot = assignedSlot;
		this.img = GameManager.scene.physics.add.sprite(0,0,'spr_pancake_cooking');
		this.trashCollider;
		this.dishCollider;
		this.doneTime = Math.abs(GameManager.scene.playerSettings.upgrades.pancakeTime - Pancake.time);
		this.burnTime = Math.abs(GameManager.scene.playerSettings.upgrades.pancakeBurnTime - (Pancake.time*2));

		var pancake = this;

        this.img.setInteractive();
        this.img.on('pointerdown', function(pointer){
        	pancake.flipPancake();
        });

        this.sideTimer = GameManager.scene.time.addEvent({ delay: this.doneTime*1000, callback: this.sideDone, callbackScope: this });
        this.burnTimer = GameManager.scene.time.addEvent({ delay: this.burnTime*1000, callback: this.burnPancake, callbackScope: this });
	
        this.trashSound = trashSound;
        this.cookingSound = cookingSound;
        this.cookingSound.setLoop(true);
        this.burntSound = burntSound;
        this.readySound = readySound;
        this.cookingSound.play();
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
			this.readySound.play();
			this.side2Done = true;
			this.cookingSound.setMute(true);
			GameManager.scene.input.setDraggable(this.img);

			this.img.on('dragstart', function(pointer,dragX,dragY){
				GameManager.tapSound.play();
				pancake.sideTimer.paused = true;
        		pancake.burnTimer.paused = true;	
			})

        	this.img.on('drag', function(pointer, dragX, dragY){
        		this.setPosition(dragX, dragY);
        		pancake.cookingSound.stop();
        		grabItem("pancake", this, pancake);
        	})	
			
			this.img.on('dragend',() => {
				pancake.cookingSound.play();	
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
		this.sideTimer = GameManager.scene.time.addEvent({ delay: this.doneTime*1000, callback: this.sideDone, callbackScope: this });
        this.burnTimer = GameManager.scene.time.addEvent({ delay: this.burnTime*1000, callback: this.burnPancake, callbackScope: this });
	}

	/* Method called when the pancake has spent too much time in the griddle */
	burnPancake()
	{
		this.cookingSound.stop();
		this.cookingSound.setMute(true);
		this.burntSound.play();
		this.sideTimer.remove(false);
		this.burnTimer.remove(false);
		this.burnt = true;
		var pancake = this;
		this.img.setTexture('spr_pancake_burnt');

		/* Adding interactivity events again seems to cause problems */
		if(this.side2Done) return;

		GameManager.scene.input.setDraggable(this.img);

		this.img.on('dragstart', function(pointer,dragX,dragY){
			GameManager.tapSound.play();
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
			if(!this.burnt)	this.dishCollider = GameManager.scene.physics.add.overlap(this.img, GameManager.collidingObjectImg, this.dragToDish, null, this);
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
			container.dish = new Dish([this.index,-1,1,0]);
			makeDishInteractive(container,"pancakeDish");	
		}
		else
		{
			dish.addPancake();
		}
		container.dishContainer.add(food);	
	}

	

	throwFood(food, trashCan)
	{
		this.trashSound.play();
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

class Noodles
{
	static doneTime = 3; //10
	static burnTime = 5; //17
	constructor(assignedSlot, trashSound, cookingSound, burntSound, readySound)
	{
		this.index = 2;
		this.assignedSlot = assignedSlot;
		this.img = GameManager.scene.physics.add.sprite(0,0,'assets_atlas','spr_noodles');
		//this.img = GameManager.scene.physics.add.sprite(0,0,'spr_noodles_cooking');
		this.burnt = false;
		this.trashCollider;
		this.dishCollider;

		this.noodleTime = Math.abs(GameManager.scene.playerSettings.upgrades.noodleTime - Noodles.doneTime);
		this.noodleBurnTime = Math.abs(GameManager.scene.playerSettings.upgrades.noodleBurnTime - Noodles.burnTime);

		this.doneTimer = GameManager.scene.time.addEvent({ delay: this.noodleTime*1000, callback: this.noodlesDone, callbackScope: this });
        this.burnTimer = GameManager.scene.time.addEvent({ delay: this.noodleBurnTime*1000, callback: this.noodlesBurnt, callbackScope: this });
	
		this.trashSound = trashSound;
        this.cookingSound = cookingSound;
        this.burntSound = burntSound;
        this.readySound = readySound;
        this.cookingSound.play();
	}

	noodlesDone()
	{
		this.readySound.play();
		this.cookingSound.setMute(true);
		var noodles = this;
		makeImgInteractive("noodles",this.img, this, this.cookingSound);

		this.img.on('dragstart', function(pointer,dragX,dragY){
			noodles.doneTimer.paused = true;
        	noodles.burnTimer.paused = true;	
		})    

		this.img.setTexture('assets_atlas','spr_noodles_cooked');
	}

	noodlesBurnt()
	{
		this.cookingSound.stop();
		this.cookingSound.setMute(true);
		this.burntSound.play();
		this.img.setTexture('assets_atlas','spr_noodles_burnt');
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
		this.trashSound.play();
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
		food.setScale(0.9);
		//food.disableBody(true,true);
		this.freeStrainer();
		/* Update dish and create sprite according to the dish */
		if(container.dish == null)
		{
			container.dish = new Dish([this.index,-1,0]);
			container.dishContainer.add(food);
			makeDishInteractive(container,"noodleDish");
		}	
	}
}

class Topping
{
	constructor(index, pancake, toppingSound)
	{
		this.index = index;
		this.img;
		this.staticImg;
		this.hovering=false;
		this.posx;
		this.posy;
		this.collider;
		this.toppingSound = toppingSound;
		var imgKey;
		var offset = !pancake ? offset = config.width : offset = 0;
		switch(this.index)
		{
			case 0:
				if(pancake) { 
					imgKey = 'spr_topping_lacasitos'; 
					this.img = GameManager.scene.physics.add.sprite(config.width*0.3 + offset,config.height*0.9,imgKey);
					this.staticImg = GameManager.scene.add.image(config.width*0.3 + offset,config.height*0.9,imgKey); 
				}
				else { 
					imgKey = 'spr_topping_mushroom' ;
					this.img = GameManager.scene.physics.add.sprite(config.width*0.2 + offset,config.height*0.9,'assets_atlas',imgKey); 
					this.staticImg = GameManager.scene.add.image(config.width*0.2 + offset,config.height*0.9,'assets_atlas',imgKey); 
				}
			break;

			case 1:
				if(pancake) { 
					imgKey = 'spr_topping_coconut'; 
					this.img = GameManager.scene.physics.add.sprite(config.width*0.385 + offset,config.height*0.9,imgKey);
					this.staticImg = GameManager.scene.add.image(config.width*0.385 + offset,config.height*0.9,imgKey); 
				}
				else { 
					imgKey = 'spr_topping_egg' ; 
					this.img = GameManager.scene.physics.add.sprite(config.width*0.3 + offset,config.height*0.9,'assets_atlas',imgKey); 
					this.staticImg = GameManager.scene.add.image(config.width*0.3 + offset,config.height*0.9,'assets_atlas',imgKey); 
				}
				
			break;

			case 2:
				if(pancake) { 
					imgKey = 'spr_topping_strawberry';
					this.img = GameManager.scene.physics.add.sprite(config.width*0.47 + offset,config.height*0.9,imgKey);
					this.staticImg = GameManager.scene.add.image(config.width*0.47 + offset,config.height*0.9,imgKey); 
				}
				else { 
					imgKey = 'spr_topping_naruto' ;
					this.img = GameManager.scene.physics.add.sprite(config.width*0.4 + offset,config.height*0.9,'assets_atlas',imgKey); 
					this.staticImg = GameManager.scene.add.image(config.width*0.4 + offset,config.height*0.9,'assets_atlas',imgKey);
				}
			break;

			case 3:
				if(pancake) { 
					imgKey = 'spr_topping_banana'; 
					this.img = GameManager.scene.physics.add.sprite(config.width*0.56 + offset,config.height*0.92,imgKey);
					this.staticImg = GameManager.scene.add.image(config.width*0.56 + offset,config.height*0.92,imgKey); 
				}
				else { 
					imgKey = 'spr_topping_springonion' ; 
					this.img = GameManager.scene.physics.add.sprite(config.width*0.5 + offset,config.height*0.9,'assets_atlas',imgKey); 
					this.staticImg = GameManager.scene.add.image(config.width*0.5 + offset,config.height*0.9,'assets_atlas',imgKey); 
				}
			break;
			/*
			case 0:
				if(pancake) { imgKey = 'spr_topping_strawberry'; }
				else { imgKey = 'spr_topping_mushroom' ;}
				this.img = GameManager.scene.physics.add.sprite(config.width*0.5 + offset,config.height*0.9,imgKey); this.img.setScale(0.04);
				this.staticImg = GameManager.scene.add.image(config.width*0.5 + offset,config.height*0.9,imgKey); this.staticImg.setScale(0.04);
			break;

			case 1:
				if(pancake) { imgKey = 'spr_topping_coconut'; }
				else { imgKey = 'spr_topping_egg' ; }
				this.img = GameManager.scene.physics.add.sprite(config.width*0.4 + offset,config.height*0.9,'assets_atlas',imgKey); 
				this.staticImg = GameManager.scene.add.image(config.width*0.4 + offset,config.height*0.9,'assets_atlas',imgKey); 
			break;

			case 2:
				if(pancake) { imgKey = 'spr_topping_banana'; }
				else { imgKey = 'spr_topping_naruto' ; }
				this.img = GameManager.scene.physics.add.sprite(config.width*0.3 + offset,config.height*0.9,'assets_atlas',imgKey); 
				this.staticImg = GameManager.scene.add.image(config.width*0.3 + offset,config.height*0.9,'assets_atlas',imgKey);
			break;

			case 3:
				if(pancake) { imgKey = 'spr_topping_lacasitos'; }
				else { imgKey = 'spr_topping_celery' ; }
				this.img = GameManager.scene.physics.add.sprite(config.width*0.2 + offset,config.height*0.9,'assets_atlas',imgKey); 
				this.staticImg = GameManager.scene.add.image(config.width*0.2 + offset,config.height*0.9,'assets_atlas',imgKey); 
			break;
			*/
			default:
				console.log("No img assigned");
			break;
		}
		makeImgInteractive("topping", this.img, this, null);
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
		//this.toppingSound.play();
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
			container.dishContainer.add(clonedImg);
		}	
	}
}

class Syrup
{
	constructor(index, offset, syrupSound)
	{
		this.index = index;
		this.img;
		this.hovering=false;
		this.posx;
		this.posy;
		this.collider;
		this.servingTimer;
		this.syrupSound = syrupSound;
		this.dishContainer;
		switch(this.index)
		{
			case 0:
				this.img = GameManager.scene.physics.add.sprite(config.width * 0.25 + offset,config.height * 0.43,'spr_syrup_strawberry'); 
			break;

			case 1:
				this.img = GameManager.scene.physics.add.sprite(config.width * 0.31 + offset,config.height * 0.43,'spr_syrup_chocolate'); 
			break;

			case 2:
				this.img = GameManager.scene.physics.add.sprite(config.width * 0.37 + offset,config.height * 0.43,'spr_syrup_caramel'); 
			break;

			default:
				console.log("No img assigned");
			break;
		}
		makeImgInteractive("syrup", this.img, this, null);
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
		this.syrupSound.play();
		var container = GameManager.collidingObject;
		container.dishContainer.iterate(function(child){
			child.setAlpha(1);
		});
		//dishImg.setAlpha(1);
		this.collider.destroy();
		this.servingTimer = GameManager.scene.time.addEvent({ delay: Sauce.servingTime*1000, callback: this.syrupServed, callbackScope: this });
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

	syrupServed()
	{
		this.syrupSound.stop();
		this.img.setPosition(this.posx,this.posy);
		makeImgInteractive("syrup", this.img, this, null);
		makeDishInteractive(this.dishContainer,"pancakeDish");
		console.log("syrup served");
	}
}

class Sauce
{
	static servingTime = 3; //4
	constructor(index, fillingSound)
	{
		this.index = index;
		this.img;
		this.hovering=false;
		this.posx;
		this.posy;
		this.collider;
		this.servingTimer;
		this.fillingSound = fillingSound;
		this.dishContainer;
		switch(this.index)
		{
			case 0:
				this.img = GameManager.scene.physics.add.sprite(config.width + config.width*0.65,config.height*0.9,'assets_atlas','spr_sauce_kimuchi');
			break;

			case 1:
				this.img = GameManager.scene.physics.add.sprite(config.width + config.width*0.72,config.height*0.9,'assets_atlas','spr_sauce_miso');
			break;

			case 2:
				this.img = GameManager.scene.physics.add.sprite(config.width + config.width*0.8, config.height*0.9,'assets_atlas','spr_sauce_shio');
			break;

			case 3:
				this.img = GameManager.scene.physics.add.sprite(config.width + config.width*0.86, config.height*0.9,'assets_atlas','spr_sauce_shoyu');
			break;

			default:
				console.log("No img assigned");
			break;
		}
		makeImgInteractive("sauce", this.img, this, null);
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
		this.fillingSound.play();
		//container.dishContainer.add(food); add sauce sprite to noodle
	}

	sauceServed()
	{
		this.fillingSound.stop();
		this.img.setPosition(this.posx,this.posy);
		makeImgInteractive("sauce", this.img, this, null);
		makeDishInteractive(this.dishContainer,"noodleDish");
		console.log("sauce served");
	}
}