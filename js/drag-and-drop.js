'use strict';

(function () {
  var setupWindow = document.querySelector('.setup');
  var setupUpload = setupWindow.querySelector('.upload');

  setupUpload.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoord = {
      x: evt.clientX,
      y: evt.clientY
    };

    var hasMoved = false;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      hasMoved = true;

      var delta = {
        x: moveEvt.clientX - startCoord.x,
        y: moveEvt.clientY - startCoord.y
      };

      setupWindow.style.top = setupWindow.offsetTop + delta.y + 'px';
      setupWindow.style.left = setupWindow.offsetLeft + delta.x + 'px';

      startCoord = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      function preventUploadWindow(clickEvt) {
        clickEvt.preventDefault();
        setupUpload.removeEventListener('click', preventUploadWindow);
      }
      if (hasMoved) {
        setupUpload.addEventListener('click', preventUploadWindow);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();
