'use strict';

(function () {

  var MAIN_FONT_COLOR = '#000000';
  var MAIN_FONT = '16px PT Mono';

  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_XY = [100, 10];
  var CLOUD_COLOR = '#FFFFFF';
  var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var CLOUD_SHADOW_OFFSET = 10;

  var TEXT_OFFSET = 20;
  var WINNING_MESSAGES = ['Ура! Вы победили!', 'Список результатов'];

  var MAX_GRAPH_HEIGHT = 150;
  var GRAPH_WIDTH = 40;
  var GRAPH_GAP = 50;

  var PLAYER_NAME = 'Вы';
  var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

  function renderCloud(ctx) {
    ctx.fillStyle = CLOUD_SHADOW_COLOR;
    ctx.fillRect(CLOUD_XY[0] + CLOUD_SHADOW_OFFSET, CLOUD_XY[1] + CLOUD_SHADOW_OFFSET, CLOUD_WIDTH, CLOUD_HEIGHT);
    ctx.fillStyle = CLOUD_COLOR;
    ctx.fillRect(CLOUD_XY[0], CLOUD_XY[1], CLOUD_WIDTH, CLOUD_HEIGHT);
  }

  function displayWinningMessage(ctx) {
    ctx.fillStyle = MAIN_FONT_COLOR;
    ctx.font = MAIN_FONT;
    ctx.textBaseline = 'top';
    for (var i = 0; i < WINNING_MESSAGES.length; i++) {
      ctx.fillText(WINNING_MESSAGES[i], CLOUD_XY[0] + TEXT_OFFSET, CLOUD_XY[1] + TEXT_OFFSET + TEXT_OFFSET * i);
    }
  }

  function getCompetitorColor() {
    return 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
  }

  function renderSingleGraph(ctx, playerName, playerTime, graphStartOffset, graphHeight) {
    ctx.fillStyle = MAIN_FONT_COLOR;
    ctx.fillText(playerName, CLOUD_XY[0] + TEXT_OFFSET + graphStartOffset, CLOUD_XY[1] + CLOUD_HEIGHT - TEXT_OFFSET); // player name

    ctx.fillText(Math.round(playerTime), CLOUD_XY[0] + TEXT_OFFSET + graphStartOffset, CLOUD_XY[1] + CLOUD_HEIGHT - TEXT_OFFSET * 3 - graphHeight); // player time

    ctx.fillStyle = getCompetitorColor();

    if (playerName === PLAYER_NAME) {
      ctx.fillStyle = PLAYER_COLOR;
    }
    ctx.fillRect(CLOUD_XY[0] + TEXT_OFFSET + graphStartOffset, CLOUD_XY[1] + CLOUD_HEIGHT - TEXT_OFFSET * 2, GRAPH_WIDTH, -graphHeight); // player graph
  }

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx);
    displayWinningMessage(ctx);

    for (var i = 0; i < players.length; i++) {
      renderSingleGraph(ctx, players[i], times[i], (GRAPH_WIDTH + GRAPH_GAP) * i, MAX_GRAPH_HEIGHT * times[i] / window.util.getMaxArrayElement(times));
    }
  };

})();
