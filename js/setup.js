'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var NUMBER_SIMILAR_WIZARDS = 4;

  // не смог придумать как найти дефолтное положение окна настроек,
  // когда у него стоит display: none. быстро убрать класс hidden, записать координаты
  // и вернуть класс?
  var SETUP_DEFAULT_COORD = ['50%', '80'];

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

  // в демонстрации авторы предлагают объявить функцию onWizardItemClick следующим
  // образом:
  // function onWizardItemClick(itemElement, itemInput, colorOptions) {
  //   itemElement.addEventListener('click', function () {
  //     var newColor = window.util.getRandomFromArray(colorOptions);
  //     itemInput.value = newColor;
  //     if (itemElement.tagName === 'DIV') {
  //       itemElement.style.backgroundColor = newColor;
  //     } else if (itemElement.tagName === 'use') {
  //       itemElement.style.fill = newColor;
  //     }
  //   });
  // }

  // и вызывать вот таким, т.е. делать универсальную функцию с изменением
  // цветов и навешиванием обработчика события. как тогда удалять потом
  // этот обработчик события и чем это решение лучше того, что я сделал?
  // onWizardItemClick(setupCoat, setupCoatInput, COAT_COLORS);

  // var setupDefaultCoord = {
  //   x: setupWindow.offsetLeft,
  //   y: setupWindow.offsetTop
  // };

  function moveSetupToDefault() {
    setupWindow.style.left = SETUP_DEFAULT_COORD[0];
    setupWindow.style.top = SETUP_DEFAULT_COORD[1] + 'px';
  }

  function openSetupWindow() {
    setupWindow.classList.remove('hidden');
    moveSetupToDefault();
    document.addEventListener('keydown', onSetupEscapePress);
    setupClose.addEventListener('click', closeSetupWindow);
    setupClose.addEventListener('keydown', onSetupCloseEnterPress);

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
  }

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
  window.util.removeHidden('.setup-similar');

  setupOpen.addEventListener('click', openSetupWindow);
  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      openSetupWindow();
    }
  });

})();
