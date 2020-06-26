'use strict';

(function () {

  var NUMBER_SIMILAR_WIZARDS = 4;

  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarWizardsList = document.querySelector('.setup-similar-list');

  function createSimilarWizardItem(wizardData) {
    var wizard = wizardTemplate.cloneNode(true);
    wizard.querySelector('.setup-similar-label').textContent = wizardData.name;
    wizard.querySelector('.wizard-coat').style.fill = wizardData.coatColor ? wizardData.coatColor : wizardData.colorCoat;
    wizard.querySelector('.wizard-eyes').style.fill = wizardData.eyesColor ? wizardData.eyesColor : wizardData.colorEyes;
    return wizard;
  }

  function renderSimilarWizards(wizardsData) {
    similarWizardsList.innerHTML = '';

    var wizardsFragment = document.createDocumentFragment();

    var similarWizardsNumber = wizardsData.length > NUMBER_SIMILAR_WIZARDS ? NUMBER_SIMILAR_WIZARDS : wizardsData.length;
    for (var i = 0; i < similarWizardsNumber; i++) {
      wizardsFragment.appendChild(createSimilarWizardItem(wizardsData[i]));
    }
    similarWizardsList.appendChild(wizardsFragment);

    window.util.removeHidden('.setup-similar');
  }

  window.render = {
    renderSimilarWizards: renderSimilarWizards
  };

})();
