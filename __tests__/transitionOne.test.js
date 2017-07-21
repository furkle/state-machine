const TransitionSupervisor = require('../').Supervisor;

describe('transitionOne unit tests', () => {
    it('Logs supervisorNotReinitialized if the supervisor has completed.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.isComplete = true;
        supervisor.transitionOne();

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
        supervisor.transitionOne();

        const str = 'Error missing! supervisorNotReinitialized';
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Aborts and logs transitionableInvalid if the transitionable argument is not valid.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn();
        supervisor.transitionOne();

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(supervisor.strings.transitionableInvalid);

        console.log = log;
    });

    it('Aborts and logs a placeholder if the transitionable argument is not valid and transitionableInvalid is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn();
        delete supervisor.strings.transitionableInvalid;
        supervisor.transitionOne();

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith('Error missing! transitionableInvalid');

        console.log = log;
    });

    it('Calls executeTransition if the predicate function wins.', () => {
        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        supervisor.transitionOne();

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', undefined, ],
            [ 'predicate', undefined, ],
            [ 'executeTransition', undefined, ],
        ]);
    });

    it('Does not call executeTransition if the predicate function loses.', () => {
        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(name => {
            if (name === 'transitionableIsValid') {
                return true;
            }
        });
        supervisor.transitionOne();

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', undefined, ],
            [ 'predicate', undefined, ],
        ]);
    });
});