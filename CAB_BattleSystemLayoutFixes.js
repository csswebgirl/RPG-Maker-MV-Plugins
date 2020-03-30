//=============================================================================
// CAB RPGMMV Plugin - Battle System Layout Fixes
// CAB_BattleSystemLayoutFixes.js
//=============================================================================

var Imported = Imported || {};
Imported.CAB_BattleSystemLayoutFixes = true;

var CAB = CAB || {};
CAB.BATTLESYSTEMLAYOUTFIXES = CAB.BATTLESYSTEMLAYOUTFIXES || {};
CAB.BATTLESYSTEMLAYOUTFIXES.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00-B1 Customize specific layouts for the Battle System.
 * Made to work with Olivia_BreakShieldSystem Plugin.
 * @author C. A. Brown
 *
 * @help
 * This plugin adjusts the postion of the Break Shield Icon and Number Text.
 * This plugin adjusts the position of the 'Miss' Battle Popup.
 * Version 1.0-B1
 *
 * This plugin is for use with Olivia's OctoPack Battler Plugins. Please see the
 * notes for those plugins for correct instilation and use of them.
 *
 * Place this plugin BELOW ALL OctoPack Battler Plugins.
 *
 * Your game MUST be running in full Wide Screen (1920 x 1080) for this plugin
 * to take full effect and be used properly.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * v1.0-B1 - Plugin Still in Beta Form.
 *
 */
 //=============================================================================



(function() {

var _Window_Base__iconBreakShield = Olivia.OctoBattle.BreakShield.ShieldIcon;
var _Window_Base__iconBreakStun   = Olivia.OctoBattle.BreakShield.StunIcon;

//Adjust the position of the BreakShield design and position

var _Window_Base_drawBreakShieldIcon = Window_Base.prototype.drawBreakShieldIcon;
  Window_Base.prototype.drawBreakShieldIcon = function(target, x, y) {
      if (target.isAffectedByBreakShield()) {
          if (target.isDead() && $dataStates[target.deathStateId()].iconIndex > 0) {
              var icon = $dataStates[target.deathStateId()].iconIndex;
              var text = '';
          } else if (target.isDead()) {
              var icon = 0;
              var text = '';
          } else if (target.isBreakStunned()) {
              var icon = Window_Base._iconBreakStun;
              if (this.showBreakStunDuration()) {
                  var text = target._stateTurns[Olivia.OctoBattle.BreakShield.StunState] || 0;
                  if (text === 0) {
                      text = '';
                  }
              } else {
                  var text = '';
              }
          } else {
              var icon = Window_Base._iconBreakShield;
              var text = target.currentBreakShield();
          }
          this.drawIcon(icon, x, y + 30);
          this.contents.fontSize = Olivia.OctoBattle.BreakShield.IconFontSize;
          var outline = this.contents.outlineColor;
          this.contents.outlineColor = 'rgba(0, 0, 0, 1.0)';
          this.drawText(text, x, y + 27, Window_Base._iconWidth, 'center');
          this.resetFontSettings();
          this.contents.outlineColor = outline;
      }
  };


//Adjust the position of the Name Text

  Window_WeaknessDisplay.prototype.drawSubjectName = function() {
      if (Olivia.OctoBattle.WeaknessDisplay.ShowName) {
          this.resetFontSettings();
          this.contents.fontSize = Olivia.OctoBattle.WeaknessDisplay.NameFontSize;
          if (this._subject.hpRate() > 0.50) {
              this.changeTextColor(this.normalColor());
          } else if (this._subject.hpRate() > 0.25) {
              this.changeTextColor(this.textColor(Olivia.OctoBattle.WeaknessDisplay.HpColor50));
          } else {
              this.changeTextColor(this.textColor(Olivia.OctoBattle.WeaknessDisplay.HpColor25));
          }
          this.drawText(this._subject.name(), 0, 46, this.contentsWidth(), 'center');
          this.resetFontSettings();
      }
  };


//Adjust the position of the 'Miss' Popup

  Sprite_Damage.prototype.createMiss = function() {
      var w = this.digitWidth();
      var h = this.digitHeight();
      var sprite = this.createChildSprite();
      sprite.setFrame(0, 4 * h, 4 * w, h);
      sprite.dy = 0;
  	sprite.x = (6 * w) / 2;
  };



})();
