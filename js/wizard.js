'use strict';

(function () {

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupWindow = document.querySelector('.setup');

  var setupCoatInput = setupWindow.querySelector('input[name=coat-color]');
  var setupCoat = setupWindow.querySelector('.setup-wizard .wizard-coat');
  var setupEyesInput = setupWindow.querySelector('input[name=eyes-color]');
  var setupEyes = setupWindow.querySelector('.setup-wizard .wizard-eyes');
  var setupFireballInput = setupWindow.querySelector('input[name=fireball-color]');
  var setupFireball = setupWindow.querySelector('.setup-fireball-wrap');

  var coatColor = setupCoatInput.value ? setupCoatInput.value : 'rgb(101, 137, 164)';
  var eyesColor = setupEyesInput.value ? setupEyesInput.value : 'black';
  var wizards = [];

  // ???
  function onWizardItemClick(itemElement, itemInput, colorOptions) {
    var newColor = window.util.getRandomFromArray(colorOptions);
    itemInput.value = newColor;
    if (itemElement.tagName === 'DIV') {
      itemElement.style.backgroundColor = newColor;
    } else if (itemElement.tagName === 'use') {
      itemElement.style.fill = newColor;
    }
    return newColor;
  }

  // ???
  function onCoatClick() {
    coatColor = onWizardItemClick(setupCoat, setupCoatInput, COAT_COLORS);
    window.debounce(updateWizards)();
  }

  function onEyesClick() {
    eyesColor = onWizardItemClick(setupEyes, setupEyesInput, EYES_COLORS);
    window.debounce(updateWizards)();
  }

  function onFireballClick() {
    onWizardItemClick(setupFireball, setupFireballInput, FIREBALL_COLORS);
  }

  function onWizardEventListeners() {
    setupCoat.addEventListener('click', onCoatClick);
    setupEyes.addEventListener('click', onEyesClick);
    setupFireball.addEventListener('click', onFireballClick);
  }

  function removeWizardEventListeners() {
    setupCoat.removeEventListener('click', onCoatClick);
    setupEyes.removeEventListener('click', onEyesClick);
    setupFireball.removeEventListener('click', onFireballClick);
  }

  function rankWizard(wizardData) {
    var rank = 0;
    if (wizardData.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizardData.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  }

  function updateWizards() {
    var sortedWizards = wizards.sort(function (left, right) {
      if (rankWizard(right) - rankWizard(left) === 0) {
        if (left.name > right.name) {
          return 1;
        }
        if (left.name < right.name) {
          return -1;
        }
        return 0;
      }
      return rankWizard(right) - rankWizard(left);
    });
    window.render.renderSimilarWizards(sortedWizards);
  }

  // ???
  function setWizards(wizardsData) {
    wizards = wizardsData;
  }

  window.wizard = {
    onWizardEventListeners: onWizardEventListeners,
    removeWizardEventListeners: removeWizardEventListeners,
    updateWizards: updateWizards,
    setWizards: setWizards
  };

})();
