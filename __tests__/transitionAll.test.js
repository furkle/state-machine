const TransitionSupervisor = require('../').Supervisor;

describe('transitionAll unit tests', () => {
    it('Logs supervisorNotReinitialized if the supervisor has completed.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.isComplete = true;
        supervisor.transitionAll();

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
        supervisor.transitionAll();

        const str = 'Error missing! supervisorNotReinitialized';
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Tests side effects.', () => {
        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.transitionOne = jest.fn();
        supervisor.transitionables = [ 1, 2, 3, ];
        supervisor.transitionAll();

        expect(supervisor.transitionOne.mock.calls.length).toBe(3);
        expect(supervisor.transitionOne.mock.calls).toEqual([
            [ 1, ],
            [ 2, ],
            [ 3, ],
        ]);
    });
});