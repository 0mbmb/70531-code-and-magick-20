'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_SIMIMAR_WIZARDS = 4;

var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

function removeHidden(selector) {
  document.querySelector(selector).classList.remove('hidden');
}

function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function createSimilarWizardsData() {
  var similarWizards = []; // ???
  for (var i = 0; i < NUMBER_SIMIMAR_WIZARDS; i++) {
    similarWizards[i] = {
      name: getRandomFromArray(NAMES) + ' ' + getRandomFromArray(SURNAMES),
      coatColor: getRandomFromArray(COAT_COLORS),
      eyesColor: getRandomFromArray(EYES_COLORS)
    };
  }
  return similarWizards;
}

function createSimilarWizardItem(wizardData) {
  var wizard = wizardTemplate.cloneNode(true);
  wizard.querySelector('.setup-similar-label').textContent = wizardData.name;
  wizard.querySelector('.wizard-coat').style.fill = wizardData.coatColor;
  wizard.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor;
  return wizard;
}

function renderSimilarWizards(similarWizards) {
  var similarWizardsList = document.querySelector('.setup-similar-list');
  var wizardsFragment = document.createDocumentFragment();

  for (var i = 0; i < similarWizards.length; i++) {
    wizardsFragment.appendChild(createSimilarWizardItem(similarWizards[i]));
  }
  similarWizardsList.appendChild(wizardsFragment);
}

removeHidden('.setup');
removeHidden('.setup-similar');
var similarWizards = createSimilarWizardsData();
renderSimilarWizards(similarWizards);
