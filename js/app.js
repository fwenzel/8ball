var answers = [
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
];

$(function() {
    $('#shake').click(function() {
        // Shake for a bit.
        $('#ball')
            .removeClass('back')
            .addClass('shaking');

        $('#tria-wrap').removeClass('show');
        setTimeout(function() {
            // Show result.
            $('#ball')
                .removeClass('shaking')
                .addClass('back');

            var rndAnswer = Math.floor(Math.random() * answers.length);
            $('#msg').text(answers[rndAnswer]);

            // By accessing clientWidth, we force the rendering engine to
            // establish the initial state of our element, so we run a CSS
            // transition on it.
            $('#tria-wrap').get(0).clientWidth;
            $('#tria-wrap').addClass('show');
        }, 3000);
    });

    $('#tria-wrap').click(function(e) {
        $('#ball').removeClass('back');
    });
});


if(navigator.mozApps) {
    // If you want an installation button, add this to your HTML:
    //
    // <button id="install">Install</button>
    //
    // This code shows the button if the apps platform is available
    // and this isn't already installed.

    $('#install-btn').hide().click(function() {
        navigator.mozApps.install(location.href + 'manifest.webapp');
    });

    var req = navigator.mozApps.getSelf();
    req.onsuccess = function() {
        if(!req.result) {
            $('#install-btn').show();
        }
    };
}
