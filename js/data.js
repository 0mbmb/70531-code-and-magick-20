'use strict';

(function () {

  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var NUMBER_SIMILAR_WIZARDS = 4;

  function createSimilarWizardsData() {
    var similarWizards = [];
    for (var i = 0; i < NUMBER_SIMILAR_WIZARDS; i++) {
      similarWizards[i] = {
        name: window.util.getRandomFromArray(NAMES) + ' ' + window.util.getRandomFromArray(SURNAMES),
        coatColor: window.util.getRandomFromArray(COAT_COLORS),
        eyesColor: window.util.getRandomFromArray(EYES_COLORS)
      };
    }
    return similarWizards;
  }

  window.data = {
    createSimilarWizardsData: createSimilarWizardsData
  };

})();
