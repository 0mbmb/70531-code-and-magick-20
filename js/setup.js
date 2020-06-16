'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var NUMBER_SIMILAR_WIZARDS = 4;

var setupOpen = document.querySelector('.setup-open');
var setupWindow = document.querySelector('.setup');
var setupClose = setupWindow.querySelector('.setup-close');

var setupName = setupWindow.querySelector('.setup-user-name');

var setupCoatInput = setupWindow.querySelector('input[name=coat-color]');
var setupCoat = setupWindow.querySelector('.setup-wizard .wizard-coat');
var setupEyesInput = setupWindow.querySelector('input[name=eyes-color]');
var setupEyes = setupWindow.querySelector('.setup-wizard .wizard-eyes');
var setupFireballInput = setupWindow.querySelector('input[name=fireball-color]');
var setupFireball = setupWindow.querySelector('.setup-fireball-wrap');

var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

function isElementFocused(element) {
  return document.activeElement === element;
}

function removeHidden(selector) {
  document.querySelector(selector).classList.remove('hidden');
}

function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function onSetupEscapePress(evt) {
  if (evt.key === 'Escape' && !isElementFocused(setupName)) {
    evt.preventDefault();
    closeSetupWindow();
  }
}

function onSetupCloseEnterPress(evt) {
  if (evt.key === 'Enter') {
    closeSetupWindow();
  }
}

function onCoatClick() {
  var newCoatColor = getRandomFromArray(COAT_COLORS);
  setupCoatInput.value = newCoatColor;
  setupCoat.style.fill = newCoatColor;
}

function onEyesClick() {
  var newEyesColor = getRandomFromArray(EYES_COLORS);
  setupEyesInput.value = newEyesColor;
  setupEyes.style.fill = newEyesColor;
}

function onFireballClick() {
  var newFireballColor = getRandomFromArray(FIREBALL_COLORS);
  setupFireballInput.value = newFireballColor;
  setupFireball.style.backgroundColor = newFireballColor;
}

function openSetupWindow() {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscapePress);
  setupClose.addEventListener('click', closeSetupWindow);
  setupClose.addEventListener('keydown', onSetupCloseEnterPress);
  setupCoat.addEventListener('click', onCoatClick);
  setupEyes.addEventListener('click', onEyesClick);
  setupFireball.addEventListener('click', onFireballClick);
}

function closeSetupWindow() {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscapePress);

  setupClose.removeEventListener('click', closeSetupWindow);
  setupClose.removeEventListener('keydown', onSetupCloseEnterPress);
  setupCoat.removeEventListener('click', onCoatClick);
  setupEyes.removeEventListener('click', onEyesClick);
  setupFireball.removeEventListener('click', onFireballClick);
}

function createSimilarWizardsData() {
  var similarWizards = [];
  for (var i = 0; i < NUMBER_SIMILAR_WIZARDS; i++) {
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

var similarWizards = createSimilarWizardsData();
renderSimilarWizards(similarWizards);
removeHidden('.setup-similar');

setupOpen.addEventListener('click', openSetupWindow);
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    openSetupWindow();
  }
});
