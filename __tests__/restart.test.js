const TransitionSupervisor = require('../').Supervisor;

describe('restart unit tests.', () => {
    it('Logs supervisorNotReinitialized if the supervisor has completed.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.isComplete = true;
        supervisor.restart();

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
        supervisor.restart();

        const str = 'Error missing! supervisorNotReinitialized';
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Tests sides effects.', () => {
        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.stop = jest.fn();
        supervisor.init = jest.fn();
        supervisor.start = jest.fn();

        supervisor.restart();

        expect(supervisor.stop.mock.calls.length).toBe(1);
        expect(supervisor.init.mock.calls.length).toBe(1);
        expect(supervisor.start.mock.calls.length).toBe(1);
    });
});