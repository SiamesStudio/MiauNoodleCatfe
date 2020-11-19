class TutorialCoffee
{
	static ref;
	static coffeeTime = 5; //8 
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
		this.clientCollider;
		this.dish;
		this.fillingSound = fillingSound;
		this.readySound = readySound;
		this.fillingSound.play();
		TutorialCoffee.ref = this;
		TutorialManager.coffeeImg = this.img;
		TutorialManager.tipDataContainer.getAt(7).srcImg = this.img;
		this.img.setDepth(3);
		var animation = GameManager.scene.anims.create({
    		key: 'fillCoffee',
    		frames: GameManager.scene.anims.generateFrameNumbers('anim_coffee', { start: 0, end: 21}),
    		duration: 1000*TutorialCoffee.coffeeTime,
    		repeat: 0
		});
		this.img.anims.play('fillCoffee');
		CoffeeMachine.playAnim(this.assignedSlot);
		TipLogic.currentInstance.endGlassesInteractivity(TutorialManager.glassesImg);
	}

	coffeeDone() //only call from tipLogic
	{
		CoffeeMachine.stopAnim(this.assignedSlot);
		this.readySound.play();
		this.fillingSound.stop();
		this.done = true;
		this.img.setPipeline('GlowFilter');
		this.dish = new Dish([this.index]);
		GameManager.coffeeDishes.add(this);

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
	static time = 5;
	constructor(assignedSlot, trashSound, cookingSound, readySound, posx, posy)
	{
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
		this.dishCollider;
		this.container;
		this.doneTime = TutorialPancake.time;
		this.img.setDepth(2);
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
		this.container = container;
		// If the dish already is created the is no need to create another dish, just add the pancake and update the dish
		if(container.dish == null)
		{
			container.dish = new Dish([this.index,-1,1,0]);
			// case 6
			TipLogic.currentInstance.endPancakeDraggedToDish(food);
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

	freeGriddle()
	{
		this.sideTimer.remove(false);
		GameManager.griddle.occupiedSlots--;
		Griddle.slots.getAt(this.assignedSlot).occupied = false;
	}
}

class TutorialNoodles
{
	static noodlesList = new Phaser.Structs.List();
	static doneTime = 5; //10
	constructor(assignedSlot, trashSound, cookingSound, readySound)
	{
		this.posx;
		this.posy;
		this.index = 2;
		this.assignedSlot = assignedSlot;
		this.img = GameManager.scene.physics.add.sprite(0,0,'assets_atlas','spr_noodles');
		this.burnt = false;
		this.dishCollider;
		this.cookedImg;
		this.noodleTime = TutorialNoodles.doneTime;
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
		this.img.setDepth(2);
		this.trashSound = trashSound;
        this.cookingSound = cookingSound;
        this.cookedImg = GameManager.scene.physics.add.sprite(0,0,'assets_atlas','spr_noodles_cooked');
        this.readySound = readySound;
        this.cookingSound.play();
        GameManager.animatedStrainerImg.anims.play('potCooking');
        GameManager.animatedStrainerImg.setAlpha(1);
        TutorialNoodles.noodlesList.add(this);

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
		this.readySound.play();

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
		this.img.setPipeline('GlowFilter');
		this.cookedImg.setPipeline('GlowFilter');
		this.img.anims.play('noodles_done_'+this.assignedSlot);

		this.cookingSound.setMute(true);
		//case23
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

	dragEndBehaviour()
	{
		if(this.hovering)
		{
			this.hovering = false;
			this.dishCollider = GameManager.scene.physics.add.overlap(this.cookedImg, GameManager.collidingObjectImg, this.dragToDish, null, this);
		}
		else
		{
			var pos = Strainer.slots.getAt(this.assignedSlot);
           	this.img.setPosition(pos.x, pos.y); 
           	this.cookedImg.setPosition(pos.x, pos.y); 

		}
		grabItem("", null, null); 
	}

	freeStrainer()
	{
		Noodles.noodlesList.remove(this);
		this.checkOtherNoodles();
		GameManager.strainer.occupiedSlots--;
		Strainer.slots.getAt(this.assignedSlot).occupied = false;
	}

	dragToDish(food, dishImg)
	{
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
			container.dishContainer.sendToBack(container.img);
			if(container.sauce != -1) container.dish.sauce = container.sauce;
			for(var i=0; i<container.toppings.length; i++)
			{
				container.dish.addTopping(container.toppings.getAt(i));
			}
		}
		TipLogic.currentInstance.endCase23();		
	}

	checkOtherNoodles()
	{
		var numDone=0;
		for(var i=0; i<TutorialNoodles.noodlesList.length; i++)
		{
			if(TutorialNoodles.noodlesList.getAt(i).burnt==true) numDone++;
		}
		if(numDone == TutorialNoodles.noodlesList.length) GameManager.animatedStrainerImg.setAlpha(0);
	}
}

class TutorialTopping
{
	static noodleTopRef;
	static pancakeTopRef;
	constructor(index, pancake, toppingSound)
	{
		this.index = index;
		this.pancake = pancake;
		this.img;
		this.staticImg;
		this.hovering=false;
		this.posx;
		this.posy;
		this.collider;
		this.toppingSound = toppingSound;
		this.imgKey;
		var staticImgKey;
		this.staticImgKey;
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
				if(pancake) {TutorialTopping.pancakeTopRef = this; staticImgKey = 'spr_topping_strawberry'; this.imgKey = 'spr_pancake_strawberry'; xMul=0.47; yMul=0.9;}
				else { staticImgKey = 'spr_bg_topping_naruto'; this.imgKey = 'spr_topping_naruto'; xMul=0.63; yMul=0.553}

				this.img = GameManager.scene.physics.add.sprite(config.width*xMul + offset,config.height*yMul,'assets_atlas',this.imgKey); 
				this.staticImg = GameManager.scene.add.image(config.width*xMul + offset,config.height*yMul,'assets_atlas',staticImgKey);
			break;

			case 3:
				if(pancake) { staticImgKey = 'spr_topping_banana'; this.imgKey = 'spr_pancake_banana'; xMul=0.56; yMul=0.9;}
				else {TutorialTopping.noodleTopRef = this; staticImgKey = 'spr_bg_topping_springonion'; this.imgKey = 'spr_topping_springonion'; xMul=0.65; yMul=0.695}

				this.img = GameManager.scene.physics.add.sprite(config.width*xMul + offset,config.height*yMul,'assets_atlas',this.imgKey); 
				this.staticImg = GameManager.scene.add.image(config.width*xMul + offset,config.height*yMul,'assets_atlas',staticImgKey);
			break;
			
			default:
				console.log("No img assigned");
			break;
		}
		
		this.img.setDepth(4);
		this.img.setAlpha(0);
		this.staticImg.setDepth(1);
		this.staticImgKey = staticImgKey;
	}

	makeToppingInteractive()
	{
		this.staticImg.setPipeline('GlowFilter');
		
		var selfRef = this;
		var clonedImg;
		clonedImg = GameManager.scene.add.image(this.staticImg.x, this.staticImg.y,'assets_atlas',this.staticImgKey);
		clonedImg.setAlpha(0.2);
		TutorialManager.toppingImg = clonedImg;
		clonedImg.setInteractive({draggable: true});

		clonedImg.on('dragstart', function(pointer,dragX,dragY){
			GameManager.tapSound.play();
			selfRef.img.setAlpha(1);
			clonedImg.setAlpha(0);
			selfRef.posx = this.x;
			selfRef.posy = this.y;
			selfRef.img.setPipeline('GlowFilter');	
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
			selfRef.img.resetPipeline();
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
		// case 9
		this.staticImg.resetPipeline();
		if(this.pancake)TipLogic.currentInstance.endCase9();
		else{TipLogic.currentInstance.endCase24()}	
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

class TutorialSyrup
{
	static servingTime = 4;
	static ref;
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
				TutorialSyrup.ref = this;
				TutorialManager.syrupImg = this.staticImg;
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
		//makeImgInteractive("syrup", this.staticImg, this, null, false);
		var _animPlayKey = this.animPlayKey;
		var _animKey = this.animKey;
		var _animIdleKey = this.animIdleKey;
		GameManager.scene.anims.create({
    		key: _animPlayKey,
    		frames: GameManager.scene.anims.generateFrameNumbers(_animKey, { start: 0, end: 15}),
    		duration: 1000*Syrup.servingTime,
    		repeat: 0
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
		this.img.setPipeline('GlowFilter');
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
		this.img.resetPipeline();
		this.staticImg.resetPipeline();
		this.staticImg
		this.img.anims.play(this.animIdleKey);
		this.staticImg.enableBody(true,this.posx,this.posy,true,true);
		this.img.disableBody(true,true);
		this.syrupSound.stop();
		this.img.setPosition(this.posx,this.posy);
		makeImgInteractive("syrup", this.staticImg, this, null, false);
		console.log("syrup served");

		//case 10
		TipLogic.currentInstance.endCase10();
	}
}

class TutorialSauce
{
	static servingTime = 4; //4
	static ref;
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
				TutorialSauce.ref = this;
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
		
		var _animPlayKey = this.animPlayKey;
		var _animKey = this.animKey;
		var _animIdleKey = this.animIdleKey;
		GameManager.scene.anims.create({
    		key: _animPlayKey,
    		frames: GameManager.scene.anims.generateFrameNumbers(_animKey, { start: 0, end: 11}),
    		duration: 1000*Sauce.servingTime,
    		repeat: 0
		});

		GameManager.scene.anims.create({
    		key: _animIdleKey,
    		frames: [ { key: _animKey, frame: 0 } ],
    		frameRate: 20
		});
	}

	makeSauceInteractive()
	{
		//case22
		this.img.setPipeline('GlowFilter');
		this.img.setInteractive({ draggable: true, pixelPerfect: true});
		makeImgInteractive("sauce", this.img, this, null, true);
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
		this.fillingSound.play();
		var container = GameManager.collidingObject;
		container.dishContainer.iterate(function(child){
			child.setAlpha(1);
		});
		sauceImg.x = container.dishContainer.x+ config.width*0.033;
		sauceImg.y = container.dishContainer.y-config.height*0.18;
		this.img.anims.play(this.animPlayKey);

		this.collider.destroy();
		this.servingTimer = GameManager.scene.time.addEvent({ delay: Sauce.servingTime*1000, callback: this.sauceServed, callbackScope: this });
		this.img.removeInteractive();
		console.log("serving sauce");

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
		TipLogic.currentInstance.endCase22(this.img);
		var addedSauceImg = GameManager.scene.add.image(0,0,'assets_atlas',this.addedSauceImgKey);
		this.dishContainer.dishContainer.add(addedSauceImg); 
		this.img.anims.play(this.animIdleKey);
		this.fillingSound.stop();
		this.img.setPosition(this.posx,this.posy);
		//makeImgInteractive("sauce", this.img, this, null, false);
		//makeDishInteractive(this.dishContainer,"noodleDish");
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
		this.toppings = new Phaser.Structs.List();
		this.sauce=-1;
		this.dishContainer.setDepth(1);
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
			console.log("DISH drag end AND WAS HOVERING");
			//this.clientCollider = GameManager.scene.physics.add.overlap(this.img, GameManager.collidingObjectImg, this.dragToClient, null, this);
			var trashCanImg = GameManager.grabbedItemClass == "pancakeDish" ? GameManager.trashCanImgPancake : GameManager.trashCanImgNoodles;

			if(checkOverlap(this.img, trashCanImg)) this.dragToTrash(this.img,trashCanImg);
			else
			{
				if(checkOverlap(this.img,GameManager.collidingObjectImg)) this.dragToClient(this.img,GameManager.collidingObjectImg);
			}
			this.hovering = false;
		}
		else
		{
			grabItem("", null, null);
			this.dishContainer.setPosition(this.posx,this.posy);
		}
	}

	//IMPLEMENT ALL THE LOGIC, this works for the pancakes and the noodles
	dragToClient(dishImg, clientImg)
	{
		console.log("dish dragged to client");
		//GameManager.scene.physics.world.removeCollider(this.clientCollider);	
		this.freeTableCloth();		
		clientImg.setAlpha(1);
		var dish = this.dish; // aquí te dejo al objeto de la clase Dish
		var client = GameManager.collidingObject; //El cliente con el que ha colisionado, objeto de la clase Client
		client.compareOrderWithDish(dish);
		grabItem("", null, null);
		TipLogic.currentInstance.endCase11();
	}

	dragToTrash(dishImg, trashImg)
	{
		console.log("dish dragged to trash");
		this.freeTableCloth();
		trashImg.setAlpha(1);
	}

	freeTableCloth()
	{
		if(GameManager.grabbedItemClass == "pancakeDish"){
			GameManager.dishImgContainerPancake.remove(this);
			GameManager.tableclothsPancake.occupiedSlots--;
			TableclothsPancake.slots.getAt(this.assignedSlot).occupied = false;
		}
		else if(GameManager.grabbedItemClass == "noodleDish"){ //Free the tablecloth, remove the order img, remo
			GameManager.dishImgContainerNoodles.remove(this);
			GameManager.tableclothsNoodle.occupiedSlots--;
			TableclothsNoodle.slots.getAt(this.assignedSlot).occupied = false;
		}
		this.dishContainer.destroy();
	}

	addTopping(toppingType)
  	{
    	var originalSize = this.toppings.length;
    	this.toppings.add(toppingType);
	
	    if(originalSize != this.toppings.length){this.numToppings++; return true;}
    	else return false;
  	}
}