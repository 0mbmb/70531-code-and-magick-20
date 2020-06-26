'use strict';

(function () {

  var setupOpen = document.querySelector('.setup-open');
  var setupWindow = document.querySelector('.setup');
  var setupClose = setupWindow.querySelector('.setup-close');
  var setupForm = setupWindow.querySelector('.setup-wizard-form');

  var setupName = setupWindow.querySelector('.setup-user-name');

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
      window.backend.load(onLoadSuccess, onLoadError);
    }
    moveSetupToDefault(setupWindow.defaultLeft, setupWindow.defaultTop);

    document.addEventListener('keydown', onSetupEscapePress);
    setupClose.addEventListener('click', closeSetupWindow);
    setupClose.addEventListener('keydown', onSetupCloseEnterPress);

    setupForm.addEventListener('submit', onFormSubmit);

    window.wizard.onWizardEventListeners();

    setupOpen.removeEventListener('click', openSetupWindow);
  }

  function closeSetupWindow() {
    setupOpen.addEventListener('click', openSetupWindow);

    setupWindow.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscapePress);

    setupClose.removeEventListener('click', closeSetupWindow);
    setupClose.removeEventListener('keydown', onSetupCloseEnterPress);

    window.wizard.removeWizardEventListeners();

    setupForm.removeEventListener('submit', onFormSubmit);
  }

  // ???
  function onLoadSuccess(wizardsData) {
    window.wizard.setWizards(wizardsData);
    window.render.renderSimilarWizards(wizardsData);
    window.wizard.updateWizards();
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

  setupOpen.addEventListener('click', openSetupWindow);
  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      openSetupWindow();
    }
  });

})();
