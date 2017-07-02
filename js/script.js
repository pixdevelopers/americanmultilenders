// KEYHAN JavaScript Document

$(window).load(function() {});

$(document).ready(function() {
    $('.col-lg-3').matchHeight();
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
    $('.whoweare .container-1400').fadeOut();
    var stickynav = $('.tiny-text').waypoint({

        handler: function(direction) {
            if (direction === 'down') {
                $('body').addClass('stickyontop');
                $('.navigation-menu').addClass('stickyontop');

            } else {
                $('body').removeClass('stickyontop');
                $('.navigation-menu').removeClass('stickyontop');
            }
        },
        offset: -100
    });

    var waypoints = $('#about').waypoint({
        handler: function(direction) {
            $('.whoweare .container-1400').fadeIn();
        },
        offset: 250

    });


    $('.getaquote .container-1400').fadeOut();

    var waypoints = $('#getaquote').waypoint({
        handler: function(direction) {
            $('.getaquote .container-1400').fadeIn();
        },
        offset: 250

    });



    $("nav.navbar ul.nav li a").click(function(e) {
        e.preventDefault();
        var href = $(this).attr("href");
        if (href == "#services") {
            $('html,body').animate({ scrollTop: $(href).offset().top - 200 }, 400);
        } else if (href == "#home") {
            $('html,body').animate({ scrollTop: $('html').offset().top }, 400);
        } else {
            $('html,body').animate({ scrollTop: $(href).offset().top }, 400);

        }
    });
});
