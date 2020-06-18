'use strict';

(function () {
  // мне сначала описывать функции и потом экспортировать их как
  // window.util = {getMaxArrayElement: getMaxArrayElement, ...}
  // или можно сразу экспортировать их как я сделал ниже?
  window.util = {
    getMaxArrayElement: function (array) {
      var max = array[0];
      for (var i = 1; i < array.length; i++) {
        if (array[i] > max) {
          max = array[i];
        }
      }
      return max;
    },
    isElementFocused: function (element) {
      return document.activeElement === element;
    },
    removeHidden: function (selector) {
      document.querySelector(selector).classList.remove('hidden');
    },
    getRandomFromArray: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    }
  };
})();
