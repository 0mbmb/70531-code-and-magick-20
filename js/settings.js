'use strict';

(function () {

  var FIREBALL_SIZE = 22;
  var WIZARD_SPEED = 3;
  var WIZARD_WIDTH = 70;

  window.fireballSize = FIREBALL_SIZE;
  window.wizardSpeed = WIZARD_SPEED;
  window.wizardWidth = WIZARD_WIDTH;
  window.getFireballSpeed = function (isWindFromLeft) {
    if (isWindFromLeft) {
      return 5;
    }
    return 2;
  };
  window.getWizardHeight = function () {
    return window.wizardWidth * 1.337;
  };
  window.getWizardX = function (gameViewportWidth) {
    return (gameViewportWidth - window.wizardWidth) / 2;
  };
  window.getWizardY = function (gameViewportHeight) {
    return gameViewportHeight / 3;
  };

})();
