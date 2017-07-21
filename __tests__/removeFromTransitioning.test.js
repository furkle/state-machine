const TransitionSupervisor = require('../').Supervisor;

describe('removeFromTransitioning tests.', () => {
    it('Logs supervisorNotReinitialized if the supervisor has completed.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.isComplete = true;
        supervisor.removeFromTransitioning();

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
        supervisor.removeFromTransitioning();

        const str = 'Error missing! supervisorNotReinitialized';
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Logs strings.transitionableInvalid and does nothing if the transitionable is not valid.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => false);
        supervisor.removeFromTransitioning();

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
        supervisor.removeFromTransitioning();
        
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith('Error missing! transitionableInvalid');

        console.log = log;
    });

    it('Calls removeFromTransitioning on the transitionable if the function exists.', () => {
        const transitionable = {
            removeAttribute: jest.fn(),
            setAttribute: jest.fn(),
            removeFromTransitioning: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        supervisor.removeFromTransitioning(transitionable);

        expect(transitionable.removeFromTransitioning.mock.calls.length)
            .toBe(1)
    });

    it('Removes all relevant attributes from valid transitionables and adds a data-transitioned attribute.', () => {
        const transitionable = {
            removeAttribute: jest.fn(),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        supervisor.removeFromTransitioning(transitionable);

        const x = expect.arrayContaining([
            [ 'data-state-index', ],
            [ 'data-transitionable-id', ],
            [ 'data-transition-current-direction', ],
            [ 'data-transition-start-time', ],
            [ 'data-transition-interval-started-at', ],
        ]);
        expect(transitionable.removeAttribute.mock.calls).toEqual(x);
        expect(transitionable.setAttribute.mock.calls).toEqual([
            [ 'data-transitioned', '', ],
        ]);
    });
});