class TutorialCoffee
{
	static ref;
	static coffeeTime = 0.5; //8 
	constructor(assignedSlot, fillingSound, readySound)
	{
		this.index = 0;
		this.img = GameManager.scene.physics.add.sprite(0,0,'assets_atlas','spr_glass_empty');
		this.posx;
		this.posy;
		GameManager.coffeeContainer;
		this.imgContainer;
		this.assignedSlot = assignedSlot;
		this.hovering = false;
		this.done = false;
		this.doneTime = TutorialCoffee.coffeeTime;
		this.timer = GameManager.scene.time.addEvent({ delay: this.doneTime*1000, callback: this.coffeeDone, callbackScope: this });
		this.clientCollider;
		this.dish;
		this.fillingSound = fillingSound;
		this.readySound = readySound;
		this.fillingSound.play();
		TutorialCoffee.ref = this;
		TutorialManager.coffeeImg = this.img;
		TutorialManager.tipDataContainer.getAt(7).srcImg = this.img;
	}

	coffeeDone()
	{
		this.readySound.play();
		this.fillingSound.stop();
		this.done = true;
		this.img.setTexture('assets_atlas','spr_glass_filled'); 

		this.dish = new Dish([this.index]);
		GameManager.coffeeDishes.add(this);
		TipLogic.currentInstance.endGlassesInteractivity(TutorialManager.glassesImg);
		// case 7
		//makeImgInteractive("coffeeDish", this.img, this)
	}

	dragEndBehaviour()
	{
		if(this.hovering)
		{
			console.log("COFFEE drag end AND WAS HOVERING WITH CLIENT");
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


		// transition to case 8
		TipLogic.currentInstance.endCase8();
	}
}

class TutorialPancake
{
	static ref;
	static time = 0.5;
	constructor(assignedSlot, trashSound, cookingSound, readySound)
	{
		this.index = 1;
		this.side1Done = false;
		this.side2Done = false;
		this.flipped = false;
		this.burnt = false;
		this.hovering = false;
		this.assignedSlot = assignedSlot;
		this.img = GameManager.scene.physics.add.sprite(0,0,'assets_atlas','spr_pancake_cooking');
		this.trashCollider;
		this.dishCollider;
		this.container;
		this.doneTime = TutorialPancake.time;
		TutorialManager.pancakeImg = this.img;
		TutorialManager.tipDataContainer.getAt(5).srcImg = this.img;
		TutorialManager.tipDataContainer.getAt(6).srcImg = this.img;
		TutorialPancake.ref = this;

        this.sideTimer = GameManager.scene.time.addEvent({ delay: this.doneTime*1000, callback: this.sideDone, callbackScope: this });
	
        this.trashSound = trashSound;
        this.cookingSound = cookingSound;
        this.cookingSound.setLoop(true);
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
			TipLogic.currentInstance.endPancakeSpawnerInteractivity(TutorialManager.pancakeBottleImg);
		} 
		else if(this.side1Done) // The pancake is finally done
		{
			TipLogic.currentInstance.endPancakeInteractivity(this.img, this);
			this.readySound.play();
			this.side2Done = true;
			this.cookingSound.setMute(true);
			this.sideTimer.remove(false);
		}
		this.img.setTexture('assets_atlas','spr_pancake_cooked');
	}

	/* Called when the user clicks on the pancake */
	flipPancake()
	{	
		if(!this.side1Done || this.flipped || this.burnt) return;
	
		this.flipped = true;
		this.img.setTexture('assets_atlas','spr_pancake_cooking');
		// reset timers
		this.sideTimer.remove(false);
		this.sideTimer = GameManager.scene.time.addEvent({ delay: this.doneTime*1000, callback: this.sideDone, callbackScope: this });
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
		food.removeInteractive();
		food.setPosition(0,0);
		//food.disableBody(true,true);
		this.freeGriddle();
		this.container = container;
		// If the dish already is created the is no need to create another dish, just add the pancake and update the dish
		if(container.dish == null)
		{
			container.dish = new Dish([this.index,-1,1,0]);
			// case 6
			TipLogic.currentInstance.endPancakeDraggedToDish();
			// case 7 or 8
			//makeDishInteractive(container,"pancakeDish");
			container.dishContainer.add(food);
		}
		else
		{
			container.dish.numPancakes++;
			if(container.dish.numPancakes == 2) container.addToContainer(food,3,-2);
			if(container.dish.numPancakes >= 3) container.addToContainer(food,-2,-4);
		}	
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
		GameManager.griddle.occupiedSlots--;
		Griddle.slots.getAt(this.assignedSlot).occupied = false;
	}
}

class TutorialNoodles
{
	static doneTime = 2; //10
	constructor(assignedSlot, trashSound, cookingSound, readySound)
	{
		this.index = 2;
		this.assignedSlot = assignedSlot;
		this.img = GameManager.scene.physics.add.sprite(0,0,'assets_atlas','spr_noodles');
		//this.img = GameManager.scene.physics.add.sprite(0,0,'spr_noodles_cooking');
		this.burnt = false;
		this.trashCollider;
		this.dishCollider;

		this.noodleTime = TutorialNoodles.doneTime;

		this.doneTimer = GameManager.scene.time.addEvent({ delay: this.noodleTime*1000, callback: this.noodlesDone, callbackScope: this });
	
		this.trashSound = trashSound;
        this.cookingSound = cookingSound;
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
		})    

		this.img.setTexture('assets_atlas','spr_noodles_cooked');
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

class TutorialTopping
{
	static ref;
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
		this.imgKey;
		var staticImgKey;
		var offset = !pancake ? offset = config.width : offset = 0;
		var xMul;
		var yMul;
		switch(this.index)
		{	
			case 0:
				if(pancake) { staticImgKey = 'spr_topping_lacasitos'; this.imgKey='spr_pancake_lacasitos'; xMul=0.3; yMul=0.9;}
				else { staticImgKey = 'spr_topping_mushroom'; this.imgKey = 'spr_noodle_mushroom'; xMul=0.5; yMul=0.6;}

				this.img = GameManager.scene.physics.add.sprite(config.width*xMul + offset,config.height*yMul,'assets_atlas',this.imgKey); 
				if(pancake)this.staticImg = GameManager.scene.add.image(config.width*xMul + offset,config.height*yMul,'assets_atlas',staticImgKey);
				else{this.staticImg = GameManager.scene.add.image(config.width*xMul + offset,config.height*yMul,staticImgKey); this.staticImg.setScale(0.22);} 
			break;

			case 1:
				if(pancake) { staticImgKey = 'spr_topping_coconut'; this.imgKey = 'spr_pancake_coconut'; xMul=0.385; yMul=0.9;}
				else { staticImgKey = 'spr_topping_egg'; this.imgKey = 'spr_noodle_egg'; xMul=0.5; yMul=0.7}

				this.img = GameManager.scene.physics.add.sprite(config.width*xMul + offset,config.height*yMul,'assets_atlas',this.imgKey); 
				if(pancake)this.staticImg = GameManager.scene.add.image(config.width*xMul + offset,config.height*yMul,'assets_atlas',staticImgKey);
				else{this.staticImg = GameManager.scene.add.image(config.width*xMul + offset,config.height*yMul,staticImgKey); this.staticImg.setScale(0.22);} 
			break;

			case 2:
				if(pancake) { staticImgKey = 'spr_topping_strawberry'; this.imgKey = 'spr_pancake_strawberry'; xMul=0.47; yMul=0.9;}
				else { staticImgKey = 'spr_topping_naruto'; this.imgKey = 'spr_noodle_naruto'; xMul=0.61; yMul=0.6}

				this.img = GameManager.scene.physics.add.sprite(config.width*xMul + offset,config.height*yMul,'assets_atlas',this.imgKey); 
				if(pancake)this.staticImg = GameManager.scene.add.image(config.width*xMul + offset,config.height*yMul,'assets_atlas',staticImgKey);
				else{this.staticImg = GameManager.scene.add.image(config.width*xMul + offset,config.height*yMul,staticImgKey); this.staticImg.setScale(0.22);}
			break;

			case 3:
				if(pancake) { staticImgKey = 'spr_topping_banana'; this.imgKey = 'spr_pancake_banana'; xMul=0.56; yMul=0.9;}
				else { staticImgKey = 'spr_topping_springonion'; this.imgKey = 'spr_noodle_springonion'; xMul=0.63; yMul=0.72}

				this.img = GameManager.scene.physics.add.sprite(config.width*xMul + offset,config.height*yMul,'assets_atlas',this.imgKey); 
				if(pancake)this.staticImg = GameManager.scene.add.image(config.width*xMul + offset,config.height*yMul,'assets_atlas',staticImgKey)
				else{this.staticImg = GameManager.scene.add.image(config.width*xMul + offset,config.height*yMul,staticImgKey); this.staticImg.setScale(0.22);}
			break;
			
			default:
				console.log("No img assigned");
			break;
		}
		var selfRef = this;
		this.img.setDepth(2);
		this.img.setAlpha(0);
		this.staticImg.setDepth(1);
		var clonedImg = GameManager.scene.add.image(this.staticImg.x, this.staticImg.y,'assets_atlas',staticImgKey);
		clonedImg.setAlpha(0.2);
		clonedImg.setInteractive({draggable: true});

		clonedImg.on('dragstart', function(pointer,dragX,dragY){
			GameManager.tapSound.play();
			selfRef.img.setAlpha(1);
			clonedImg.setAlpha(0);
			selfRef.posx = this.x;
			selfRef.posy = this.y;	
		})

    	clonedImg.on('drag', function(pointer, dragX, dragY){
    		selfRef.img.setPosition(dragX, dragY);
    		grabItem("topping", selfRef.img, selfRef);
    	})	
		
		clonedImg.on('dragend',() => {
			selfRef.dragEndBehaviour();
			clonedImg.setPosition(selfRef.posx, selfRef.posy);
			clonedImg.setAlpha(1);
			selfRef.img.setAlpha(0);
    	})
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
		this.toppingSound.play();
		this.collider.destroy();
		var container = GameManager.collidingObject;
		container.dishContainer.iterate(function(child){
			child.setAlpha(1);
		});
		toppingImg.setPosition(this.posx,this.posy);

		var numToppings = container.dish.numToppings;
		if(container.dish.addTopping(this.index))
		{
			console.log("this.img.texture: " + this.imgKey);
			var clonedImg = GameManager.scene.add.image(0, 0,'assets_atlas', this.imgKey);

			switch(numToppings)
			{
				case 0:
					container.addToContainer(clonedImg,0,0);
				break;
				case 1:
					container.addToContainer(clonedImg,2,-1.5);
				break;
				case 2:
					container.addToContainer(clonedImg,-3,-3);
				break;
				case 3:
					container.addToContainer(clonedImg,2,-5);
				break;
			}	
		}
		// case 9
		TipLogic.currentInstance.endCase9();	
	}
}

class TutorialSyrup
{
	static ref;
	static dishContainerRef;
	constructor(index, syrupSound)
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
				this.img = GameManager.scene.physics.add.sprite(config.width * 0.25,config.height * 0.43,'assets_atlas','spr_syrup_strawberry'); 
			break;

			case 1:
				this.img = GameManager.scene.physics.add.sprite(config.width * 0.31 ,config.height * 0.43,'assets_atlas','spr_syrup_chocolate'); 
			break;

			case 2:
				this.img = GameManager.scene.physics.add.sprite(config.width * 0.37 ,config.height * 0.43,'assets_atlas','spr_syrup_caramel'); 
			break;

			default:
				console.log("No img assigned");
			break;
		}
		this.img.setDepth(2);
		
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
		TutorialSyrup.dishContainerRef = container;
		container.img.removeInteractive();
		//container.dishContainer.add(food); add sauce sprite to noodle

	}

	syrupServed()
	{
		this.syrupSound.stop();
		this.img.setPosition(this.posx,this.posy);
		//makeDishInteractive(this.dishContainer,"pancakeDish");
		console.log("syrup served");

		//case 10
		TipLogic.currentInstance.endCase10();
	}
}

class TutorialSauce
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

class TutorialDishContainer
{
	constructor(dishImg, assignedSlot)
	{
		this.assignedSlot = assignedSlot;
		this.posx;
		this.posy;
		this.hovering = false;
		this.img = dishImg; //Img of the dish
		this.dish; //Object from the class Dish
		this.dishContainer = GameManager.scene.add.container(dishImg.x, dishImg.y);
		this.img.setPosition(0,0); //If this is not done, then the image would not appear in the scene
		this.dishContainer.add(this.img);
		this.clientCollider;
	}

	addToContainer(img, xOffset, yOffset)
	{
		img.setPosition(img.x + xOffset, img.y + yOffset);
		this.dishContainer.add(img);
	}

	dragEndBehaviour()
	{
		if(this.hovering == true)
		{
			console.log("DISH drag end AND WAS HOVERING WITH CLIENT");
			this.hovering = false;
			this.clientCollider = GameManager.scene.physics.add.overlap(this.img, GameManager.collidingObjectImg, this.dragToClient, null, this);
		}
		else
		{
			this.dishContainer.setPosition(this.posx,this.posy);
			grabItem("", null, null);
		}
		
	}

	//IMPLEMENT ALL THE LOGIC, this works for the pancakes and the noodles
	dragToClient(dishImg, clientImg)
	{
		TipLogic.currentInstance.endCase11();
		console.log("dish dragged to client");
		GameManager.scene.physics.world.removeCollider(this.clientCollider);
		
		if(GameManager.grabbedItemClass = "pancakeDish"){
			GameManager.dishImgContainerPancake.remove(this);
			GameManager.tableclothsPancake.occupiedSlots--;
			TableclothsPancake.slots.getAt(this.assignedSlot).occupied = false;
		}
		else if(GameManager.grabbedItemClass = "noodleDish"){ //Free the tablecloth, remove the order img, remo
			GameManager.dishImgContainerNoodles.remove(this);
			GameManager.tableclothsNoodle.occupiedSlots--;
			TableclothsNoodle.slots.getAt(this.assignedSlot).occupied = false;
		} 
		
		this.dishContainer.iterate(function(child){
			//child.disableBody(true,true);
			child.setAlpha(0);
		});
		clientImg.setAlpha(1);

		var dish = this.dish; // aquí te dejo al objeto de la clase Dish
		var client = GameManager.collidingObject; //El cliente con el que ha colisionado, objeto de la clase Client
		client.compareOrderWithDish(dish);
		grabItem("", null, null);
	}
}