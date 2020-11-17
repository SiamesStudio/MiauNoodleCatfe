var joselu = true;

class scene1 extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}

	init(gameData)
	{
		this.playerSettings;
		if(joselu)
		{
			this.playerSettings = {
            coins: 0,
            diamonds: 0,
            level: 1,
            experience: 0,
            language: false,
            audioMuted: false,
            moneySpent: 0,
            upgrades : {
                cofeeTime : 0,
                coffeeMachineLevel : 3,
                pancakeTime : 0,
                pancakeBurnTime : 0,
                pancakePanLevel : 3,
                noodleTime : 0,
                noodleBurnTime : 0,
                noodleLevel : 3,
                tableClothPancakeLevel :3,
                tableClothNoodleLevel :3, 
            	}
        	}
		}
		else
		{
			this.playerSettings = gameData.playerInfo;
        	console.log(this.playerSettings);
		}		
	}
	

	create(){
		var gm = new GameManager(this);
		this.gameTimer = this.time.addEvent({ delay: GameManager.gameMinutes*60*1000, callback: finishGame, callbackScope: this });
		this.clientsSettings();
        this.coffeeSetting();
        this.pancakesSetting();
		this.noodlesSetting();
        this.cursors = this.input.keyboard.createCursorKeys();
	}

	clientsSettings(){
    	//index, salsa, nº toppings, toppings
    	//index, salsa, nº plantas,nºtoppings, toppings
    	new Client(0, 0,[2,0,1,0], [1,-1,1,1,2]);
    	new Client(1, 1,[2,2,0], [1,-1,1,2,2,3]);
    	new Client(2, 0, [2,2,1,0], [1,1,1,0]);
    	new Client(3, 2, [2,3,1,3], [1,2,1,1,0]);
		new Client(4, 2, [2,2,1,1], [1,0,2,0]);
		new Client(5, 1, [2,0,2,1,2], [1,0,2,0])
    	console.log(Client.clientList)
    	//añadir clientes a mano
  	}

	coffeeSetting()
	{
		this.cameras.main.on('camerafadeoutcomplete', function (camera) {
            camera.fadeIn(100);
        });
		var cam = this.cameras.main;	
		var goToNoodlesButton = this.add.image(config.width*0.95,config.height*0.08, 'spr_ui_arrow');
		goToNoodlesButton.setInteractive().on('pointerdown', function(pointer){
			cam.centerOnX(config.width + config.width/2);
    	    GameManager.scene.cameras.main.fadeOut(25);
		})

		var coffeeMachineLvl = GameManager.scene.playerSettings.upgrades.coffeeMachineLevel;
		var coffeeMachineImg;
		
		var posx= config.width*0.86;
		var posy= config.height*0.5;
		switch(coffeeMachineLvl)
		{
			case 0:
				coffeeMachineImg = this.add.image(posx, posy,'assets_atlas', 'spr_coffeeMachine_0'); 
			break;
			case 1:
				coffeeMachineImg = this.add.image(posx, posy,'assets_atlas','spr_coffeeMachine_1'); 
			break;
			case 2:
				coffeeMachineImg = this.add.image(posx, posy,'assets_atlas', 'spr_coffeeMachine_2');
			break;
			case 3:
				coffeeMachineImg = this.add.image(posx, posy,'assets_atlas', 'spr_coffeeMachine_3'); 
			break;
		}
		this.add.image(config.width*0.83,config.height*0.24,'assets_atlas','spr_radio');
		var coffeeSpawnerImg = this.add.image(config.width*0.95, config.height*0.915,'assets_atlas', 'spr_glasses');

		var coffeeMachine = new CoffeeMachine(coffeeMachineImg, coffeeMachineLvl);
		GameManager.coffeeMachine = coffeeMachine;
		coffeeSpawnerImg.setInteractive();
        coffeeSpawnerImg.on('pointerdown', function(pointer){
        	if(coffeeMachine.occupiedSlots < coffeeMachineLvl+1)
        	{	
        		var slotId = findFreeSlot(coffeeMachine, CoffeeMachine.slots);
        		var pos = CoffeeMachine.slots.getAt(slotId);
        		var fillingSound = GameManager.scene.sound.add('snd_filling_catfe');
        		var readySound = GameManager.scene.sound.add('snd_ready');
        		var coffee = new Coffee(slotId, fillingSound, readySound);
        		changePosition(coffee, pos.x, pos.y);
        	} 
        })
        GameManager.tapSound = GameManager.scene.sound.add('snd_tap');
	}

	pancakesSetting()
	{
		var numTablecloth = this.playerSettings.upgrades.tableClothPancakeLevel + 1;

		var tableclothImgList = new Phaser.Structs.List();
		
        for(var i=0; i<4; i++)
        {
        	var tableclothImg;
        	switch(i)
        	{
        		case 0:
        		    tableclothImg = this.add.image(config.width*0.194, config.height*0.575,'assets_atlas', 'spr_tablecloth_0');
        		break;

        		case 1:
        			tableclothImg = this.add.image(config.width*0.3405, config.height*0.575,'assets_atlas', 'spr_tablecloth_1');
        		break;

        		case 2:
        			tableclothImg = this.add.image(config.width*0.125, config.height*0.714,'assets_atlas', 'spr_tablecloth_2');	
        		break;

        		case 3:
        			tableclothImg = this.add.image(config.width*0.297, config.height*0.714,'assets_atlas', 'spr_tablecloth_3');
        		break;

        	}
        	if(numTablecloth-1 < i) tableclothImg.setAlpha(0.3);
        	
        	tableclothImgList.add(tableclothImg);
        }

        var tableclothsPancake = new TableclothsPancake(tableclothImgList, this.playerSettings.upgrades.tableClothPancakeLevel);
        var dishPileImg = this.add.image(config.width*0.7, config.height*0.92,'assets_atlas','spr_dishes'); 
        GameManager.tableclothsPancake = tableclothsPancake; 
        dishPileImg.setInteractive();
        dishPileImg.on('pointerdown', function(pointer){
        	if(GameManager.dishImgContainerPancake.length < numTablecloth)
        	{	
        		GameManager.scene.sound.play('snd_dish');
        		var slotId = findFreeSlot(tableclothsPancake, TableclothsPancake.slots);
        		var pos = TableclothsPancake.slots.getAt(slotId);
        		var dishImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'assets_atlas','spr_dish');
        		var dishImgContainer = new DishImgContainer(dishImg, slotId);
        		GameManager.dishImgContainerPancake.add(dishImgContainer);
        	} 
        })

		var pancakeSpawnerImg = this.add.image(config.width*0.85, config.height*0.91,'spr_pancake_bottle');
        var griddleImg = this.add.image(config.width*0.56, config.height*0.625,'assets_atlas','spr_griddle');
        var griddleUpgradeLvl = this.playerSettings.upgrades.pancakePanLevel;
        var griddle = new Griddle(griddleImg, griddleUpgradeLvl);
        GameManager.griddle = griddle;

        for(var i=0; i<4; i++)
        {
        	var slotGriddleImg;
        	switch(i)
        	{
        		case 0:
        		    slotGriddleImg = this.add.image(config.width*0.51, config.height*0.535,'assets_atlas', 'spr_griddle_0');
        		break;

        		case 1:
        			slotGriddleImg = this.add.image(config.width*0.615, config.height*0.535,'assets_atlas', 'spr_griddle_1');
        		break;

        		case 2:
        			slotGriddleImg = this.add.image(config.width*0.495, config.height*0.662,'assets_atlas', 'spr_griddle_2');	
        		break;

        		case 3:
        			slotGriddleImg = this.add.image(config.width*0.625, config.height*0.662,'assets_atlas', 'spr_griddle_3');
        		break;

        	}
        	if(griddleUpgradeLvl < i) slotGriddleImg.setAlpha(0.3);
        }

       	var trashCanImg = this.physics.add.sprite(config.width*0.105, config.height*0.915,'assets_atlas','spr_trashCan');
       	GameManager.trashCanImgPancake = trashCanImg;
        pancakeSpawnerImg.setInteractive();
        pancakeSpawnerImg.on('pointerdown', function(pointer){
        	if(griddle.occupiedSlots < GameManager.scene.playerSettings.upgrades.pancakePanLevel+1)
        	{	
        		var slotId = findFreeSlot(griddle, Griddle.slots);
        		var pos = Griddle.slots.getAt(slotId);
        		var cookingSound = GameManager.scene.sound.add('snd_pancake_cooking');
        		var burntSound = GameManager.scene.sound.add('snd_burnt');
        		var trashSound = GameManager.scene.sound.add('snd_trash');
        		var readySound = GameManager.scene.sound.add('snd_ready');
        		var pancake = new Pancake(slotId, trashSound, cookingSound, burntSound, readySound, pos.x,pos.y);
        	} 
        })
        
        this.add.image(config.width*0.42, config.height*0.895,'assets_atlas', 'spr_topping_posters');
        for(var i=0; i<4; i++)
		{
			var toppingSound = GameManager.scene.sound.add('snd_topping');
			var topping = new Topping(i, true, toppingSound);
		}
		
		for(var i=0; i<3; i++)
		{
			var syrupSound = GameManager.scene.sound.add('snd_topping');
			var syrup = new Syrup(i,syrupSound);
		}
	}

	noodlesSetting()
	{
		var background = this.add.image(config.width*0.506+config.width, config.height*0.5085, 'bg_noodles'); background.setScale(0.25);
		
		//var saucesPosters = this.add.image(config.width*0.42+config.width, config.height*0.895,'spr_sauces_posters'); saucesPosters.setScale(0.22);
		var noodleSpawnerImg = this.add.image(config.width*0.882 + config.width, config.height*0.91,'assets_atlas','spr_bg_noodles');
		var bigStrainerImg = this.add.image(config.width*0.84 + config.width, config.height*0.543,'assets_atlas','spr_bg_pot');
		GameManager.animatedStrainerImg = this.physics.add.sprite(config.width*0.825 + config.width, config.height*0.475,'anim_pot_bubbles');
		var strainerLvl = GameManager.scene.playerSettings.upgrades.noodleLevel;
		var cam = this.cameras.main;	
		var goToCoffeeButton = this.add.image(config.width*0.06+config.width,config.height*0.08, 'spr_ui_arrow');
		goToCoffeeButton.setInteractive().on('pointerdown', function(pointer){
			cam.centerOnX(config.width/2);
            GameManager.scene.cameras.main.fadeOut(25);
		})
 		
        for(var i=0; i<4; i++)
        {
        	var strainerImg;
        	switch(i)
			{
				case 0:
					strainerImg = this.add.image(config.width*0.78 + config.width, config.height*0.4,'assets_atlas','spr_strainer_0'); 
				break;
				case 1:
					strainerImg = this.add.image(config.width*0.83 + config.width, config.height*0.4,'assets_atlas','spr_strainer_1'); 
				break;
				case 2:
					strainerImg = this.add.image(config.width*0.78 + config.width, config.height*0.55,'assets_atlas','spr_strainer_2'); 
				break;
				case 3:
					strainerImg = this.add.image(config.width*0.83 + config.width, config.height*0.55,'assets_atlas','spr_strainer_3'); 
				break;

			if(strainerLvl < i) strainerImg.setAlpha(0.3);
			}
        }
		
        this.anims.create({
    		key: 'potCooking',
    		frames: GameManager.scene.anims.generateFrameNumbers('anim_pot_bubbles', { start: 0, end: 4}),
    		frameRate: 7,
    		repeat: -1
		});

        var strainer = new Strainer(bigStrainerImg, strainerLvl);
        GameManager.strainer = strainer;
       	var trashCanImg = this.physics.add.sprite(config.width*0.085+config.width, config.height*0.92,'assets_atlas','spr_trashCan');
       	GameManager.trashCanImgNoodles = trashCanImg;
        noodleSpawnerImg.setInteractive();
        noodleSpawnerImg.on('pointerdown', function(pointer){
        	if(strainer.occupiedSlots < strainerLvl +1)
        	{	
        		var slotId = findFreeSlot(strainer, Strainer.slots);
        		var pos = Strainer.slots.getAt(slotId);
        		var cookingSound = GameManager.scene.sound.add('snd_noodles_cooking');
        		var burntSound = GameManager.scene.sound.add('snd_burnt');
        		var trashSound = GameManager.scene.sound.add('snd_trash');
        		var readySound = GameManager.scene.sound.add('snd_ready');
        		var noodles = new Noodles(slotId, trashSound, cookingSound, burntSound, readySound);
      			changePosition(noodles, pos.x,pos.y);
        	} 
        })
        
        var numTablecloth = this.playerSettings.upgrades.tableClothPancakeLevel + 1;

		var tableclothImgList = new Phaser.Structs.List();
		
        for(var i=0; i<4; i++)
        {
        	var tableclothImg;
        	switch(i)
        	{
        		case 0:
        		    tableclothImg = this.add.image(config.width*0.194+config.width, config.height*0.56,'assets_atlas', 'spr_tablecloth_0');
        		break;

        		case 1:
        			tableclothImg = this.add.image(config.width*0.341+config.width, config.height*0.56,'assets_atlas', 'spr_tablecloth_1');
        		break;

        		case 2:
        			tableclothImg = this.add.image(config.width*0.126+config.width, config.height*0.7,'assets_atlas', 'spr_tablecloth_2');	
        		break;

        		case 3:
        			tableclothImg = this.add.image(config.width*0.3+config.width, config.height*0.7,'assets_atlas', 'spr_tablecloth_3');
        		break;

        	}
        	if(numTablecloth-1 < i) tableclothImg.setAlpha(0.3);
        	
        	tableclothImgList.add(tableclothImg);
        }

        var tableclothsNoodle = new TableclothsNoodle(tableclothImgList, this.playerSettings.upgrades.tableClothNoodleLevel);
        
        GameManager.tableclothsNoodle = tableclothsNoodle;
        var dishPileImg = this.add.image(config.width*0.72 + config.width, config.height*0.92,'assets_atlas','spr_bowl');
        dishPileImg.setInteractive();
        dishPileImg.on('pointerdown', function(pointer){
        	if(GameManager.dishImgContainerNoodles.length < numTablecloth)
        	{	
        		GameManager.scene.sound.play('snd_dish');
        		var slotId = findFreeSlot(tableclothsNoodle, TableclothsNoodle.slots);
        		var pos = TableclothsNoodle.slots.getAt(slotId);
        		var dishImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'assets_atlas','spr_bowl');
        		var dishImgContainer = new DishImgContainer(dishImg, slotId);
        		GameManager.dishImgContainerNoodles.add(dishImgContainer);
        	} 
        })
        
        for(var i = 0; i<4; i++)
		{
			var toppingSound = GameManager.scene.sound.add('snd_topping');
			var topping = new Topping(i, false, toppingSound);
		}
		for(var i=0; i<4; i++)
		{
			var fillingSound = GameManager.scene.sound.add('snd_filling_catfe');
			var sauce = new Sauce(i, fillingSound);
		}   
	}

	update(time, delta)
	{
    	var maxTime = 9;
    	var minTime = 2;
    	if(GameManager.gameOn){
			if(Client.clientsInRestaurant.length==0){
				callClient(-1);
		  }
		  else {
				if(GameManager.waitingRestaurantClient==false && Client.restaurantOccupiedSlots < 1){
				  //console.log("esperando a cliente en coffee")
				  GameManager.waitingRestaurantClient=true;
				  var restaurantTime= Math.floor(Math.random()*(maxTime-minTime)+minTime)*1000;
				  setTimeout(function(){
						callClient(1);
					 }, restaurantTime);
				}
		
				if(GameManager.waitingStreetClient==false && Client.streetOccupiedSlots < 1){
					//console.log("esperando a cliente en calle")
					GameManager.waitingStreetClient=true;
					var streetTime= Math.floor(Math.random()*(maxTime-minTime)+minTime)*1000;
					setTimeout(function(){
						callClient(2);
					}, streetTime);
				}
		  }
		}
    	
    	if(!GameManager.gameOn && Client.clientsInRestaurant.length==0){
			//terminar el juego
		}

		if(!GameManager.grabbedItemImg) return;
		
		/* Here check if the current grabbed item is colliding with something 
		Depending on the class of the grabbed item, there should be a different behaviour */
		switch(GameManager.grabbedItemClass)
		{
			case "pancake":
				//console.log("Pancake grabbed");
				if(checkHoverWithTrashCan()) return;
				checkHoverWithDishes();
			break;

			case "noodles":
				//console.log("Noodles grabbed");
				if(checkHoverWithTrashCan()) return;
				checkHoverWithDishes();
			break;

			case "topping":
				//console.log("Topping grabbed");
				checkToppingHoverWithDish();
			break;

			case "syrup":
				//console.log("Syrup grabbed");
				checkSauceAndSyrupHover();
			break;

			case "pancakeDish":
				//console.log("pancakeDish grabbed");
				if(checkHoverWithTrashCan()) return;
				checkHoverWithClient();
			break;

			case "noodleDish":
				//console.log("noodleDish grabbed");
				if(checkHoverWithTrashCan()) return;
				checkHoverWithClient();
			break;

			case "coffeeDish":
				//console.log("coffeeDish grabbed");
				checkHoverWithClient();
			break;

			case "sauce":
				//console.log("Sauce grabbed");
				checkSauceAndSyrupHover();
			break;

			default:
				console.log("Item grabbed with no class");
			break;
		}
	}

	savePlayerSettings(){
        localStorage.setItem('playerSettings', JSON.stringify(this.playerSettings))
    }
	
}

class GameManager
{
	static scene;
	static coffeeMachine;
	static griddle;
	static strainer;
	static tableclothsNoodle;
	static tableclothsPancake;
	static coffeeDishes = new Phaser.Structs.List();
	static dishImgContainerPancake = new Phaser.Structs.List();
	static currentContainer;
	static dishImgContainerNoodles = new Phaser.Structs.List();
	static clients = new Phaser.Structs.List();

	static grabbedItemImg; //pancake
	static grabbedItem; //
	static grabbedItemClass;
	static trashCanImgPancake;
	static trashCanImgNoodles;
	static animatedStrainerImg;

	static collidingObjectImg;
	static collidingObject;

	static tapSound;
	static waitingRestaurantClient = false;
	static waitingStreetClient = false;
	
	static levelSeconds=[10,8,6,4,2,1];
	static gameMinutes=10;
	static gameOn=true;

	static levelEarnedCoins=0;

	constructor(scene)
	{
		GameManager.scene = scene;
	}
}

class Slot
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
		this.occupied = false;
	}	
}

/* This class is needed so that there is a relation between the dishImg and the object from the eh represented in the dishImg. Otherwise we could not know 
what order is in the dish we are colliding with. */
class DishImgContainer
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
		this.dishContainer.setDepth(1);
		this.img.setPosition(0,0); //If this is not done, then the image would not appear in the scene
		this.dishContainer.add(this.img);
		this.clientCollider;
		this.toppings = new Phaser.Structs.List();
		this.sauce=-1;
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


function findFreeSlot(machine, slots)
{
	var i=0;
	var slotId = -1;
	var slot;
	var found = false;
	while(i < machine.upgradeLVL+1 && !found)
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
	GameManager.grabbedItemClass = type;
	GameManager.grabbedItemImg = img;
	GameManager.grabbedItem = item;
}

function checkHoverWithTrashCan()
{
	var trashCanImg;
	if(GameManager.grabbedItemClass == "pancake" || GameManager.grabbedItemClass=="pancakeDish") trashCanImg = GameManager.trashCanImgPancake;
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
		GameManager.grabbedItem.hovering = false;
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
	if(GameManager.grabbedItemClass == "pancake") container = GameManager.dishImgContainerPancake;
	else{ container = GameManager.dishImgContainerNoodles;}

	var collision = false;
	var numCollisions = 0;
	for(var i=0; i<container.length; i++)
	{
		var dishContainer = container.getAt(i);
		var dish = dishContainer.dish;

		if(dish != null)
		{
			if(GameManager.grabbedItemClass == "pancake")
			{
				// Can't add a pancake to the dish if there are already 3, or a topping or syrup has been added
				if(dish.numPancakes > 2 || !toppingsEmpty(dish) || dish.sauce != -1) continue;
			}
			else
			{ // If the dish has already been created, that means that there is noodles
				continue;
			}		
		}
		collision = overlappingLogic(dishContainer, numCollisions);
		if(collision == true) numCollisions++;
	}
	if(numCollisions==0) GameManager.grabbedItem.hovering = false;
}

function checkToppingHoverWithDish()
{
	var container;
	var pancakeTopping;
	if(GameManager.grabbedItemImg.x >= config.width){pancakeTopping = false; container = GameManager.dishImgContainerNoodles;}
	else{pancakeTopping = true; container = GameManager.dishImgContainerPancake;}

	var numCollisions=0;
	var collision = false;
	for(var i=0; i < container.length; i++)
	{
		var dishContainer = container.getAt(i);
		var dish = dishContainer.dish;

		if(pancakeTopping)
		{
			if(dish)
			{
				if(containsTopping(GameManager.grabbedItem, dish) || dish.numToppings>=4) continue;
				collision = overlappingLogic(dishContainer, numCollisions);
				if(collision == true) numCollisions++;
			}
		}
		else //noodle topping
		{
			// por aqui te has quedado
			// crear objeto dish en class Topping y en class Sauce en el caso de que no haya nada
			// modificar la clase noodle para que si hay ya un objeto dish, añada su indice
			// No hay que tocar la clase Pancake
			if(dish)
			{
				if(containsTopping(GameManager.grabbedItem, dish) || dish.numToppings>=4) continue;
			}
			collision = overlappingLogic(dishContainer, numCollisions);
			if(collision == true) numCollisions++;
		}
	}
	if(numCollisions==0) GameManager.grabbedItem.hovering = false;
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
	if(dish.numToppings <= 0) return true;
	else return false;
	/*
	for(var i=0; i<dish.toppings.length; i++)
	{
		if(dish.toppings.getAt(i) >= 0) return false;
	}
	return true;
	*/
}


function checkHoverWithClient()
{
	var clients = getClientsInRestaurant();
	var collision = false;
	var numCollisions=0;
	for(var i=0; i<clients.length; i++)
	{

		var client = clients.getAt(i);
		var clientImg = client.clientImg;
		if(!clientImg || GameManager.grabbedItem.dish == null) continue;

		var clientHasMyItem = false;
		var order = client.order;
		var dishes = order.dishes;

		for(var j=0; j<order.dishes.length; j++)
		{
			if(dishes.getAt(j).index == GameManager.grabbedItem.dish.index) clientHasMyItem = true;
		}

		if(!clientHasMyItem) continue;

		
		if(checkOverlap(GameManager.grabbedItemImg, clientImg) && !collision)
		{
			GameManager.collidingObjectImg = clientImg;
			GameManager.collidingObject = client;
			GameManager.grabbedItem.hovering = true;
			clientImg.setAlpha(0.5);
			collision = true;
			numCollisions++;
		}
		else
		{
			clientImg.setAlpha(1);
		}
	}
	if(numCollisions==0)GameManager.grabbedItem.hovering = false;
}
// This is the way to get the items from the class Client that are inside the restaurant
function getClientsInRestaurant()
{
	var clients = new Phaser.Structs.List();
	for(var i=0; i<Client.clientList.length; i++)
	{
		for(var j=0; j<Client.clientsInRestaurant.length; j++)
		{
			if(Client.clientsInRestaurant.getAt(j) == Client.clientList.getAt(i).index) clients.add(Client.clientList.getAt(i));
		}
	}
	return clients;
}

function checkSauceAndSyrupHover()
{
	var container;
	if(GameManager.grabbedItemClass == "sauce"){ container = GameManager.dishImgContainerNoodles;}
	else{ container = GameManager.dishImgContainerPancake;}

	var collision = false;
	var numCollisions=0;
	for(var i=0; i < container.length; i++)
	{
		var dishContainer = container.getAt(i);
		var dish = dishContainer.dish;

		if(GameManager.grabbedItemClass == "sauce") 
		{
			if(dish)
			{
				if(dish.sauce != -1) continue;
			}
			else
			{
				if(dishContainer.sauce != -1) continue;
			}
			collision = overlappingLogic(dishContainer, numCollisions);
			if(collision == true) numCollisions++;
		}
		else //SYRUP
		{
			if(dish)
			{
				if(dish.sauce != -1) continue;
				collision = overlappingLogic(dishContainer, numCollisions);
				if(collision == true) numCollisions++;
			}
		}
		
	}
	if(numCollisions == 0) GameManager.grabbedItem.hovering = false;
}

// function created to avoid the code repetition
function overlappingLogic(container, numCollisions)
{
	var dishImg = container.img;
	if(checkOverlap(GameManager.grabbedItemImg, dishImg) && numCollisions==0)
	{
		GameManager.collidingObjectImg = dishImg;
		GameManager.collidingObject = container;
		GameManager.grabbedItem.hovering = true;
		container.dishContainer.iterate(function(child){
			child.setAlpha(0.5);
		});
		return true;
	}
	else
	{
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

function makeDishInteractive(container, dishClass)
{
	var dishImg = container.img;
	//var dish = container.dish;
	var dishContainer = container.dishContainer;

	dishImg.setInteractive({ draggable: true });

	dishImg.on('dragstart', function(pointer,dragX,dragY){
		GameManager.tapSound.play();
		dishContainer.setDepth(5);
		container.posx = dishContainer.x;
		container.posy = dishContainer.y;
	})

    dishImg.on('drag', function(pointer, dragX, dragY){
     	dishContainer.setPosition(dragX+container.posx , dragY+container.posy);
     	grabItem(dishClass, this, container);
    })	
		
	dishImg.on('dragend',() => {
		dishContainer.setDepth(1);
		container.dragEndBehaviour();	
    })
}

function makeImgInteractive(itemClass, itemImg, item, cookingSound)
{
    itemImg.setInteractive({ draggable: true });

	itemImg.on('dragstart', function(pointer,dragX,dragY){
		GameManager.tapSound.play();
		itemImg.setDepth(itemImg.depth+5);
		item.posx = this.x;
		item.posy = this.y;	
	})

    itemImg.on('drag', function(pointer, dragX, dragY){
    	this.setPosition(dragX, dragY);
    	if(cookingSound) cookingSound.stop();
    	grabItem(itemClass, this, item);
    })	
		
	itemImg.on('dragend',() => {
		if(cookingSound) cookingSound.play();
		itemImg.setDepth(itemImg.depth-5);
		item.dragEndBehaviour();
    })
}

function callClient(place){  	
	if(place==-1){
    	var place= Math.floor(Math.random()*2+1);
	  }
	  
	var long=Client.clientsInRestaurant.length
  	var clientId= Math.floor(Math.random()*Client.clientList.length);
  	Client.clientsInRestaurant.add(clientId);

  	while(long==Client.clientsInRestaurant.length){
		var clientId= Math.floor(Math.random()*Client.clientList.length);
    	Client.clientsInRestaurant.add(clientId);
  	}
  	console.log("callClient() -> place: " + place);
  	Client.clientList.getAt(clientId).goToRestaurant(place);
  	if(place==1){
    	GameManager.waitingRestaurantClient=false;
  	}
  	if(place==2){
    	GameManager.waitingStreetClient=false;
  	} 
}

function finishGame(){
	GameManager.gameOn=false;
}