function easing(elem, inFrame, outFrame, stepsToEase, availableTime) {
    if (!elem || !document.contains(elem)) {
        console.log('The elem argument was invalid.');
        return;
    }

    var id = Math.floor(Number(elem.getAttribute('data-transition-id')));
    if (Number.isNaN(id) || id < 0) {
        console.log('Invalid transition-id! Easing can\'t function.');
        return;
    }

    var stepsNum = Number(stepsToEase);
    if (stepsNum <= 0 || Number.isNaN(stepsNum)) {
        console.log('The steps argument was not castable ' +
            'to a positive integer.');
        return;
    }

    var availableNum = Number(availableTime);
    if (availableNum <= 0 || Number.isNaN(availableNum)) {
        console.log('The availableTime argument was not castable ' +
            'to a positive integer.');
        return;
    } else if (stepsNum > availableNum) {
        console.log('There\'s no way to execute this many steps in ' +
            'the remaining time, but we\'ll do as many as we can.');
    }

    var eachStepTakesAtLeast = Math.floor(availableNum / stepsNum);
    var currentStep = 1;
    var _this = this;

    var alphabet = '0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    /* Start the easing immediately -- do not wait for the interval
     * to fire. */
    run();
    
    var intervalId = setInterval(run, eachStepTakesAtLeast);
    this.easingIntervalIds[id] = intervalId;

    function run() {
        var eased = between(
            inFrame,
            outFrame,
            currentStep / stepsToEase);
        elem.textContent = eased;

        currentStep++;

        if (currentStep > stepsNum) {
            clearInterval(intervalId);
            delete _this.easingIntervalIds[id];
        }
    }

    function reverse(str) {
        if (str.length < 2) {
            return str;
        }

        return str.split('').reverse().join('');
    }

    function enbase(num) {
        var int = Math.floor(num);
        var n = alphabet.length;
        if (int < n) {
            return alphabet[int];
        }

        return enbase(int / n) + alphabet[int % n];
    }

    function debase(str) {
        var base = alphabet.length;
        var result = 0;
        for (var ii = 0; ii < str.length; ii++) {
            var index = alphabet.indexOf(str[ii]);
            result += index * Math.pow(base, ii);
        }
        
        return result;
    }

    function between(a, b, factor) {
        var inStr = reverse(a);
        var outStr = reverse(b);
        var diff;
        var distance;
        if (inStr.length > outStr.length) {
            diff = inStr.length - outStr.length;
            distance = Math.round(diff - diff * factor);
            inStr = inStr.slice(inStr.length - outStr.length - distance);
            outStr = pad(outStr, outStr.length + distance);
        } else {
            diff = outStr.length - inStr.length;
            distance = Math.round(diff * factor);
            inStr = pad(inStr, inStr.length + distance);
            outStr = outStr.slice(outStr.length - inStr.length);
        }

        return enbase(debase(inStr) * (1 - factor) + debase(outStr) * factor);
    }

    function pad(str, charsToPad, char) {
        var _char = char;
        if (!_char) {
            _char = alphabet[0];
        }

        if (_char.length !== 1 || alphabet.indexOf(_char) === -1) {
            console.log('The char was either too long or was ' +
                'not in the provided alphabet.');
            return str;
        }

        var padding = _char.repeat(charsToPad - str.length); 
        return '' + padding + str;
    }
}