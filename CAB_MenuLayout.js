//=============================================================================
// CAB RPGMV Plugin - MenuLayout
// CAB_MenuLayout.js
//=============================================================================

var Imported = Imported || {};
Imported.CAB_MenuLayout = true;

var CAB = CAB || {};
CAB.MENULAYOUT = CAB.MENULAYOUT || {};
CAB.MENULAYOUT.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00-B1 Customize the layout of the menus.
 * Made to work with Yanfly's Plugins.
 * @author csswebgirl
 *
 *
 * @param -- Info Box Settings --
 * @default
 *
 * @param Item Desc.
 * @desc The description for the "Item" choice in the menu.
 * @default View, sort and use Items and Key Items.
 *
 * @param Skill Desc.
 * @desc The description for the "Skill" choice in the menu.
 * @default View and use magic and other skills.
 *
 * @param Equip Desc.
 * @desc The description for the "Equip" choice in the menu.
 * @default Change equipment (weapons and armor).
 *
 * @param Status Desc.
 * @desc The description for the "Status" choice in the menu.
 * @default View current stats and status.
 *
 * @param Formation Desc.
 * @desc The description for the "Formation" choice in the menu.
 * @default Rearange the party members linup.
 *
 * @param Options Desc.
 * @desc The description for the "Options" choice in the menu.
 * @default Configure the game settings.
 *
 * @param Save Desc.
 * @desc The description for the "Save" choice in the menu.
 * @default Save your game.
 *
 * @param Game End Desc.
 * @desc The description for the "Game End" choice in the menu.
 * @default Quit the game.
 *
 * @param Command Symbol 1
 * @desc The symbol for custom command 1.
 * @default
 *
 * @param Command Desc. 1
 * @desc The description for custom command 1.
 * @default
 *
 * @param Command Symbol 2
 * @desc The symbol for custom command 2.
 * @default
 *
 * @param Command Desc. 2
 * @desc The description for custom command 2.
 * @default
 *
 * @param Command Symbol 3
 * @desc The symbol for custom command 3.
 * @default
 *
 * @param Command Desc. 3
 * @desc The description for custom command 3.
 * @default
 *
 * @param Command Symbol 4
 * @desc The symbol for custom command 4.
 * @default
 *
 * @param Command Desc. 4
 * @desc The description for custom command 4.
 * @default
 *
 * @param Command Symbol 5
 * @desc The symbol for custom command 5.
 * @default
 *
 *
 * @help
 * Version 1.00-B1
 * C. A. Brown
 *
 * Helps to give all menu screens more of an Octopath Traveler-based layout, using
 * custom-made graphics.
 *
 * Your game MUST be running in full Wide Screen (1920 x 1080) for this plugin
 * to take full effect and be used properly.
 *
 * This plugin modifies the layout of the MAIN MENU ONLY.
 * For use with the CAB_MenuGraphics.js File (required).
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
 */
 //=============================================================================

(function() {

	var params = PluginManager.parameters('CAB_MenuLayout');

	var descs = {};
	descs['item'] = String(params['Item Desc.']);
	descs['skill'] = String(params['Skill Desc.']);
	descs['equip'] = String(params['Equip Desc.']);
	descs['status'] = String(params['Status Desc.']);
	descs['formation'] = String(params['Formation Desc.']);
	descs['options'] = String(params['Options Desc.']);
	descs['save'] = String(params['Save Desc.']);
	descs['gameEnd'] = String(params['Game End Desc.']);

	for(var i = 1; i <= 20; i++) {
		var sym = String(params['Command Symbol ' + i]);
		if(sym.trim().length > 0) {
			descs[sym] = String(params['Command Desc. ' + i]);
		}
	}


//****************************************************************************
// Create the Info Window, Playtime Window, and make X and Y Layout adjustment
//****************************************************************************

  var _Scene_Menu_create = Scene_Menu.prototype.create;
  Scene_Menu.prototype.create = function() {
      _Scene_Menu_create.call(this);
      this._windowMenuInfo = new Window_MenuInfo(0, 0, this._commandWindow);
			   //Menu Info Window
			this._playtimeWindow = new Window_Playtime(0, 0); //Playtime Window
      this.addWindow(this._windowMenuInfo);
			this.addWindow(this._playtimeWindow);
      this._commandWindow.y = 108;
			this._commandWindow.x = 50; //move the command window over
      this._statusWindow.y = 108;
			this._statusWindow.x = 1520; //move the status window over
			this._statusWindow.width = 400;
    };


//Ajust the height of the Status Window


  Window_MenuStatus.prototype.windowHeight = function() {
      return Graphics.boxHeight - 108;
  };


// Layout of MenuInfo Window Box

  function Window_MenuInfo() {
      this.initialize.apply(this, arguments);
  }

  Window_MenuInfo.prototype = Object.create(Window_Base.prototype);
  Window_MenuInfo.prototype.constructor = Window_MenuInfo;

  Window_MenuInfo.prototype.initialize = function(x, y, commandWindow) {
      var width = this.windowWidth();
      var height = this.windowHeight();
      Window_Base.prototype.initialize.call(this, x + 50, y, width, height);
      this._commandWindow = commandWindow;
      this._value = "";
      this.refresh();
  };

  Window_MenuInfo.prototype.windowWidth = function() {
      return 1440;
  };

  Window_MenuInfo.prototype.windowHeight = function() {
      return 108;
  };


  Window_MenuInfo.prototype.refresh = function() {
      var x = this.textPadding();
      var width = this.contents.width - this.textPadding() * 2;
      this.contents.clear();
      if(this._value != this._commandWindow.currentData().symbol) {
        this._value = this._commandWindow.currentData().symbol;
        if(descs[this._value]) {
          var text = descs[this._value].replace(/<br>/gi, function() {
                return "\n";
          }.bind(this));
            this.drawTextEx(text, 5, 25);
        }
      }
  };

  Window_MenuInfo.prototype.open = function() {
      this.refresh();
      Window_Base.prototype.open.call(this);
  };

  Window_MenuInfo.prototype.update = function() {
		if(this._value != this._commandWindow.currentData().symbol) {
			this.refresh();
		}
	    Window_Base.prototype.update.call(this);
	};

// End Info Window

//****************************************************************************
//Status Window position adjustment
//THS IS FOR THE MAIN MENU ONLY! Please see the CAB_SubMenuMods.js plugin for
//layouts for specific sub-menus.
//Layout Positions
//****************************************************************************

Window_MenuStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
    this.drawFace(actor.faceName(), actor.faceIndex(), x - 40, y - 25, width, height);
};

Window_MenuStatus.prototype.drawActorName = function(actor, x, y, width) {
    width = width || 168;
    this.changeTextColor(this.textColor(0));
    this.drawText(actor.name(), x - 70, y, width);
};


Window_MenuStatus.prototype.drawActorClass = function(actor, x, y, width) {
    width = width || 168;
    this.changeTextColor(this.textColor(6));
    this.drawText(actor.currentClass().name, x - 150, y, width);
};

Window_MenuStatus.prototype.drawActorLevel = function(actor, x, y) {
    this.changeTextColor(this.textColor(0));
    this.drawText(TextManager.levelA, x - 70, y, 48);
    this.resetTextColor();
    this.drawText(actor.level, x - 40, y, 36, 'right');
};

Window_MenuStatus.prototype.drawActorIcons = function(actor, x, y, width) {
    width = width || 144;
    var icons = actor.allIcons().slice(0, Math.floor(width / Window_Base._iconWidth));
    for (var i = 0; i < icons.length; i++) {
        this.drawIcon(icons[i], x + 10 + Window_Base._iconWidth * i, y - 40);
    }
};

//*************************************
// Swap Guages: Fix for Main Menu
//*************************************

var _Yanfly_Skill_Window_Base_drawActorHp = Window_MenuStatus.prototype.drawActorHp;
Window_MenuStatus.prototype.drawActorHp = function(actor, x, y, width) {
  width = width || 186;
  this.contents.fontSize = 14; // change the font size
  this.changeTextColor(this.textColor(0));
  if (actor.gauge1() === 'HP') {
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    this.drawGauge(x - 225, y + 33, width, actor.hpRate(), '#245a34', '#50a66f');
    this.drawText(TextManager.hpA, x - 225, y + 33, 44);
    this.drawCurrentAndMax(actor.hp, actor.mhp, x - 225, y + 33, width,
		                       this.hpColor(actor), this.normalColor());
  } else if (actor.gauge1() === 'MP') {
      var color1 = this.mpGaugeColor1();
      var color2 = this.mpGaugeColor2();
      this.drawGauge(x - 225, y + 33, width, actor.mpRate(), '#1f5269', '#60bad0');
      this.drawText(TextManager.mpA, x - 225, y + 33, 44);
      this.drawCurrentAndMax(actor.mp, actor.mmp, x - 225, y + 33, width,
                           this.mpColor(actor), this.normalColor());
  } else if (actor.gauge1() === 'TP') {
      var color1 = this.tpGaugeColor1();
      var color2 = this.tpGaugeColor2();
      this.drawGauge(x - 225, y + 35, width, actor.tpRate(), '#553245', '#8A6D7C');
      this.drawText(TextManager.tpA, x - 225, y + 33, 44);
      this.changeTextColor(this.tpColor(actor));
      this.drawText(actor.tp, x - 225 + width - 64, y + 33, 64, 'right');
  }
  this.resetFontSettings(); // reset the font size
};

var _Yanfly_Skill_Window_Base_drawActorMp = Window_MenuStatus.prototype.drawActorMp;
Window_MenuStatus.prototype.drawActorMp = function(actor, x, y, width) {
  width = width || 186;
  this.contents.fontSize = 14; // change the font size
  this.changeTextColor(this.textColor(0));
    if (actor.gauge2() === 'HP') {
      var color1 = this.hpGaugeColor1();
      var color2 = this.hpGaugeColor2();
      this.drawGauge(x - 225, y + 33, width, actor.hpRate(), '#245a34', '#50a66f');
      this.drawText(TextManager.hpA, x - 225, y + 33, 44);
      this.drawCurrentAndMax(actor.hp, actor.mhp, x - 225, y + 33, width,
                             this.hpColor(actor), this.normalColor());
    } else if (actor.gauge2() === 'MP') {
        var color1 = this.mpGaugeColor1();
        var color2 = this.mpGaugeColor2();
        this.drawGauge(x - 225, y + 33, width, actor.mpRate(), '#1f5269', '#60bad0');
        this.drawText(TextManager.mpA, x - 225, y + 33, 44);
        this.drawCurrentAndMax(actor.mp, actor.mmp, x - 225, y + 33, width,
                           this.mpColor(actor), this.normalColor());
    } else if (actor.gauge2() === 'TP') {
        var color1 = this.tpGaugeColor1();
        var color2 = this.tpGaugeColor2();
        this.drawGauge(x - 225, y + 35, width, actor.tpRate(), '#553245', '#8A6D7C');
        this.drawText(TextManager.tpA, x - 225, y + 33, 44);
        this.changeTextColor(this.tpColor(actor));
        this.drawText(actor.tp, x - 225 + width - 64, y + 33, 64, 'right');
    }
    this.resetFontSettings(); // reset the font size
};

var _Yanfly_Skill_Window_Base_drawActorTp = Window_MenuStatus.prototype.drawActorTp;
Window_MenuStatus.prototype.drawActorTp = function(actor, x, y, width) {
  width = width || 186;
  this.contents.fontSize = 14; // change the font size
  this.changeTextColor(this.textColor(0));
    if (actor.gauge3() === 'HP') {
      var color1 = this.hpGaugeColor1();
      var color2 = this.hpGaugeColor2();
      this.drawGauge(x - 225, y + 33, width, actor.hpRate(), '#245a34', '#50a66f');
      this.drawText(TextManager.hpA, x - 225, y + 33, 44);
      this.drawCurrentAndMax(actor.hp, actor.mhp, x - 225, y + 33, width,
                             this.hpColor(actor), this.normalColor());
    } else if (actor.gauge3() === 'MP') {
        var color1 = this.mpGaugeColor1();
        var color2 = this.mpGaugeColor2();
        this.drawGauge(x - 225, y + 33, width, actor.mpRate(), '#1f5269', '#60bad0');
        this.drawText(TextManager.mpA, x - 225, y + 33, 44);
        this.drawCurrentAndMax(actor.mp, actor.mmp, x - 225, y + 33, width,
                           this.mpColor(actor), this.normalColor());
    } else if (actor.gauge3() === 'TP') {
        var color1 = this.tpGaugeColor1();
        var color2 = this.tpGaugeColor2();
        this.drawGauge(x - 225, y + 35, width, actor.tpRate(), '#553245', '#8A6D7C');
        this.drawText(TextManager.tpA, x - 225, y + 33, 44);
        this.changeTextColor(this.tpColor(actor));
        this.drawText(actor.tp, x - 225 + width - 64, y + 33, 64, 'right');
    }
    this.resetFontSettings(); // reset the font size
};

//end position adjustment

//Command Window Selection adjustment and images

Window_MenuCommand.prototype.lineHeight = function() {
    return 70;
};

//ImageManager.loadBcom = function(filename) {
//    return this.loadBitmap('img/menu_layouts/main_menu', filename, 0, true);
//};


//Window_MenuCommand.prototype.commands_intialize = function() {
//  this.menu_pic_initialize();
//};

//End Command Window Selection adjustment and images


//**********************************************************
//               Create Playtime window
//**********************************************************

function Window_Playtime() {
		this.initialize.apply(this, arguments);
	}

	Window_Playtime.prototype = Object.create(Window_Base.prototype);
	Window_Playtime.prototype.constructor = Window_Playtime;

	Window_Playtime.prototype.initialize = function(x, y) {
		var width = this.windowWidth();
		var height = this.windowHeight();
		Window_Base.prototype.initialize.call(this, 1730, y, width, height);
		this.refresh();
	};

	Window_Playtime.prototype.windowWidth = function() {
		return 190;
	};

	Window_Playtime.prototype.windowHeight = function() {
		return this.fittingHeight(1);
	};

	Window_Playtime.prototype.refresh = function() {
	var x = this.textPadding();
	var width = this.contents.width - this.textPadding() * 2;
	this.contents.clear();
	this.drawText(this.value(), x + 25, 0, width);
};

Window_Playtime.prototype.value = function() {
		return $gameSystem.playtimeText();
};


Window_Playtime.prototype.open = function() {
	this.refresh();
	Window_Base.prototype.open.call(this);
};

//End Playtime Window

})();
