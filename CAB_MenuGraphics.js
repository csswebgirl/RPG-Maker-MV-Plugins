//=============================================================================
// CAB RPGMV Plugin - MenuGraphics
// CAB_MenuGraphics.js
//=============================================================================

var Imported = Imported || {};
Imported.CAB_MenuGraphics = true;

var CAB = CAB || {};
CAB.MENUGRAPHICS = CAB.MENUGRAPHICS || {};
CAB.MENUGRAPHICS.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00-B1 Customize the graphics of the menus.
 * Made to work with Yanfly's Plugins.
 * @author C. A. Brown
 *
 *
 * @default
 * @param bgBitmapMenu
 * @desc background bitmap file at menu scene. put at img/pictures.
 * @default
 *
 *
 * @param bgBitmapItem
 * @desc background bitmap file at item scene. put at img/pictures.
 * @default
 *
 * @param bgBitmapSkill
 * @desc background bitmap file at skill scene. put at img/pictures.
 * @default
 *
 * @param bgBitmapEquip
 * @desc background bitmap file at equip scene. put at img/pictures.
 * @default
 *
 * @param bgBitmapStatus
 * @desc background bitmap file at status scene. put at img/pictures.
 * @default
 *
 * @param bgBitmapOptions
 * @desc background bitmap file at option scene. put at img/pictures.
 * @default
 *
 * @param bgBitmapFile
 * @desc background bitmap file at save/load scene. put at img/pictures.
 * @default
 *
 *
 * @param bgBitmapShop
 * @desc background bitmap file at gameShop scene. put at img/pictures.
 * @default
 *
 * @param bgBitmapGameEnd
 * @desc background bitmap file at gameEnd scene. put at img/pictures.
 * @default
 *
 * @param maxColsMenu
 * @desc max column at menu window
 * @default 0
 *
 * @param commandRows
 * @desc number of visible rows at command window
 * @default 0
 *
 * @param isDisplayStatus
 * @desc whether display status or not. (1 = yes, 0 = no)
 * @default 1
 *
 *
 * @help
 * Version 1.00-B1
 * C. A. Brown
 *
 * Helps to modify the menu screen using info from the AltMenuScreen3.js plugin.
 * Helps to give all menu screens more of an Octopath Traveler-based layout, using
 * custom-made graphics.
 *
 * Your game MUST be running in full Wide Screen (1920 x 1080) for this plugin
 * to take full effect and be used properly.
 *
 * From the AltMenScreen3 help info:
 * This plugin does not provide plugin commands.
 *  The differences with AltMenuscreen are follows:
 *   - windows are transparent at all menu scene.
 *   - it can set the background bitmap for each scenes at menu.
 *
 * Actors' picture note:
 * <stand_picture:filename> set actor's standing picture at menu.
 *   put file at img/pictures.
 *
 * preferred size of actor's picture:
 * width: 174px(maxColsMenu=4), 240px(maxColsMenu=3)
 * height: 408px(commandRows=2), 444px(commandRows=1)
 *
 * For use with the CAB_MenuLayout.js Plugin (required). Place this plugin BELOW
 * the CAB_MenuLayout plugin.
 *
 * Made to work with Yanfly's Plugins. Yanfly's MainMenuManager.js plugin is
 * required. Place BELOW all Yanfly plugins.
 *
 * Place ABOVE all OctoPack Battler Plugins.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * v1.0-B1 - Plugin Still in Beta Form.
 *
 *
 */
 //=============================================================================

(function() {


//from the AltMenScreen3 plugin.

  var parameters = PluginManager.parameters('CAB_MenuGraphics');
  var bgBitmapMenu = parameters['bgBitmapMenu'] || '';
  var bgBitmapItem = parameters['bgBitmapItem'] || '';
  var bgBitmapSkill = parameters['bgBitmapSkill'] || '';
  var bgBitmapEquip = parameters['bgBitmapEquip'] || '';
  var bgBitmapStatus = parameters['bgBitmapStatus'] || '';
  var bgBitmapOptions = parameters['bgBitmapOptions'] || '';
  var bgBitmapFile = parameters['bgBitmapFile'] || '';
  var bgBitmapShop = parameters['bgBitmapShop'] || ''; //custom added
  var bgBitmapGameEnd = parameters['bgBitmapGameEnd'] || '';
  var maxColsMenuWnd = Number(parameters['maxColsMenu'] || 0);
  var rowsCommandWnd = Number(parameters['commandRows'] || 0);
  var isDisplayStatus = !!Number(parameters['isDisplayStatus']);


  //
  // make transparent windows for each scenes in menu.
  //
   var _Scene_Menu_create = Scene_Menu.prototype.create;
   Scene_Menu.prototype.create = function() {
       _Scene_Menu_create.call(this);
       // make transparent for all windows at menu scene.
       this._statusWindow.opacity = 0;
       this._commandWindow.opacity = 0;
       this._windowMenuInfo.opacity = 0;
       this._playtimeWindow.opacity = 0;
       // make transparent the newly created windows
   };

   var _Scene_Item_create = Scene_Item.prototype.create;
   Scene_Item.prototype.create = function() {
       _Scene_Item_create.call(this);
       this._helpWindow.opacity = 0;
       this._categoryWindow.opacity = 0;
       this._itemWindow.opacity = 0;
       this._actorWindow.opacity = 0;
   };

   var _Scene_Skill_create = Scene_Skill.prototype.create;
   Scene_Skill.prototype.create = function() {
       _Scene_Skill_create.call(this);
       this._helpWindow.opacity = 0;
       this._skillTypeWindow.opacity = 0;
       this._statusWindow.opacity = 0;
       this._itemWindow.opacity = 0;
       this._actorWindow.opacity = 0;
   };

   var _Scene_Equip_create = Scene_Equip.prototype.create;
   Scene_Equip.prototype.create = function() {
       _Scene_Equip_create.call(this);
       this._helpWindow.opacity = 0;
       this._statusWindow.opacity = 0;
       this._commandWindow.opacity = 0;
       this._slotWindow.opacity = 0;
       this._itemWindow.opacity = 0;
   };

   var _Scene_Status_create = Scene_Status.prototype.create;
   Scene_Status.prototype.create = function() {
       _Scene_Status_create.call(this);
       this._statusWindow.opacity = 0;
   };

   var _Scene_Options_create = Scene_Options.prototype.create;
   Scene_Options.prototype.create = function() {
       _Scene_Options_create.call(this);
       this._optionsWindow.opacity = 0;
   };

   var _Scene_File_create = Scene_File.prototype.create;
   Scene_File.prototype.create = function() {
       _Scene_File_create.call(this);
       this._helpWindow.opacity = 0;
       this._listWindow.opacity = 0;
   };

//custom add menus

   var _Scene_Shop_create = Scene_Shop.prototype.create;
   Scene_Shop.prototype.create = function() {
       _Scene_Shop_create.call(this);
       this._helpWindow.opacity = 0;
       this._statusWindow.opacity = 0;
       this._commandWindow.opacity = 0;
   };


//game end screen

   var _Scene_GameEnd_create = Scene_GameEnd.prototype.create;
   Scene_GameEnd.prototype.create = function() {
       _Scene_GameEnd_create.call(this);
       this._commandWindow.opacity = 0;
   };


   //************************************************************
   // load bitmap that set in plugin parameter
   //************************************************************


   var _Scene_Menu_createBackground = Scene_Menu.prototype.createBackground;
   Scene_Menu.prototype.createBackground = function(){
       if(bgBitmapMenu){
           this._backgroundSprite = new Sprite();
           this._backgroundSprite.bitmap =
            ImageManager.loadPicture(bgBitmapMenu);
           this.addChild(this._backgroundSprite);
           return;
       }
       // if background file is invalid, it does original process.
       _Scene_Menu_createBackground.call(this);
   };

   var _Scene_Item_createBackground = Scene_Item.prototype.createBackground;
   Scene_Item.prototype.createBackground = function(){
       if(bgBitmapItem){
           this._backgroundSprite = new Sprite();
           this._backgroundSprite.bitmap =
            ImageManager.loadPicture(bgBitmapItem);
           this.addChild(this._backgroundSprite);
           return;
       }
       // if background file is invalid, it does original process.
       _Scene_Item_createBackground.call(this);
   };

   var _Scene_Skill_createBackground = Scene_Skill.prototype.createBackground;
   Scene_Skill.prototype.createBackground = function(){
       if(bgBitmapSkill){
           this._backgroundSprite = new Sprite();
           this._backgroundSprite.bitmap =
            ImageManager.loadPicture(bgBitmapSkill);
           this.addChild(this._backgroundSprite);
           return;
       }
       // if background file is invalid, it does original process.
       _Scene_Skill_createBackground.call(this);
   };

   var _Scene_Equip_createBackground = Scene_Equip.prototype.createBackground;
   Scene_Equip.prototype.createBackground = function(){
       if(bgBitmapEquip){
           this._backgroundSprite = new Sprite();
           this._backgroundSprite.bitmap =
            ImageManager.loadPicture(bgBitmapEquip);
           this.addChild(this._backgroundSprite);
           return;
       }
       // if background file is invalid, it does original process.
       _Scene_Equip_createBackground.call(this);
   };

   var _Scene_Status_createBackground =
    Scene_Status.prototype.createBackground;
   Scene_Status.prototype.createBackground = function(){
       if(bgBitmapStatus){
           this._backgroundSprite = new Sprite();
           this._backgroundSprite.bitmap =
            ImageManager.loadPicture(bgBitmapStatus);
           this.addChild(this._backgroundSprite);
           return;
       }
       // if background file is invalid, it does original process.
       _Scene_Status_createBackground.call(this);
   };

   var _Scene_Options_createBackground =
    Scene_Options.prototype.createBackground;
   Scene_Options.prototype.createBackground = function(){
       if(bgBitmapOptions){
           this._backgroundSprite = new Sprite();
           this._backgroundSprite.bitmap =
            ImageManager.loadPicture(bgBitmapOptions);
           this.addChild(this._backgroundSprite);
           return;
       }
       // if background file is invalid, it does original process.
       _Scene_Options_createBackground.call(this);
   };

   var _Scene_File_createBackground = Scene_File.prototype.createBackground;
   Scene_File.prototype.createBackground = function(){
       if(bgBitmapFile){
           this._backgroundSprite = new Sprite();
           this._backgroundSprite.bitmap =
            ImageManager.loadPicture(bgBitmapFile);
           this.addChild(this._backgroundSprite);
           return;
       }
       // if background file is invalid, it does original process.
       _Scene_File_createBackground.call(this);
   };


  var _Scene_Shop_createBackground = Scene_Shop.prototype.createBackground;
  Scene_Shop.prototype.createBackground = function(){
    if(bgBitmapShop){
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap =
         ImageManager.loadPicture(bgBitmapShop);
        this.addChild(this._backgroundSprite);
        return;
    }
    // if background file is invalid, it does original process.
    _Scene_Shop_createBackground.call(this);
  };


   var _Scene_GameEnd_createBackground =
    Scene_GameEnd.prototype.createBackground;
   Scene_GameEnd.prototype.createBackground = function(){
       if(bgBitmapGameEnd){
           this._backgroundSprite = new Sprite();
           this._backgroundSprite.bitmap =
            ImageManager.loadPicture(bgBitmapGameEnd);
           this.addChild(this._backgroundSprite);
           return;
       }
       // if background file is invalid, it does original process.
       _Scene_GameEnd_createBackground.call(this);
   };



})();
