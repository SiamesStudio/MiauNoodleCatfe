class Inicio extends Phaser.Scene {
    constructor(){
        
        super("Inicio")
        
    }

    init(/*gameStrings*/gameData){
        this.playerSettings = gameData.playerInfo
        console.log(this.playerSettings)
        this.gameStrings = new InicioStrings();

        if(this.playerSettings.language){
            this.gameStrings.convertToSpanish()
        }else{
            this.gameStrings.convertToEnglish()
        }
    }

    preload(){
        
    }
    
    create(){
        //Inicio
        var scene = this;
        this.backgroundMenuOff = this.add.sprite(config.width/2,config.height/2,'bg_maintitle_off')
        this.backgroundMenuOn = this.add.sprite(config.width/2,config.height/2,'bg_maintitle_on').setVisible(false)
        this.backgroundMenuLight = this.add.sprite(config.width/2,config.height/2,'bg_maintitle_light2').setAlpha(0)

       
        this.tween = this.tweens.add({
            targets: this.backgroundMenuLight,
            alpha: 1,
            ease: "Elastic", // 'Linear', 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: -1,
            yoyo: true
        });

        var contactButton = this.add.image(config.width/2, 1.6*config.height/2, 'assets_atlas','main_title_button_contact')
        
        var playButton = this.add.image(config.width/2, 1.1*config.height/2,'assets_atlas','main_title_button_play')
        var textPlay = this.add.text(config.width/2, 1.2*config.height/2,this.gameStrings.playText,{ font: "13px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);
        var textContact = this.add.text(config.width/2, 1.6*config.height/2,this.gameStrings.contactText,{ font: "13px PixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5).setResolution(10);

        var currentScene = this;
        
        this.snd_door = this.sound.add('snd_opening_door');
        
        playButton.setInteractive().on('pointerdown', () => {
            this.tween.stop()
            this.backgroundMenuOff.setVisible(false)
            contactButton.disableInteractive()
            playButton.disableInteractive()
            setTimeout(function(){
                currentScene.backgroundMenuOn.setVisible(true)
                //currentScene.backgroundMenuLight.setVisible(true)
                currentScene.backgroundMenuLight.setVisible(false)
                setTimeout(function(){
                    currentScene.backgroundMenuOn.setVisible(false)
                    //currentScene.backgroundMenuLight.setVisible(false)
                    currentScene.backgroundMenuLight.setVisible(true)
                    setTimeout(function(){
                        currentScene.backgroundMenuOn.setVisible(true)
                        //currentScene.backgroundMenuLight.setVisible(true)
                        currentScene.backgroundMenuLight.setVisible(true)
                        setTimeout(function(){
                            currentScene.backgroundMenuOn.setVisible(false)
                            //currentScene.backgroundMenuLight.setVisible(false)
                            currentScene.backgroundMenuLight.setVisible(true)
                            setTimeout(function(){
                                currentScene.backgroundMenuOn.setVisible(true)
                                //currentScene.backgroundMenuLight.setVisible(true)
                                currentScene.backgroundMenuLight.setVisible(false)    
                                currentScene.snd_door.play()                      
                                setTimeout(function(){                                    
                                    currentScene.music.stop()
                                    currentScene.cameras.main.fadeOut(1000,0xffffff, 0xffffff,0xffffff,)
                                }, 1500);
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            }, 500); 
        })


        this.music = this.sound.add('snd_music_biscuit');
        this.music.play();
        this.music.setLoop(true)
        this.music.setVolume(0.7)
        if(this.playerSettings.audioMuted) this.music.mute = true

        

        contactButton.setInteractive().on('pointerdown', () => {
            this.music.stop();
            this.scene.start("Contacto", {playerInfo: this.playerSettings });
        })


        this.cameras.main.once('camerafadeoutcomplete', function (camera) {
            camera.fadeIn(1000,0xffffff,0xffffff,0xffffff);
            currentScene.scene.start("Menu", {playerInfo: currentScene.playerSettings });          
        });

    } 
}