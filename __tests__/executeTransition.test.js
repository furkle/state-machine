const TransitionSupervisor = require('../').Supervisor;

describe('executeTransition tests', () => {
    it('Logs supervisorNotReinitialized if the supervisor has completed.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.isComplete = true;
        supervisor.executeTransition();

        const str = supervisor.strings.supervisorNotReinitialized;
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Logs a placeholder if the supervisor has completed and supervisorNotReinitialized is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.isComplete = true;
        delete supervisor.strings.supervisorNotReinitialized;
        supervisor.executeTransition();

        const str = 'Error missing! supervisorNotReinitialized';
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Does nothing and logs transitionableInvalid if the transitionable is not valid.', () => {
        const log = console.log;
        console.log = jest.fn();

        const elem = document.createElement('div');
        elem.setAttribute('data-states', 'foo,bar,baz');

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn();
        supervisor.executeTransition(elem);

        const str = supervisor.strings.transitionableInvalid;
        expect(supervisor.tryToDelegateToTransitionable.mock.calls.length).toBe(1);
        expect(supervisor.tryToDelegateToTransitionable).lastCalledWith(
            'transitionableIsValid', elem);
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Does nothing and logs a placeholder message if the transitionable is not valid and transitionableInvalid is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        const elem = document.createElement('div');
        elem.setAttribute('data-states', 'foo,bar,baz');

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn();
        delete supervisor.strings.transitionableInvalid;
        supervisor.executeTransition(elem);

        const str = 'Error missing! transitionableInvalid';
        expect(supervisor.tryToDelegateToTransitionable.mock.calls.length).toBe(1);
        expect(supervisor.tryToDelegateToTransitionable).lastCalledWith(
            'transitionableIsValid', elem);
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Calls getKeyframe twice.', () => {
        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        let ii = 0;
        supervisor.tryToDelegateToTransitionable = jest.fn(() => {
            const val = ii === 0;
            ii += 1;
            return val;
        });
        supervisor.executeTransition();

        const x = expect.arrayContaining([
            [ 'getKeyframe', undefined, ],
            [ 'getKeyframe', undefined, ],
        ]);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual(x);
    });

    it('Calls doBeforeTransition.', () => {
        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        let ii = 0;
        supervisor.tryToDelegateToTransitionable = jest.fn(() => {
            const val = ii === 0;
            ii += 1;
            return val;
        });
        supervisor.executeTransition();

        const x = expect.arrayContaining([
            [ 'doBeforeTransition', undefined, ],
        ]);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual(x);
    });

    it('Removes from transitioning and returns if the transitionable has expired.', () => {
        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        let ii = 0;
        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        supervisor.removeFromTransitioning = jest.fn();
        supervisor.executeTransition();

        expect(supervisor.tryToDelegateToTransitionable.mock.calls.length)
            .toBe(3);
        expect(supervisor.removeFromTransitioning.mock.calls.length).toBe(1);
    });

    it('Calls easing.', () => {
        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        let ii = 0;
        supervisor.tryToDelegateToTransitionable = jest.fn(() => {
            const val = ii !== 2;
            ii += 1;
            return val;
        });
        supervisor.executeTransition();

        expect(supervisor.tryToDelegateToTransitionable.mock.calls[6][0])
            .toBe('easing');
    });

    it('Calls completeTransition when the easing resolves.', async () => {
        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(name => {
            if (name === 'transitionableIsValid' || name === 'setNextState') {
                return true;
            } else if (name === 'easing') {
                return Promise.resolve();
            }
        }); 
        await supervisor.executeTransition();

        expect(supervisor.tryToDelegateToTransitionable.mock.calls[7])
            .toEqual([ 'completeTransition', undefined, ]);
    });

    it('Calls completeTransition when the easing rejects.', async () => {
        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(name => {
            if (name === 'transitionableIsValid' || name === 'setNextState') {
                return true;
            } else if (name === 'easing') {
                return Promise.reject();
            }
        });
        /* No idea why I need await await here. */
        await await supervisor.executeTransition();

        expect(supervisor.tryToDelegateToTransitionable.mock.calls[7])
            .toEqual([ 'completeTransition', undefined, ]);
    });

    it('Calls completeTransition immediately if the easing does not return a promise.', () => {
        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(name => {
            return name === 'transitionableIsValid' || name === 'setNextState';
        });
        supervisor.executeTransition();

        expect(supervisor.tryToDelegateToTransitionable.mock.calls[7])
            .toEqual([ 'completeTransition', undefined, ]);
    });

    it('Uses easingLength if initIntervalLength is -1.', () => {
        const supervisor = new TransitionSupervisor({
            config: {
                initIntervalLength: -1,
                easingLength: 20,
            },
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(name => {
            return name === 'transitionableIsValid' || name === 'setNextState';
        });
        supervisor.executeTransition();

        expect(supervisor.tryToDelegateToTransitionable.mock.calls[7])
            .toEqual([ 'completeTransition', undefined, ]);
        supervisor.executeTransition();

        const len = supervisor.config.easingLength;
        expect(supervisor.tryToDelegateToTransitionable.mock.calls[6][5])
            .toBe(len - 1);
    });

    it('Uses data-transition-interval-started-at if initIntervalLength is not -1.', () => {
        const transitionable = {
            getAttribute: jest.fn(() => new Date().getTime()),
        };

        const supervisor = new TransitionSupervisor({
            config: { initIntervalLength: 500, },
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(name => {
            return name === 'transitionableIsValid' || name === 'setNextState';
        });
        supervisor.executeTransition(transitionable);

        const len = supervisor.config.initIntervalLength;
        expect(supervisor.tryToDelegateToTransitionable.mock.calls[6][5])
            .toBeLessThan(len);
    });
});