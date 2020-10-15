class scene1 extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}
	
	preload()
	{
		this.load.image('coffee_machine','assets/coffee_machine.png');
		this.load.image('coffee','assets/coffee.jpg');
		this.load.image('coffee_pile','assets/coffee_pile.jpg');
		this.load.image('client','assets/client.jpg');
	}

	/*
		Va a haber un sprite que actúe como spawner de cafés, que será una pila de vasos, que es la que recibe el click.
		Esta pila no se desplaza a la cafetera, sino que en el momento de recibir el click, hará que aparezca un vaso
		de café en el slot libre de la cafetera.
	 */

	create(){
		var scene = this; //esto es dios
		var coffeeMachineImg = this.add.image(400, 300, 'coffee_machine');
		var coffeeSpawnerImg = this.add.image(700, 500, 'coffee_pile');
		var clientImg = this.physics.add.sprite(100,100, 'client');
		clientImg.setScale(0.2);
		coffeeSpawnerImg.setScale(0.3);
		
		var coffeeMachine = new CoffeeMachine(1);
		coffeeSpawnerImg.setInteractive();
        coffeeSpawnerImg.on('pointerdown', function(pointer){
        	var coffee = new Coffee(0,5, scene, null, clientImg);
        	var pos = coffeeMachine.slots.getAt(0);
        	coffee.changePosition(pos.x, pos.y);
        })
	}

	update(time, delta)
	{
		if(Coffee.coffeeList.length > 0) {
			for (var i = 0; i<Coffee.coffeeList.length; i++) 
			{
				var coffee = Coffee.coffeeList.getAt(i);
				if(coffee.countdown > 0)coffee.update(time, delta);
			}
		}
	}

}

class Coffee
{
	static coffeeList = new Phaser.Structs.List();
	static coffeeTime = 5;
	constructor(progress, countdown, scene, coffeeImg, clientImg)
	{
		this.scene = scene;
		this.coffeeImg = scene.physics.add.sprite(350,400,'coffee');
		this.clientImg = clientImg;
		this.coffeeImg.setScale(0.3);
		this.countdown = Coffee.coffeeTime;
		this.progress = 0;
		Coffee.coffeeList.add(this);
	}

	update(time, delta)
	{
		delta = delta/1000;
		this.countdown -= delta;
		
		var cookingProgress = this.countdown/Coffee.coffeeTime;
		if(cookingProgress < 1 && cookingProgress > 0.66)
		{
			this.coffeeImg.angle += 1;
		}
		if(cookingProgress < 0.66 && cookingProgress > 0.33)
		{
			this.coffeeImg.angle += 3;
			this.progress = 1;
		}
		else if(cookingProgress < 0.33 && cookingProgress > 0)
		{
			this.coffeeImg.angle += 6;
			this.progress = 2;
		}
		else if(cookingProgress <= 0)
		{
			this.progress = 3;
			console.log("I'm ready");

			this.coffeeImg.setInteractive({ draggable: true })
        		.on('dragstart', function(pointer, dragX, dragY){
        	})

        	this.coffeeImg.on('drag', function(pointer, dragX, dragY){
        		//console.log('dragging');
        		this.setPosition(dragX, dragY);
        	})

        	this.scene.physics.add.overlap(this.clientImg,this.coffeeImg, this.deliverCoffee, null, this);
		}
	}

	changePosition(x, y)
	{
		this.coffeeImg.setPosition(x, y);
	}

	deliverCoffee(clientImg, coffeeImg)
	{
		coffeeImg.disableBody(true,true);
		Coffee.coffeeList.remove(this);
	}
	
}

// Esta clase sería la pila de vasos que reaccionarían a un click para poner un café en la cafetera
class CoffeeSpawner
{
	constructor()
	{

	}
}

class CoffeeMachine
{
	constructor(maxCoffees, currentCoffees, slots)
	{
		this.maxCoffees = maxCoffees;
		this.currentCoffees = 0;
		this.slots = new Phaser.Structs.List();
		for(var i=0; i<maxCoffees; i++)
		{
			this.slots.add(new Slot(450+(i*50),325,false));
		}
	}

	/* Debido a un problema con el acceso a la instancia de la escena que hemos tenido previamente,
	se ha implementado la cuenta atrás para los cafés de otra manera. El no poder acceder a la instancia de la escena desde
	los eventos de onClick no nos permitía implementar los eventos de timers, así que hemos optado por almacenar una lista estática de
	todos los cafés que puede ser accedida desde todo el script, utilizando el update de la escena para actualizar el estado de la lista de cafés.
	Sin embargo, habiendo descubierto de donde venían los problemas de la implementación de los eventos de timers, ya se sabe cómo se haría con ellos.
	 */
	dragCoffee(coffee)
	{
		//var timer = this.time.addEvent({ delay: 2000, callback: makeCoffee, repeat: 3, callbackScope: this });
	}

	// La intención original era que el timer llamara a makeCoffee
	makeCoffee()
	{
		/*
		if(coffee.progress < 3)
		{
			coffee.progress ++;
			// Update sprite
		} */
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

