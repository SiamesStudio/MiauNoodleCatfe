class GameStrings {

    constructor(){

    this.freeGemsText = 'Free'
    this.spinButtonText = 'Spin'
    this.shopButton = 'Shop'

    //Options Menu
    this.OptionMenu_title = 'Settings'
    this.OptionsMenu_text = 'Mute music:'
    this.OptionsMenu_language = 'Language:'

    //Free Gems menu
    this.FreeGems_Title = 'Gift'
    this.FreeGems_Text = 'Watch a video to recieve \nextra gems!'
    this.FreeGems_Button = 'FREE'

    //Shop Menu
    this.Shop_coinsText = 'Coins'
    this.Shop_diamondsText = 'Diamonds'
    this.Shop_freeText = 'Free'

    }



convertToSpanish(){
    this.freeGemsText = 'Gratis'
    this.spinButtonText = 'Ruleta'
    this.shopButton = 'Tienda'

    this.OptionMenu_title = 'Opciones'
    this.OptionsMenu_text = 'Sonido: '
    this.OptionsMenu_language = 'Idioma:'

    this.FreeGems_Title = 'Regalo'
    this.FreeGems_Text = 'Mira este anuncion para \nrecibir gemas extra!'
    this.FreeGems_Button = 'GRATIS'

    this.Shop_coinsText = 'Monedas'
    this.Shop_diamondsText = 'Diamantes'
    this.Shop_freeText = 'Gratis'
    
}

convertToEnglish(){
    this.freeGemsText = 'Free'
    this.spinButtonText = 'Spin'
    this.shopButton = 'Shop'

    this.OptionMenu_title = 'Settings'
    this.OptionsMenu_text = 'Mute music:'
    this.OptionsMenu_language = 'Language:'

    this.FreeGems_Title = 'Gift'
    this.FreeGems_Text = 'Watch a video to recieve \nextra gems!'
    this.FreeGems_Button = 'FREE'

    this.Shop_coinsText = 'Coins'
    this.Shop_diamondsText = 'Diamonds'
    this.Shop_freeText = 'Free'
}

debug_strings(){
    console.log("Vas bien jeje")
}

}