const TransitionSupervisor = require('../').Supervisor;

describe('getKeyframe tests.', () => {
    it('Logs strings.transitionableInvalid and does nothing if the transitionable is not valid.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => false);
        supervisor.getKeyframe();
        
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(supervisor.strings.transitionableInvalid);

        console.log = log;
    });

    it('Logs a placeholder message and does nothing if the transitionable is not valid and transitionableInvalid is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => false);
        delete supervisor.strings.transitionableInvalid;
        supervisor.getKeyframe();

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith('Error missing! transitionableInvalid');

        console.log = log;
    });

    it('Calls getStates through tryToDelegateToTransitionable and returns the value at the current data-state-index', () => {
        const transitionable = document.createElement('div');
        const states = [ 'foo', 'bar', 'baz', ];

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(name => {
            if (name === 'transitionableIsValid') {
                return true;
            } else if (name === 'getStates') {
                return states;
            }
        });

        transitionable.setAttribute('data-state-index', 1);

        expect(supervisor.getKeyframe(transitionable)).toBe('bar');
        transitionable.setAttribute('data-state-index', 2);
        expect(supervisor.getKeyframe(transitionable)).toBe('baz');
        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
    });
});