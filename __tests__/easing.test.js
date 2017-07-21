const TransitionSupervisor = require('../').Supervisor;

describe('easing unit tests', () => {
    it('Logs supervisorNotReinitialized if the supervisor has completed.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.isComplete = true;
        supervisor.easing().catch(() => {});

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
        supervisor.easing().catch(() => {});

        const str = 'Error missing! supervisorNotReinitialized';
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Returns a promise.', () => {
        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        expect(supervisor.easing() instanceof Promise).toBe(true);
    });
});