//=============================================================================
// CAB RPGMMV Plugin - MenuGraphics
// CAB_GoldTransparent.js
//=============================================================================

//=============================================================================
/*:
* @plugindesc v1.00-B1 Makes the Gold Window Transparent and moves
* the postion of it on the main window as well.
*
* @help
* Version 1.00-B1
* csswebgirl
*
* This plugin makes the Gold/Currency window in the game transparent and moves
* the position of the window to the top-right corner of the game window.
*
* Your game MUST be running in full Wide Screen (1920 x 1080) for this plugin
* to take full effect and be used properly.
*
* Yanfly's MapGoldWindow Plugin is required.
*
*
* ============================================================================
* Changelog
* ============================================================================
*
* v1.0-B1 - Plugin Still in Beta Form.
*
*/
//=============================================================================



var _Scene_Menu_create = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function() {
    _Scene_Menu_create.call(this);
    // make transparent for all windows at menu scene.
    this._goldWindow.opacity = 0;
    this._goldWindow.x = 1490; //move x-postion of gold window
    this._goldWindow.y = 0; //move y-postion of gold window
};
