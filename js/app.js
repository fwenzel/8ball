"use strict";

var answers = {
    classic: [
        // Positive
        'It is certain',
        'It is decidedly so',
        'Without a doubt',
        'Yes definitely',
        'You may rely on it',
        'As I see it yes',
        'Most likely',
        'Outlook good',
        'Yes',
        'Signs point to yes',
        // Uncertain
        'Reply hazy try again',
        'Ask again later',
        'Better not tell you now',
        'Cannot predict now',
        'Concentrate and ask again',
        // Negative
        'Don\'t count on it',
        'My reply is no',
        'My sources say no',
        'Outlook not so good',
        'Very doubtful'
    ],
    compliments: [
        'You look great today',
        'Your hair is so shiny',
        'You can do it',
        'You are the best',
        'Everybody likes you',
        'Superheroes want to be like you',
        'You\'re so smart',
        'You\'re a winner'
    ]
};

$(function() {
    settings.init();

    $('#shake').click(function(e) {  // Shake the 8-ball for a bit.
        e.preventDefault();
        reset();
        $('#ball').addClass('shaking');

        $('#tria-wrap').removeClass('show');
        setTimeout(function() {
            // Show result.
            $('#ball')
                .removeClass('shaking')
                .addClass('back');

            var answ = answers[$('#ball').data('mode')];
            var rndAnswer = Math.floor(Math.random() * answ.length);
            $('#msg').text(answ[rndAnswer]);

            // By accessing clientWidth, we force the rendering engine to
            // establish the initial state of our element, so we run a CSS
            // transition on it.
            $('#tria-wrap').get(0).clientWidth;
            $('#tria-wrap').addClass('show');
        }, 3000);
    });

    // Reset ball on click.
    $('#tria-wrap').click(function() {
        reset();
    });

    // Settings screen.
    $('#info').click(function(e) {
        e.preventDefault();
        $('#mode .button').removeClass('selected');
        $('#mode .button[data-mode=' + settings.get('mode') + ']').addClass(
            'selected');
        settings.toggle();
    });
    $('#mode a').click(function(e) {
        e.preventDefault();
        settings.set('mode', $(this).data('mode'));
        reset();
    })
});

// Reset game.
function reset() {
    settings.init();
    $('#ball').removeClass('back');
    settings.hide();
}

// Handle settings.
var settings = {
    init: function() {
        if (!localStorage.settings) {
            localStorage.settings = JSON.stringify({
                mode: 'classic'
            });
        }
        $('#ball').data('mode', settings.get('mode'));
    },

    show: function() {
        $('#info').addClass('settings');
        $('#game').removeClass('visible');
        $('#settings').addClass('visible');
    },

    hide: function() {
        $('#info').removeClass('settings');
        $('#settings').removeClass('visible');
        $('#game').addClass('visible');
    },

    toggle: function() {
        if ($('#info').hasClass('settings')) {
            settings.hide();
        } else {
            settings.show();
        }
    },

    get: function(key) {
        var s = JSON.parse(localStorage.settings);
        return s[key];
    },

    set: function(key, val) {
        var s = JSON.parse(localStorage.settings);
        s[key] = val;
        localStorage.settings = JSON.stringify(s);
    }
};

// Hook up install button.
if (navigator.mozApps) {
    $('#install .button').click(function(e) {
        e.preventDefault();
        navigator.mozApps.install(location.href + 'manifest.webapp');
    });

    var req = navigator.mozApps.getSelf();
    req.onsuccess = function() {
        if (!req.result) {
            $('#install').show();
        }
    };
}
