const TransitionSupervisor = require('../').Supervisor;

describe('completeTransition tests', () => {
    it('Logs supervisorNotReinitialized if the supervisor has completed.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.isComplete = true;
        supervisor.completeTransition();

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
        supervisor.completeTransition();

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
        supervisor.completeTransition();

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
        supervisor.completeTransition();

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith('Error missing! transitionableInvalid');

        console.log = log;
    });

    it('Gets a keyframe, calls transformToString on it, and sets the transitionable\'s textContent to the resulting value.', () => {
        const transitionable = {
            getAttribute: jest.fn(() => 12),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        supervisor.completeTransition(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getKeyframe', transitionable, ],
            [ 'transformToString', transitionable, true, ],
        ]);
        expect(transitionable.textContent).toBe(true);
    });

    it('Logs transitionIdInvalid if the transition does not have a valid data-state-index attribute.', () => {
        const log = console.log;
        console.log = jest.fn();

        const transitionable = { getAttribute: jest.fn(), };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        supervisor.completeTransition(transitionable);

        const str = supervisor.strings.transitionIdInvalid;
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Logs a placeholder message if the transition does not have a valid data-state-index attribute and is missing strings.transitionIdInvalid.', () => {
        const log = console.log;
        console.log = jest.fn();

        const transitionable = { getAttribute: jest.fn(), };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        delete supervisor.strings.transitionIdInvalid;
        supervisor.completeTransition(transitionable);

        const str = 'Error missing! transitionIdInvalid';
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });
});