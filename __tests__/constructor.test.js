const TransitionSupervisor = require('../').Supervisor;

describe('constructor tests.', () => {
    it('Creates a supervisor without encountering errors.', () => {
        const log = console.log;
        console.log = jest.fn();

        new TransitionSupervisor({
            predicate() {},
        });

        expect(console.log.mock.calls.length).toBe(0);

        console.log = log;
    });

    it('Replaces internal strings with those passed in the argument if their keys match', () => {
        const strings = {
            initTimeoutLengthInvalid: '1',
            initIntervalLengthInvalid: '2',
            predicateInvalid: '3',
            getStatesInvalid: '4',
            getKeyframeInvalid: '5',
            doBeforeTransitionInvalid: '6',
            completeTransitionInvalid: '7',
            transitionableInvalid: '8',
            stateIndexInvalid: '9',
            transitionDirectionInvalid: '10',
            transitionCurrentDirectionInvalid: '11',
            supervisorNotReinitialized: '12',
            transitionableIsValidInvalid: '13',
            stepsToEaseInvalid: '14',
            transitionIdInvalid: '15',
            objectToSuperviseInvalid: '16',
            statesInvalid: '17',
            collectTransitionablesInvalid: '18',
            easingInvalid: '19',
            executeTransitionInvalid: '20',
            initInvalid: '21',
            nextInvalid: '22',
            removeFromTransitioningInvalid: '23',
            restartInvalid: '24',
            setNextStateInvalid: '25',
            shuffleInvalid: '26',
            startInvalid: '27',
            transformToStringInvalid: '28',
            transitionAllInvalid: '29',
            transitionOneInvalid: '30',
            transitionableIsExpiredInvalid: '31',
            tryToDelegateToTransitionableInvalid: '32',
            stopInvalid: '33',
            foo: '34',
            bar: '35',
            baz: '36',
            startTimeInvalid: '37',
        };

        const supervisor = new TransitionSupervisor({ 
            strings,
            predicate() {},
        });

        expect(supervisor.strings).toEqual(strings);
    });

    it('Aborts early if config is provided but initTimeoutLength is out of band.', () => {
        const log = console.log;
        console.log = jest.fn();

        const ts = new TransitionSupervisor({
            config: { initTimeoutLength: 'fdsfdsfs', },
        });

        new TransitionSupervisor({
            config: { initTimeoutLength: NaN, },
        });

        new TransitionSupervisor({
            config: { initTimeoutLength: -1, },
        });

        expect(console.log.mock.calls).toEqual([
            [ ts.strings.initTimeoutLengthInvalid, ],
            [ ts.strings.initTimeoutLengthInvalid, ],
            [ ts.strings.initTimeoutLengthInvalid, ],
        ]);

        console.log = log;
    });

    it('Provides a placeholder message if the initTimeoutIdInvalid string is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        new TransitionSupervisor({
            config: { initTimeoutLength: -245, },
            strings: { initTimeoutLengthInvalid: '', },
            predicate() {},
        });

        expect(console.log.mock.calls).toEqual([
            [ 'Error missing! initTimeoutLengthInvalid' ],
        ]);

        console.log = log;
    });

    it('Aborts early if config is provided but initIntervalLength is out of band.', () => {
        const log = console.log;
        console.log = jest.fn();

        const ts = new TransitionSupervisor({
            predicate() {},
            config: { initIntervalLength: 'foobar', },
        });

        new TransitionSupervisor({
            predicate() {},
            config: { initIntervalLength: NaN, },
        });

        new TransitionSupervisor({
            predicate() {},
            config: { initIntervalLength: -2, },
        });

        expect(console.log.mock.calls).toEqual([
            [ ts.strings.initIntervalLengthInvalid, ],
            [ ts.strings.initIntervalLengthInvalid, ],
            [ ts.strings.initIntervalLengthInvalid, ],
        ]);

        console.log = log;
    });

    it('Provides a placeholder message if the initIntervalLengthInvalid string is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        new TransitionSupervisor({
            config: { initIntervalLength: -245, },
            strings: { initIntervalLengthInvalid: '', },
            predicate() {},
        });

        expect(console.log.mock.calls).toEqual([
            [ 'Error missing! initIntervalLengthInvalid', ],
        ]);

        console.log = log;
    });

    it('Aborts early if config is provided but stepsToEase is out of band.', () => {
        const log = console.log;
        console.log = jest.fn();

        const ts = new TransitionSupervisor({
            predicate() {},
            config: { stepsToEase: 'foobar', },
        });

        new TransitionSupervisor({
            predicate() {},
            config: { stepsToEase: NaN, },
        });

        new TransitionSupervisor({
            predicate() {},
            config: { stepsToEase: -2, },
        });

        expect(console.log.mock.calls).toEqual([
            [ ts.strings.stepsToEaseInvalid, ],
            [ ts.strings.stepsToEaseInvalid, ],
            [ ts.strings.stepsToEaseInvalid, ],
        ]);

        console.log = log;
    });

    it('Provides a placeholder message if the stepsToEaseInvalid string is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        new TransitionSupervisor({
            config: { stepsToEase: -245, },
            strings: { stepsToEaseInvalid: '', },
            predicate() {},
        });

        expect(console.log.mock.calls).toEqual([
            [ 'Error missing! stepsToEaseInvalid', ],
        ]);

        console.log = log;
    });

    it('Aborts early when predicate is out of band.', () => {
        const log = console.log;
        console.log = jest.fn();

        const ts = new TransitionSupervisor();

        new TransitionSupervisor({
            predicate: 3,
        });

        new TransitionSupervisor({
            predicate: 'not a function',
        });

        expect(console.log.mock.calls).toEqual([
            [ ts.strings.predicateInvalid, ],
            [ ts.strings.predicateInvalid, ],
            [ ts.strings.predicateInvalid, ],
        ]);

        console.log = log;
    });

    it('Provides a placeholder message if the predicateInvalid string is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        new TransitionSupervisor({
            strings: { predicateInvalid: '', },
        });

        expect(console.log.mock.calls).toEqual([
            [ 'Error missing! predicateInvalid', ],
        ]);

        console.log = log;
    });

    it('Aborts early when transitionableIsValid is provided and is out of band.', () => {
        const log = console.log;
        console.log = jest.fn();

        const ts = new TransitionSupervisor({
            predicate: () => {},
            transitionableIsValid: new Date(),
        });

        new TransitionSupervisor({
            predicate: () => {},
            transitionableIsValid: 3,
        });

        new TransitionSupervisor({
            predicate: () => {},
            transitionableIsValid: 'not a function',
        });

        expect(console.log.mock.calls).toEqual([
            [ ts.strings.transitionableIsValidInvalid, ],
            [ ts.strings.transitionableIsValidInvalid, ],
            [ ts.strings.transitionableIsValidInvalid, ],
        ]);

        console.log = log;
    });

    it('Provides a placeholder message if the transitionableIsValidInvalid string is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        new TransitionSupervisor({
            strings: { transitionableIsValidInvalid: '', },
            predicate: () => {},
            transitionableIsValid: 'not a function',
        });

        expect(console.log.mock.calls).toEqual([
            [ 'Error missing! transitionableIsValidInvalid', ],
        ]);

        console.log = log;
    });

    it('Aborts early when getStates is provided and is out of band.', () => {
        const log = console.log;
        console.log = jest.fn();

        const ts = new TransitionSupervisor({
            predicate: () => {},
            getStates: new Date(),
        });

        new TransitionSupervisor({
            predicate: () => {},
            getStates: 3,
        });

        new TransitionSupervisor({
            predicate: () => {},
            getStates: 'not a function',
        });

        expect(console.log.mock.calls).toEqual([
            [ ts.strings.getStatesInvalid, ],
            [ ts.strings.getStatesInvalid, ],
            [ ts.strings.getStatesInvalid, ],
        ]);

        console.log = log;
    });

    it('Provides a placeholder message if the getStatesInvalid string is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        new TransitionSupervisor({
            strings: { getStatesInvalid: '', },
            predicate: () => {},
            getStates: 'not a function',
        });

        expect(console.log.mock.calls).toEqual([
            [ 'Error missing! getStatesInvalid', ],
        ]);

        console.log = log;
    });

    it('Aborts early when getKeyframe is provided and is out of band.', () => {
        const log = console.log;
        console.log = jest.fn();

        const ts = new TransitionSupervisor({
            predicate: () => {},
            getKeyframe: {},
        });

        new TransitionSupervisor({
            predicate: () => {},
            getKeyframe: [],
        });

        new TransitionSupervisor({
            predicate: () => {},
            getKeyframe: 'not a function',
        });

        expect(console.log.mock.calls).toEqual([
            [ ts.strings.getKeyframeInvalid, ],
            [ ts.strings.getKeyframeInvalid, ],
            [ ts.strings.getKeyframeInvalid, ],
        ]);

        console.log = log;
    });

    it('Provides a placeholder message if the getKeyframeInvalid string is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        new TransitionSupervisor({
            strings: { getKeyframeInvalid: '', },
            predicate: () => {},
            getKeyframe: 'not a function',
        });

        expect(console.log.mock.calls).toEqual([
            [ 'Error missing! getKeyframeInvalid', ],
        ]);

        console.log = log;
    });

    it('Aborts early when doBeforeTransition is provided and is out of band.', () => {
        const log = console.log;
        console.log = jest.fn();

        const ts = new TransitionSupervisor({
            predicate: () => {},
            doBeforeTransition: 'fdsjjf',
        });

        new TransitionSupervisor({
            predicate: () => {},
            doBeforeTransition: 124,
        });

        new TransitionSupervisor({
            predicate: () => {},
            doBeforeTransition: 'not a function',
        });

        expect(console.log.mock.calls).toEqual([
            [ ts.strings.doBeforeTransitionInvalid, ],
            [ ts.strings.doBeforeTransitionInvalid, ],
            [ ts.strings.doBeforeTransitionInvalid, ],
        ]);

        console.log = log;
    });

    it('Provides a placeholder message if the doBeforeTransitionInvalid string is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        new TransitionSupervisor({
            strings: { doBeforeTransitionInvalid: '', },
            predicate: () => {},
            doBeforeTransition: 'not a function',
        });

        expect(console.log.mock.calls).toEqual([
            [ 'Error missing! doBeforeTransitionInvalid', ],
        ]);

        console.log = log;
    });

    it('Aborts early when completeTransition is provided and is out of band.', () => {
        const log = console.log;
        console.log = jest.fn();

        const ts = new TransitionSupervisor({
            predicate: () => {},
            completeTransition: 'fdsjjf',
        });

        new TransitionSupervisor({
            predicate: () => {},
            completeTransition: 124,
        });

        new TransitionSupervisor({
            predicate: () => {},
            completeTransition: 'not a function',
        });

        expect(console.log.mock.calls).toEqual([
            [ ts.strings.completeTransitionInvalid, ],
            [ ts.strings.completeTransitionInvalid, ],
            [ ts.strings.completeTransitionInvalid, ],
        ]);

        console.log = log;
    });

    it('Provides a placeholder message if the completeTransitionInvalid string is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        new TransitionSupervisor({
            strings: { completeTransitionInvalid: '', },
            predicate: () => {},
            completeTransition: 'not a function',
        });

        expect(console.log.mock.calls).toEqual([
            [ 'Error missing! completeTransitionInvalid', ],
        ]);

        console.log = log;
    });

    it('Passes userConfig from the args object to the supervisor.', () => {
        const userConfig = { foo: 'bar', };
        const supervisor = new TransitionSupervisor({
            userConfig,
            predicate() {},
        });

        expect(supervisor.userConfig).toBe(userConfig);
    });

    it('Passes objectToSupervise from the args object to the supervisor.', () => {
        const objectToSupervise = document.createElement('div');
        const supervisor = new TransitionSupervisor({
            objectToSupervise,
            predicate() {},
        });

        expect(supervisor.objectToSupervise).toBe(objectToSupervise);
    });

    it('Passes transitionableIsValid from the args object to the supervisor.', () => {
        const transitionableIsValid = () => {};
        const supervisor = new TransitionSupervisor({
            transitionableIsValid,
            predicate() {},
        });

        expect(supervisor.transitionableIsValid).toBe(transitionableIsValid);
    });

    it('Passes getStates from the args object to the supervisor.', () => {
        const getStates = () => {};
        const supervisor = new TransitionSupervisor({
            getStates,
            predicate() {},
        });

        expect(supervisor.getStates).toBe(getStates);
    });

    it('Passes getKeyframe from the args object to the supervisor.', () => {
        const getKeyframe = () => {};
        const supervisor = new TransitionSupervisor({
            getKeyframe,
            predicate() {},
        });

        expect(supervisor.getKeyframe).toBe(getKeyframe);
    });

    it('Passes doBeforeTransition from the args object to the supervisor.', () => {
        const doBeforeTransition = () => {};
        const supervisor = new TransitionSupervisor({
            doBeforeTransition,
            predicate() {},
        });

        expect(supervisor.doBeforeTransition).toBe(doBeforeTransition);
    });

    it('Passes completeTransition from the args object to the supervisor.', () => {
        const completeTransition = () => {};
        const supervisor = new TransitionSupervisor({
            completeTransition,
            predicate() {},
        });

        expect(supervisor.completeTransition).toBe(completeTransition);
    });

    it('Passes easing from the args object to the supervisor.', () => {
        const easing = () => {};
        const supervisor = new TransitionSupervisor({
            easing,
            predicate() {},
        });

        expect(supervisor.easing).toBe(easing);
    });

    it('Passes transformToString from the args object to the supervisor.', () => {
        const transformToString = () => {};
        const supervisor = new TransitionSupervisor({
            transformToString,
            predicate() {},
        });

        expect(supervisor.transformToString).toBe(transformToString);
    });
});