'use strict';

var MAIN_FONT_COLOR = '#000000';
var MAIN_FONT = '16px PT Mono';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_XY = [100, 10];
var CLOUD_COLOR = '#FFFFFF';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_SHADOW_OFFSET = 10;

var TEXT_OFFSET = 20;
var WINNING_MESSAGE = ['Ура! Вы победили!', 'Список результатов']; // ???

var MAX_GRAPH_HEIGHT = 150;
var GRAPH_WIDTH = 40;
var GRAPH_GAP = 50;

var PLAYER_NAME = 'Вы';
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

function getMaxArrayElement(array) {
  var max = array[0];
  for (var i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}

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
  for (var i = 0; i < WINNING_MESSAGE.length; i++) {
    ctx.fillText(WINNING_MESSAGE[i], CLOUD_XY[0] + TEXT_OFFSET, CLOUD_XY[1] + TEXT_OFFSET + TEXT_OFFSET * i);
  }
}

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx);
  displayWinningMessage(ctx);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = MAIN_FONT_COLOR;
    ctx.fillText(players[i], CLOUD_XY[0] + TEXT_OFFSET + (GRAPH_WIDTH + GRAPH_GAP) * i, CLOUD_XY[1] + CLOUD_HEIGHT - TEXT_OFFSET);

    ctx.fillText(Math.round(times[i]), CLOUD_XY[0] + TEXT_OFFSET + (GRAPH_WIDTH + GRAPH_GAP) * i, CLOUD_XY[1] + CLOUD_HEIGHT - TEXT_OFFSET * 3 - MAX_GRAPH_HEIGHT * times[i] / getMaxArrayElement(times));

    ctx.fillStyle = 'hsl(240, ' + Math.random() * 100 + '%, 50%)'; // ???

    if (players[i] === PLAYER_NAME) {
      ctx.fillStyle = PLAYER_COLOR;
    }
    ctx.fillRect(CLOUD_XY[0] + TEXT_OFFSET + (GRAPH_WIDTH + GRAPH_GAP) * i, CLOUD_XY[1] + CLOUD_HEIGHT - TEXT_OFFSET * 2, GRAPH_WIDTH, -MAX_GRAPH_HEIGHT * times[i] / getMaxArrayElement(times));
  }
};
