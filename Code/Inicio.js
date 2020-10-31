class Inicio extends Phaser.Scene {
    constructor(){
        
        super("Inicio")
        
    }

    init(/*gameStrings*/gameData){
        this.playerSettings = gameData.playerInfo
        console.log(this.playerSettings)
    }

    preload(){

    }

    create(){
    
        var scene = this;
        var backgroundMenu = this.add.image(config.width/2,config.height/2,'background_menu').setScale(0.3);
        var logo = this.add.image(config.width/2,config.height/4,'logo').setScale(0.4);
        var logo2 = this.add.image(4*config.width/5,4*config.height/5,'logo2').setScale(0.15);
        var contactButton = this.add.image(config.width/2,3*config.height/4,'contactButton').setScale(0.15)
        var playButton = this.add.image(config.width/2,config.height/2,'playButton').setScale(0.3)
        var text = this.add.text(config.width/4 ,config.height/4, 'Miau Noodle Catfe', { font: "20px Arial", fill: "#ffffff", align: "center" });
        var logo_2_seconds = this.add.image(config.width/2,config.height/2,'logo_2_seconds');
        logo_2_seconds.displayWidth = config.width;
        logo_2_seconds.displayHeight = config.height;

        playButton.setInteractive().on('pointerdown', () => {this.scene.start("Menu", {playerInfo: this.playerSettings }); })
        playButton.disableInteractive();

        contactButton.setInteractive().on('pointerdown', () => {
            var url = 'https://siamesstudio.github.io/'
            var s = window.open(url, '_blank');
            window.location.href = url;
        })
        contactButton.disableInteractive();

        this.cameras.main.once('camerafadeoutcomplete', function (camera) {
            logo_2_seconds.destroy()
            camera.fadeIn(1000);
            playButton.setInteractive()
            contactButton.setInteractive()
        });

        setTimeout(function(){
            scene.cameras.main.fadeOut(1000);
             }, 2000);
             
        
    }

}