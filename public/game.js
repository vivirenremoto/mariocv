var ismobile = navigator.userAgent.match(/(iPhone)|(iPod)|(android)|(webOS)|(BlackBerry)/i);
var scroll_x = $(window).width() / 2;
var floor_x = 0;
var mario_x = 0;
var direction = false;

if (ismobile) scroll_x -= 170;
else scroll_x -= 240;

$('#scroll').css('left', scroll_x + 'px');

$('.tweet').click(function () {
    window.open('https://twitter.com/intent/tweet?text=' + document.title + '&tw_p=tweetbutton&url=' + document.location.href);
    return false;
});

function moveTo(pos) {

    diff = ismobile ? 10 : 15;

    if (pos == 'left') {

        if (!direction) {
            direction = 'left';
            $('#mario').css('-webkit-transform', 'scaleX(-1)');
        }
        floor_x += diff;
        scroll_x += diff;
        mario_x -= 65;
        if (mario_x == -195) mario_x = 0;

    } else if (pos == 'right') {

        if (!direction) {
            direction = 'right';
            $('#mario').css('-webkit-transform', 'scaleX(1)');
        }
        floor_x -= diff;
        scroll_x -= diff;
        mario_x -= 65;
        if (mario_x == -195) mario_x = 0;

    } else {
        direction = false;
    }

    $('#scroll').css('left', scroll_x + 'px');
    $('#floor').css('background-position-x', floor_x + 'px');
    $('#mario').css('background-position-x', mario_x + 'px');
}


var interval_left, interval_right;

$(function () {


    ////////////////

    $("body").keydown(function (e) {
        if (e.keyCode == 37) { // left
            direction = false;
            if (!interval_left) {
                interval_left = setInterval(function () {
                    moveTo('left');
                }, 100);
            }
        } else if (e.keyCode == 39) { // right
            direction = false;
            if (!interval_right) {
                interval_right = setInterval(function () {
                    moveTo('right');
                }, 100);
            }
        }
    });

    $("body").keyup(function (e) {
        clearInterval(interval_left);
        clearInterval(interval_right);
        interval_left = false;
        interval_right = false;
    });


    $('#btn_left').on('mousedown touchstart', function () {
        direction = false;
        if (!interval_left) {
            interval_left = setInterval(function () {
                moveTo('left');
            }, 100);
        }
    });

    $('#btn_right').on('mousedown touchstart', function () {
        direction = false;
        if (!interval_right) {
            interval_right = setInterval(function () {
                moveTo('right');
            }, 100);
        }
    });

    $('#btn_left, #btn_right').on('mouseup touchend', function (event) {
        clearInterval(interval_left);
        clearInterval(interval_right);
        interval_left = false;
        interval_right = false;
    });


});