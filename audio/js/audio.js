/*global Audio: true, document: true, window: true*/
(function() {
    "use strict";
    var audioMp3a = new Audio('media/loop2.mp3'),
        audioMp3b = new Audio('media/Cellule.mp3'),
        audioOgga = new Audio('media/loop2.ogg'),
        audioOggb = new Audio('media/Cellule.ogg'),
        canPlayOgg = false,
        canPlayMp3 = false,
        audioTag,
        sound = [];
        
    audioTag = document.createElement('audio');
    canPlayMp3 = !!(audioTag.canPlayType('audio/mpeg').replace(/no/, ''));
    canPlayOgg = !!(audioTag.canPlayType('audio/ogg').replace(/no/, ''));
    
    function setTriggers() {
        var playbackControlls = document.getElementsByTagName('a'),
            playbackControllsCount = playbackControlls.length,
            i,
            j,
            controlls,
            controllFile,
            action,
            controllAction;
        function makeAction(action, controllFile){
            return function(){
                controllAction(action,controllFile);
                return false;
            };
        }
        for (i = 0; i < playbackControllsCount; i++) {
            controlls = playbackControlls[i].getAttribute('class').split(' ');
            for (j = 0; j < controlls.length; j++) {
                if (controlls[j].match(/sound[0-9]+/gi)) {
                    controllFile = sound[parseInt(controlls[j].replace('sound', ''), 10)];
                } else {
                    action = controlls[j];
                }
            }
            playbackControlls[i].onclick = makeAction(action, controllFile);
        }
        controllAction = function(action, controllFile) {
            var i;
            if (action === 'play') {
                controllFile.play();
            } else if (action === 'pause') {
                controllFile.pause();
            } else if (action === 'stop') {
                controllFile.pause();
                controllFile.currentTime = 0;
            } else if (action === 'playAll') {
                for (i = 0; i < sound.length; i++) {
                    controllAction('play', sound[i]);
                }
            } else if (action === 'pauseAll') {
                for (i = 0; i < sound.length; i++) {
                    controllAction('pause', sound[i]);
                }
            } else if (action === 'stopAll') {
                for (i = 0; i < sound.length; i++) {
                    controllAction('stop', sound[i]);
                }
            }
        };
    }
    
    function documentLoaded() {
        setTriggers();
    }
    
    window.onload = documentLoaded;
    
    if (canPlayOgg) {
        sound[0] = audioOgga;
        sound[1] = audioOggb;
        sound[0].load();
        sound[1].load();
    } else if (canPlayMp3) {
        sound[0] = audioMp3a;
        sound[1] = audioMp3b;
        sound[0].load();
        sound[1].load();
    }
}());