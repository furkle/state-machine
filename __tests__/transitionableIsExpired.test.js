const TransitionSupervisor = require('../').Supervisor;

describe('transitionableIsExpired tests.', () => {
    it('Logs supervisorNotReinitialized if the supervisor has completed.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.isComplete = true;
        supervisor.transitionableIsExpired();

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
        supervisor.transitionableIsExpired();

        const str = 'Error missing! supervisorNotReinitialized';
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Does nothing and logs transitionableInvalid if transitionable is invalid.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn();
        const result = supervisor.transitionableIsExpired();

        const str = supervisor.strings.transitionableInvalid;
        expect(supervisor.tryToDelegateToTransitionable.mock.calls.length)
            .toBe(1);
        expect(supervisor.tryToDelegateToTransitionable).lastCalledWith(
            'transitionableIsValid', undefined);
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);
        expect(result).toBeFalsy();

        console.log = log;
    });

    it('Does nothing and logs a placeholder if transitionable is invalid and transitionableInvalid is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn();
        delete supervisor.strings.transitionableInvalid;
        const result = supervisor.transitionableIsExpired();

        const str = 'Error missing! transitionableInvalid';
        expect(supervisor.tryToDelegateToTransitionable.mock.calls.length)
            .toBe(1);
        expect(supervisor.tryToDelegateToTransitionable).lastCalledWith(
            'transitionableIsValid', undefined);
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);
        expect(result).toBeFalsy();

        console.log = log;
    });

    it('Returns false for non-time values.', () => {
        const obj = { getAttribute: jest.fn(() => 'foobar'), };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        const result = supervisor.transitionableIsExpired(obj);

        expect(result).toBeFalsy();
    });

    it('Returns false for non-expired time values.', () => {
        const obj1 = {
            getAttribute: jest.fn(a => {
                if (a === 'data-transition-duration') {
                    return '200ms';
                } else {
                    return new Date().getTime() - 195;
                }
            }),
        };

        const supervisorOne = new TransitionSupervisor({
            predicate() {},
        });

        supervisorOne.tryToDelegateToTransitionable = jest.fn(() => true);
        const resultOne = supervisorOne.transitionableIsExpired(obj1);

        expect(resultOne).toBeFalsy();

        const obj2 = {
            getAttribute: jest.fn(a => {
                if (a === 'data-transition-duration') {
                    return '2s';
                } else {
                    return new Date().getTime() - 1995;
                }
            }),
        };

        const supervisorTwo = new TransitionSupervisor({
            predicate() {},
        });

        supervisorTwo.tryToDelegateToTransitionable = jest.fn(() => true);
        const resultTwo = supervisorTwo.transitionableIsExpired(obj2);

        expect(resultTwo).toBeFalsy();
    });

    it('Returns true for expired time values.', () => {
        const obj1 = {
            getAttribute: jest.fn(a => {
                if (a === 'data-transition-duration') {
                    return '300ms';
                } else {
                    return new Date().getTime() - 305;
                }
            }),
        };

        const supervisorOne = new TransitionSupervisor({
            predicate() {},
        });

        supervisorOne.tryToDelegateToTransitionable = jest.fn(() => true);
        const resultOne = supervisorOne.transitionableIsExpired(obj1);

        expect(resultOne).toBe(true);

        const obj2 = {
            getAttribute: jest.fn(a => {
                if (a === 'data-transition-duration') {
                    return '3s';
                } else {
                    return new Date().getTime() - 3005;
                }
            }),
        };

        const supervisorTwo = new TransitionSupervisor({
            predicate() {},
        });

        supervisorTwo.tryToDelegateToTransitionable = jest.fn(() => true);
        const resultTwo = supervisorTwo.transitionableIsExpired(obj2);

        expect(resultTwo).toBe(true);
    });

    it('Logs startTimeInvalid and returns false if start-time is invalid.', () => {
        const log = console.log;
        console.log = jest.fn();

        const obj = { getAttribute: jest.fn(() => '3s'), };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        const result = supervisor.transitionableIsExpired(obj);

        const str = supervisor.strings.startTimeInvalid;
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);
        expect(result).toBeFalsy();

        console.log = log;
    });

    it('Logs a placeholder and returns false if start-time is invalid and startTimeInvalid is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        const obj = { getAttribute: jest.fn(() => '3s'), };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        delete supervisor.strings.startTimeInvalid;
        const result = supervisor.transitionableIsExpired(obj);

        const str = 'Error missing! startTimeInvalid';
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);
        expect(result).toBeFalsy();

        console.log = log;
    });
});