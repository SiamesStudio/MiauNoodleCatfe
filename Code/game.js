
var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        backgroundColor: 0x000000,
        scene: [Inicio,scene1,scene2,Menu,Shop,Roulette],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        scale: { 
        mode: Phaser.Scale.FIT,// para qeu al rescalar la pantalla se siga manteninedo igual
        autoCenter: Phaser.Scale.LEFT,// centrar
        width: 800,
        height: 600
        }
}

window.onload = function()
{
	var game = new Phaser.Game(config);
}