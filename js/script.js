// KEYHAN JavaScript Document

$(window).load(function() {});

$(document).ready(function() {
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
    $('.whoweare .container-1400').fadeOut();
    var waypoints = $('#whoweare').waypoint(function(direction) {
        $('.whoweare .container-1400').fadeIn();
    });
    $('.getaquote .container-1400').fadeOut();
    var waypoints = $('#getaquote').waypoint(function(direction) {
        $('.getaquote .container-1400').fadeIn();
    });
});
