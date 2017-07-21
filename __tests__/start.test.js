const TransitionSupervisor = require('../').Supervisor;

describe('start unit tests.', () => {
    it('Logs strings.supervisorNotReinitialized and does nothing if the supervisor has not been reinitialized.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.isComplete = true;
        supervisor.start();

        const str = supervisor.strings.supervisorNotReinitialized;
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Logs a placeholder message and does nothing if the supervisor has not been reinitialized and supervisorNotReinitialized is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.isComplete = true;
        delete supervisor.strings.supervisorNotReinitialized;
        supervisor.start();
        
        const str = 'Error missing! supervisorNotReinitialized';
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Sets up a timeout which starts an interval if initIntervalLength is not -1.', () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        const interval = setInterval;
        setInterval = jest.fn();

        const supervisor = new TransitionSupervisor({
            config: {
                initIntervalLength: 200,
            },
            predicate() {},
        });

        supervisor.next = jest.fn();
        supervisor.start();
        jest.runTimersToTime(supervisor.config.initTimeoutLength);

        const len = supervisor.config.initIntervalLength;
        expect(setInterval.mock.calls.length).toBe(1);
        expect(setInterval.mock.calls[0][1]).toBe(len);

        setInterval = interval;
    });

    it('The interval calls this.next.', () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        const supervisor = new TransitionSupervisor({
            config: {
                initIntervalLength: 300,
            },
            predicate() {},
        });

        supervisor.next = jest.fn();
        supervisor.start();

        jest.runTimersToTime(supervisor.config.initTimeoutLength +
            supervisor.config.initIntervalLength);

        const len = supervisor.config.initIntervalLength;
        expect(setInterval.mock.calls.length).toBe(1);
        expect(setInterval.mock.calls[0][1]).toBe(len);
        expect(supervisor.next.mock.calls.length).toBe(2);
    });

    it('Does not start an interval if initIntervalLength is -1.', () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        const interval = setInterval;
        setInterval = jest.fn();

        const supervisor = new TransitionSupervisor({
            config: {
                initTimeoutLength: 0,
                initIntervalLength: -1,
            },

            predicate() {},
        });

        supervisor.start();
        jest.runTimersToTime(supervisor.config.initTimeoutLength);

        expect(setInterval.mock.calls.length).toBe(0);

        setInterval = interval;
    });

    it('Does not start an interval if there are no more valid transitionables after the first next call.', () => {
        jest.clearAllTimers();
        jest.useFakeTimers();

        const interval = setInterval;
        setInterval = jest.fn();

        const supervisor = new TransitionSupervisor({
            config: {
                initIntervalLength: 500,
            },
            predicate() {},
        });

        supervisor.start();
        jest.runTimersToTime(supervisor.config.initTimeoutLength);

        expect(setInterval.mock.calls.length).toBe(0);

        setInterval = interval;
    });
});