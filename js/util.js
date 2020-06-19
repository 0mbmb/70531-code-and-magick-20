'use strict';

(function () {

  function getMaxArrayElement(array) {
    var max = array[0];
    for (var i = 1; i < array.length; i++) {
      if (array[i] > max) {
        max = array[i];
      }
    }
    return max;
  }

  function isElementFocused(element) {
    return document.activeElement === element;
  }

  function removeHidden(selector) {
    document.querySelector(selector).classList.remove('hidden');
  }

  function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  window.util = {
    getMaxArrayElement: getMaxArrayElement,
    isElementFocused: isElementFocused,
    removeHidden: removeHidden,
    getRandomFromArray: getRandomFromArray
  };

})();
