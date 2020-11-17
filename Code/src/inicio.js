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
        //Inicio
        var scene = this;
        this.backgroundMenuOff = this.add.sprite(config.width/2,config.height/2,'bg_maintitle_off')
        this.backgroundMenuOn = this.add.sprite(config.width/2,config.height/2,'bg_maintitle_on').setVisible(false)
        this.backgroundMenuLight = this.add.sprite(config.width/2,config.height/2,'bg_maintitle_light').setVisible(false).setBlendMode(Phaser.BlendModes.SOFT_LIGHT).setAlpha(0.6)
        //var logo = this.add.image(config.width/2,config.height/4,'logo').setScale(0.4);
        //var logo2 = this.add.image(4*config.width/5,4*config.height/5,'logo2').setScale(0.15);
        var contactButton = this.add.image(config.width/2, 1.6*config.height/2, 'assets_atlas','main_title_button_contact')
        
        var playButton = this.add.image(config.width/2, 1.1*config.height/2,'assets_atlas','main_title_button_play')
        //var text = this.add.bitmapText(config.width/2 ,config.height/4, 'BitPap','Miau Noodle Catfe',20).setOrigin(0.5);
        var currentScene = this;
        
        //var logo_2_seconds = this.add.image(config.width/2,config.height/2,'spr_logoTeam_Inicio');
        //var widthRatio = config.width / logo_2_seconds.displayWidth
        //logo_2_seconds.displayWidth = config.width;
        //logo_2_seconds.displayHeight = logo_2_seconds.displayHeight * widthRatio
        this.snd_door = this.sound.add('snd_opening_door');
        
        playButton.setInteractive().on('pointerdown', () => {
            contactButton.disableInteractive()
            contactButton.disableInteractive()
            setTimeout(function(){
                currentScene.backgroundMenuOn.setVisible(true)
                currentScene.backgroundMenuLight.setVisible(true)
                currentScene.backgroundMenuOff.setVisible(false)
                setTimeout(function(){
                    currentScene.backgroundMenuOn.setVisible(false)
                    currentScene.backgroundMenuLight.setVisible(false)
                    currentScene.backgroundMenuOff.setVisible(true)
                    setTimeout(function(){
                        currentScene.backgroundMenuOn.setVisible(true)
                        currentScene.backgroundMenuLight.setVisible(true)
                        currentScene.backgroundMenuOff.setVisible(true)
                        setTimeout(function(){
                            currentScene.backgroundMenuOn.setVisible(false)
                            currentScene.backgroundMenuLight.setVisible(false)
                            currentScene.backgroundMenuOff.setVisible(true)
                            setTimeout(function(){
                                currentScene.backgroundMenuOn.setVisible(true)
                                currentScene.backgroundMenuLight.setVisible(true)
                                currentScene.backgroundMenuOff.setVisible(false)    
                                currentScene.snd_door.play()                      
                                setTimeout(function(){                                    
                                    currentScene.music.stop()
                                    currentScene.cameras.main.fadeOut(1000,0xffffff, 0xffffff,0xffffff,);
                                    //setTimeout(function(){
                                    //    currentScene.scene.start("Menu", {playerInfo: currentScene.playerSettings });
                                    //}, 2000);
                                }, 1500);
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            }, 500); 
            //this.playButtonPressed()
             //this.scene.start("Menu", {playerInfo: this.playerSettings }); 
        })
        //playButton.disableInteractive();

        this.music = this.sound.add('snd_music_biscuit');
        this.music.play();
        this.music.setVolume(0.7)
        //this.sound.play('snd_music_biscuit');

        

        contactButton.setInteractive().on('pointerdown', () => {
            this.music.stop();
            this.scene.start("Contacto", {playerInfo: this.playerSettings });
        })

        //contactButton.disableInteractive();

        this.cameras.main.once('camerafadeoutcomplete', function (camera) {
            camera.fadeIn(1000,0xffffff,0xffffff,0xffffff);
            currentScene.scene.start("Menu", {playerInfo: currentScene.playerSettings });          
        });
        //currentScene.cameras.main.onFadeComplete.add(this.nextScene(), this);  
    } 

    nextScene(){
        currentScene.scene.start("Menu", {playerInfo: currentScene.playerSettings });
    }
}