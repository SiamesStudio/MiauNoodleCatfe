class Inicio extends Phaser.Scene {
    constructor(){
        super("Inicio")
    }

    preload(){
        this.load.image('background_menu','assets/UI/background_menu.jpg');
        this.load.image('logo','assets/UI/logo.png');
        this.load.image('logo2','assets/UI/logo2.png');
        this.load.image('playButton','assets/UI/playButton.png');
        this.load.image('contactButton','assets/UI/contactButton.png');
        this.load.image('logo_2_seconds','assets/UI/logo_2_seconds.png');
    }

    create(){
        var scene = this;
        var backgroundMenu = this.add.image(config.width/2,config.height/2,'background_menu');
        var logo = this.add.image(config.width/2,config.height/2 - 50,'logo');
        var logo2 = this.add.image(4*config.width/5,config.height/4 - 50,'logo2').setScale(0.5);
        var contactButton = this.add.image(config.width/2,config.height/2 + 150,'contactButton').setScale(0.4)
        var playButton = this.add.image(config.width/2,config.height/2 + 50,'playButton').setScale(0.8)
        var text = this.add.text(config.width/2 - 150 ,config.height/2 - 50, 'Miau Noodle Catfe', { font: "40px Arial", fill: "#ffffff", align: "center" });
        var logo_2_seconds = this.add.image(config.width/2,config.height/2,'logo_2_seconds');

        playButton.setInteractive().on('pointerdown', () => {this.scene.start("Menu");})
        playButton.disableInteractive();

        contactButton.setInteractive().on('pointerdown', () => {
            var url = 'https://twitter.com/SiamesStudio'
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