class Coffee
{
	static coffeeTime = 8; //8
	constructor(assignedSlot, fillingSound, readySound)
	{
		this.index = 0;
		this.img = GameManager.scene.physics.add.sprite(0,0,'anim_coffee');
		this.posx;
		this.posy;
		GameManager.coffeeContainer;
		this.imgContainer;
		this.assignedSlot = assignedSlot;
		this.hovering = false;
		this.done = false;
		this.doneTime = Math.abs(GameManager.scene.playerSettings.upgrades.coffeeTime - Coffee.coffeeTime);
		this.timer = GameManager.scene.time.addEvent({ delay: this.doneTime*1000, callback: this.coffeeDone, callbackScope: this });
		this.clientCollider;
		this.dish;
		this.fillingSound = fillingSound;
		this.readySound = readySound;
		this.fillingSound.play();
		this.img.setDepth(3);
		var time = this.doneTime;
		var animation = GameManager.scene.anims.create({
    		key: 'fillCoffee',
    		frames: GameManager.scene.anims.generateFrameNumbers('anim_coffee', { start: 0, end: 21}),
    		duration: 1000*time,
    		repeat: 0
		});
		this.img.anims.play('fillCoffee');
		CoffeeMachine.playAnim(this.assignedSlot);
	}

	coffeeDone()
	{
		CoffeeMachine.stopAnim(this.assignedSlot);
		this.readySound.play();
		this.fillingSound.stop();
		this.done = true;

		this.dish = new Dish([this.index]);
		GameManager.coffeeDishes.add(this);
		this.img.setInteractive({ draggable: true, pixelPerfect: true});
		makeImgInteractive("coffeeDish", this.img, this, null, true);
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
	static pancakesList = new Phaser.Structs.List();
	static time = 7;
	constructor(assignedSlot, trashSound, cookingSound, burntSound, readySound, posx, posy)
	{
		Pancake.pancakesList.add(this);
		this.index = 1;
		this.posx = posx;
		this.posy = posy;
		this.side1Done = false;
		this.side2Done = false;
		this.flipped = false;
		this.burnt = false;
		this.hovering = false;
		this.assignedSlot = assignedSlot;
		this.img = GameManager.scene.physics.add.sprite(posx,posy,'assets_atlas','spr_pancake_cooking');
		this.trashCollider;
		this.dishCollider;
		this.doneTime = Math.abs(GameManager.scene.playerSettings.upgrades.pancakeTime - Pancake.time);
		this.burnTime = Math.abs(GameManager.scene.playerSettings.upgrades.pancakeBurnTime - (Pancake.time*2*5));

		var pancake = this;
		this.img.setDepth(2);
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

        this.animImg = GameManager.scene.physics.add.sprite(posx,posy-config.height*0.04,'anim_pancake');
        
        var animation = GameManager.scene.anims.create({
    		key: 'doPancake',
    		frames: GameManager.scene.anims.generateFrameNumbers('anim_pancake', { start: 0, end: 4}),
    		frameRate: 8,
    		repeat: -1
		});

		this.animImg.anims.play('doPancake');
	}

	/* Called when the current side of the pancake is done */
	sideDone()
	{
		var pancake = this;
		if(!this.side1Done)
		{
			this.readySound.play();
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
				this.setDepth(this.depth+5);
				pancake.animImg.setAlpha(0);
				pancake.sideTimer.paused = true;
        		pancake.burnTimer.paused = true;	
			})

        	this.img.on('drag', function(pointer, dragX, dragY){
        		this.setPosition(dragX, dragY);
        		pancake.cookingSound.stop();
        		grabItem("pancake", this, pancake);
        	})	
			
			this.img.on('dragend',() => {
				pancake.img.setDepth(pancake.img.depth-5);
				pancake.animImg.setAlpha(1);
				pancake.cookingSound.play();	
				pancake.dragEndBehaviour();		
       		})
       		
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
        this.burnTimer.remove(false);
		this.sideTimer = GameManager.scene.time.addEvent({ delay: this.doneTime*1000, callback: this.sideDone, callbackScope: this });
        this.burnTimer = GameManager.scene.time.addEvent({ delay: this.burnTime*1000, callback: this.burnPancake, callbackScope: this });
	}

	/* Method called when the pancake has spent too much time in the griddle */
	burnPancake()
	{
		this.animImg.destroy();
		this.cookingSound.stop();
		this.cookingSound.setMute(true);
		this.burntSound.play();
		this.sideTimer.remove(false);
		this.burnTimer.remove(false);
		this.burnt = true;
		var pancake = this;
		this.img.setTexture('assets_atlas','spr_pancake_burnt');

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
		this.animImg.destroy();
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
		// If the dish already is created the is no need to create another dish, just add the pancake and update the dish
		if(container.dish == null)
		{
			container.dish = new Dish([this.index,-1,1,0]);
			makeDishInteractive(container,"pancakeDish");
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
		this.animImg.destroy();
		this.trashSound.play();
		trashCan.setAlpha(1);
		food.destroy();
		//food.disableBody(true,true);
		this.freeGriddle();		
	}

	freeGriddle()
	{
		Pancake.pancakesList.remove(this);
		this.sideTimer.remove(false);
        this.burnTimer.remove(false);
		GameManager.griddle.occupiedSlots--;
		Griddle.slots.getAt(this.assignedSlot).occupied = false;
	}
}

class Noodles
{
	static noodlesList = new Phaser.Structs.List();
	static doneTime = 3; //10
	static burnTime = 5; //17
	constructor(assignedSlot, trashSound, cookingSound, burntSound, readySound)
	{
		//spr_noodles la que se pone en el plato
		//anim_pot_noodles_cooking la que se mete en la olla
		//anim_pot_noodles_burnt la que se mete en la olla cuando están quemados
		//spr_noodles_cooked cuando los sacas de la olla
		//spr_noodles_burnt cuando los sacas de la olla quemados
		this.posx;
		this.posy;
		this.index = 2;
		this.assignedSlot = assignedSlot;
		this.cookedImg;
		switch(assignedSlot)
		{
			case 0:
				this.img = GameManager.scene.physics.add.sprite(0,0,'anim_pot_noodles_cooking_0');
			break;

			case 1:
				this.img = GameManager.scene.physics.add.sprite(0,0,'anim_pot_noodles_cooking_1');
			break;

			case 2:
				this.img = GameManager.scene.physics.add.sprite(0,0,'anim_pot_noodles_cooking_2');
			break;

			case 3:
				this.img = GameManager.scene.physics.add.sprite(0,0,'anim_pot_noodles_cooking_3');
			break;
		}
		
		//this.img = GameManager.scene.physics.add.sprite(0,0,'spr_noodles_cooking');
		this.burnt = false;
		this.trashCollider;
		this.dishCollider;
		this.cookedImg = GameManager.scene.physics.add.sprite(0,0,'assets_atlas','spr_noodles_cooked');
		this.noodleTime = Math.abs(GameManager.scene.playerSettings.upgrades.noodleTime - Noodles.doneTime);
		this.noodleBurnTime = Math.abs(GameManager.scene.playerSettings.upgrades.noodleBurnTime - Noodles.burnTime);
		this.img.setDepth(2);
		this.doneTimer = GameManager.scene.time.addEvent({ delay: this.noodleTime*1000, callback: this.noodlesDone, callbackScope: this });
        this.burnTimer = GameManager.scene.time.addEvent({ delay: this.noodleBurnTime*1000, callback: this.noodlesBurnt, callbackScope: this });
	
		this.trashSound = trashSound;
        this.cookingSound = cookingSound;
        this.burntSound = burntSound;
        this.readySound = readySound;
        this.cookingSound.play();

        GameManager.animatedStrainerImg.anims.play('potCooking');
        GameManager.animatedStrainerImg.setAlpha(1);
        Noodles.noodlesList.add(this);

        var cookingAnimation = GameManager.scene.anims.create({
    		key: 'noodles_cooking_'+assignedSlot,
    		frames: GameManager.scene.anims.generateFrameNumbers('anim_pot_noodles_cooking_' + assignedSlot, { start: 0, end: 2}),
    		frameRate: 12,
    		repeat: -1
		});

		this.img.anims.play('noodles_cooking_'+assignedSlot);
	}

	noodlesDone()
	{
		var auxImg = GameManager.scene.physics.add.sprite(this.img.x,this.img.y,'anim_pot_noodles_done_'+this.assignedSlot);
		auxImg.setDepth(1);
		this.img.destroy();
		this.img = null;
		this.img = auxImg;
		var burntCookingAnimation = GameManager.scene.anims.create({
    		key: 'noodles_done_'+this.assignedSlot,
    		frames: GameManager.scene.anims.generateFrameNumbers('anim_pot_noodles_done_' +this.assignedSlot, { start: 0, end: 2}),
    		frameRate: 12,
    		repeat: -1
		});
		this.img.anims.play('noodles_done_'+this.assignedSlot);
		
		this.readySound.play();
		this.cookingSound.setMute(true);
		this.makeNoodleInteractive();
	}

	makeNoodleInteractive()
	{
		var noodles = this;

		this.img.setInteractive({ draggable: true});

		this.img.on('dragstart', function(pointer,dragX,dragY){
			GameManager.tapSound.play();
			this.setAlpha(0);
			this.setDepth(5);
			noodles.cookedImg.setAlpha(1);
			noodles.cookedImg.setDepth(5);
			noodles.posx = this.x;
			noodles.posy = this.y;	
			noodles.doneTimer.paused = true;
        	noodles.burnTimer.paused = true;
		})

    	this.img.on('drag', function(pointer, dragX, dragY){
    		this.setPosition(dragX, dragY);
    		noodles.cookedImg.setPosition(dragX, dragY);
    		noodles.cookingSound.stop();
    		grabItem("noodles", noodles.cookedImg, noodles);
    	})	
		
		this.img.on('dragend',() => {
			noodles.cookingSound.play();
			this.img.setAlpha(1);
			this.img.setDepth(2);
			noodles.cookedImg.setAlpha(0);
			noodles.dragEndBehaviour();
    	})
	}

	noodlesBurnt()
	{
		var auxImg = GameManager.scene.physics.add.sprite(this.img.x,this.img.y,'anim_pot_noodles_burnt_'+this.assignedSlot);
		auxImg.setDepth(1);
		this.img.destroy();
		this.img = null;
		this.img = auxImg;
		var burntCookingAnimation = GameManager.scene.anims.create({
    		key: 'noodles_burnt_'+this.assignedSlot,
    		frames: GameManager.scene.anims.generateFrameNumbers('anim_pot_noodles_burnt_' +this.assignedSlot, { start: 0, end: 2}),
    		frameRate: 12,
    		repeat: -1
		});
		this.img.anims.play('noodles_burnt_'+this.assignedSlot);
		this.cookingSound.stop();
		this.cookingSound.setMute(true);
		this.burntSound.play();
		
		this.cookedImg.setTexture('assets_atlas','spr_noodles_burnt');
		this.burnt = true;
		this.makeNoodleInteractive();
	}

	dragEndBehaviour()
	{
		if(this.hovering)
		{
			this.trashCollider = GameManager.scene.physics.add.overlap(this.cookedImg, GameManager.trashCanImgNoodles, this.throwFood, null, this);
			this.hovering = false;
			if(!this.burnt) this.dishCollider = GameManager.scene.physics.add.overlap(this.cookedImg, GameManager.collidingObjectImg, this.dragToDish, null, this);
		}
		else
		{
			var pos = Strainer.slots.getAt(this.assignedSlot);
           	this.cookedImg.setPosition(pos.x, pos.y-config.height*0.03); 
           	this.img.setPosition(pos.x, pos.y-config.height*0.03); 
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
		trashCan.setAlpha(1);
		food.destroy();
		this.img.destroy();
		this.freeStrainer();		
	}

	freeStrainer()
	{
		Noodles.noodlesList.remove(this);
		this.checkOtherNoodles();
		this.doneTimer.remove(false);
        this.burnTimer.remove(false);
		GameManager.strainer.occupiedSlots--;
		Strainer.slots.getAt(this.assignedSlot).occupied = false;
	}

	dragToDish(food, dishImg)
	{
		GameManager.scene.physics.world.removeCollider(this.trashCollider);
		GameManager.scene.physics.world.removeCollider(this.dishCollider);

		var container = GameManager.collidingObject;
		container.dishContainer.iterate(function(child){
			child.setAlpha(1);
		});
		food.destroy();
		this.img.destroy();
		var noodleInDish = GameManager.scene.add.image(dishImg.x,dishImg.y-config.height*0.01,'assets_atlas','spr_noodles');
		this.freeStrainer();
		/* Update dish and create sprite according to the dish */
		if(container.dish == null)
		{
			container.dish = new Dish([this.index,-1,0]);
			container.dishContainer.add(noodleInDish);
			//container.dishContainer.sendToBack(noodleInDish);
			container.dishContainer.sendToBack(container.img);
			if(container.sauce != -1) container.dish.sauce = container.sauce;
			for(var i=0; i<container.toppings.length; i++)
			{
				container.dish.addTopping(container.toppings.getAt(i));
			}
			makeDishInteractive(container,"noodleDish");
			console.log("dish num toppings: " + container.toppings.length);
		}	
	}

	checkOtherNoodles()
	{
		var numDone=0;
		for(var i=0; i<Noodles.noodlesList.length; i++)
		{
			if(Noodles.noodlesList.getAt(i).burnt==true) numDone++;
		}
		if(numDone == Noodles.noodlesList.length) GameManager.animatedStrainerImg.setAlpha(0);
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
		this.imgKey;
		var staticImgKey;
		var offset = !pancake ? offset = config.width : offset = 0;
		var xMul;
		var yMul;
		switch(this.index)
		{	
			case 0:
				if(pancake) { staticImgKey = 'spr_topping_lacasitos'; this.imgKey='spr_pancake_lacasitos'; xMul=0.3; yMul=0.9;}
				else { staticImgKey = 'spr_bg_topping_mushroom'; this.imgKey = 'spr_topping_mushroom'; xMul=0.5; yMul=0.545;}

				this.img = GameManager.scene.physics.add.sprite(config.width*xMul + offset,config.height*yMul,'assets_atlas',this.imgKey); 
				this.staticImg = GameManager.scene.add.image(config.width*xMul + offset,config.height*yMul,'assets_atlas',staticImgKey);
			break;

			case 1:
				if(pancake) { staticImgKey = 'spr_topping_coconut'; this.imgKey = 'spr_pancake_coconut'; xMul=0.385; yMul=0.9;}
				else { staticImgKey = 'spr_bg_topping_egg'; this.imgKey = 'spr_topping_egg'; xMul=0.5; yMul=0.675}

				this.img = GameManager.scene.physics.add.sprite(config.width*xMul + offset,config.height*yMul,'assets_atlas',this.imgKey); 
				this.staticImg = GameManager.scene.add.image(config.width*xMul + offset,config.height*yMul,'assets_atlas',staticImgKey);
			break;

			case 2:
				if(pancake) { staticImgKey = 'spr_topping_strawberry'; this.imgKey = 'spr_pancake_strawberry'; xMul=0.47; yMul=0.9;}
				else { staticImgKey = 'spr_bg_topping_naruto'; this.imgKey = 'spr_topping_naruto'; xMul=0.63; yMul=0.553}

				this.img = GameManager.scene.physics.add.sprite(config.width*xMul + offset,config.height*yMul,'assets_atlas',this.imgKey); 
				this.staticImg = GameManager.scene.add.image(config.width*xMul + offset,config.height*yMul,'assets_atlas',staticImgKey);
			break;

			case 3:
				if(pancake) { staticImgKey = 'spr_topping_banana'; this.imgKey = 'spr_pancake_banana'; xMul=0.56; yMul=0.9;}
				else { staticImgKey = 'spr_bg_topping_springonion'; this.imgKey = 'spr_topping_springonion'; xMul=0.65; yMul=0.695}

				this.img = GameManager.scene.physics.add.sprite(config.width*xMul + offset,config.height*yMul,'assets_atlas',this.imgKey); 
				this.staticImg = GameManager.scene.add.image(config.width*xMul + offset,config.height*yMul,'assets_atlas',staticImgKey);
			break;
			
			default:
				console.log("No img assigned");
			break;
		}
		var selfRef = this;
		this.img.setDepth(4);
		this.img.setAlpha(0);
		this.staticImg.setDepth(1);
		var clonedImg;
		clonedImg = GameManager.scene.add.image(this.staticImg.x, this.staticImg.y,'assets_atlas',staticImgKey);
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
			console.log("this.img.texture: " + this.imgKey);
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
		var numToppings=-1;
		if(this.staticImg.x > config.width) //if noodle topping
		{
			//Aqui joseluis
			if(container.dish == null)
			{
				if(container.addTopping(this.index)) //added to the list of the container
				{
					console.log("topping: " + this.index + " was added");
					numToppings = container.toppings.length;
				}
			}
			else
			{
				if(container.dish.addTopping(this.index)) //added to the list of toppings in the dish
				{
					numToppings = container.dish.numToppings;
				}
			}
		}
		else // if pancake topping
		{
			if(container.dish.addTopping(this.index)) //added to the list of toppings in the dish
			{
				numToppings = container.dish.numToppings;
			}	
		}
		this.addToppingToContainer(container, numToppings-1);
	}

	addToppingToContainer(container, numToppings)
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
}

class Syrup
{
	static servingTime = 4;
	constructor(index, syrupSound)
	{
		this.index = index;
		this.img;
		this.staticImg;
		this.hovering=false;
		this.posx;
		this.posy;
		this.collider;
		this.servingTimer;
		this.syrupSound = syrupSound;
		this.dishContainer;
		this.animIdleKey;
		this.animPlayKey; 
		this.animKey;
		this.syrupImg;

		switch(this.index)
		{
			case 0:
				this.animPlayKey = 'anim_syrup_strawberry_play'; 
				this.animKey = 'anim_syrup_strawberry'; 
				this.animIdleKey = 'anim_syrup_strawberry_idle';
				this.img = GameManager.scene.physics.add.sprite(config.width * 0.25,config.height * 0.435,'anim_syrup_strawberry'); 
				this.staticImg = GameManager.scene.physics.add.sprite(config.width * 0.25,config.height * 0.435,'assets_atlas','spr_syrup_strawberry');  
			break;

			case 1:
				this.animPlayKey = 'anim_syrup_chocolate_play'; 
				this.animKey = 'anim_syrup_chocolate';
				this.animIdleKey = 'anim_syrup_chocolate_idle'; 
				this.img = GameManager.scene.physics.add.sprite(config.width * 0.31 ,config.height * 0.435,'anim_syrup_chocolate'); 
				this.staticImg = GameManager.scene.physics.add.sprite(config.width * 0.31,config.height * 0.435,'assets_atlas','spr_syrup_chocolate');  
			break;

			case 2:
				this.animPlayKey = 'anim_syrup_caramel_play'; 
				this.animKey = 'anim_syrup_caramel';
				this.animIdleKey = 'anim_syrup_caramel_idle'; 
				this.img = GameManager.scene.physics.add.sprite(config.width * 0.37 ,config.height * 0.435,'anim_syrup_caramel');
				this.staticImg = GameManager.scene.physics.add.sprite(config.width * 0.37,config.height * 0.435,'assets_atlas','spr_syrup_caramel');   
			break;

			default:
				console.log("No img assigned");
			break;
		}
		this.img.setDepth(2);
		this.staticImg.setDepth(2);
		makeImgInteractive("syrup", this.staticImg, this, null, false);
		var _animPlayKey = this.animPlayKey;
		var _animKey = this.animKey;
		var _animIdleKey = this.animIdleKey;
		GameManager.scene.anims.create({
    		key: _animPlayKey,
    		frames: GameManager.scene.anims.generateFrameNumbers(_animKey, { start: 0, end: 15}),
    		duration: 1000*Syrup.servingTime,
    		repeat: 1
		});
		GameManager.scene.anims.create({
    		key: _animIdleKey,
    		frames: [ { key: _animKey, frame: 0 } ],
    		frameRate: 20
		});

		this.img.disableBody(true,true);
	}

	dragEndBehaviour()
	{
		if(this.hovering)
		{
			this.hovering = false;
			this.collider = GameManager.scene.physics.add.overlap(this.staticImg, GameManager.collidingObjectImg, this.serveSyrup, null, this);
		}
		else
		{
           	this.staticImg.setPosition(this.posx, this.posy); 
		}
		grabItem("", null, null); 
	}

	serveSyrup(sauceImg, dishImg)
	{	
		this.syrupSound.play();
		var container = GameManager.collidingObject;
		container.dishContainer.iterate(function(child){
			child.setAlpha(1);
		});

		this.img.enableBody(true,container.dishContainer.x,container.dishContainer.y-config.height*0.2,true,true);
		this.img.anims.play(this.animPlayKey);

		this.collider.destroy();
		this.servingTimer = GameManager.scene.time.addEvent({ delay: Syrup.servingTime*1000, callback: this.syrupServed, callbackScope: this });
		this.staticImg.removeInteractive();
		console.log("serving syrup");

		container.dish.sauce = this.index;
		this.dishContainer = container;
		container.img.removeInteractive();
		this.staticImg.disableBody(true,true);
		//container.dishContainer.add(food); add syrup sprite to noodle
	}

	syrupServed()
	{
		var syrupKey;
		switch(this.index)
		{
			case 0:
				syrupKey = 'spr_topping_syrup_strawberry';
			break;

			case 1:
				syrupKey = 'spr_topping_syrup_chocolate';
			break;

			case 2:
				syrupKey = 'spr_topping_syrup_caramel';
			break;
		}
		var syrupImg = GameManager.scene.add.sprite(0, 0,'assets_atlas', syrupKey);
		syrupImg.setDepth(1);
		this.dishContainer.addToContainer(syrupImg,0,0);
		this.img.anims.play(this.animIdleKey);
		this.staticImg.enableBody(true,this.posx,this.posy,true,true);
		this.img.disableBody(true,true);
		this.syrupSound.stop();
		this.img.setPosition(this.posx,this.posy);
		makeImgInteractive("syrup", this.staticImg, this, null, false);
		makeDishInteractive(this.dishContainer,"pancakeDish");
	}
}

class Sauce
{
	static servingTime = 4;
	constructor(index, fillingSound)
	{
		this.index = index;
		this.img;
		this.hovering=false;
		this.posx;
		this.posy;
		this.servingTimer;
		this.fillingSound = fillingSound;
		this.dishContainer;
		this.animIdleKey;
		this.animPlayKey; 
		this.animKey;
		this.addedSauceImgKey;
		switch(this.index)
		{
			case 0:
				this.animPlayKey = 'anim_ladle_shoyu_play'; 
				this.animKey = 'anim_ladle_shoyu'; 
				this.animIdleKey = 'anim_ladle_shoyu_idle';
				this.img = GameManager.scene.physics.add.sprite(config.width + config.width*0.28, config.height*0.94,'anim_ladle_shoyu');
				this.addedSauceImgKey = 'spr_sauce_shoyu';
			break;

			case 1:
				this.animPlayKey = 'anim_ladle_shio_play'; 
				this.animKey = 'anim_ladle_shio'; 
				this.animIdleKey = 'anim_ladle_shio_idle';
				this.img = GameManager.scene.physics.add.sprite(config.width + config.width*0.4, config.height*0.94,'anim_ladle_shio');
				this.addedSauceImgKey = 'spr_sauce_shio';
			break;

			case 2:
				this.animPlayKey = 'anim_ladle_kimuchi_play'; 
				this.animKey = 'anim_ladle_kimuchi'; 
				this.animIdleKey = 'anim_ladle_kimuchi_idle';
				this.img = GameManager.scene.physics.add.sprite(config.width + config.width*0.52,config.height*0.94,'anim_ladle_kimuchi');
				this.addedSauceImgKey = 'spr_sauce_kimuchi';
			break;

			case 3:
				this.animPlayKey = 'anim_ladle_miso_play'; 
				this.animKey = 'anim_ladle_miso'; 
				this.animIdleKey = 'anim_ladle_miso_idle';
				this.img = GameManager.scene.physics.add.sprite(config.width + config.width*0.64,config.height*0.94,'anim_ladle_miso');
				this.addedSauceImgKey = 'spr_sauce_miso';
			break;

			default:
				console.log("No img assigned");
			break;
		}
		this.img.setDepth(2);
		this.img.setInteractive({ draggable: true, pixelPerfect: true});
		makeImgInteractive("sauce", this.img, this, null, true);
		var _animPlayKey = this.animPlayKey;
		var _animKey = this.animKey;
		var _animIdleKey = this.animIdleKey;
		GameManager.scene.anims.create({
    		key: _animPlayKey,
    		frames: GameManager.scene.anims.generateFrameNumbers(_animKey, { start: 0, end: 11}),
    		duration: 1000*Sauce.servingTime,
    		repeat: 1
		});

		GameManager.scene.anims.create({
    		key: _animIdleKey,
    		frames: [ { key: _animKey, frame: 0 } ],
    		frameRate: 20
		});
	}

	dragEndBehaviour()
	{
		if(this.hovering)
		{
			this.hovering = false;
			if(checkOverlap(this.img, GameManager.collidingObjectImg)) this.serveSauce(this.img, GameManager.collidingObjectImg);
		}
		else
		{
           	this.img.setPosition(this.posx, this.posy); 
		}
		grabItem("", null, null); 
	}

	serveSauce(sauceImg, dishImg)
	{
		this.fillingSound.play();
		var container = GameManager.collidingObject;
		container.dishContainer.iterate(function(child){
			child.setAlpha(1);
		});
		sauceImg.x = container.dishContainer.x+ config.width*0.033;
		sauceImg.y = container.dishContainer.y-config.height*0.18;
		this.img.anims.play(this.animPlayKey);

		//this.collider.destroy();
		this.servingTimer = GameManager.scene.time.addEvent({ delay: Sauce.servingTime*1000, callback: this.sauceServed, callbackScope: this });
		this.img.disableInteractive();

		if(container.dish != null)
		{
			container.dish.sauce = this.index;
		}
		else
		{
			container.sauce = this.index;
		}
		this.dishContainer = container;
		container.img.removeInteractive();
	}

	sauceServed()
	{
		var addedSauceImg = GameManager.scene.add.image(0,0,'assets_atlas',this.addedSauceImgKey);
		this.dishContainer.dishContainer.add(addedSauceImg); 
		this.img.anims.play(this.animIdleKey);
		this.fillingSound.stop();
		this.img.setPosition(this.posx,this.posy);
		this.img.setInteractive();
		//makeImgInteractive("sauce", this.img, this, null, false);
		makeDishInteractive(this.dishContainer,"noodleDish");
	}
}