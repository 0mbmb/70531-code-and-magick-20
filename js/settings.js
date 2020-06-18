'use strict';

(function () {
  var FIREBALL_SIZE = 22;
  var WIZARD_SPEED = 3;
  var WIZARD_WIDTH = 70;

  // правильно ли я делаю, вынося все переменные из модуля settings.js
  // вот так построчно? я так понял, что мы не можем экспортировать этот
  // модуль в виде объекта (window.settings = {fireballSize = ..., ...}),
  // т.к. иначе движок игры не сможет к этим переменным потом обратиться.
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
    // правильно ли здесь делать return window.wizardWidth, а не
    // return wizardWidth? потому что мы эту функцию будем использовать
    // в глобальной области видимости и она будет обращаться к переменной
    // из глобальной области видимости?
    return window.wizardWidth * 1.337;
  };
  window.getWizardX = function (gameViewportWidth) {
    return (gameViewportWidth - window.wizardWidth) / 2;
  };
  window.getWizardY = function (gameViewportHeight) {
    return gameViewportHeight / 3;
  };
})();
