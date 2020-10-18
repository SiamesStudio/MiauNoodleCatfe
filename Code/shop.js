class Shop extends Phaser.Scene {
    constructor(){
        super("Shop")
    }

    preload(){
        //Imagen monedas tienda
        //Boton precio
        //Imagen diamantes precio
    }

    create(){
        var CoinsSelected = true;
        var scene = this;
        var background = this.add.image(config.width/2,config.height/2,'selection_menu_background').setScale(2)//fondo

        var backButton = this.add.sprite(config.width/12, 9*config.height/10,'back').setScale(0.2)
        backButton.setInteractive().on('pointerdown', () => {this.scene.start("Menu");})
    }
}