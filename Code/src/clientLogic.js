class Client{
  static clientList = new Phaser.Structs.List();
  static clientsInRestaurant= new Phaser.Structs.List();
  static streetSlots = new Phaser.Structs.List();
  static streetOccupiedSlots=0;
  static restaurantSlots=new Phaser.Structs.List();
  static restaurantOccupiedSlots=0;
  static maxClients= 3;
  static maxSlots=3;
  constructor(index,favDish,noodles, pancake){
    if(index==0){
      for(var i=0; i<Client.maxSlots; i++)
      {
        Client.streetSlots.add(new Slot(config.width+config.width*0.2+(60*i),config.height*0.34-2));
      }
      for(var i=0; i<Client.maxSlots; i++)
      {
        Client.restaurantSlots.add(new Slot(config.width*0.2+(60*i),config.height*0.34-2));
      }
    }
    this.index=index;
    this.place=0;
    this.slot=-1;
    this.time;
    //this.clientImg = GameManager.scene.physics.add.sprite(100,100, 'client');
    this.clientImg;
    this.favDish=favDish;//index of the fav dish
    this.favNoodles=noodles;
    this.favPancake=pancake;
    this.order=0;
    this.dishesFinalPoints=[];
    this.orderCoins=0;
    this.tutorial = false;
    Client.clientList.add(this);
  }

  subtractTime(){
    if(this.time){
      //console.log(this.index+ "in "+this.place+" left: "+this.time);
      if(!GameManager.tutorial)this.time--;
    }
    else{
      if(!GameManager.tutorial)this.timeLeft.paused=true;
      this.exitRestaurant();
      
    }
  }

  findFreeSlot(id)
  {
    var i=0;
    var slot;
    var slotId = -1;
    var found = false;
    var maxSlots=3;
    if(id==1){//restaurant
      while(i<maxSlots && !found)
      {
        slot = Client.restaurantSlots.getAt(i);
        if(!slot.occupied)
        {  
          Client.restaurantOccupiedSlots++;
          slot.occupied = true;
          slotId = i;
          found = true;
        }
        i++;
      } 
      return slotId;
    }
    if(id==2){//street
      console.log(Client.streetSlots)
      while(i<maxSlots && !found)
      {
        slot = Client.streetSlots.getAt(i);
        if(!slot.occupied)
        {  
          Client.streetOccupiedSlots++;
          slot.occupied = true;
          slotId = i;
          found = true;
        }
        i++;
      } 
      return slotId;
    }
    
  }


  changePosition(x, y)
  {
    this.clientImg.setPosition(x, y);
  }

  generateOrder(){
    if(this.place==1){
	    var numDishes=Math.floor(Math.random()*2+1);
      var nums=new Phaser.Structs.List();
      while(nums.length<numDishes){
		    var num=Math.floor(Math.random()*2);
        nums.add(num);
      }
      this.order = new Order(numDishes, nums, this);
    }
    else if(this.place==2){
      var nums= new Phaser.Structs.List();
      nums.add(2);
      this.order = new Order(1,nums,this);
    }
  }

  generateTutorialPancakeOrder()
  {
    if(this.place==1){
      var numDishes=2;
      var nums=new Phaser.Structs.List();
      while(nums.length<numDishes){
        var num=Math.floor(Math.random()*2);
        nums.add(num);
      }
      this.order = new Order(numDishes, nums, this);
    }
  }

  generateTutorialNoodleOrder()
  {
    if(this.place==2)
    {
      var nums = new Phaser.Structs.List();
      nums.add(2);
      this.order = new Order(1,nums,this);
    }
  }

  goToRestaurant(place){
    this.place=place;
    this.orderCoins=0;
    this.dishesFinalPoints=[];
	  var slotId=this.findFreeSlot(place);
	  //console.log(Client.restaurantOccupiedSlots)
	  //console.log(Client.streetOccupiedSlots)
    if(place==1){
    var pos=Client.restaurantSlots.getAt(slotId);
    this.slot=slotId;
    }
    else if(place==2){
      var pos=Client.streetSlots.getAt(slotId);
      this.slot=slotId;
    }
    if(!this.tutorial) this.generateOrder();
    else {
      if(place==1) this.generateTutorialPancakeOrder();
      else if(place==2) {this.generateTutorialNoodleOrder();}
    }
    this.time=0;
    for(var i=0;i< this.order.dishes.length;i++){
      if(this.order.dishes.getAt(i).index==0){
        this.time+=Coffee.coffeeTime;
      }
      else if(this.order.dishes.getAt(i).index==1){
        this.time+=((Pancake.time)*2);
      }
      else if(this.order.dishes.getAt(i).index==2){
        this.time+=Noodles.doneTime;
      }
    }
    console.log(this.time)
    if(!GameManager.tutorial)this.time+=GameManager.levelSeconds[Math.floor(GameManager.scene.playerSettings.level/5)]
    console.log("cliente "+this.index+": "+this.time)

    if(!GameManager.tutorial)this.timeLeft = GameManager.scene.time.addEvent({ delay: 1000, loop: true, callback: this.subtractTime, callbackScope: this });
    this.clientImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'assets_atlas','spr_cat_basecolor');
    if(this.index%2==0){
      this.clientSecondImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'assets_atlas','spr_cat_secondcolor_spots');
    }
    else{
      this.clientSecondImg = GameManager.scene.physics.add.sprite(pos.x,pos.y,'assets_atlas','spr_cat_secondcolor_stripes');
    }
    switch(this.index){
      case 0: 
        this.clientImg.setTint(0xe91c1c)
        break
      case 1:
        this.clientImg.setTint(0x35e91c)
        break
      case 2:
        this.clientImg.setTint(0x1c51e9)
        break
      case 3:
        this.clientImg.setTint(0xe91ce3)
        break
      case 4:
        this.clientImg.setTint(0x1ce9dd)
        break
      case 5:
        this.clientImg.setTint(0x000000)
        break
      case 6:
        this.clientImg.setTint(0xff9b00)
        break 
    }
  }

  compareOrderWithDish(dish){
    console.log(this.order.dishes)
    var aux=this.order.compareDish(dish);
    var points=aux[0]
    var coins=aux[1] 
    this.orderCoins+=coins
    console.log("MONEDITAS "+this.orderCoins)
    this.dishesFinalPoints.push(points);
    console.log(this.order.dishes)
    if(this.order.dishes.length==0){
      this.exitRestaurant();
    }
  }

  exitRestaurant(){
    
    if(!GameManager.tutorial)this.timeLeft.paused=true;
    var exp=0;
    for (var i=0;i< this.dishesFinalPoints.length;i++){
      exp+=Math.floor(this.dishesFinalPoints[i]*(1/this.dishesFinalPoints.length))
    }
    var lvl= GameManager.scene.uploadPlayerLevel(exp);
    if(!GameManager.tutorial)GameManager.scene.playerSettings.level=lvl;
    if(!GameManager.tutorial)GameManager.scene.savePlayerSettings();
    GameManager.scene.numPlayerLevel.setText(lvl)
    GameManager.scene.noodlenumPlayerLevel.setText(lvl)
    GameManager.customerCounter++;
    GameManager.totalHappiness+=exp;
    GameManager.globalHappiness=Math.floor(GameManager.totalHappiness*(1/GameManager.customerCounter))
    GameManager.scene.progressBar.width=GameManager.scene.littleSlider.width*(GameManager.globalHappiness/100)
    GameManager.scene.noodleprogressBar.width=GameManager.scene.littleSlider.width*(GameManager.globalHappiness/100)
    if(this.orderCoins>0){
      this.coinsImg=GameManager.scene.add.image(this.clientImg.x,this.clientImg.y+45,'spr_coins')
      TutorialManager.coins = this.coinsImg;
      console.log("PONGO BOLSITA")
      this.coinsImg.setInteractive().on('pointerdown', () => {
        Client.clientsInRestaurant.remove(this.index);
        this.coinsImg.destroy();
        GameManager.levelEarnedCoins+=this.orderCoins;
        console.log(GameManager.levelEarnedCoins)
        GameManager.scene.numCoins.setText(GameManager.levelEarnedCoins);
        GameManager.scene.noodlenumCoins.setText(GameManager.levelEarnedCoins);
        if(this.place==1){
          this.place=0;
          Client.restaurantSlots.getAt(this.slot).occupied=false;
          Client.restaurantOccupiedSlots--;
        }
        if(this.place==2){
          this.place=0;
          Client.streetSlots.getAt(this.slot).occupied=false;
          Client.streetOccupiedSlots--;
        }
      })
    }
    else if(this.orderCoins==0){
      Client.clientsInRestaurant.remove(this.index);
      if(this.place==1){
        this.place=0;
        Client.restaurantSlots.getAt(this.slot).occupied=false;
        Client.restaurantOccupiedSlots--;
      }
      if(this.place==2){
        this.place=0;
        Client.streetSlots.getAt(this.slot).occupied=false;
        Client.streetOccupiedSlots--;
      }
    }
    this.clientImg.destroy();
    this.clientSecondImg.destroy();
  }
}

class Order{
  constructor(numDishes,nums,client){
    this.dishes = new Phaser.Structs.List();
    this.numDishes=numDishes;
    this.addDishesToOrder(numDishes,nums,client);
    this.receivedDishes=0;
  }

  addDishesToOrder(numDishes,nums,client){
    for (var i=0;i<numDishes;i++){
      if(nums.getAt(i)==0){
        this.dishes.add(new Dish([0]));
      }
      else if(nums.getAt(i)==1){
        this.dishes.add(new Dish(client.favPancake));
      }
      else if(nums.getAt(i)==2){
        this.dishes.add(new Dish(client.favNoodles));
      }
      
    }

  }

  printOrder()
  {
    console.log("printingOrder with " + this.numDishes + " numDishes");
    for(var i=0; i<this.numDishes; i++)
    {
      console.log("this.dishes.getAt(" + i + "): "+ this.dishes.getAt(i));
    }
  }

  compareDish(received){
    var minusPoints=0;
    received.toppings.sort();
    for (var i=0; i< this.numDishes;i++){
      var dish = this.dishes.getAt(i);
      if(received.index==dish.index){
        this.dishes.getAt(i).pointsTimer.paused=true;
        if(received.index==0){ //coffee
          var points= this.dishes.getAt(i).points;
          this.dishes.removeAt(i);
          if(points >100){
            return [100,5];
          }else{
            return [points,5];
          }
          
        }
        else if(received.index==1){ //pancake
          if (received.sauce!=dish.sauce){
            minusPoints+=20;
          }
          if (received.numPancakes!=dish.numPancakes){
            minusPoints+=20;
          }
          if(!received.numToppings==dish.numToppings){
            minusPoints+=20;
          }
          else{
            var j=0;
            var different=false;
            while(j<this.numToppings && different==false){
              if(received.toppings.getAt(j)!=dish.getAt(j)){
                different=true;
                minusPoints+=20;
              }
              j++;
            }
            
          }
          var finalPoints=this.dishes.getAt(i).points-minusPoints
          this.dishes.removeAt(i);
          console.log("finalpoints="+finalPoints)
          if (finalPoints<0){
            return [0,20];
          }
          else if(points >100){
            return [100,20];
          }
          else{
            return [finalPoints,20];
          }
          
        }  
        else if(received.index==2){ //noodles
          if (received.sauce!=dish.sauce){
            minusPoints+=20;
          }
          if(!received.numToppings==dish.numToppings){
            minusPoints+=20;
          }
          else{
            var k=0;
            var different=false;
            while(k<this.numToppings && different==false){
              if(received.toppings.getAt(k)!=dish.getAt(k)){
                different=true;
                minusPoints+=20;
              }
              k++;
            }
            
          }
          var finalPoints=this.dishes.getAt(i).points-minusPoints
          this.dishes.removeAt(i);
          console.log("finalpoints="+finalPoints)
          if (finalPoints<0){
            return [0,30];
          }
          else if(points >100){
            return [100,30];
          }
          else{
            return [finalPoints,30];
          }
        }
      }
    }
  }
}

class Dish{
  constructor(listSettings){
    this.index=listSettings[0]; //0 coffee, 1 pancakes, 2 noodles
    this.toppings = new Phaser.Structs.List();
    this.sauce = -1;
    this.numToppings = 0;
    this.numPancakes=-1;
    this.pointsTimer;
    if(!GameManager.tutorial)this.pointsTimer = GameManager.scene.time.addEvent({ delay: 1000, loop: true, callback: this.subtractPoints, callbackScope: this });
    else{this.pointsTimer = GameManager.scene.time.addEvent({ delay: 1000, loop: false, callback: this.subtractPoints, callbackScope: this });}
    this.points=105;
  	if (this.index==1){
    	this.sauce=listSettings[1];
    	this.numPancakes=listSettings[2];
    	for (var i=0; i<listSettings[3]; i++)
    	{ 
          this.toppings.add(listSettings[4]+i);
    	}
  	}

    if(this.index==2){   
      this.sauce=listSettings[1];
      for (var i=0; i<listSettings[2]; i++)
      { 
      	this.toppings.add(listSettings[3]+i);
      }
    
    }
  }

  subtractPoints(){
    this.points-=1;
  }

/*
  addTopping(toppingType)
  {
    for(var i=0; i<this.toppings.length; i++)
    {
      var topping = this.toppings.getAt(i);
      if(topping < 0)
      {
        this.numToppings++;
        this.toppings.replace(topping, toppingType);
        return true;
      }
    }
    return false;
  }
*/
  addTopping(toppingType)
  {
    var originalSize = this.toppings.length;
    this.toppings.add(toppingType);

    if(originalSize != this.toppings.length){this.numToppings++; return true;}
    else return false;
  }
  
}