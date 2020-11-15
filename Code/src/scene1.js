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
                noodleLevel :0,
                tableClothPancakeLevel :3,
                tableClothNoodleLevel :0, 
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

		var coffeeMachineLvl = GameManager.scene.playerSettings.upgrades.coffeeMachineLevel;
		var coffeeMachineImg;
		
		var posx= config.width*0.86;
		var posy= config.height*0.5;
		switch(coffeeMachineLvl)
		{
			case 0:
				coffeeMachineImg = this.add.image(posx, posy, 'spr_coffeeMachine_1'); 
			break;
			case 1:
				coffeeMachineImg = this.add.image(posx, posy,'spr_coffeeMachine_2'); 
			break;
			case 2:
				coffeeMachineImg = this.add.image(posx, posy, 'spr_coffeeMachine_3');
			break;
			case 3:
				coffeeMachineImg = this.add.image(posx, posy, 'spr_coffeeMachine_4'); 
			break;
		}
		this.add.image(config.width*0.83,config.height*0.24,'spr_radio');
		var coffeeSpawnerImg = this.add.image(config.width*0.95, config.height*0.915, 'spr_glasses');

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
        	var tableclothKey = 'spr_tablecloth_'+i;
        	switch(i)
        	{
        		case 0:
        		    tableclothImg = this.add.image(config.width*0.194, config.height*0.575, tableclothKey);
        		break;

        		case 1:
        			tableclothImg = this.add.image(config.width*0.3405, config.height*0.575, tableclothKey);
        		break;

        		case 2:
        			tableclothImg = this.add.image(config.width*0.125, config.height*0.714, tableclothKey);	
        		break;

        		case 3:
        			tableclothImg = this.add.image(config.width*0.297, config.height*0.714, tableclothKey);
        		break;

        	}
        	if(numTablecloth-1 < i) tableclothImg.setAlpha(0.3);
        	
        	tableclothImgList.add(tableclothImg);
        }

        var tableclothsPancake = new TableclothsPancake(tableclothImgList, this.playerSettings.upgrades.tableClothPancakeLevel);
        var dishPileImg = this.add.image(config.width*0.7, config.height*0.92,'spr_dishes'); 
        GameManager.tableclothsPancake = tableclothsPancake; 
        dishPileImg.setInteractive();
        dishPileImg.on('pointerdown', function(pointer){
        	if(GameManager.dishImgContainerPancake.length < numTablecloth)
        	{	
        		GameManager.scene.sound.play('snd_dish');
        		var slotId = findFreeSlot(tableclothsPancake, TableclothsPancake.slots);
        		var pos = TableclothsPancake.slots.getAt(slotId);
        		var dishImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'spr_dish');
        		var dishImgContainer = new DishImgContainer(dishImg, slotId);
        		GameManager.dishImgContainerPancake.add(dishImgContainer);
        	} 
        })

		var pancakeSpawnerImg = this.add.image(config.width*0.85, config.height*0.91, 'spr_pancake_bottle');
        var griddleImg = this.add.image(config.width*0.56, config.height*0.625,'spr_griddle');
        var griddleUpgradeLvl = this.playerSettings.upgrades.pancakePanLevel;
        var griddle = new Griddle(griddleImg, griddleUpgradeLvl);
        GameManager.griddle = griddle;

        for(var i=0; i<4; i++)
        {
        	var slotGriddleImg;
        	switch(i)
        	{
        		case 0:
        		    slotGriddleImg = this.add.image(config.width*0.51, config.height*0.535, 'spr_griddle_0');
        		break;

        		case 1:
        			slotGriddleImg = this.add.image(config.width*0.615, config.height*0.535, 'spr_griddle_1');
        		break;

        		case 2:
        			slotGriddleImg = this.add.image(config.width*0.495, config.height*0.662, 'spr_griddle_2');	
        		break;

        		case 3:
        			slotGriddleImg = this.add.image(config.width*0.625, config.height*0.662, 'spr_griddle_3');
        		break;

        	}
        	if(griddleUpgradeLvl < i) slotGriddleImg.setAlpha(0.3);
        }

       	var trashCanImg = this.physics.add.sprite(config.width*0.105, config.height*0.915,'spr_trashCan');
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
        		var pancake = new Pancake(slotId, trashSound, cookingSound, burntSound, readySound);
      			changePosition(pancake, pos.x,pos.y);
        	} 
        })
        
        this.add.image(config.width*0.42, config.height*0.895, 'spr_topping_posters');
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
		var noodleSpawnerImg = this.add.image(config.width*0.935 + config.width, config.height*0.8,'assets_atlas','spr_bowl'); 

		var strainerLvl = GameManager.scene.playerSettings.upgrades.noodleLevel;
        var strainerImg;
		switch(strainerLvl)
		{
			case 0:
				strainerImg = this.add.image(config.width*0.7 + config.width, config.height*0.6,'assets_atlas','spr_strainer_0'); 
			break;
			case 1:
				strainerImg = this.add.image(config.width*0.7 + config.width, config.height*0.6,'assets_atlas','spr_strainer_1'); 
			break;
			case 2:
				strainerImg = this.add.image(config.width*0.7 + config.width, config.height*0.6,'assets_atlas','spr_strainer_2'); 
			break;
			case 3:
				strainerImg = this.add.image(config.width*0.7 + config.width, config.height*0.6,'assets_atlas','spr_strainer_3'); 
			break;
		}
        var strainer = new Strainer(strainerImg, strainerLvl);
        GameManager.strainer = strainer;
       	var trashCanImgNoodles = this.physics.add.sprite(config.width*0.9 + config.width, config.height*0.12,'spr_trashCan');
       	
       	GameManager.trashCanImgNoodles = trashCanImgNoodles;
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

        var numTablecloth = this.playerSettings.upgrades.tableClothNoodleLevel + 1;
		var tableclothImgList = new Phaser.Structs.List();
        for(var i=0; i<numTablecloth; i++)
        {
        	var tableclothImg = this.add.image(config.width*0.075 + config.width + (i*42), config.height*0.65, 'spr_tablecloth'); tableclothImg.setScale(0.047);
        	tableclothImgList.add(tableclothImg);
        }
        var tableclothNoodle = new TableclothsNoodle(tableclothImgList, this.playerSettings.upgrades.tableClothNoodleLevel);
        GameManager.tableclothsNoodle = tableclothNoodle;
        var dishPileImg = this.add.image(config.width*0.95 + config.width, config.height*0.6,'spr_dishes');
        dishPileImg.setInteractive();
        dishPileImg.on('pointerdown', function(pointer){
        	if(GameManager.dishImgContainerNoodles.length < numTablecloth)
        	{	
        		GameManager.scene.sound.play('snd_dish');
        		var slotId = findFreeSlot(tableclothNoodle, TableclothsNoodle.slots);
        		var pos = TableclothsNoodle.slots.getAt(slotId);
        		var dishImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'spr_dish'); dishImg.setScale(0.04);
        		var dishImgContainer = new DishImgContainer(dishImg, slotId);
        		GameManager.dishImgContainerNoodles.add(dishImgContainer);
        	} 
        })

        for(var i = 0; i<4; i++)
		{
			//var toppingSound = GameManager.scene.sound.add('snd_toppingSound');
			var topping = new Topping(i, false, null);
		}

		for(var i=0; i<4; i++)
		{
			var fillingSound = GameManager.scene.sound.add('snd_filling_catfe');
			var sauce = new Sauce(i, fillingSound);
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
				checkHoverWithClient();
			break;

			case "noodleDish":
				//console.log("noodleDish grabbed");
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
	if(GameManager.grabbedItemClass == "pancake") container = GameManager.dishImgContainerPancake;
	else{ container = GameManager.dishImgContainerNoodles;}

	var collision = false;
	for(var i=0; i<container.length; i++)
	{
		var dishContainer = container.getAt(i);
		var dish = dishContainer.dish;

		if(dish != null)
		{
			console.log("hay plato bro");
			if(GameManager.grabbedItemClass == "pancake")
			{
				console.log("dish.numPancakes: " + dish.numPancakes);
				// Can't add a pancake to the dish if there are already 3, or a topping or syrup has been added
				if(dish.numPancakes > 2 || !toppingsEmpty(dish) || dish.sauce != -1) continue;
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
	if(GameManager.grabbedItemImg.x >= 320){ container = GameManager.dishImgContainerNoodles;} // Esto es un apaño
	else{ container = GameManager.dishImgContainerPancake;}

	var collision = false;
	for(var i=0; i < container.length; i++)
	{
		var dishContainer = container.getAt(i);
		var dish = dishContainer.dish;

		if(dish)
		{
			if(containsTopping(GameManager.grabbedItem, dish) || dish.sauce != -1 || dish.numToppings>=4) continue;
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
	for(var i=0; i<clients.length; i++)
	{
		var client = clients.getAt(i);
		var clientImg = client.clientImg;
		if(!clientImg) continue;

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
		}
		else
		{
			clientImg.setAlpha(1);
		}
	}
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

function makeDishInteractive(container, dishClass)
{
	var dishImg = container.img;
	//var dish = container.dish;
	var dishContainer = container.dishContainer;

	dishImg.setInteractive({ draggable: true });

	dishImg.on('dragstart', function(pointer,dragX,dragY){
		GameManager.tapSound.play();
		container.posx = dishContainer.x;
		container.posy = dishContainer.y;
	})

    dishImg.on('drag', function(pointer, dragX, dragY){
     	dishContainer.setPosition(dragX+container.posx , dragY+container.posy);
     	grabItem(dishClass, this, container);
    })	
		
	dishImg.on('dragend',() => {
		container.dragEndBehaviour();	
    })
}

function makeImgInteractive(itemClass, itemImg, item, cookingSound)
{
    itemImg.setInteractive({ draggable: true });

	itemImg.on('dragstart', function(pointer,dragX,dragY){
		GameManager.tapSound.play();
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