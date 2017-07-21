const TransitionSupervisor = require('../').Supervisor;

describe('next unit tests', () => {
    it('Logs supervisorNotReinitialized if the supervisor has completed.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.isComplete = true;
        supervisor.stop();

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
        supervisor.stop();

        const str = 'Error missing! supervisorNotReinitialized';
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Tests side effects.', () => {
        const timeout = clearTimeout;
        clearTimeout = jest.fn();
        const interval = clearInterval;
        clearInterval = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.initTimeoutId = 4;
        supervisor.initIntervalId = 5;
        supervisor.easingIntervalIds = [ 12, 13, 14, ];

        supervisor.stop();

        expect(clearTimeout.mock.calls.length).toBe(1);
        expect(clearInterval.mock.calls.length).toBe(4);
        expect(supervisor.initTimeoutId).toBe(null);
        expect(supervisor.initIntervalId).toBe(null);
        expect(supervisor.easingIntervalIds).toEqual({});
        expect(supervisor.isComplete).toBe(true);

        clearTimeout = timeout;
        clearInterval = interval;
    });

    it('Does not break if easingIntervalIds does not exist.', () => {
        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        delete supervisor.easingIntervalIds;

        expect(() => supervisor.stop()).not.toThrow();
    });
});