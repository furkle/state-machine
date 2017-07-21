/* There is no default easing functionality for twineTransitions,
 * but you can copy this scaffold and add real functionality. */
function easing(elem, inFrame, outFrame, steps, availableTime) {
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

    function run() {
        /* Fill in functionality here, or replace the interval below. */

        stepsEased++;

        if (stepsEased >= stepsNum) {
            clearInterval(intervalId);
            delete _this.easingIntervalIds[id];
        }
    }

    /* Don't wait for the first interval to fire to begin easing; begin
     * immediately. */
    run();

    var intervalId = setInterval(run, eachStepTakesAtLeast);

    this.easingIntervalIds[id] = intervalId;
}