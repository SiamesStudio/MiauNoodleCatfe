class Roulette extends Phaser.Scene {
    constructor(){
        super("Roulette")
    }

    preload(){
        //ruleta

    }

    create(){
        var CoinsSelected = true;
        var scene = this;
        var background = this.add.image(config.width/2,config.height/2,'selection_menu_background').setScale(2)//fondo

        var backButton = this.add.sprite(config.width/12, 9*config.height/10,'back').setScale(0.2)
        backButton.setInteractive().on('pointerdown', () => {this.scene.start("Menu");})

        var rouletteSprite = this.add.sprite(config.width/2, config.height/2 - 50,'roulette')
        var rouletteBuyButton = this.add.sprite(config.width/2, config.height/2 + 200,'banner').setScale(2)
        var coin = this.add.sprite(config.width/2 - 70, config.height/2 + 200,'coin').setScale(0.2)
        var text = this.add.text(config.width/2, config.height/2 + 165,'500',{ font: "60px Arial", fill: "#ffffff", align: "right" })
        rouletteBuyButton.setInteractive().on('pointerdown', () => {
                alert("Has tirado de la ruleta!!")
                rouletteBuyButton.setTint(0xb0b0b0)
                coin.setTint(0xb0b0b0)
                text.setTint(0xb0b0b0)
                //Calcular premio
                rouletteBuyButton.disableInteractive()
        })
        


    }
}