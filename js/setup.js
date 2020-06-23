'use strict';

(function () {

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var NUMBER_SIMILAR_WIZARDS = 4;

  var setupOpen = document.querySelector('.setup-open');
  var setupWindow = document.querySelector('.setup');
  var setupClose = setupWindow.querySelector('.setup-close');
  var setupForm = setupWindow.querySelector('.setup-wizard-form');

  var setupName = setupWindow.querySelector('.setup-user-name');

  var setupCoatInput = setupWindow.querySelector('input[name=coat-color]');
  var setupCoat = setupWindow.querySelector('.setup-wizard .wizard-coat');
  var setupEyesInput = setupWindow.querySelector('input[name=eyes-color]');
  var setupEyes = setupWindow.querySelector('.setup-wizard .wizard-eyes');
  var setupFireballInput = setupWindow.querySelector('input[name=fireball-color]');
  var setupFireball = setupWindow.querySelector('.setup-fireball-wrap');

  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  function onSetupEscapePress(evt) {
    if (evt.key === 'Escape' && !window.util.isElementFocused(setupName)) {
      evt.preventDefault();
      closeSetupWindow();
    }
  }

  function onSetupCloseEnterPress(evt) {
    if (evt.key === 'Enter') {
      closeSetupWindow();
    }
  }

  function onWizardItemClick(itemElement, itemInput, colorOptions) {
    var newColor = window.util.getRandomFromArray(colorOptions);
    itemInput.value = newColor;
    if (itemElement.tagName === 'DIV') {
      itemElement.style.backgroundColor = newColor;
    } else if (itemElement.tagName === 'use') {
      itemElement.style.fill = newColor;
    }
  }

  function onCoatClick() {
    onWizardItemClick(setupCoat, setupCoatInput, COAT_COLORS);
  }

  function onEyesClick() {
    onWizardItemClick(setupEyes, setupEyesInput, EYES_COLORS);
  }

  function onFireballClick() {
    onWizardItemClick(setupFireball, setupFireballInput, FIREBALL_COLORS);
  }

  function getSetupDefaultCoords() {
    var setupStyle = getComputedStyle(setupWindow);
    return {
      top: setupStyle.top,
      left: setupStyle.left
    };
  }

  function moveSetupToDefault(leftCoord, topCoord) {
    setupWindow.style.left = leftCoord;
    setupWindow.style.top = topCoord;
  }

  function openSetupWindow() {
    setupWindow.classList.remove('hidden');

    // здесь я проверяю запускалась ли функция до этого, и если нет, то записываю
    // первоначальные координаты в объект setupWindow. это нормальное решение?
    if (!openSetupWindow.didrun) {
      var setupDefaultCoords = getSetupDefaultCoords();
      setupWindow.defaultLeft = setupDefaultCoords.left;
      setupWindow.defaultTop = setupDefaultCoords.top;
      openSetupWindow.didrun = true;
    }
    moveSetupToDefault(setupWindow.defaultLeft, setupWindow.defaultTop);

    document.addEventListener('keydown', onSetupEscapePress);
    setupClose.addEventListener('click', closeSetupWindow);
    setupClose.addEventListener('keydown', onSetupCloseEnterPress);

    setupForm.addEventListener('submit', onFormSubmit);

    setupCoat.addEventListener('click', onCoatClick);
    setupEyes.addEventListener('click', onEyesClick);
    setupFireball.addEventListener('click', onFireballClick);

    setupOpen.removeEventListener('click', openSetupWindow);
  }

  function closeSetupWindow() {
    setupOpen.addEventListener('click', openSetupWindow);

    setupWindow.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscapePress);

    setupClose.removeEventListener('click', closeSetupWindow);
    setupClose.removeEventListener('keydown', onSetupCloseEnterPress);
    setupCoat.removeEventListener('click', onCoatClick);
    setupEyes.removeEventListener('click', onEyesClick);
    setupFireball.removeEventListener('click', onFireballClick);

    setupForm.removeEventListener('submit', onFormSubmit);
  }

  function createSimilarWizardItem(wizardData) {
    var wizard = wizardTemplate.cloneNode(true);
    wizard.querySelector('.setup-similar-label').textContent = wizardData.name;
    wizard.querySelector('.wizard-coat').style.fill = wizardData.coatColor ? wizardData.coatColor : wizardData.colorCoat;
    wizard.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor ? wizardData.eyesColor : wizardData.colorEyes;
    return wizard;
  }

  function renderSimilarWizards(similarWizards) {
    window.util.removeHidden('.setup-similar');

    var similarWizardsList = document.querySelector('.setup-similar-list');
    var wizardsFragment = document.createDocumentFragment();

    for (var i = 0; i < NUMBER_SIMILAR_WIZARDS; i++) {
      wizardsFragment.appendChild(createSimilarWizardItem(similarWizards[i]));
    }
    similarWizardsList.appendChild(wizardsFragment);
  }

  function onLoadError(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function onFormSubmit(evt) {
    var formData = new FormData(setupForm);
    window.backend.save(formData, closeSetupWindow, onLoadError);
    evt.preventDefault();
  }

  window.backend.load(renderSimilarWizards, onLoadError);

  setupOpen.addEventListener('click', openSetupWindow);
  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      openSetupWindow();
    }
  });

})();
